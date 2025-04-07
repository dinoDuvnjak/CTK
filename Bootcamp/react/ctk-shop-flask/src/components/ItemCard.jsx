// src/components/ItemCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemCard({ item, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);

  useEffect(() => {
    setEditedName(item.name);
    setEditedPrice(item.price);
  }, [item]);

  const handleSave = () => {
    const payload = {
      name: editedName,
      price: parseFloat(editedPrice)
    };
    const token = localStorage.getItem('access_token');
    axios.put(`http://127.0.0.1:5000/item/${item.id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (onUpdate) {
          onUpdate(response.data);
        }
        setEditing(false);
      })
      .catch(err => {
        console.error("Error updating item", err);
      });
  };

  const handleCancel = () => {
    setEditedName(item.name);
    setEditedPrice(item.price);
    setEditing(false);
  };

  return (
    <div className="card">
      {editing ? (
        <>
          <div className="card-content">
            <div className="field">
              <label className="label">Item Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
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
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => { e.preventDefault(); handleSave(); }}
            >
              Save
            </a>
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => { e.preventDefault(); handleCancel(); }}
            >
              Cancel
            </a>
          </footer>
        </>
      ) : (
        <>
          <div className="card-content">
            <p className="title is-5">{item.name}</p>
            <p className="subtitle is-6">Price: ${parseFloat(item.price).toFixed(2)}</p>
            <p>Store: {item.store && item.store.name ? item.store.name : "Unknown"}</p>
            <div className="mt-3">
              <p className="has-text-weight-semibold">Tags:</p>
              {item.tags && item.tags.length > 0 ? (
                item.tags.map((tag) => (
                  <span key={tag.id} className="tag is-info mr-1">
                    {tag.name}
                  </span>
                ))
              ) : (
                <span>No tags</span>
              )}
            </div>
          </div>
          <footer className="card-footer">
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => { e.preventDefault(); setEditing(true); }}
            >
              Edit
            </a>
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => { e.preventDefault(); onDelete && onDelete(item); }}
            >
              Delete
            </a>
          </footer>
        </>
      )}
    </div>
  );
}

export default ItemCard;
