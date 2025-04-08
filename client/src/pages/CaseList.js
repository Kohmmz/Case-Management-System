// client/src/components/cases/CaseList.js
import React, { useState, useEffect } from 'react';
import { getCases } from '../../utils/api';
import { Link } from 'react-router-dom';

const CaseList = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const casesData = await getCases();
        setCases(casesData);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
      }
    };
    fetchCases();
  }, []);

  return (
    <div>
      <h1>Your Cases</h1>
      <ul>
        {cases.length === 0 ? (
          <p>No cases found.</p>
        ) : (
          cases.map((caseItem) => (
            <li key={caseItem.case_id}>
              <Link to={`/cases/${caseItem.case_id}`}>{caseItem.case_name}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CaseList;
