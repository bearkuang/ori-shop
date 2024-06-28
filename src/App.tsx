import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerSignIn from './components/customer/CustomerSignIn';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<CustomerSignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
