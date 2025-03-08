import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SmartHome = () => {
  const [thermostatData, setThermostatData] = useState(null);
  const [cameraData, setCameraData] = useState(null);

  useEffect(() => {
    const fetchThermostatData = async () => {
      try {
        const res = await axios.get('/api/smart-home/nest/thermostat');
        setThermostatData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCameraData = async () => {
      try {
        const res = await axios.get('/api/smart-home/ring/camera');
        setCameraData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchThermostatData();
    fetchCameraData();
  }, []);

  return (
    <div>
      <h1>Smart Home Devices</h1>
      <div>
        <h2>Nest Thermostat</h2>
        {thermostatData ? (
          <pre>{JSON.stringify(thermostatData, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2>Ring Camera</h2>
        {cameraData ? (
          <pre>{JSON.stringify(cameraData, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SmartHome;