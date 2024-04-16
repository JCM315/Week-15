import React, { useState, useEffect } from 'react';
import axios from 'axios';
import House from './House';

const App = () => {
  const [houses, setHouses] = useState([]);
  const [newHouse, setNewHouse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/houses')
      .then(res => {
        setHouses(res.data);
        setError(null); 
      })
      .catch(err => {
        console.error('Failed to fetch houses:', err);
        setError('Failed to fetch houses');
      });
  }, []);
  

  const addHouse = () => {
    if (!newHouse.trim()) {
      setError('Please enter a valid house name');
      return;
    }
  
    axios.post('/api/houses', { name: newHouse })
      .then(res => {
        setHouses(prevHouses => [...prevHouses, res.data]);
        setNewHouse('');
        setSuccessMessage('House added successfully!');
        setError(null); 
      })
      .catch(err => {
        console.log(err);
        setError('Failed to add house');
      });
  };
  

  const deleteHouse = id => {
    axios.delete(`/api/houses/${id}`)
      .then(() => setHouses(prevHouses => prevHouses.filter(house => house.id !== id)))
      .catch(err => setError('Failed to delete house'));
  };

  const updateHouse = updatedHouse => {
    axios.put(`/api/houses/${updatedHouse.id}`, updatedHouse)
      .then(res => {
        setHouses(prevHouses =>
          prevHouses.map(house => (house.id === updatedHouse.id ? res.data : house))
        );
        setSuccessMessage('House updated successfully!');
        setError(null); 
      })
      .catch(err => setError('Failed to update house'));
  };

  return (
    <div>
      <input value={newHouse} onChange={e => setNewHouse(e.target.value)} />
      <button onClick={addHouse}>Add House</button>
      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}
      {houses.map(house => (
        <House key={house.id} house={house} deleteHouse={deleteHouse} updateHouse={updateHouse} />
      ))}
    </div>
  );
};

export default App;
