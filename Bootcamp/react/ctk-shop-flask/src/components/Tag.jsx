// src/components/TagList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

function TagList({ storeId }) {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/store/${storeId}/tag`)
      .then(response => {
        setTags(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [storeId]);

  if (loading) return <p>Loading tags...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="columns is-multiline">
      {tags.map(tag => (
        <div key={tag.id} className="column is-4">
          <ItemCard 
            title={tag.name}
            onDelete={() => console.log("Delete tag", tag.id)}
          >
            <p>ID: {tag.id}</p>
          </ItemCard>
        </div>
      ))}
    </div>
  );
}

export default TagList;
