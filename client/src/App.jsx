import React, { useState } from 'react';
import AddAdvocate from './components/advocates/AddAdvocate';
import AdvocatesList from './components/advocates/AdvocatesList';
import AssignAdvocate from './components/advocates/AssignAdvocate';
import './index.css';

export default function App() {
  const [advocates, setAdvocates] = useState([
    { id: 1, name: 'John Doe', email: 'john@law.com', phone: '555-1234' }
  ]);
  
  const [cases, setCases] = useState([
    { id: 1, title: 'Divorce Case #2456', status: 'Pending' },
    { id: 2, title: 'Property Dispute #1892', status: 'Active' },
    { id: 3, title: 'Criminal Defense #3351', status: 'Closed' }
  ]);

  const [assignments, setAssignments] = useState([]);

  const addAdvocate = (newAdvocate) => {
    setAdvocates([...advocates, { ...newAdvocate, id: Date.now() }]);
  };

  const assignAdvocateToCase = (advocateId, caseId) => {
    // Remove any existing assignment for this case
    const newAssignments = assignments.filter(a => a.caseId !== caseId);
    
    // Add new assignment
    setAssignments([
      ...newAssignments,
      { advocateId, caseId }
    ]);
    
    alert(`Assigned advocate ${advocateId} to case ${caseId}`);
  };

  return (
    <div className="app-container">
      <h1>Advocate Management</h1>
      <AddAdvocate onAdd={addAdvocate} />
      <AssignAdvocate 
        advocates={advocates} 
        cases={cases}
        onAssign={assignAdvocateToCase} 
      />
      <AdvocatesList 
        advocates={advocates}
        cases={cases}
        assignments={assignments}
      />
    </div>
  );
}