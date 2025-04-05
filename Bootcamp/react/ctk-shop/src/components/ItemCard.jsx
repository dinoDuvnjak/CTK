// src/components/ItemCard.jsx
import React, { useState } from 'react';

function ItemCard({ item, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);

  // Save updated values and exit edit mode
  const handleSave = () => {
    if (onUpdate) {
      onUpdate({ ...item, name: editedName, price: parseFloat(editedPrice) });
    }
    setEditing(false);
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setEditing(false);
    setEditedName(item.name);
    setEditedPrice(item.price);
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
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              Save
            </a>
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
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
          </div>
          <footer className="card-footer">
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => {
                e.preventDefault();
                setEditing(true);
              }}
            >
              Edit
            </a>
            {onDelete && (
              <a
                href="#"
                className="card-footer-item"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(item);
                }}
              >
                Delete
              </a>
            )}
          </footer>
        </>
      )}
    </div>
  );
}

export default ItemCard;
