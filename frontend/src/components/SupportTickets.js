import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('/api/support/tickets');
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/support/tickets', { subject, message });
      setSubject('');
      setMessage('');
      alert('Support ticket created successfully');
    } catch (err) {
      console.error(err);
      alert('Error creating support ticket');
    }
  };

  return (
    <div>
      <h2>Support Tickets</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h3>My Tickets</h3>
      {tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id}>
              <h4>{ticket.subject}</h4>
              <p>{ticket.message}</p>
              <p>Status: {ticket.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No support tickets available</p>
      )}
    </div>
  );
};

export default SupportTickets;