import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddProduct from './AddProduct';
import OrderList from './OrderList';
import AddedProduct from './AddedProduct';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface RevenueDataItem {
    order_create_date: string;
    daily_revenue: number;
}

const CompanyPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showOrderList, setShowOderList] = useState(false);
    const [showAddedProduct, setShowAddedProduct] = useState(false);
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [itemSalesData, setItemSalesData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const toggleAddedProduct = () => {
        setShowAddedProduct(true);
        setShowAddProduct(false);
        setShowOderList(false);
    };

    const toggleAddProduct = () => {
        setShowAddProduct(true);
        setShowOderList(false);
        setShowAddedProduct(false);
    };

    const toggleOrderList = () => {
        setShowOderList(true);
        setShowAddProduct(false);
        setShowAddedProduct(false);
    };

    const toggleCompanyPage = () => {
        setShowAddProduct(false);
        setShowOderList(false);
        setShowAddedProduct(false);
    };

    const onProductAdded = () => {
        toggleAddedProduct();
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await Promise.all([fetchRevenueData(), fetchItemSalesData()]);
            } catch (error) {
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchRevenueData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/companies/revenue_data/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log('Raw Revenue Data:', response.data);

            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                const formattedData = response.data.map(item => ({
                    x: new Date(item.order_create_date).getTime(),
                    y: parseFloat(item.daily_revenue)
                }));

                console.log('Formatted Revenue Data:', formattedData);
                setRevenueData(formattedData);
            } else {
                console.log('No revenue data received or data is empty');
                setRevenueData([]);
            }
        } catch (error) {
            console.error('Error fetching revenue data:', error);
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
            }
            setError('수익 데이터를 불러오는 데 실패했습니다.');
        }
    };

    const fetchItemSalesData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/companies/item_sales/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log('Item sales data:', response.data);
            setItemSalesData(response.data);
        } catch (error) {
            console.error('Error fetching item sales data', error);
        }
    };

    const revenueChartOptions: ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        title: {
            text: '일일 수익',
            align: 'left',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            title: {
                text: '수익 (원)',
            },
            labels: {
                formatter: (value) => `₩${value.toLocaleString()}`,
            },
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
            y: {
                formatter: (value) => `₩${value.toLocaleString()}`,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
    };

    const itemSalesChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        xaxis: {
            categories: itemSalesData.map((item) => item.item_name),
        },
        yaxis: {
            title: {
                text: '판매량',
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + ' 개';
                },
            },
        },
    };

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0 h-[1250px]'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden h-full'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1] h-full'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[2] h-full'>
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
                        <div className='flex h-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[28]'>
                            {showAddProduct ? (
                                <div className='w-full pl-4 h-full overflow-y-auto'>
                                    <AddProduct onProductAdded={onProductAdded} />
                                </div>
                            ) : showOrderList ? (
                                <div className='w-full pl-4 h-full overflow-y-auto'>
                                    <OrderList />
                                </div>
                            ) : showAddedProduct ? (
                                <div className='w-full pl-4 h-full overflow-y-auto'>
                                    <AddedProduct />
                                </div>
                            ) : (
                                <div className='w-full pl-4 h-full overflow-y-auto'>
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
                                            <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-48'>
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
                                        <div className='flex pt-[24px] pr-[16px] pb-[24px] pl-[16px] gap-[16px] items-start self-stretch shrink-0 flex-wrap relative z-[78] overflow-y-auto' style={{ height: 'calc(100% - 120px)' }}>
                                            <div className='flex pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[8px] items-start grow basis-0 flex-nowrap rounded-[12px] border-solid border border-[#e5dddb] relative z-[79]'>
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[80]'>
                                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[81]">
                                                        Sales
                                                    </span>
                                                </div>
                                                {!showAddProduct && !showOrderList && !showAddedProduct && (
                                                    <div className='flex pt-[24px] pr-[16px] pb-[24px] pl-[16px] gap-[16px] items-start self-stretch shrink-0 flex-wrap relative z-[78]'>
                                                        {isLoading ? (
                                                            <div>데이터를 불러오는 중...</div>
                                                        ) : error ? (
                                                            <div>{error}</div>
                                                        ) : (
                                                            <>
                                                                <div className='flex flex-col gap-8 w-full'>
                                                                    <div className='w-full p-4 border rounded-lg shadow-sm'>
                                                                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap mb-4">
                                                                            일일 수익
                                                                        </span>
                                                                        {revenueData.length > 0 ? (
                                                                            <Chart
                                                                                options={revenueChartOptions}
                                                                                series={[{
                                                                                    name: '일일 수익',
                                                                                    data: revenueData
                                                                                }]}
                                                                                type='area'
                                                                                height={350}
                                                                                width="100%"
                                                                            />
                                                                        ) : (
                                                                            <div>수익 데이터가 없습니다.</div>
                                                                        )}
                                                                    </div>
                                                                    <div className='w-full p-4 border rounded-lg shadow-sm'>
                                                                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap mb-4">
                                                                            상품별 판매량
                                                                        </span>
                                                                        <Chart
                                                                            options={itemSalesChartOptions}
                                                                            series={[{
                                                                                name: '판매량',
                                                                                data: itemSalesData.map(item => item.sales_count)
                                                                            }]}
                                                                            type="bar"
                                                                            height={350}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
