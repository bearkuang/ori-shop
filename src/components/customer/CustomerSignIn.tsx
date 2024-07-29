import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock, FaArrowRight, FaTimes } from 'react-icons/fa';

const CustomerSignIn: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [companyCode, setCompanyCode] = useState('');
    const [loginType, setLoginType] = useState<'customer' | 'company'>('customer');

    const handleLoginTypeChange = (type: 'customer' | 'company') => {
        setLoginType(type);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = loginType === 'customer'
                ? 'http://localhost:8000/api/auth/login/'
                : 'http://localhost:8000/api/auth/company-login/';

            const response = await axios.post(endpoint, formData);
            console.log('Login successful', response.data);

            login(response.data.access, loginType);
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error || 'Login failed. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleCompanySignUp = () => {
        setShowModal(true);
    };

    const checkCompanyCode = () => {
        const correctCode = "DORIRLDJQCODE12#";

        if (companyCode === correctCode) {
            setShowModal(false);
            setCompanyCode('');
            navigate('/company-signup');
        } else {
            alert("잘못된 코드입니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='w-full flex justify-center mb-8 mt-8'>
                        <img
                            src="/images/dori-login-design.png"
                            alt="D'ori Login"
                            className="w-[960px] h-auto rounded-[12px]"
                        />
                    </div>
                    <div className='flex h-[757px] pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[25]'>
                        <div className='flex w-[960px] pt-[20px] pr-0 pb-[20px] pl-0 flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[26]'>
                            <form onSubmit={handleSubmit} className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[27] w-full max-w-md mx-auto'>
                                <div className='flex w-full justify-center mb-6'>
                                    <button
                                        onClick={() => handleLoginTypeChange('customer')}
                                        className={`px-6 py-2 mr-2 rounded-full transition-all duration-300 ${loginType === 'customer' ? 'bg-[#f46047] text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        고객 로그인
                                    </button>
                                    <button
                                        onClick={() => handleLoginTypeChange('company')}
                                        className={`px-6 py-2 rounded-full transition-all duration-300 ${loginType === 'company' ? 'bg-[#f46047] text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        기업 로그인
                                    </button>
                                </div>
                                <div className='w-full space-y-6'>
                                    <div className='relative'>
                                        <FaUser className='absolute top-3 left-3 text-gray-400' />
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f46047] transition duration-300"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className='relative'>
                                        <FaLock className='absolute top-3 left-3 text-gray-400' />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f46047] transition duration-300"
                                            placeholder="Password"
                                        />
                                    </div>

                                    {error && (
                                        <div className='text-red-500 text-sm'>
                                            {error}
                                        </div>
                                    )}

                                    <div className='text-right'>
                                        <a href="#" className="text-sm text-[#f46047] hover:underline">
                                            Forgot Password?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        className='w-full py-2 px-4 bg-[#f46047] text-white rounded-lg hover:bg-[#e35037] transition duration-300 flex items-center justify-center'
                                    >
                                        <span className="mr-2">Login</span>
                                        <FaArrowRight />
                                    </button>
                                    {/* 회원가입 버튼 추가 */}
                                    <div className="mt-4 text-center">
                                        <div className='flex space-x-4'>
                                            <span className="text-gray-600">아직 계정이 없으신가요?</span>
                                            <button
                                                onClick={() => navigate('/signup')}
                                                className="ml-2 text-[#f46047] hover:underline font-semibold"
                                            >
                                                일반 회원가입
                                            </button>
                                            <button
                                                onClick={handleCompanySignUp}
                                                className="ml-2 text-[#f46047] hover:underline font-semibold"
                                            >
                                                기업 회원가입
                                            </button>
                                        </div>
                                    </div>
                                    {/* 모달 컴포넌트 */}
                                    {showModal && (
                                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-[9999]">
                                            <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-xl font-bold">기업 코드 입력</h3>
                                                    <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={companyCode}
                                                    onChange={(e) => setCompanyCode(e.target.value)}
                                                    placeholder="기업 코드를 입력하세요"
                                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                                />
                                                <button
                                                    onClick={checkCompanyCode}
                                                    className="w-full bg-[#f46047] text-white py-2 rounded hover:bg-[#e35037] transition duration-300"
                                                >
                                                    확인
                                                </button>
                                            </div>
                                        </div>
                                    )}
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
