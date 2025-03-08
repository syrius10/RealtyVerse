import React from 'react';
import { WebView } from 'react-native-webview';

const ChatbotScreen = () => {
  return (
    <WebView
      source={{ uri: 'http://localhost:5005/webhooks/rest/webhook' }}
      style={{ flex: 1 }}
    />
  );
};

export default ChatbotScreen;