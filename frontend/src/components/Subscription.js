import React from 'react';
import axios from 'axios';

const Subscription = () => {
  const handleSubscription = async (type, plan) => {
    try {
      const res = await axios.post('/api/subscription/create', { type, plan });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Subscription Plans</h2>
      <div>
        <h3>Buyer</h3>
        <button onClick={() => handleSubscription('buyer', 'basic')}>Basic</button>
        <button onClick={() => handleSubscription('buyer', 'premium')}>Premium</button>
      </div>
      <div>
        <h3>Seller</h3>
        <button onClick={() => handleSubscription('seller', 'basic')}>Basic</button>
        <button onClick={() => handleSubscription('seller', 'premium')}>Premium</button>
      </div>
      <div>
        <h3>Agent</h3>
        <button onClick={() => handleSubscription('agent', 'basic')}>Basic</button>
        <button onClick={() => handleSubscription('agent', 'premium')}>Premium</button>
      </div>
    </div>
  );
};

export default Subscription;