import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 1000000],
    propertyType: '',
    amenities: []
  });
  const [properties, setProperties] = useState([]);

  const handleFilterChange = (name, value) => setFilters({ ...filters, [name]: value });

  const fetchProperties = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/properties', { params: filters });
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  return (
    <View>
      <TextInput
        value={filters.location}
        onChangeText={(value) => handleFilterChange('location', value)}
        placeholder="Location"
      />
      <TextInput
        value={filters.priceRange[0].toString()}
        onChangeText={(value) => handleFilterChange('priceRange', [Number(value), filters.priceRange[1]])}
        placeholder="Min Price"
        keyboardType="numeric"
      />
      <TextInput
        value={filters.priceRange[1].toString()}
        onChangeText={(value) => handleFilterChange('priceRange', [filters.priceRange[0], Number(value)])}
        placeholder="Max Price"
        keyboardType="numeric"
      />
      <TextInput
        value={filters.propertyType}
        onChangeText={(value) => handleFilterChange('propertyType', value)}
        placeholder="Property Type"
      />
      <Button title="Search" onPress={fetchProperties} />
      <FlatList
        data={properties}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id })}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;