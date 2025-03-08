import React, { useState } from 'react';
import axios from 'axios';

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [serviceFee, setServiceFee] = useState(0);
  const [clientSecret, setClientSecret] = useState('');

  const handleCreateTransaction = async () => {
    try {
      const res = await axios.post('/api/transaction/create', { amount, description, serviceFee });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Transaction</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={serviceFee}
        onChange={(e) => setServiceFee(e.target.value)}
        placeholder="Service Fee"
      />
      <button onClick={handleCreateTransaction}>Create Transaction</button>
      {clientSecret && <p>Payment Intent Client Secret: {clientSecret}</p>}
    </div>
  );
};

export default Transaction;