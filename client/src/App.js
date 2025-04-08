// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CaseListPage from './pages/CaseListPage';
import CaseDetailPage from './pages/CaseDetailPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/cases" exact component={CaseListPage} />
        <Route path="/cases/:caseId" component={CaseDetailPage} />
      </Switch>
    </Router>
  );
};

export default App;