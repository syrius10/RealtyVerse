import React from 'react';
import { View, Button, Share } from 'react-native';

const SocialShareScreen = ({ route }) => {
  const { url } = route.params;

  const shareOnFacebook = async () => {
    try {
      await Share.share({
        message: `Check out this property: ${url}`,
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const shareOnTwitter = async () => {
    try {
      await Share.share({
        message: `Check out this property: ${url}`,
        url: `https://twitter.com/share?url=${encodeURIComponent(url)}`
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const shareOnLinkedIn = async () => {
    try {
      await Share.share({
        message: `Check out this property: ${url}`,
        url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <Button title="Share on Facebook" onPress={shareOnFacebook} />
      <Button title="Share on Twitter" onPress={shareOnTwitter} />
      <Button title="Share on LinkedIn" onPress={shareOnLinkedIn} />
    </View>
  );
};

export default SocialShareScreen;