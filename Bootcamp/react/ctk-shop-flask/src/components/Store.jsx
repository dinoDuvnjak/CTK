// src/components/StoreList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

function Store() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/store')
      .then(response => {
        setStores(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="columns is-multiline">
      {stores.map(store => (
        <div key={store.id} className="column is-4">
          <ItemCard 
            title={store.name}
            subtitle={`ID: ${store.id}`}
            onEdit={() => console.log("Edit store", store.id)}
            onDelete={() => console.log("Delete store", store.id)}
          >
            <p>{store.description || 'No description provided.'}</p>
          </ItemCard>
        </div>
      ))}
    </div>
  );
}

export default Store;
