import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import CustomerSignUp from './components/customer/CustomerSignUp';
import MainPage from './components/item/MainPage';
import CategorizedItemPage from './components/item/CategorizedItemPage';
import ItemDetailPage from './components/item/ItemDetailPage';
import CustomerSignIn from './components/customer/CustomerSignIn';
import MyPage from './components/customer/MyPage';
import CompanyPage from './components/company/CompanyPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="main-container flex flex-col items-start bg-white relative mx-auto my-0">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/category" element={<CategorizedItemPage />} />
            <Route path="/signup" element={<CustomerSignUp />} />
            <Route path="/signin" element={<CustomerSignIn />} />
            <Route path="/item/:itemId/info" element={<ItemDetailPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/companypage" element={<CompanyPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
