import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CaseList from './components/cases/CaseList';
import CaseDetail from './components/cases/CaseDetail';
import DocumentUpload from './components/documents/DocumentUpload';
import LegalResources from './components/resources/LegalResources';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/cases" exact component={CaseList} />
        <Route path="/cases/:id" component={CaseDetail} />
        <Route path="/upload-document" component={DocumentUpload} />
        <Route path="/legal-resources" component={LegalResources} />
      </Switch>
    </Router>
  );
};

export default App;
