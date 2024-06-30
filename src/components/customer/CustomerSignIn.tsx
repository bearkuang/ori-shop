import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerSignIn: React.FC = () => {
    const [formData, setFormData] = useState({
        cust_username: '',
        cust_password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', formData);
            console.log('Login successful', response.data);
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', response.data.access);
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

    const handleGoToMain = () => {
        navigate("/");
    }

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex pt-[12px] pr-[40px] pb-[12px] pl-[40px] justify-between items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#e5e8ea] relative z-[2]'>
                        <div className='flex w-[72px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[3]'>
                            <div className='flex w-[16px] flex-col items-start shrink-0 flex-nowrap relative z-[4]'>
                                <div className='w-[16px] grow shrink-0 basis-0 bg-cover bg-no-repeat relative overflow-hidden z-[5]' />
                            </div>
                            <div className='flex w-[40px] flex-col items-start shrink-0 flex-nowrap relative z-[6] cursor-pointer' onClick={handleGoToMain}>
                                <span className="h-[23px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[18px] font-bold leading-[23px] text-[#161111] relative text-left whitespace-nowrap z-[7]">
                                    D'ori
                                </span>
                            </div>
                        </div>
                        <div className='flex gap-[32px] justify-end items-start grow shrink-0 basis-0 flex-nowrap relative z-[8]'>
                            <div className='flex w-[160px] flex-col items-start shrink-0 flex-nowrap relative z-[9]'>
                                <div className='flex items-start self-stretch grow shrink-0 basis-0 flex-nowrap rounded-[12px] relative z-10'>
                                    <div className='flex w-[40px] pt-0 pr-0 pb-0 pl-[16px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#f4f2ef] rounded-tl-[12px] rounded-tr-none rounded-br-none rounded-bl-[12px] relative z-[11]'>
                                        <div className='h-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[12]'>
                                            <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[13]' />
                                        </div>
                                    </div>
                                    <div className='flex pt-[8px] pr-[16px] pb-[8px] pl-[8px] items-center self-stretch grow shrink-0 basis-0 flex-nowrap bg-[#f4f2ef] rounded-tl-none rounded-tr-[12px] rounded-br-[12px] rounded-bl-none relative overflow-hidden z-[14]'>
                                        <span className="h-[24px] shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-left whitespace-nowrap z-[15]">
                                            Search
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-[88px] gap-[8px] items-start shrink-0 flex-nowrap relative z-[16]'>
                                <div className='flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#f4f2ef] rounded-[20px] relative overflow-hidden z-[17]'>
                                    <div className='flex flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[18]'>
                                        <div className='self-stretch grow shrink-0 basis-0 relative overflow-hidden z-[19]'>
                                            <div className='w-[20px] h-[20px] bg-cover bg-no-repeat absolute top-0 left-0 z-20' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#f4f2ef] rounded-[20px] relative overflow-hidden z-[21]'>
                                    <div className='flex flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[22]'>
                                        <div className='self-stretch grow shrink-0 basis-0 relative overflow-hidden z-[23]'>
                                            <div className='w-[20px] h-[20px] bg-cover bg-no-repeat absolute top-0 left-0 z-[24]' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                name="cust_username"
                                                value={formData.cust_username}
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
                                                name="cust_password"
                                                value={formData.cust_password}
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
                <div className='flex justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[48]'>
                    <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[49]'>
                        <div className='flex pt-[40px] pr-[20px] pb-[40px] pl-[20px] flex-col gap-[24px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-50'>
                            <div className='flex justify-between items-center self-stretch shrink-0 flex-wrap relative z-[51]'>
                                <div className='flex w-[160px] flex-col items-center flex-nowrap relative z-[52]'>
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[53]">
                                        About Us
                                    </span>
                                </div>
                                <div className='flex w-[160px] flex-col items-center flex-nowrap relative z-[54]'>
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[55]">
                                        Contact
                                    </span>
                                </div>
                                <div className='flex w-[160px] flex-col items-center flex-nowrap relative z-[56]'>
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[57]">
                                        Terms of Service
                                    </span>
                                </div>
                            </div>
                            <div className='flex gap-[16px] justify-center items-start self-stretch shrink-0 flex-wrap relative z-[58]'>
                                <div className='flex w-[24px] flex-col items-center flex-nowrap relative z-[59]'>
                                    <div className='flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[60]'>
                                        <div className='w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[61]'>
                                            <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[62]' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-[24px] flex-col items-center flex-nowrap relative z-[63]'>
                                    <div className='flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[64]'>
                                        <div className='w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[65]'>
                                            <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[66]' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-[24px] flex-col items-center flex-nowrap relative z-[67]'>
                                    <div className='flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[68]'>
                                        <div className='w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[69]'>
                                            <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[70]' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[71]'>
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[72]">
                                    @2023 D'ori
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignIn;