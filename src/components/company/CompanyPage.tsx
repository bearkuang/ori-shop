import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddProduct from './AddProduct';
import OrderList from './OrderList';
import AddedProduct from './AddedProduct';

const CompanyPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showOrderList, setShowOderList] = useState(false);
    const [showAddedProduct, setShowAddedProduct] = useState(false);

    const toggleAddedProduct = () => {
        setShowAddedProduct(true);
        setShowAddProduct(false);
        setShowOderList(false);
    }

    const toggleAddProduct = () => {
        setShowAddProduct(true);
        setShowOderList(false);
        setShowAddedProduct(false);
    }

    const toggleOrderList = () => {
        setShowOderList(true);
        setShowAddProduct(false);
        setShowAddedProduct(false);
    }

    const toggleCompanyPage = () => {
        setShowAddProduct(false);
        setShowOderList(false);
        setShowAddedProduct(false);
    }

    const onProductAdded = () => {
        toggleAddedProduct();
    }

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[2]'>
                        <div className='flex w-[320px] flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col justify-between items-start self-stretch grow shrink-0 basis-0 flex-nowrap bg-[#fff] relative z-[4]'>
                                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                                    <div className='flex flex-col gap-[8px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[6]'>
                                        <div
                                            className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f4e8e8] rounded-[12px] relative z-[7] cursor-pointer'
                                            onClick={toggleCompanyPage}
                                        >
                                            <div className='flex w-[24px] flex-col items-start shrink-0 flex-nowrap relative z-[8]'>
                                                <div className='w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[9]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-10' />
                                                </div>
                                            </div>
                                            <div className='flex w-[125px] flex-col items-start shrink-0 flex-nowrap relative z-[11]'>
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-medium leading-[21px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[12]">
                                                    마이페이지
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative z-[13]'>
                                            <div className='flex w-[24px] flex-col items-start shrink-0 flex-nowrap relative z-[14]'>
                                                <div className='w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[15]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[16]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex h-[40px] pt-0 pr-[16px] pb-0 pl-[16px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#f45442] rounded-[12px] relative overflow-hidden z-[25] cursor-pointer' onClick={logout}>
                                    <div className='flex w-[107px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[26]'>
                                        <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#fff] relative text-center overflow-hidden whitespace-nowrap z-[27]">
                                            Log Out
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-[700px] flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[28]'>
                            {showAddProduct ? (
                                <div className="w-full pl-4 h-full overflow-y-auto">
                                    <AddProduct onProductAdded={onProductAdded} />
                                </div>
                            ) : showOrderList ? (
                                <OrderList />
                            ) : showAddedProduct ? (
                                <AddedProduct />
                            ) : (
                                <>
                                    <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[29]'>
                                        <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-30">
                                            Order Information
                                        </span>
                                    </div>
                                    <div
                                        className='flex h-[56px] pt-0 pr-[16px] pb-0 pl-[16px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[31] cursor-pointer'
                                    >
                                        <div
                                            className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[32]'
                                            onClick={toggleOrderList}
                                        >
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-left overflow-hidden whitespace-nowrap z-[33]">
                                                Order List
                                            </span>
                                        </div>
                                        <div className='flex w-[28px] flex-col items-start shrink-0 flex-nowrap relative z-[34]'>
                                            <div className='flex w-[28px] justify-center items-center grow shrink-0 basis-0 flex-nowrap relative z-[35]'>
                                                <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[36]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[37]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[45]'>
                                        <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[46]">
                                            Product
                                        </span>
                                    </div>
                                    <div
                                        className='flex h-[56px] pt-0 pr-[16px] pb-0 pl-[16px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[31] cursor-pointer'
                                        onClick={toggleAddProduct}
                                    >
                                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[48]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-left overflow-hidden whitespace-nowrap z-[49]">
                                                Add Product
                                            </span>
                                        </div>
                                        <div className='flex w-[28px] flex-col items-start shrink-0 flex-nowrap relative z-50'>
                                            <div className='flex w-[28px] justify-center items-center grow shrink-0 basis-0 flex-nowrap relative z-[51]'>
                                                <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[52]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[53]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='flex h-[56px] pt-0 pr-[16px] pb-0 pl-[16px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[54] cursor-pointer'
                                        onClick={toggleAddedProduct}
                                    >
                                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[55]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-left overflow-hidden whitespace-nowrap z-[56]">
                                                Added Product
                                            </span>
                                        </div>
                                        <div className='flex w-[28px] flex-col items-start shrink-0 flex-nowrap relative z-[57]'>
                                            <div className='flex w-[28px] justify-center items-center grow shrink-0 basis-0 flex-nowrap relative z-[58]'>
                                                <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[59]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[60]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[68]'>
                                        <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[69]">
                                            My Information
                                        </span>
                                    </div>
                                    <div className='flex h-[56px] pt-0 pr-[16px] pb-0 pl-[16px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[77]'>
                                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[78]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-left overflow-hidden whitespace-nowrap z-[79]">
                                                Delivery Address Management
                                            </span>
                                        </div>
                                        <div className='flex w-[28px] flex-col items-start shrink-0 flex-nowrap relative z-[80]'>
                                            <div className='flex w-[28px] justify-center items-center grow shrink-0 basis-0 flex-nowrap relative z-[81]'>
                                                <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[82]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[83]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
