import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const ValuationScreen = () => {
  const [formData, setFormData] = useState({
    feature1: '',
    feature2: '',
    feature3: ''
  });
  const [valuation, setValuation] = useState(null);

  const { feature1, feature2, feature3 } = formData;

  const onChange = (name, value) => setFormData({ ...formData, [name]: value });

  const onSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/valuation', formData);
      setValuation(res.data.predicted_price);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <TextInput
        value={feature1}
        onChangeText={(value) => onChange('feature1', value)}
        placeholder="Feature 1"
      />
      <TextInput
        value={feature2}
        onChangeText={(value) => onChange('feature2', value)}
        placeholder="Feature 2"
      />
      <TextInput
        value={feature3}
        onChangeText={(value) => onChange('feature3', value)}
        placeholder="Feature 3"
      />
      <Button title="Get Valuation" onPress={onSubmit} />
      {valuation && <Text>Estimated Price: ${valuation.toFixed(2)}</Text>}
    </View>
  );
};

export default ValuationScreen;