import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
      <Button title="Login with Facebook" onPress={() => window.location.href = 'http://localhost:5000/api/auth/facebook'} />
      <Button title="Login with Google" onPress={() => window.location.href = 'http://localhost:5000/api/auth/google'} />
    </View>
  );
};

export default LoginScreen;