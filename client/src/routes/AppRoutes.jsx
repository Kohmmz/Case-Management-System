import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Dashboard from "../features/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Navigation from "../components/Navigation";
import ClientList from "../features/clients/ClientList";
import ClientForm from "../features/clients/ClientForm";
import ClientDetail from "../features/clients/ClientDetail";
import CaseList from "../features/cases/CaseList";
import CaseForm from "../features/cases/CaseForm";
import DocumentList from "../features/documents/DocumentList";
import DocumentUpload from "../features/documents/DocumentUpload";
import AdvocateList from "../features/advocates/AdvocateList";
import AdvocateForm from "../features/advocates/AdvocateForm";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
      <Route element={<Navigation />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/new" element={<ClientForm />} />
        <Route path="/clients/:id" element={<ClientDetail />} />
        <Route path="/clients/:id/edit" element={<ClientForm />} />
        <Route path="/cases" element={<CaseList />} />
        <Route path="/cases/new" element={<CaseForm />} />
        <Route path="/cases/:id/edit" element={<CaseForm />} />
        <Route path="/cases/:caseId/documents" element={<DocumentList />} />
        <Route path="/cases/:caseId/documents/upload" element={<DocumentUpload />} />
        <Route path="/advocates" element={<AdvocateList />} />
        <Route path="/advocates/new" element={<AdvocateForm />} />
        <Route path="/advocates/:id/edit" element={<AdvocateForm />} />
      </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
