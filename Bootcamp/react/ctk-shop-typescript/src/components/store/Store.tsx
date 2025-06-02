// src/components/StoreList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '../item-card/ItemCard';

type Store = {
  id: number;
  name: string;
  description?: string;
};

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Store[]>('/store')
      .then((response) => {
        setStores(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="columns is-multiline">
      {stores.map((store) => (
        <div key={store.id} className="column is-4">
          <ItemCard
            title={store.name}
            subtitle={`ID: ${store.id}`}
            onEdit={() => console.log('Edit store', store.id)}
            onDelete={() => console.log('Delete store', store.id)}
          >
            <p>{store.description ?? 'No description provided.'}</p>
          </ItemCard>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
