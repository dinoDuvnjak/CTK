// src/components/StoreForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

type Store = {
  id: number;
  name: string;
  tags?: { id: number; name: string }[];
};

type StoreFormProps = {
  onStoreCreated?: (newStore: Store) => void;
};

const StoreForm: React.FC<StoreFormProps> = ({ onStoreCreated }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post<Store>('/store', { name })
      .then((response) => {
        if (onStoreCreated) {
          onStoreCreated(response.data);
        }
        setName('');
      })
      .catch((err) => {
        console.error('Error creating store', err);
      });
  };

  return (
    <section className="section">
      <div className="container centered-form-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Store Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter store name"
                  required
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-primary">
                Create Store
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StoreForm;
