// src/components/StoreList.tsx
import React, { useEffect, useState } from 'react';
import { storesData } from '../data/dummyData';
import StoreCard from './StoreCard';

type Tag = {
  id: number;
  name: string;
};

type Store = {
  id: number;
  name: string;
  tags?: Tag[];
};

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [editingStoreId, setEditingStoreId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');

  useEffect(() => {
    // Load dummy data (or later, your API call)
    setStores(storesData as Store[]);
  }, []);

  const handleEditClick = (store: Store) => {
    setEditingStoreId(store.id);
    setEditedName(store.name);
  };

  const handleSave = (storeId: number) => {
    const updatedStores = stores.map((store) =>
      store.id === storeId ? { ...store, name: editedName } : store
    );
    setStores(updatedStores);
    setEditingStoreId(null);
  };

  const handleCancel = () => {
    setEditingStoreId(null);
  };

  return (
    <div className="columns is-multiline">
      {stores.map((store) => (
        <div key={store.id} className="column is-4">
          {editingStoreId === store.id ? (
            <div className="card">
              <div className="card-content">
                <div className="field">
                  <label className="label">Edit Store Name</label>
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
              </div>
              <footer className="card-footer">
                <a
                  href="#"
                  className="card-footer-item"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleSave(store.id);
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
            </div>
          ) : (
            <StoreCard
              store={store}
              onEdit={() => handleEditClick(store)}
              onDelete={() => console.log('Delete store', store.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StoreList;
