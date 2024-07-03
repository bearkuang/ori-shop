import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomerSignIn: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isCustomer, setIsCustomer] = useState(true);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = isCustomer
                ? 'http://localhost:8000/api/auth/login/'
                : 'http://localhost:8000/api/auth/company-login/';
    
            const response = await axios.post(endpoint, formData);
            console.log('Login successful', response.data);
            
            // 로그인 상태 업데이트
            // userType을 isCustomer 상태에 따라 결정
            const userType = isCustomer ? 'customer' : 'company';
            login(response.data.access, userType);
            
            // 로그인 성공 후 메인 페이지로 리다이렉트
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error || 'Login failed. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='w-full flex justify-center mb-8 mt-8'>
                        <img
                            src="https://i.ibb.co/2ZVYy4z/dori-login-design.webp"
                            alt="D'ori Login"
                            className="w-[960px] h-auto rounded-[12px]"
                        />
                    </div>
                    <div className='flex h-[757px] pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[25]'>
                        <div className='flex w-[960px] pt-[20px] pr-0 pb-[20px] pl-0 flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[26]'>
                            <form onSubmit={handleSubmit} className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[27]'>
                                {/* 토글 버튼 추가 */}
                                <div className='flex w-full justify-start mb-4'>
                                    <button
                                        onClick={() => setIsCustomer(true)}
                                        className={`px-4 py-2 mr-2 rounded ${isCustomer ? 'bg-[#f46047] text-white' : 'bg-gray-200'}`}
                                    >
                                        고객 로그인
                                    </button>
                                    <button
                                        onClick={() => setIsCustomer(false)}
                                        className={`px-4 py-2 rounded ${!isCustomer ? 'bg-[#f46047] text-white' : 'bg-gray-200'}`}
                                    >
                                        기업 로그인
                                    </button>
                                </div>
                                <div className='flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-30'>
                                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative z-[31]'>
                                        <div className='flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[32]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[33]">
                                                Username
                                            </span>
                                        </div>
                                        <div className='flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dddb] relative overflow-hidden z-[34]'>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="w-full h-full border-none outline-none font-['Epilogue'] text-[16px] text-[#896660]"
                                                placeholder="Enter your username"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[36]'>
                                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative z-[37]'>
                                        <div className='flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[38]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[39]">
                                                Password
                                            </span>
                                        </div>
                                        <div className='flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dddb] relative overflow-hidden z-40'>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full h-full border-none outline-none font-['Epilogue'] text-[16px] text-[#896660]"
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {error && (
                                    <div className='flex pt-[4px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[42]'>
                                        <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-red-500 relative text-left whitespace-nowrap z-[43]">
                                            {error}
                                        </span>
                                    </div>
                                )}
                                <div className='flex pt-[4px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[42]'>
                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#896660] relative text-left whitespace-nowrap z-[43] cursor-pointer">
                                        Forgot Password?
                                    </span>
                                </div>
                                <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]'>
                                    <button
                                        type="submit"
                                        className='flex w-[446px] h-[48px] justify-center items-center shrink-0 flex-nowrap bg-[#f46047] rounded-[24px] relative overflow-hidden z-[45]'
                                    >
                                        <span className="font-['Epilogue'] text-[16px] font-bold leading-[24px] text-[#fff] text-center z-[47]">
                                            Login
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignIn;
