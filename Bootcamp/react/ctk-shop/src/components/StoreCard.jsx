// src/components/StoreCard.jsx
import React, { useState, useEffect } from 'react';

function StoreCard({ store, onUpdate, onDelete }) {
  // Editing state for the entire card
  const [editing, setEditing] = useState(false);
  // Store the new name and tags while editing
  const [editedName, setEditedName] = useState(store.name);
  const [editedTags, setEditedTags] = useState(store.tags || []);
  const [newTagName, setNewTagName] = useState("");

  // Update local state if store prop changes
  useEffect(() => {
    setEditedName(store.name);
    setEditedTags(store.tags || []);
  }, [store]);

  // Main save logic: update store name and tags
  const handleSave = () => {
    if (onUpdate) {
      onUpdate({ ...store, name: editedName, tags: editedTags });
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedName(store.name);
    setEditedTags(store.tags || []);
    setEditing(false);
  };

  // Tag editing functions
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
            {/* Edit Store Name */}
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
            {/* Edit Tags */}
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
