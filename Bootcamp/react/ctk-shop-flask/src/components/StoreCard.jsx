// src/components/StoreCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StoreCard({ store, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(store.name);
  const [editedTags, setEditedTags] = useState(store.tags || []);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    setEditedName(store.name);
    setEditedTags(store.tags || []);
  }, [store]);

  const handleSave = () => {
    const payload = {
      name: editedName,
      tags: editedTags.map(tag => ({ name: tag.name }))
    };
    axios.put(`http://127.0.0.1:5000/store/${store.id}`, payload)
      .then(response => {
        if (onUpdate) {
          onUpdate(response.data);
        }
        setEditing(false);
      })
      .catch(err => {
        console.error("Error updating store", err);
      });
  };

  const handleCancel = () => {
    setEditedName(store.name);
    setEditedTags(store.tags || []);
    setEditing(false);
  };

  const handleTagChange = (index, newValue) => {
    const updated = [...editedTags];
    updated[index] = { ...updated[index], name: newValue };
    setEditedTags(updated);
  };

  const handleDeleteTag = (index) => {
    const updated = [...editedTags];
    updated.splice(index, 1);
    setEditedTags(updated);
  };

  const handleAddTag = () => {
    if (newTagName.trim() === "") return;
    const newTag = { id: Date.now(), name: newTagName };
    setEditedTags([...editedTags, newTag]);
    setNewTagName("");
  };

  return (
    <div className="card">
      {editing ? (
        <>
          <div className="card-content">
            <div className="field">
              <label className="label">Store Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <p className="has-text-weight-semibold">Tags:</p>
              {editedTags.map((tag, index) => (
                <div key={tag.id} className="field is-grouped">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={tag.name}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                    />
                  </div>
                  <div className="control">
                    <button
                      className="button is-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteTag(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="New tag"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                </div>
                <div className="control">
                  <button
                    className="button is-info"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddTag();
                    }}
                  >
                    Add
                  </button>
                </div>
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
            <p className="title is-5">{store.name}</p>
            <p className="subtitle is-6">ID: {store.id}</p>
            <div className="mt-3">
              <p className="has-text-weight-semibold">Tags:</p>
              {store.tags && store.tags.length > 0 ? (
                store.tags.map((tag) => (
                  <span key={tag.id} className="tag is-info mr-1">
                    {tag.name}
                  </span>
                ))
              ) : (
                <span>No tags</span>
              )}
            </div>
            <div className="mt-3">
              <p className="has-text-weight-semibold">Items:</p>
              {store.items && store.items.length > 0 ? (
                <ul>
                  {store.items.map((item) => (
                    <li key={item.id}>
                      {item.name} - ${parseFloat(item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No items</span>
              )}
            </div>
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
            <a
              href="#"
              className="card-footer-item"
              onClick={(e) => {
                e.preventDefault();
                onDelete && onDelete(store);
              }}
            >
              Delete
            </a>
          </footer>
        </>
      )}
    </div>
  );
}

export default StoreCard;
