import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoyaltyProgram = () => {
  const [loyaltyProgram, setLoyaltyProgram] = useState(null);

  useEffect(() => {
    const fetchLoyaltyProgram = async () => {
      try {
        const res = await axios.get('/api/loyalty-program');
        setLoyaltyProgram(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoyaltyProgram();
  }, []);

  return (
    <div>
      <h2>Loyalty Program</h2>
      {loyaltyProgram ? (
        <div>
          <p>Points: {loyaltyProgram.points}</p>
          <p>Referrals: {loyaltyProgram.referrals}</p>
          <p>Premium Member: {loyaltyProgram.premiumMember ? 'Yes' : 'No'}</p>
          <h3>Discounts</h3>
          <ul>
            {loyaltyProgram.discounts.map((discount, index) => (
              <li key={index}>
                <p>Code: {discount.code}</p>
                <p>Discount: {discount.discount}%</p>
                <p>Expires: {new Date(discount.expires).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LoyaltyProgram;