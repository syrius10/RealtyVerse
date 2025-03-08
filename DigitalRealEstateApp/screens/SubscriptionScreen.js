import React from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';

const SubscriptionScreen = () => {
  const handleSubscription = async (type, plan) => {
    try {
      const res = await axios.post('http://localhost:5000/api/subscription/create', { type, plan });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <Text>Subscription Plans</Text>
      <View>
        <Text>Buyer</Text>
        <Button title="Basic" onPress={() => handleSubscription('buyer', 'basic')} />
        <Button title="Premium" onPress={() => handleSubscription('buyer', 'premium')} />
      </View>
      <View>
        <Text>Seller</Text>
        <Button title="Basic" onPress={() => handleSubscription('seller', 'basic')} />
        <Button title="Premium" onPress={() => handleSubscription('seller', 'premium')} />
      </View>
      <View>
        <Text>Agent</Text>
        <Button title="Basic" onPress={() => handleSubscription('agent', 'basic')} />
        <Button title="Premium" onPress={() => handleSubscription('agent', 'premium')} />
      </View>
    </View>
  );
};

export default SubscriptionScreen;