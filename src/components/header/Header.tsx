import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchModal from '../item/SearchModal';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isCompany } = useAuth();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const handleGoToMain = () => {
        navigate("/");
    }

    const handleGoToSingIn = () => {
        navigate("/signin");
    }

    const handleMypage = () => {
        if (isCompany) {
            navigate("/companypage");
        } else {
            navigate("/mypage");
        }
    }

    const toggleSearchModal = () => {
        setIsSearchModalOpen(!isSearchModalOpen);
    }

    return (
        <div className="flex flex-col items-start self-stretch shrink-0 border-solid border-b border-b-[#e8d1ce] flex-nowrap relative z-[10]">
            <div className='flex py-3 px-10 justify-between items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-gray-300 relative'>
                <div className='flex gap-4 items-center shrink-0 flex-nowrap relative'>
                    <div className='flex w-10 flex-col items-start shrink-0 flex-nowrap relative'>
                        <div className='w-10 h-10 bg-cover bg-no-repeat relative overflow-hidden' />
                    </div>
                    <div className='flex w-40 flex-col items-start shrink-0 flex-nowrap relative cursor-pointer' onClick={handleGoToMain}>
                        <span className="text-lg font-bold text-gray-900">
                            D'ori
                        </span>
                    </div>
                </div>
                <div className='flex gap-2 justify-end items-start grow shrink-0 flex-nowrap relative'>
                    <div className='flex w-10 flex-col items-start shrink-0 flex-nowrap relative'>
                        <button onClick={toggleSearchModal} className='w-10 h-10 flex items-center justify-center'>
                            <img src="/images/icon-search.png" alt="Search" className="w-8 h-8" />
                        </button>
                    </div>
                    <div className='flex gap-3 items-start shrink-0 flex-nowrap relative'>
                        <div className='flex flex-col items-center grow shrink-0 flex-nowrap relative'>
                            <img src="/images/smart-cart.png" alt="Cart" className="w-10 h-10 rounded-full" />
                        </div>
                        {isAuthenticated ? (
                            <div className='flex flex-col items-center grow shrink-0 flex-nowrap relative cursor-pointer' onClick={handleMypage}>
                                <img
                                    src={isCompany ? "/images/icon-office.png" : "/images/user-icon.png"}
                                    alt={isCompany ? "Company Page" : "Profile Edit"}
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>
                        ) : (
                            <button onClick={handleGoToSingIn} className="login-button flex pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#f46047] rounded-[12px] relative overflow-hidden font-['Epilogue'] text-[16px] font-bold leading-[24px] text-[#fff] text-center">Login</button>
                        )}
                    </div>
                </div>
            </div>
            {isSearchModalOpen && <SearchModal onClose={toggleSearchModal} />}
        </div>
    );
}

export default Header;