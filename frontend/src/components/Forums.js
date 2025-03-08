import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Forums = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await axios.get('/api/forum/forums');
        setForums(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchForums();
  }, []);

  return (
    <div>
      <h2>Forums</h2>
      {forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum._id}>
              <Link to={`/forum/${forum._id}`}>{forum.title}</Link>
              <p>{forum.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No forums available</p>
      )}
    </div>
  );
};

export default Forums;