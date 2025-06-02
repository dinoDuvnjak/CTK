// src/components/ItemList.tsx
import React, { useState, useEffect } from 'react';
import ItemCard from '../item-card/ItemCard';
import { itemsData } from '../../data/dummyData';

type Tag = {
  id: number;
  name: string;
};

type Item = {
  id: number;
  name: string;
  price: number;
  tags?: Tag[];
};

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Load placeholder data; later replace with your API call
    setItems(itemsData as Item[]);
  }, []);

  // Update the item in state after editing
  const handleUpdate = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  // Remove an item from state after deletion
  const handleDelete = (itemToDelete: Item) => {
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
};

export default ItemList;
