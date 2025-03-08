import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ propertyId, agentId }) => {
  const [formData, setFormData] = useState({
    rating: 1,
    comment: ''
  });
  const [message, setMessage] = useState('');

  const { rating, comment } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reviews', { property: propertyId, agent: agentId, rating, comment });
      setMessage('Review submitted successfully');
    } catch (err) {
      console.error(err);
      setMessage('Error submitting review');
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={onSubmit}>
        <select name="rating" value={rating} onChange={onChange} required>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
        <textarea
          name="comment"
          value={comment}
          onChange={onChange}
          placeholder="Write your review"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReviewForm;