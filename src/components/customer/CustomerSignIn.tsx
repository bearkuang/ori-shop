import React, { useState } from 'react';
import axios from 'axios';

const CustomerSignIn: React.FC = () => {
    const [formData, setFormData] = useState({
        cust_username: '',
        cust_name: '',
        cust_password: '',
        confirm_password: '',
        cust_gender: 'F',
        cust_birthday: '',
        cust_address: '',
        cust_email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.cust_password !== formData.confirm_password) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', formData);
            console.log(response.data);
            // 회원가입 성공 후 리다이렉션 또는 알림
        } catch (error) {
            console.error('Sign up failed', error);
        }
    };

    return (
        <div className="main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0">
            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden">
                <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
                    <div className="flex pt-[12px] pr-[40px] pb-[12px] pl-[40px] justify-between items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#e5e8ea] relative z-[2]">
                        <div className="flex w-[73px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[3]">
                            <div className="flex w-[16px] flex-col items-start shrink-0 flex-nowrap relative z-[4]">
                                <div className="w-[16px] grow shrink-0 basis-0 bg-cover bg-no-repeat relative overflow-hidden z-[5]" />
                            </div>
                            <div className="flex w-[41px] flex-col items-start shrink-0 flex-nowrap relative z-[6]">
                                <span className="h-[23px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[18px] font-bold leading-[23px] text-[#161111] relative text-left whitespace-nowrap z-[7]">
                                    D'ori
                                </span>
                            </div>
                        </div>
                        <div className="flex w-[84px] h-[40px] pt-0 pr-[16px] pb-0 pl-[16px] justify-center items-center shrink-0 flex-nowrap bg-[#f46b5b] rounded-[12px] relative overflow-hidden z-[8]">
                            <div className="flex w-[38px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[9]">
                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[14px] font-bold leading-[21px] text-[#fff] relative text-center overflow-hidden whitespace-nowrap z-10">
                                    Login
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[11]">
                        <div className="flex w-[960px] pt-[20px] pr-0 pb-[20px] pl-0 flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[12]">
                            <div className="flex pt-[24px] pr-[16px] pb-[12px] pl-[16px] flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[13]">
                                <span className="h-[40px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[32px] font-bold leading-[40px] text-[#161111] relative text-center whitespace-nowrap z-[14]">
                                    Welcome to D'ori
                                </span>
                            </div>
                            <form onSubmit={handleSubmit} className="self-stretch">
                                <div className="flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[15]">
                                    <div className="flex flex-col items-start grow basis-0 flex-nowrap relative z-[16]">
                                        <div className="flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[17]">
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[18]">
                                                Username
                                            </span>
                                        </div>
                                        <div className="flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dbdb] relative overflow-hidden z-[19]">
                                            <input
                                                name="cust_username"
                                                placeholder="Enter your username"
                                                className="w-full border-none outline-none"
                                                value={formData.cust_username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[15]">
                                    <div className="flex flex-col items-start grow basis-0 flex-nowrap relative z-[16]">
                                        <div className="flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[17]">
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[18]">
                                                Name
                                            </span>
                                        </div>
                                        <div className="flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dbdb] relative overflow-hidden z-[19]">
                                            <input
                                                name="cust_name"
                                                placeholder="Enter your name"
                                                className="w-full border-none outline-none"
                                                value={formData.cust_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[21]">
                                    <div className="flex flex-col items-start grow basis-0 flex-nowrap relative z-[22]">
                                        <div className="flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[23]">
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[24]">
                                                Email
                                            </span>
                                        </div>
                                        <div className="flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dbdb] relative overflow-hidden z-[25]">
                                            <input
                                                name="cust_email"
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full border-none outline-none"
                                                value={formData.cust_email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[27]">
                                    <div className="flex flex-col items-start grow basis-0 flex-nowrap relative z-[28]">
                                        <div className="flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[29]">
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[30]">
                                                Password
                                            </span>
                                        </div>
                                        <div className="flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dbdb] relative overflow-hidden z-[31]">
                                            <input
                                                name="cust_password"
                                                type="password"
                                                placeholder="Enter your password"
                                                className="w-full border-none outline-none"
                                                value={formData.cust_password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[33]">
                                    <div className="flex flex-col items-start grow basis-0 flex-nowrap relative z-[34]">
                                        <div className="flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[35]">
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[36]">
                                                Confirm Password
                                            </span>
                                        </div>
                                        <div className="flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dbdb] relative overflow-hidden z-[37]">
                                            <input
                                                name="confirm_password"
                                                type="password"
                                                placeholder="Confirm your password"
                                                className="w-full border-none outline-none"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[27]">
                                    <div className="flex flex-col items-start grow basis-0 flex-nowrap relative z-[28]">
                                        <div className="flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[29]">
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[30]">
                                                Address
                                            </span>
                                        </div>
                                        <div className="flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dbdb] relative overflow-hidden z-[31]">
                                            <input
                                                name="cust_address"
                                                placeholder="Enter your address"
                                                className="w-full border-none outline-none"
                                                value={formData.cust_address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[480px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end grow shrink-0 basis-0 flex-wrap relative z-[27]">
                                    <div className="flex flex-col items-start grow basis-0 flex-nowrap relative z-[28]">
                                        <div className="flex pt-0 pr-0 pb-[8px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[29]">
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[30]">
                                                Birthday
                                            </span>
                                        </div>
                                        <div className="flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dbdb] relative overflow-hidden z-[31]">
                                            <input
                                                name="cust_birthday"
                                                type="date"
                                                className="w-full border-none outline-none"
                                                value={formData.cust_birthday}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[39]">
                                    <button
                                        type="submit"
                                        className="flex h-[40px] pt-0 pr-[16px] pb-0 pl-[16px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#f46b5b] rounded-[12px] relative overflow-hidden z-40"
                                    >
                                        <div className="flex w-[53px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[41]">
                                            <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[14px] font-bold leading-[21px] text-[#fff] relative text-center overflow-hidden whitespace-nowrap z-[42]">
                                                Sign Up
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </form>
                            <div className="flex pt-[4px] pr-[16px] pb-[12px] pl-[16px] flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[43]">
                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[14px] font-normal leading-[21px] text-[#896360] relative text-center whitespace-nowrap z-[44]">
                                    Already have an account? Login
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
