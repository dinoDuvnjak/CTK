// src/components/TagForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

type Tag = {
  id: number;
  name: string;
};

type TagFormProps = {
  storeId: number;
  onTagCreated: (newTag: Tag) => void;
};

const TagForm: React.FC<TagFormProps> = ({ storeId, onTagCreated }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post<Tag>(`/store/${storeId}/tag`, { name })
      .then((response) => {
        onTagCreated(response.data);
        setName('');
      })
      .catch((err) => {
        console.error('Error creating tag', err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Tag Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
        </div>
      </div>
      <div className="field">
        <button type="submit" className="button is-primary">
          Create Tag
        </button>
      </div>
    </form>
  );
};

export default TagForm;
