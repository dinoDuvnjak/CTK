// src/components/TagForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function TagForm({ storeId, onTagCreated }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/store/${storeId}/tag`, { name })
      .then(response => {
        onTagCreated(response.data);
        setName('');
      })
      .catch(err => {
        console.error("Error creating tag", err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Tag Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <button type="submit" className="button is-primary">
          Create Tag
        </button>
      </div>
    </form>
  );
}

export default TagForm;
