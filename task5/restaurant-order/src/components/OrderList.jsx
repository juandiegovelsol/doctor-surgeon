// src/components/OrderList.jsx
import React from "react";

function OrderList({ orders }) {
  return (
    <div>
      <h3>Orders</h3>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order ID: {order.id}, Total: \\( {order.totalPrice.toFixed(2)} \\)
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderList;
