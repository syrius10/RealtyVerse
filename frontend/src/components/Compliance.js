import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Compliance = ({ region }) => {
  const [compliance, setCompliance] = useState(null);

  useEffect(() => {
    const fetchCompliance = async () => {
      try {
        const res = await axios.get(`/api/compliance/${region}`);
        setCompliance(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompliance();
  }, [region]);

  return (
    <div>
      {compliance ? (
        <div>
          <h2>Regulations</h2>
          <p>{compliance.regulations}</p>
          <h2>Laws</h2>
          <p>{compliance.laws}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Compliance;