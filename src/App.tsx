import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerSignIn from './components/customer/CustomerSignIn';
import MainPage from './components/item/MainPage';
import CategorizedItemPage from './components/item/CategorizedItemPage';
import ItemDetailPage from './components/item/ItemDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category" element={<CategorizedItemPage />} />
        <Route path="/signin" element={<CustomerSignIn />} />
        <Route path="/item/:itemId/info" element={<ItemDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
