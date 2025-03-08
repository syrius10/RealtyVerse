import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import axios from 'axios';

const UserPreferencesScreen = () => {
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [preferredPropertyTypes, setPreferredPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/personalization/preferences');
        if (res.data) {
          setPreferredLocations(res.data.preferredLocations);
          setPreferredPropertyTypes(res.data.preferredPropertyTypes);
          setPriceRange(res.data.priceRange);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPreferences();
 