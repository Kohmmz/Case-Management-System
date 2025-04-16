import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import { AuthProvider } from './features/auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected routes with Navigation layout */}
        <Route element={<PrivateRoute><Navigation /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/clients/:id/edit" element={<ClientForm />} />
          <Route path="/cases" element={<CaseList />} />
          <Route path="/cases/new" element={<CaseForm />} />
          <Route path="/clients/:id/cases/:caseId/documents" element={<DocumentList />} />
          <Route path="/clients/:id/cases/:caseId/documents/upload" element={<DocumentUpload />} />
          <Route path="/advocates" element={<AdvocateList />} />
          <Route path="/advocates/new" element={<AdvocateForm />} />
          <Route path="/advocates/:id" element={<AdvocateForm />} />
          <Route path="/advocates/:id/edit" element={<AdvocateForm />} />
          <Route path="/advocates/:id/cases" element={<CaseList />} />
          <Route path="/documents" element={<DocumentList />} />
          <Route path="/resources/search" element={<LegalSearch />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;