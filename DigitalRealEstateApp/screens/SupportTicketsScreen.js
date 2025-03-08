import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import axios from 'axios';

const SupportTicketsScreen = () => {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/support/tickets');
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/support/tickets', { subject, message });
      setSubject('');
      setMessage('');
      Alert.alert('Support ticket created successfully');
    } catch (err) {
      console.error(err);
      Alert.alert('Error creating support ticket');
    }
  };

  return (
    <View>
      <Text>Support Tickets</Text>
      <TextInput
        value={subject}
        onChangeText={setSubject}
        placeholder="Subject"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Message"
        multiline
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text>My Tickets</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18 }}>{item.subject}</Text>
            <Text>{item.message}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SupportTicketsScreen;