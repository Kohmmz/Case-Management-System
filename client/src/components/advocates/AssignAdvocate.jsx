import React, { useState } from 'react';

export default function AssignAdvocate({ advocates, cases, onAssign }) {
  const [selectedAdvocate, setSelectedAdvocate] = useState('');
  const [selectedCase, setSelectedCase] = useState('');

  const handleAssign = () => {
    if (selectedAdvocate && selectedCase) {
      onAssign(selectedAdvocate, selectedCase);
      setSelectedAdvocate('');
      setSelectedCase('');
    }
  };

  return (
    <div className="assign-container">
      <h2>Assign Advocate to Case</h2>
      
      <div className="form-group">
        <label>Select Advocate:</label>
        <select
          value={selectedAdvocate}
          onChange={(e) => setSelectedAdvocate(e.target.value)}
        >
          <option value="">-- Select Advocate --</option>
          {advocates.map(advocate => (
            <option key={advocate.id} value={advocate.id}>
              {advocate.name} ({advocate.email})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Case:</label>
        <select
          value={selectedCase}
          onChange={(e) => setSelectedCase(e.target.value)}
        >
          <option value="">-- Select Case --</option>
          {cases.map(caseItem => (
            <option key={caseItem.id} value={caseItem.id}>
              {caseItem.title} ({caseItem.status})
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={handleAssign}
        disabled={!selectedAdvocate || !selectedCase}
      >
        Assign Advocate to Case
      </button>
    </div>
  );
}