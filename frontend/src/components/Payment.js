import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { data: { clientSecret } } = await axios.post('/api/payments/create-payment-intent', { amount: parseInt(amount) * 100 });

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      console.error(confirmError);
      return;
    }

    setPaymentStatus(paymentIntent.status === 'succeeded' ? 'Payment successful!' : 'Payment failed.');
  };

  return (
    <div>
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {paymentStatus && <div>{paymentStatus}</div>}
    </div>
  );
};

export default Payment;