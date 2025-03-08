import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPreferences = () => {
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [preferredPropertyTypes, setPreferredPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await axios.get('/api/personalization/preferences');
        if (res.data) {
          setPreferredLocations(res.data.preferredLocations);
          setPreferredPropertyTypes(res.data.preferredPropertyTypes);
          setPriceRange(res.data.priceRange);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPreferences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/personalization/preferences', { preferredLocations, preferredPropertyTypes, priceRange });
      alert('Preferences updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating preferences');
    }
  };

  return (
    <div>
      <h2>Manage Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Preferred Locations:</label>
          <input
            type="text"
            value={preferredLocations.join(', ')}
            onChange={(e) => setPreferredLocations(e.target.value.split(', '))}
          />
        </div>
        <div>
          <label>Preferred Property Types:</label>
          <input
            type="text"
            value={preferredPropertyTypes.join(', ')}
            onChange={(e) => setPreferredPropertyTypes(e.target.value.split(', '))}
          />
        </div>
        <div>
          <label>Price Range:</label>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            placeholder="Max"
          />
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default UserPreferences;