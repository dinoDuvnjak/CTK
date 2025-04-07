// src/components/StoreForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function StoreForm({ onStoreCreated }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/store', { name })
      .then(response => {
        if (onStoreCreated) onStoreCreated(response.data);
        setName('');
      })
      .catch(err => {
        console.error("Error creating store", err);
      });
  };

  return (
    <section className="section">
      <div className="container centered-form-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Store Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter store name"
                  required
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-primary">
                Create Store
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default StoreForm;
