import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const ComplianceScreen = ({ route }) => {
  const { region } = route.params;
  const [compliance, setCompliance] = useState(null);

  useEffect(() => {
    const fetchCompliance = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/compliance/${region}`);
        setCompliance(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompliance();
  }, [region]);

  return (
    <ScrollView>
      <View>
        {compliance ? (
          <View>
            <Text>Regulations</Text>
            <Text>{compliance.regulations}</Text>
            <Text>Laws</Text>
            <Text>{compliance.laws}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ComplianceScreen;