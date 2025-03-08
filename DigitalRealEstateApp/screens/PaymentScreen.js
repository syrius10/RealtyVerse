import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const stripe = useStripe();
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payments/create-payment-intent', { amount: parseInt(amount) * 100 });
      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmPayment({
        paymentIntentClientSecret: clientSecret,
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            name: 'Customer Name',
          },
        },
      });

      if (error) {
        console.error(error);
        setPaymentStatus('Payment failed.');
      } else if (paymentIntent) {
        setPaymentStatus('Payment successful!');
      }
    } catch (err) {
      console.error(err);
      setPaymentStatus('Payment failed.');
    }
  };

  return (
    <View>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <Button title="Pay" onPress={handlePayment} />
      {paymentStatus && <Text>{paymentStatus}</Text>}
    </View>
  );
};

export default PaymentScreen;