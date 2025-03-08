import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const LoyaltyProgramScreen = () => {
  const [loyaltyProgram, setLoyaltyProgram] = useState(null);

  useEffect(() => {
    const fetchLoyaltyProgram = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/loyalty-program');
        setLoyaltyProgram(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoyaltyProgram();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Loyalty Program</Text>
        {loyaltyProgram ? (
          <View>
            <Text>Points: {loyaltyProgram.points}</Text>
            <Text>Referrals: {loyaltyProgram.referrals}</Text>
            <Text>Premium Member: {loyaltyProgram.premiumMember ? 'Yes' : 'No'}</Text>
            <Text>Discounts</Text>
            {loyaltyProgram.discounts.map((discount, index) => (
              <View key={index}>
                <Text>Code: {discount.code}</Text>
                <Text>Discount: {discount.discount}%</Text>
                <Text>Expires: {new Date(discount.expires).toLocaleDateString()}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default LoyaltyProgramScreen;