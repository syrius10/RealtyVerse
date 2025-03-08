import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Discussions = ({ match }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await axios.get(`/api/forum/forums/${match.params.forumId}/discussions`);
        setDiscussions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDiscussions();
  }, [match.params.forumId]);

  return (
    <div>
      <h2>Discussions</h2>
      {discussions.length > 0 ? (
        <ul>
          {discussions.map((discussion) => (
            <li key={discussion._id}>
              <Link to={`/forum/${match.params.forumId}/discussion/${discussion._id}`}>{discussion.title}</Link>
              <p>{discussion.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No discussions available</p>
      )}
    </div>
  );
};

export default Discussions;