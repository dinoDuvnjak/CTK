// src/data/dummyData.js

export const storesData = [
    {
      id: 1,
      name: "Plodine",
      items: [
        { id: 1, name: "ormar", price: 20.0 }
      ],
      tags: [
        { id: 1, name: "supermarket" }
      ]
    },
    {
      id: 2,
      name: "Brodokomerc",
      items: [],
      tags: []
    },
    {
      id: 3,
      name: "Fresh Mart",
      items: [
        { id: 2, name: "apple", price: 1.5 },
        { id: 3, name: "banana", price: 0.5 }
      ],
      tags: [
        { id: 2, name: "organic" },
        { id: 3, name: "local" }
      ]
    }
  ];
  
  export const itemsData = [
    {
      id: 1,
      name: "ormar",
      price: 20.0,
      store: {
        id: 1,
        name: "Plodine"
      },
      tags: [
        { id: 1, name: "supermarket" }
      ]
    },
    {
      id: 2,
      name: "apple",
      price: 1.5,
      store: {
        id: 3,
        name: "Fresh Mart"
      },
      tags: [
        { id: 2, name: "organic" }
      ]
    },
    {
      id: 3,
      name: "banana",
      price: 0.5,
      store: {
        id: 3,
        name: "Fresh Mart"
      },
      tags: [
        { id: 3, name: "local" }
      ]
    },
    {
      id: 4,
      name: "orange juice",
      price: 3.0,
      store: {
        id: 1,
        name: "Plodine"
      },
      tags: [
        { id: 1, name: "supermarket" }
      ]
    }
  ];
  