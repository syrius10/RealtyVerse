import React from 'react';
import { Widget } from '@rasa-webchat/rasa-webchat';

const Chatbot = () => {
  return (
    <Widget
      initPayload="/get_started"
      socketUrl="http://localhost:5005"
      socketPath="/socket.io/"
      customData={{ language: "en" }}
      title="Real Estate Assistant"
    />
  );
};

export default Chatbot;