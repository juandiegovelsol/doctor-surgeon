import express from "express";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON body

// Simulate a database with a global variable
const dishes = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil.",
    price: 12.99,
    availableQuantity: 10,
  },
  {
    id: 2,
    title: "Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, and onion.",
    price: 9.99,
    availableQuantity: 15,
  },
  {
    id: 3,
    title: "Caesar Salad",
    description:
      "Romaine lettuce with croutons, parmesan cheese, and Caesar dressing.",
    price: 7.5,
    availableQuantity: 20,
  },
];

// Endpoint to retrieve all dishes
app.get("/dishes", (req, res) => {
  res.status(200).json(dishes);
});

// Endpoint to create orders
app.post("/orders", (req, res) => {
  const orders = req.body;
  let totalPrice = 0;
  const processedOrders = [];
  const unavailableItems = [];

  if (!Array.isArray(orders)) {
    return res
      .status(400)
      .json({ error: "Invalid request body. Expected an array of orders." });
  }

  for (const order of orders) {
    const { id, quantity } = order;

    if (
      typeof id !== "number" ||
      typeof quantity !== "number" ||
      quantity <= 0
    ) {
      return res.status(400).json({
        error:
          'Each order must have a valid positive integer "id" and "quantity".',
      });
    }

    const dish = dishes.find((d) => d.id === id);

    if (!dish) {
      unavailableItems.push({ id, error: "Dish not found" });
      continue;
    }

    if (dish.availableQuantity < quantity) {
      unavailableItems.push({
        id,
        error: `Insufficient quantity available (requested: ${quantity}, available: ${dish.availableQuantity})`,
      });
      continue;
    }

    dish.availableQuantity -= quantity;
    const itemPrice = dish.price * quantity;
    totalPrice += itemPrice;
    processedOrders.push({ dishId: id, quantity, itemPrice });
  }

  if (unavailableItems.length > 0) {
    return res
      .status(400)
      .json({ error: "Some items are unavailable", unavailableItems });
  }

  res.status(201).json({
    message: "Order created successfully",
    orderItems: processedOrders,
    totalPrice,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
