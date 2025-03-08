import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatSupport = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const socket = io.connect('http://localhost:5000');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.disconnect();
  }, [socket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setChatMessages((prevMessages) => [...prevMessages, { message }]);
    setMessage('');

    try {
      const res = await axios.post('/api/support/chat', { message });
      setChatMessages((prevMessages) => [...prevMessages, { message: res.data.response }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Chat Support</h2>
      <div className="chat-container">
        {chatMessages.map((chat, index) => (
          <div key={index} className="chat-message">
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatSupport;