import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const SmartHomeScreen = () => {
  const [thermostatData, setThermostatData] = useState(null);
  const [cameraData, setCameraData] = useState(null);

  useEffect(() => {
    const fetchThermostatData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/smart-home/nest/thermostat');
        setThermostatData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCameraData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/smart-home/ring/camera');
        setCameraData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchThermostatData();
    fetchCameraData();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Smart Home Devices</Text>
        <View>
          <Text>Nest Thermostat</Text>
          {thermostatData ? (
            <Text>{JSON.stringify(thermostatData, null, 2)}</Text>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <View>
          <Text>Ring Camera</Text>
          {cameraData ? (
            <Text>{JSON.stringify(cameraData, null, 2)}</Text>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SmartHomeScreen;