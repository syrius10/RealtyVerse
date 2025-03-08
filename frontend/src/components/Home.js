import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../store/actions/propertyActions';

const Home = () => {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <div>
      <h1>Properties</h1>
      <div className="properties">
        {properties.map(property => (
          <div key={property._id} className="property">
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>{property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;