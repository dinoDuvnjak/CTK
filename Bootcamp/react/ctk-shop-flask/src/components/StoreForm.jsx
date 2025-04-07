// src/components/StoreForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function StoreForm({ onStoreCreated }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/store', { name })
      .then((response) => {
        onStoreCreated && onStoreCreated(response.data);
        setName('');
      })
      .catch((err) => {
        console.error(err);
        setError('Error creating store');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="field">
        <label className="label">Store Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
  );
}

export default StoreForm;
