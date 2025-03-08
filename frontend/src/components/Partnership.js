import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Partnership = () => {
  const [partnerships, setPartnerships] = useState([]);

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const res = await axios.get('/api/partnership');
        setPartnerships(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPartnerships();
  }, []);

  return (
    <div>
      <h2>Partnerships</h2>
      <div>
        {partnerships.map((partnership, index) => (
          <div key={index} className="partnership">
            <img src={partnership.imageUrl} alt={partnership.name} />
            <h3>{partnership.name}</h3>
            <p>{partnership.description}</p>
            <a href={partnership.linkUrl} target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partnership;