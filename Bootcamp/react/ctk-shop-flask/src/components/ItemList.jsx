// src/components/ItemList.jsx
import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import { itemsData } from '../data/dummyData';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Load placeholder data; later replace with your API call
    setItems(itemsData);
  }, []);

  // Update the item in state after editing
  const handleUpdate = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // Remove an item from state after deletion
  const handleDelete = (itemToDelete) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemToDelete.id)
    );
  };

  return (
    <div className="columns is-multiline">
      {items.map((item) => (
        <div key={item.id} className="column is-4">
          <ItemCard
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default ItemList;
