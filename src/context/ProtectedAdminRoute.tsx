import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isStaff } = useAuth();

    if (!isAuthenticated || !isStaff) {
        return <Navigate to="/manager/login" />;
    }

    return <>{children}</>;
};

export default ProtectedAdminRoute;
