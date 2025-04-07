// src/components/ItemForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ItemForm({ storeId, onItemCreated }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/item', { store_id: storeId, name, price })
      .then(response => {
        if (onItemCreated) onItemCreated(response.data);
        setName('');
        setPrice('');
      })
      .catch(err => {
        console.error("Error creating item", err);
      });
  };

  return (
    <section className="section">
      <div className="container centered-form-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Item Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
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
                  onChange={e => setPrice(e.target.value)}
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
        </div>
      </div>
    </section>
  );
}

export default ItemForm;
