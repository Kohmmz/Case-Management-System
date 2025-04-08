// client/src/App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';  // Import the AuthProvider
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CaseListPage from './pages/CaseListPage';
import CaseDetailPage from './pages/CaseDetailPage';
// import Login from './pages/Login'; // Removed unused import
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/cases" exact component={CaseListPage} />
          <Route path="/cases/:caseId" component={CaseDetailPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;