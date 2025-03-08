import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { View, Text } from 'react-native';

const NotificationsScreen = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Notifications Screen</Text>
    </View>
  );
};

export default NotificationsScreen;