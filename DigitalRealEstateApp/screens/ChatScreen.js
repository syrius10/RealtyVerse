import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const ChatScreen = ({ route }) => {
  const { agentId } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${agentId}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [agentId]);

  const handleSendMessage = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { receiver: agentId, message });
      setMessages([res.data, ...messages]);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.message}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
      <TextInput value={message} onChangeText={setMessage} placeholder="Type a message" />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatScreen;