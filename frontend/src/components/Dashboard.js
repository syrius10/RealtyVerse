import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    properties: [],
    totalReviews: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/dashboard');
        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Your Properties</h2>
        <ul>
          {dashboardData.properties.map(property => (
            <li key={property._id}>
              <p>{property.title}</p>
              <p>{property.description}</p>
              <p>Price: ${property.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Analytics</h2>
        <p>Total Reviews: {dashboardData.totalReviews}</p>
        <p>Average Rating: {dashboardData.averageRating.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Dashboard;