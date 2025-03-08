import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../store/actions/propertyActions';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Search = () => {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties);

  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 1000000],
    propertyType: '',
    amenities: []
  });

  useEffect(() => {
    dispatch(fetchProperties(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [name]: Number(value)
      }
    });
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFilters({
      ...filters,
      amenities: checked
        ? [...filters.amenities, value]
        : filters.amenities.filter(amenity => amenity !== value)
    });
  };

  return (
    <div>
      <h1>Search Properties</h1>
      <form>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Location"
        />
        <input
          type="number"
          name="minPrice"
          value={filters.priceRange[0]}
          onChange={handlePriceRangeChange}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.priceRange[1]}
          onChange={handlePriceRangeChange}
          placeholder="Max Price"
        />
        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleFilterChange}
        >
          <option value="">Property Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>
        <div>
          <label>
            <input
              type="checkbox"
              value="pool"
              checked={filters.amenities.includes('pool')}
              onChange={handleAmenitiesChange}
            />
            Pool
          </label>
          <label>
            <input
              type="checkbox"
              value="garage"
              checked={filters.amenities.includes('garage')}
              onChange={handleAmenitiesChange}
            />
            Garage
          </label>
          <label>
            <input
              type="checkbox"
              value="garden"
              checked={filters.amenities.includes('garden')}
              onChange={handleAmenitiesChange}
            />
            Garden
          </label>
        </div>
      </form>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map(property => (
          <Marker key={property._id} position={[property.location.lat, property.location.lng]}>
            <Popup>
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p>Price: ${property.price}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Search;