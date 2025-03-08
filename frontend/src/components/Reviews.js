import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = ({ propertyId, agentId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${propertyId ? `property/${propertyId}` : `agent/${agentId}`}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [propertyId, agentId]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review._id}>
          <p>{review.user.name}</p>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
          {review.verified && <span>Verified Purchase</span>}
        </div>
      ))}
    </div>
  );
};

export default Reviews;