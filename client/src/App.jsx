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

import PrivateRoute from "./routes/PrivateRoutes";
import Navigation from './components/Navigation';

const App = () => {
  return (
    <div className="flex">
      <Navigation />
      <div className="w-full p-4">
        <Routes> 
          {/* wrap any paths that need authentication with PrivateRoute e.g 
          <Route path="/" element={<PrivateRoute><Login /></PrivateRoute} 
          remove the PrivateRoute in order to access all routes without having logged in.
          ALL ROUTES ACTUALLY NEED THE PRIVATEROUTE*/}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/clients"
            element={<ClientList />}
          />
          <Route 
            path="/clients/:id" 
            element={<ClientDetail />}
          />
          <Route 
            path="/clients/:id/edit" 
            element={<ClientForm />}
          />
          <Route 
            path="/clients/new" 
            element={<ClientForm />}
          />
          <Route 
            path="/clients/:id/cases" 
            element={<CaseList />}
          />
          <Route 
            path="/clients/:id/cases/new" 
            element={<CaseForm />}
          />
          <Route 
            path="/clients/:id/cases/:caseId/documents" 
            element={<DocumentList />}
          />
          <Route 
            path="/clients/:id/cases/:caseId/documents/upload" 
            element={<DocumentUpload />}
          />
          <Route 
            path="/advocates/new" 
            element={<AdvocateForm />}
          />
          <Route 
            path="/advocates/:id/edit" 
            element={<AdvocateForm />}
          />
          <Route 
            path="/advocates/:id" 
            element={<AdvocateForm />}
          />
          <Route 
            path="/advocates" 
            element={<AdvocateList />}
          />
          <Route 
            path="/advocates/:id/cases" 
            element={<CaseList />}
          />
          <Route
            path="/cases"
            element={<CaseList />}
          />
          <Route path="/cases/new" element={<CaseForm />} />
          <Route
            path="/documents"
            element={<DocumentList />}
          />

          <Route
            path="/resources/search"
            element={<LegalSearch />}
          />
          <Route
            path="/advocates"
            element={<AdvocateList />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
