import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const LocalizationScreen = ({ route }) => {
  const { language } = route.params;
  const [localization, setLocalization] = useState(null);

  useEffect(() => {
    const fetchLocalization = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/localization/${language}`);
        setLocalization(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocalization();
  }, [language]);

  return (
    <ScrollView>
      <View>
        {localization ? (
          <View>
            {Object.keys(localization.content).map((key) => (
              <Text key={key}>{localization.content[key]}</Text>
            ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default LocalizationScreen;