import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get('/api/support/faqs');
        setFaqs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      {faqs.length > 0 ? (
        <ul>
          {faqs.map((faq) => (
            <li key={faq._id}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No FAQs available</p>
      )}
    </div>
  );
};

export default FAQs;