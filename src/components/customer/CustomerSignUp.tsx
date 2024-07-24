import React, { useState, ReactNode, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaAddressCard, FaBirthdayCake } from 'react-icons/fa';

interface InputFieldProps {
    icon?: ReactNode;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    icon,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    error
}) => (
    <div className="flex flex-col space-y-2">
        <label htmlFor={name} className="font-medium text-[#161111]">
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        <div className="relative">
            {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full h-[56px] pl-10 pr-4 rounded-[12px] border border-[#e5dbdb] focus:outline-none focus:ring-2 focus:ring-[#f46b5b] transition-all duration-300 ${error ? 'border-red-500' : ''}`}
            />
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);

const CustomerSignUp: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        confirm_password: '',
        gender: 'F',
        birthday: '',
        address: '',
        email: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username: '',
        email: ''
    })

    const startTimer = () => {
        setIsCodeSent(true);
        setCountdown(180);
        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(timer);
                    setIsCodeSent(false);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
    };

    const requestVerification = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!formData.email) {
            alert("Please enter your email address.");
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/customers/request_verification/', { email: formData.email });
            startTimer();
        } catch (error) {
            console.error('Failed to send verification code', error);
            alert('Failed to send verification code. Please try again.');
        }
    };

    const verifyEmail = async () => {
        try {
            // 먼저 이메일 중복 체크
            await checkDuplicate();

            if (errors.email) {
                return; // 이메일이 중복되면 인증 과정 중단
            }

            await axios.post('http://localhost:8000/api/customers/verify_email/', {
                email: formData.email,
                code: verificationCode
            });
            setIsEmailVerified(true);
            alert('Email verified successfully.');
        } catch (error) {
            console.error('Email verification failed', error);
            alert('Email verification failed. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // 입력 필드가 변경될 때마다 해당 필드의 에러 메시지를 초기화
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match");
            return;
        }
        if (!isEmailVerified) {
            alert("Please verify your email before signing up.");
            return;
        }

        try {
            // 먼저 중복 체크를 수행
            await checkDuplicate();

            // 중복이 있는 경우 제출 중단
            if (errors.username || errors.email) {
                return;
            }

            // 회원가입 요청
            const response = await axios.post('http://localhost:8000/api/auth/register/', {
                ...formData,
                verification_code: verificationCode
            });
            console.log(response.data);
            alert('Sign up successful!');
            // 회원가입 성공 후 리다이렉션 또는 알림
            navigate('/login');
        } catch (error) {
            console.error('Sign up failed', error);
            alert('이미 가입된 아이디 혹은 이메일입니다. 확인 후 다시 시도해주세요.');
        }
    };

    const checkDuplicate = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/customers/check_duplicate/', {
                username: formData.username,
                email: formData.email
            });
            // 중복이 없는 경우
            setErrors({
                username: '',
                email: ''
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data);
            }
        }
    };

    return (
        <div className="main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0">
            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden">
                <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
                    <div className="flex pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[11]">
                        <div className="flex w-[960px] pt-[20px] pr-0 pb-[20px] pl-0 flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[12]">
                            <div className="flex pt-[24px] pr-[16px] pb-[12px] pl-[16px] flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[13]">
                                <span className="h-[40px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[32px] font-bold leading-[40px] text-[#161111] relative text-center whitespace-nowrap z-[14]">
                                    Welcome to D'ori
                                </span>
                            </div>
                            <form onSubmit={handleSubmit} className="self-stretch space-y-6">
                                <InputField
                                    icon={<FaUser className="text-gray-400" />}
                                    name="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                />
                                <InputField
                                    icon={<FaUser className="text-gray-400" />}
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <div className="flex gap-4">
                                    <InputField
                                        icon={<FaEnvelope className="text-gray-400" />}
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <button
                                        onClick={requestVerification}
                                        className={`bg-[#f46b5b] h-[56px] px-4 text-white rounded-[12px] mt-8 transition-all duration-300 ${isCodeSent ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e35a4a]'}`}
                                        disabled={isCodeSent}
                                    >
                                        {isCodeSent
                                            ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`
                                            : 'Send Code'}
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <InputField
                                        name="verificationCode"
                                        placeholder="Enter verification code"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                    />
                                    <button
                                        onClick={verifyEmail}
                                        className="bg-[#f46b5b] h-[56px] px-4 text-white rounded-[12px] mt-8 transition-all duration-300 hover:bg-[#e35a4a]"
                                    >
                                        Verify Email
                                    </button>
                                </div>
                                <InputField
                                    icon={<FaLock className="text-gray-400" />}
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={<FaLock className="text-gray-400" />}
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={<FaAddressCard className="text-gray-400" />}
                                    name="address"
                                    placeholder="Enter your address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={<FaBirthdayCake className="text-gray-400" />}
                                    name="birthday"
                                    type="date"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                />
                                <div className="flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[39]">
                                    <button
                                        type="submit"
                                        className="w-full h-[48px] justify-center items-center bg-[#f46b5b] text-white rounded-[12px] font-bold transition-all duration-300 hover:bg-[#e35a4a]"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            <div className="flex pt-[4px] pr-[16px] pb-[12px] pl-[16px] flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[43]">
                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[14px] font-normal leading-[21px] text-[#896360] relative text-center whitespace-nowrap z-[44]">
                                    Already have an account? <a href="/login" className="text-[#f46b5b] hover:underline">Login</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignUp;