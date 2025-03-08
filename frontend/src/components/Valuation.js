import React, { useState } from 'react';
import axios from 'axios';

const Valuation = () => {
  const [formData, setFormData] = useState({
    feature1: '',
    feature2: '',
    feature3: ''
  });
  const [valuation, setValuation] = useState(null);

  const { feature1, feature2, feature3 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/valuation', formData);
      setValuation(res.data.predicted_price);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Property Valuation</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="feature1"
          value={feature1}
          onChange={onChange}
          placeholder="Feature 1"
          required
        />
        <input
          type="text"
          name="feature2"
          value={feature2}
          onChange={onChange}
          placeholder="Feature 2"
          required
        />
        <input
          type="text"
          name="feature3"
          value={feature3}
          onChange={onChange}
          placeholder="Feature 3"
          required
        />
        <button type="submit">Get Valuation</button>
      </form>
      {valuation && <div>Estimated Price: ${valuation.toFixed(2)}</div>}
    </div>
  );
};

export default Valuation;