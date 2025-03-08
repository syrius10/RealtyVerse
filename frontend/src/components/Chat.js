import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Chat = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chat/${receiverId}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [receiverId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/chat', { receiver: receiverId, message });
      setMessages([res.data, ...messages]);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Chat with {receiverId}</h2>
      <div>
        {messages.map(msg => (
          <div key={msg._id} className={msg.sender === user._id ? 'my-message' : 'their-message'}>
            <p>{msg.message}</p>
            <small>{new Date(msg.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;