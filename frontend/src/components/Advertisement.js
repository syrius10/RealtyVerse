import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Advertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const res = await axios.get('/api/advertisement');
        setAdvertisements(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdvertisements();
  }, []);

  return (
    <div>
      <h2>Advertisements</h2>
      <div>
        {advertisements.map((ad, index) => (
          <div key={index} className="advertisement">
            <img src={ad.imageUrl} alt={ad.title} />
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;