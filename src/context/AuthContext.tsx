import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    isCompany: boolean;
    isStaff: boolean;
    login: (token: string, userType: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isCompany, setIsCompany] = useState<boolean>(false);
    const [isStaff, setIsStaff] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        if (token) {
            setIsAuthenticated(true);
            setIsCompany(userType === 'company');
            setIsStaff(userType === 'staff');
        }
    }, []);

    const login = (token: string, userType: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        setIsAuthenticated(true);
        setIsCompany(userType === 'company');
        setIsStaff(userType === 'staff');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setIsAuthenticated(false);
        setIsCompany(false);
        setIsStaff(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isCompany, isStaff, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};