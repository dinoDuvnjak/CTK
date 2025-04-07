// src/components/ItemList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

function ItemList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const fetchItems = () => {
    const token = localStorage.getItem('access_token');
    //console.log("token dsdfdsf", token);
    axios.get('http://127.0.0.1:5000/item', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setItems(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching items');
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = (item) => {
    const token = localStorage.getItem('access_token');
    axios.delete(`http://127.0.0.1:5000/item/${item.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setItems(items.filter(i => i.id !== item.id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleUpdate = (updatedItem) => {
    // Update local state after an update
    setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
  };

  return (
    <div className="columns is-multiline">
      {error && <p>{error}</p>}
      {items.map(item => (
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
