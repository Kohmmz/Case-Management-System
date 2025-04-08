// client/src/components/resources/LegalResources.js
import React, { useState, useEffect } from 'react';
import { getCaseLaw } from '../../utils/api'; // Import API function

const LegalResources = () => {
  const [caseLaw, setCaseLaw] = useState([]);

  useEffect(() => {
    const fetchCaseLaw = async () => {
      try {
        const caseLawData = await getCaseLaw();  // Call the API to get case law
        setCaseLaw(caseLawData);  // Update state with the case law data
      } catch (error) {
        console.error('Error fetching case law:', error);
      }
    };

    fetchCaseLaw();
  }, []);  // Empty array means this effect runs only once when the component mounts

  return (
    <div>
      <h2>Legal Resources - Case Law</h2>
      <ul>
        {caseLaw.length === 0 ? (
          <p>No case law found.</p>
        ) : (
          caseLaw.map((law, index) => (
            <li key={index}>{law.title}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LegalResources;
