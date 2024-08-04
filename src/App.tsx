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
import ProtectedAdminRoute from './context/ProtectedAdminRoute';
import ManagerMain from './components/manager/ManagerMain';
import ManaerSignIn from './components/manager/ManagerSingIn';
import CompanySignUp from './components/company/CompanySignUp';
import SearchedItemPage from './components/item/SearchedItemPage';
import ShoppingCart from './components/customer/ShoppingCart';

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
            <Route path="/company-signup" element={<CompanySignUp />} />
            <Route path="/item/:itemId/info" element={<ItemDetailPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/companypage" element={<CompanyPage />} />
            <Route path="/search" element={<SearchedItemPage />} />
            <Route path="/manager/login" element={<ManaerSignIn />} />
            <Route path="/manager/*" element={
              <ProtectedAdminRoute>
                <Routes>
                  <Route path="dashboard" element={<ManagerMain />} />
                </Routes>
              </ProtectedAdminRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
