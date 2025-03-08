import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('/api/personalization/recommendations');
        setRecommendations(res.data.properties);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Properties</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((property) => (
            <li key={property._id}>
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p>Price: ${property.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
};

export default Recommendations;