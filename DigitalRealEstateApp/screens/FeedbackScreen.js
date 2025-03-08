import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/feedback', { feedback });
      setFeedback('');
      Alert.alert('Feedback submitted successfully');
    } catch (err) {
      console.error(err);
      Alert.alert('Error submitting feedback');
    }
  };

  return (
    <View>
      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Enter your feedback"
        multiline
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default FeedbackScreen;