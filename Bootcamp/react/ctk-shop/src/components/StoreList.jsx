// src/components/StoreList.jsx
import React, { useEffect, useState } from 'react';
import { storesData } from '../data/dummyData'; // using dummy data for now
import StoreCard from './StoreCard';

function StoreList() {
  const [stores, setStores] = useState([]);
  // Track the store currently being edited (by its id)
  const [editingStoreId, setEditingStoreId] = useState(null);
  // Store the updated name while editing
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    // Load dummy data (or later, your API call)
    setStores(storesData);
  }, []);

  // When "Edit" is clicked, set the editing state for that store
  const handleEditClick = (store) => {
    setEditingStoreId(store.id);
    setEditedName(store.name);
  };

  // Save the edited name (simulate an API update)
  const handleSave = (storeId) => {
    const updatedStores = stores.map((store) =>
      store.id === storeId ? { ...store, name: editedName } : store
    );
    setStores(updatedStores);
    setEditingStoreId(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingStoreId(null);
  };

  return (
    <div className="columns is-multiline">
      {stores.map((store) => (
        <div key={store.id} className="column is-4">
          {editingStoreId === store.id ? (
            // Render an inline edit form for the store
            <div className="card">
              <div className="card-content">
                <div className="field">
                  <label className="label">Edit Store Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
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
                    handleSave(store.id);
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
            </div>
          ) : (
            // Otherwise, render the normal StoreCard
            <StoreCard
              store={store}
              onEdit={() => handleEditClick(store)}
              onDelete={() => console.log("Delete store", store.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default StoreList;
