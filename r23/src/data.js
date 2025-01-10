export const sampleData = [
  {
    date: new Date("2023-01-01"),
    categoryA: 100,
    categoryB: 50,
    categoryC: 75,
  },
  {
    date: new Date("2023-02-01"),
    categoryA: 120,
    categoryB: 60,
    categoryC: 80,
  },
  {
    date: new Date("2023-03-01"),
    categoryA: 110,
    categoryB: 70,
    categoryC: 90,
  },
  {
    date: new Date("2023-04-01"),
    categoryA: 130,
    categoryB: 55,
    categoryC: 85,
  },
  // ... more data points
];

export const productCategories = ["categoryA", "categoryB", "categoryC"];
export const dateColumnName = "date";
export const valueColumnNamePrefix = "category"; // Not strictly needed if categories array is provided.
