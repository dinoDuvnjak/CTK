// src/components/StoreCard.jsx
import React from 'react';

function StoreCard({ store, onEdit, onDelete }) {
  if (!store) return null;

  return (
    <div className="card">
      <div className="card-content">
        <p className="title is-5">{store.name}</p>
        <p className="subtitle is-6">ID: {store.id}</p>
        <p>{store.description || 'No description provided.'}</p>
      </div>
      {(onEdit || onDelete) && (
        <footer className="card-footer">
          {onEdit && (
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => {
                e.preventDefault();
                onEdit(store);
              }}
            >
              Edit
            </a>
          )}
          {onDelete && (
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => {
                e.preventDefault();
                onDelete(store);
              }}
            >
              Delete
            </a>
          )}
        </footer>
      )}
    </div>
  );
}

export default StoreCard;
