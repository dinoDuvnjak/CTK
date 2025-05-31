// src/components/ItemCard.tsx
import React, { useState, useEffect } from 'react';

type Tag = {
  id: number;
  name: string;
};

type Item = {
  id: number;
  name: string;
  price: number;
  tags?: Tag[];
};

type ItemCardProps = {
  item: Item;
  onUpdate?: (updatedItem: Item) => void;
  onDelete?: (itemToDelete: Item) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(item.name);
  const [editedPrice, setEditedPrice] = useState<string>(item.price.toString());
  const [editedTags, setEditedTags] = useState<Tag[]>(item.tags ?? []);
  const [newTagName, setNewTagName] = useState<string>('');

  useEffect(() => {
    setEditedName(item.name);
    setEditedPrice(item.price.toString());
    setEditedTags(item.tags ?? []);
  }, [item]);

  const handleSave = () => {
    if (onUpdate) {
      const updatedItem: Item = {
        ...item,
        name: editedName,
        price: parseFloat(editedPrice),
        tags: editedTags,
      };
      onUpdate(updatedItem);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedName(item.name);
    setEditedPrice(item.price.toString());
    setEditedTags(item.tags ?? []);
    setEditing(false);
  };

  // Tag editing functions
  const handleTagChange = (index: number, newValue: string) => {
    const updated = [...editedTags];
    updated[index] = { ...updated[index], name: newValue };
    setEditedTags(updated);
  };

  const handleDeleteTag = (index: number) => {
    const updated = [...editedTags];
    updated.splice(index, 1);
    setEditedTags(updated);
  };

  const handleAddTag = () => {
    if (newTagName.trim() === '') return;
    const newTag: Tag = { id: Date.now(), name: newTagName };
    setEditedTags([...editedTags, newTag]);
    setNewTagName('');
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedName(e.target.value)
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedPrice(e.target.value)
                  }
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleTagChange(index, e.target.value)
                      }
                    />
                  </div>
                  <div className="control">
                    <button
                      className="button is-danger"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewTagName(e.target.value)
                    }
                  />
                </div>
                <div className="control">
                  <button
                    className="button is-info"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleSave();
              }}
            >
              Save
            </a>
            <a
              href="#"
              className="card-footer-item"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
              Price: ${item.price.toFixed(2)}
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
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setEditing(true);
              }}
            >
              Edit
            </a>
            <a
              href="#"
              className="card-footer-item"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
};

export default ItemCard;
