import React, { useState, ReactNode, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaAddressCard, FaBuilding } from 'react-icons/fa';

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

const CompanySignUp: React.FC = () => {
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        confirm_password: '',
        address: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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

        try {
            const response = await axios.post('http://localhost:8000/api/auth/company-register/', {
                username: formData.username,
                name: formData.name,
                password: formData.password,
                address: formData.address,
                email: formData.email
            });
            console.log(response.data);
            alert('Company sign up successful!');
            navigate('/signin');
        } catch (error) {
            console.error('Company sign up failed', error);
            alert('Sign up failed. Please try again.');
        }
    };

    const openPostcodeSearch = () => {
        new (window as any).daum.Postcode({
            oncomplete: function (data: any) {
                let fullAddress = data.address;
                let extraAddress = '';

                if (data.addressType === 'R') {
                    if (data.bname !== '') {
                        extraAddress += data.bname;
                    }
                    if (data.buildingName !== '') {
                        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                    }
                    fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
                }

                setPostcode(data.zonecode);
                setAddress(fullAddress);
                setFormData(prev => ({
                    ...prev,
                    address: `(${data.zonecode}) ${fullAddress}`
                }));
            }
        }).open();
    };

    return (
        <div className="main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0">
            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden">
                <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
                    <div className="flex pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[11]">
                        <div className="flex w-[960px] pt-[20px] pr-0 pb-[20px] pl-0 flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[12]">
                            <div className="flex pt-[24px] pr-[16px] pb-[12px] pl-[16px] flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[13]">
                                <span className="h-[40px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[32px] font-bold leading-[40px] text-[#161111] relative text-center whitespace-nowrap z-[14]">
                                    Company Sign Up for D'ori
                                </span>
                            </div>
                            <form onSubmit={handleSubmit} className="self-stretch space-y-6">
                                <InputField
                                    icon={<FaUser className="text-gray-400" />}
                                    name="username"
                                    placeholder="Enter company username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                />
                                <InputField
                                    icon={<FaBuilding className="text-gray-400" />}
                                    name="name"
                                    placeholder="Enter company name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={<FaEnvelope className="text-gray-400" />}
                                    name="email"
                                    type="email"
                                    placeholder="Enter company email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <InputField
                                    icon={<FaLock className="text-gray-400" />}
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={<FaLock className="text-gray-400" />}
                                    name="confirm_password"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                />
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="address" className="font-medium text-[#161111]">Address</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            id="postcode"
                                            value={postcode}
                                            placeholder="Postcode"
                                            readOnly
                                            className="w-1/3 h-[56px] pl-3 rounded-[12px] border border-[#e5dbdb] focus:outline-none focus:ring-2 focus:ring-[#f46b5b] transition-all duration-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={openPostcodeSearch}
                                            className="bg-[#f46b5b] h-[56px] px-4 text-white rounded-[12px] transition-all duration-300 hover:bg-[#e35a4a]"
                                        >
                                            Search Address
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        placeholder="Address"
                                        readOnly
                                        className="w-full h-[56px] pl-3 rounded-[12px] border border-[#e5dbdb] focus:outline-none focus:ring-2 focus:ring-[#f46b5b] transition-all duration-300"
                                    />
                                </div>
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

export default CompanySignUp;