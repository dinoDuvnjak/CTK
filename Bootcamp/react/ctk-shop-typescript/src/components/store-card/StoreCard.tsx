// src/components/StoreCard.tsx
import React, { useState, useEffect } from 'react';

type Tag = {
  id: number;
  name: string;
};

type Store = {
  id: number;
  name: string;
  tags?: Tag[];
};

type StoreCardProps = {
  store: Store;
  onUpdate?: (updatedStore: Store) => void;
  onDelete?: (storeToDelete: Store) => void;
};

const StoreCard: React.FC<StoreCardProps> = ({ store, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(store.name);
  const [editedTags, setEditedTags] = useState<Tag[]>(store.tags ?? []);
  const [newTagName, setNewTagName] = useState<string>('');

  useEffect(() => {
    setEditedName(store.name);
    setEditedTags(store.tags ?? []);
  }, [store]);

  const handleSave = () => {
    if (onUpdate) {
      const updatedStore: Store = {
        ...store,
        name: editedName,
        tags: editedTags,
      };
      onUpdate(updatedStore);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedName(store.name);
    setEditedTags(store.tags ?? []);
    setEditing(false);
  };

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
            {/* Edit Store Name */}
            <div className="field">
              <label className="label">Store Name</label>
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
};

export default StoreCard;
