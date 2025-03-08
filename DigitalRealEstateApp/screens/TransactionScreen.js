import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const TransactionScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [serviceFee, setServiceFee] = useState(0);
  const [clientSecret, setClientSecret] = useState('');

  const handleCreateTransaction = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/transaction/create', { amount, description, serviceFee });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <Text>Create Transaction</Text>
      <TextInput
        value={amount}
        onChangeText={(value) => setAmount(value)}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TextInput
        value={description}
        onChangeText={(value) => setDescription(value)}
        placeholder="Description"
      />
      <TextInput
        value={serviceFee}
        onChangeText={(value) => setServiceFee(value)}
        placeholder="Service Fee"
        keyboardType="numeric"
      />
      <Button title="Create Transaction" onPress={handleCreateTransaction} />
      {clientSecret && <Text>Payment Intent Client Secret: {clientSecret}</Text>}
    </View>
  );
};

export default TransactionScreen;