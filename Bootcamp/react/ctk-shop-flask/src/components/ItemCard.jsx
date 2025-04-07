// src/components/ItemCard.jsx
import React, { useState, useEffect } from 'react';

function ItemCard({ item, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);
  const [editedTags, setEditedTags] = useState(item.tags || []);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    setEditedName(item.name);
    setEditedPrice(item.price);
    setEditedTags(item.tags || []);
  }, [item]);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        ...item,
        name: editedName,
        price: parseFloat(editedPrice),
        tags: editedTags,
      });
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedName(item.name);
    setEditedPrice(item.price);
    setEditedTags(item.tags || []);
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
            {/* Edit Item Name */}
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
            {/* Edit Price */}
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
            <p className="title is-5">{item.name}</p>
            <p className="subtitle is-6">
              Price: ${parseFloat(item.price).toFixed(2)}
            </p>
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
                onDelete && onDelete(item);
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

export default ItemCard;
