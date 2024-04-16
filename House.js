import React, { useState } from 'react';

const House = ({ house, deleteHouse, updateHouse }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedHouse, setUpdatedHouse] = useState(house);

  const handleUpdate = () => {
    if (!updatedHouse.name.trim()) {
      alert('Please enter a valid house name.');
      return;
    }

    updateHouse(updatedHouse);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input 
            value={updatedHouse.name} 
            onChange={e => setUpdatedHouse(prevState => ({ ...prevState, name: e.target.value }))} 
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <h2>{house.name}</h2>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteHouse(house.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default House;
