import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/feedback', { feedback });
      setFeedback('');
      alert('Feedback submitted successfully');
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;