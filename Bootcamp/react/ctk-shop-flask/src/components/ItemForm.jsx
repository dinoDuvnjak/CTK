// src/components/ItemForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ItemForm({ storeId, onItemCreated }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    axios.post(
      'http://127.0.0.1:5000/item',  // Use the absolute URL here
      {
        store_id: storeId,
        name,
        price: parseFloat(price)
      },
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        if (onItemCreated) onItemCreated(response.data);
        setName('');
        setPrice('');
      })
      .catch(err => {
        console.error("Error creating item", err);
        setError('Error creating item');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="field">
        <label className="label">Item Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input
            className="input"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>
      </div>
      <div className="field">
        <button type="submit" className="button is-primary">
          Create Item
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
