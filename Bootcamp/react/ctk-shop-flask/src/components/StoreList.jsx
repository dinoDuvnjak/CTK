// src/components/StoreList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreCard from './StoreCard';

function StoreList() {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  const fetchStores = () => {
    axios.get('http://127.0.0.1:5000/store')
      .then((response) => {
        setStores(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching stores');
      });
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Handle deletion by calling the API, then updating local state
  const handleDelete = (store) => {
    axios.delete(`http://127.0.0.1:5000/store/${store.id}`)
      .then(() => {
        setStores(stores.filter((s) => s.id !== store.id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle update – currently, update logic is local.
  // If you add an update endpoint, replace this with an axios.put call.
  const handleUpdate = (updatedStore) => {
    // Example: axios.put(`http://127.0.0.1:5000/store/${updatedStore.id}`, updatedStore)
    setStores(stores.map((s) => s.id === updatedStore.id ? updatedStore : s));
  };

  return (
    <div className="columns is-multiline">
      {error && <p>{error}</p>}
      {stores.map((store) => (
        <div key={store.id} className="column is-4">
          <StoreCard
            store={store}
            onDelete={handleDelete}
            onUpdate={handleUpdate}  // used when inline editing is saved
          />
        </div>
      ))}
    </div>
  );
}

export default StoreList;
