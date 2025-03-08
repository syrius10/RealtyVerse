import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Localization = ({ language }) => {
  const [localization, setLocalization] = useState(null);

  useEffect(() => {
    const fetchLocalization = async () => {
      try {
        const res = await axios.get(`/api/localization/${language}`);
        setLocalization(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocalization();
  }, [language]);

  return (
    <div>
      {localization ? (
        <div>
          {Object.keys(localization.content).map((key) => (
            <p key={key}>{localization.content[key]}</p>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Localization;