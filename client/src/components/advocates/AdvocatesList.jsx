import React from 'react';

export default function AdvocatesList({ advocates, cases, assignments }) {
  const getAssignedCases = (advocateId) => {
    return assignments
      .filter(a => a.advocateId == advocateId)
      .map(a => cases.find(c => c.id == a.caseId));
  };

  return (
    <div className="advocate-list">
      <h2>Advocates and Their Cases</h2>
      {advocates.map(advocate => {
        const assignedCases = getAssignedCases(advocate.id);
        
        return (
          <div key={advocate.id} className="advocate-card">
            <h3>{advocate.name}</h3>
            <p>Email: {advocate.email}</p>
            <p>Phone: {advocate.phone}</p>
            
            <div className="cases-section">
              <h4>Assigned Cases:</h4>
              {assignedCases.length > 0 ? (
                <ul>
                  {assignedCases.map(caseItem => (
                    <li key={caseItem.id}>
                      {caseItem.title} - {caseItem.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No cases assigned</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}