import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Update = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await axios.get('/api/update');
        setUpdates(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div>
      <h2>Updates</h2>
      {updates.map((update, index) => (
        <div key={index} className="update">
          <h3>{update.title}</h3>
          <p>{update.description}</p>
          <p>Version: {update.version}</p>
          <p>Release Date: {new Date(update.releaseDate).toLocaleDateString()}</p>
          <ul>
            {update.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Update;