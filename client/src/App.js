// client/src/App.js
import React, { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const CaseListPage = lazy(() => import('./pages/CaseListPage'));
const CaseDetailPage = lazy(() => import('./pages/CaseDetailPage'));
const LegalResources = lazy(() => import('./pages/LegalResources'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route path="/cases" exact component={CaseListPage} />
              <Route path="/cases/:caseId" component={CaseDetailPage} />
              <Route path="/resources" component={LegalResources} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
};

export default App;
