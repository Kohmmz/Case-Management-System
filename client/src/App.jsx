import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './features/dashboard/Dashboard';
import ClientList from './features/clients/ClientList';
import ClientForm from './features/clients/ClientForm';
import ClientDetail from './features/clients/ClientDetail';
import CaseList from './features/cases/CaseList';
import CaseForm from './features/cases/CaseForm'; 
import DocumentList from './features/documents/DocumentList';
import DocumentUpload from './features/documents/DocumentUpload';
import LegalSearch from './features/resources/LegalSearch';
import AdvocateList from './features/advocates/AdvocateList';
import AdvocateForm from './features/advocates/AdvocateForm';

import PrivateRoute from "./PrivateRoutes";
import Navigation from './components/Navigation';

const App = () => {
  return (
    <div className="flex">
      <Navigation />
      <div className="w-full p-4">
        <Routes> 
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/clients"
            element={<PrivateRoute><ClientList /></PrivateRoute>}
          />
          <Route 
            path="/clients/:id" 
            element={<PrivateRoute><ClientDetail /></PrivateRoute>}
          />
          <Route 
            path="/clients/:id/edit" 
            element={<PrivateRoute><ClientForm /></PrivateRoute>}
          />
          <Route 
            path="/clients/new" 
            element={<PrivateRoute><ClientForm /></PrivateRoute>}
          />
          <Route 
            path="/cases" 
            element={<PrivateRoute><CaseList /></PrivateRoute>}
          />
          <Route 
            path="/cases/new" 
            element={<PrivateRoute><CaseForm /></PrivateRoute>}
          />
          <Route 
            path="/clients/:id/cases/:caseId/documents" 
            element={<PrivateRoute><DocumentList /></PrivateRoute>}
          />
          <Route 
            path="/clients/:id/cases/:caseId/documents/upload" 
            element={<PrivateRoute><DocumentUpload /></PrivateRoute>}
          />
          <Route 
            path="/advocates/new" 
            element={<PrivateRoute><AdvocateForm /></PrivateRoute>}
          />
          <Route 
            path="/advocates/:id/edit" 
            element={<PrivateRoute><AdvocateForm /></PrivateRoute>}
          />
          <Route 
            path="/advocates/:id" 
            element={<PrivateRoute><AdvocateForm /></PrivateRoute>}
          />
          <Route 
            path="/advocates" 
            element={<PrivateRoute><AdvocateList /></PrivateRoute>}
          />
          <Route 
            path="/advocates/:id/cases" 
            element={<PrivateRoute><CaseList /></PrivateRoute>}
          />
          <Route
            path="/documents"
            element={<PrivateRoute><DocumentList /></PrivateRoute>}
          />
          <Route
            path="/resources/search"
            element={<PrivateRoute><LegalSearch /></PrivateRoute>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

// new routes 

// {/* <Routes>
//   {/* Auth */}
//   <Route path="/" element={<Login />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/register" element={<Register />} /> {/* No Flask route yet */}

//   {/* Dashboard (frontend view only) */}
//   <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

//   {/* Clients */}
//   <Route path="/clients" element={<PrivateRoute><ClientList /></PrivateRoute>} /> {/* GET /clients/clients */}
//   <Route path="/clients/new" element={<PrivateRoute><ClientForm /></PrivateRoute>} /> {/* POST /clients/clients */}
//   <Route path="/clients/:id" element={<PrivateRoute><ClientDetail /></PrivateRoute>} /> {/* GET /clients/clients/:id */}
//   <Route path="/clients/:id/edit" element={<PrivateRoute><ClientForm /></PrivateRoute>} /> {/* PUT /clients/clients/:id */}
  
//   {/* Cases by Client */}
//   <Route path="/clients/:id/cases" element={<PrivateRoute><CaseList /></PrivateRoute>} /> {/* GET /api/cases?client_id= */}
//   <Route path="/clients/:id/cases/new" element={<PrivateRoute><CaseForm /></PrivateRoute>} /> {/* POST /api/cases */}

//   {/* Documents by Case */}
//   <Route path="/clients/:id/cases/:caseId/documents" element={<PrivateRoute><DocumentList /></PrivateRoute>} /> {/* GET /docs/api/cases/:case_id/documents */}
//   <Route path="/clients/:id/cases/:caseId/documents/upload" element={<PrivateRoute><DocumentUpload /></PrivateRoute>} /> {/* POST /docs/api/cases/:case_id/documents */}

//   {/* Global Case Views */}
//   <Route path="/cases" element={<PrivateRoute><CaseList /></PrivateRoute>} /> {/* GET /api/cases */}
//   <Route path="/cases/new" element={<PrivateRoute><CaseForm /></PrivateRoute>} /> {/* POST /api/cases */}

//   {/* Documents Global View */}
//   <Route path="/documents" element={<PrivateRoute><DocumentList /></PrivateRoute>} /> {/* You might want a GET /docs/api/documents for this */}

//   {/* Advocates */}
//   <Route path="/advocates" element={<PrivateRoute><AdvocateList /></PrivateRoute>} /> {/* GET /adv/advocates */}
//   <Route path="/advocates/new" element={<PrivateRoute><AdvocateForm /></PrivateRoute>} /> {/* POST /adv/advocates */}
//   <Route path="/advocates/:id/edit" element={<PrivateRoute><AdvocateForm /></PrivateRoute>} /> {/* Currently no PUT route shown */}
//   <Route path="/advocates/:id" element={<PrivateRoute><AdvocateForm /></PrivateRoute>} /> {/* Could use GET /adv/advocates/:id if added */}
//   <Route path="/advocates/:id/cases" element={<PrivateRoute><CaseList /></PrivateRoute>} /> {/* Could use GET /api/cases?advocate_id= */}

//   {/* Legal Resources */}
//   <Route path="/resources/search" element={<PrivateRoute><LegalSearch /></PrivateRoute>} /> {/* GET /resources/resources */}
// </Routes> */}