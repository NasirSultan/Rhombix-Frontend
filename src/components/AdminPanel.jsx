import React, { useState } from 'react';
import { addTeam } from '../services/teamService';

const AdminPanel = () => {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addTeam(name);
    setName('');
  };

  return (
    <div className="my-4">
      <input
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Team Name"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Add Team
      </button>
    </div>
  );
};

export default AdminPanel;
