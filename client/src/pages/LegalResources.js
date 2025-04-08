import React, { useState } from 'react';
import { searchLegalResources } from '../../utils/api'; // API function for legal resource search

const LegalResources = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await searchLegalResources(query);
      setResults(res);
    } catch (err) {
      alert('Error fetching legal resources');
    }
  };

  return (
    <div>
      <h2>Legal Resources</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search case law or statutes"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li> // Display results based on your API structure
        ))}
      </ul>
    </div>
  );
};

export default LegalResources;
