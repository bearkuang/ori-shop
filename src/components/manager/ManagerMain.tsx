import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import PendingItemsPage from './PendingItemPage';

interface LoginData {
    [date: string]: number;
}

interface Company {
    id: number;
    username: string;
    name: string;
    gender: string;
    address: string;
    email: string;
    create_date: string;
    is_staff: boolean;
    is_active: boolean;
    is_company: boolean;
}

const Dashboard: React.FC<{
    pendingCompany: Company[],
    handleApprove: (companyId: number) => void,
    chartOptions: ApexOptions,
    chartSeries: ApexOptions['series']
}> = ({ pendingCompany, handleApprove, chartOptions, chartSeries }) => {
    return (
        <>
            <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] justify-between items-start self-stretch shrink-0 flex-wrap relative z-[26]'>
                <div className='flex w-[288px] flex-col items-start flex-nowrap relative z-[27]'>
                    <span className="h-[40px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[32px] font-bold leading-[40px] text-[#161111] relative text-left whitespace-nowrap z-[28]">
                        Dashboard
                    </span>
                </div>
            </div>
            {pendingCompany.map((company) => (
                <div key={company.id} className='flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[29]'>
                    <div className='flex w-[170px] gap-[16px] items-center shrink-0 flex-nowrap relative z-30'>
                        <div className='w-[56px] h-[56px] shrink-0 bg-cover bg-no-repeat rounded-[28px] relative overflow-hidden z-[31]' />
                        <div className='flex w-[98px] justify-center items-start shrink-0 flex-nowrap relative z-[32]'>
                            <>
                                <div className='flex flex-col'>
                                    <div className='flex w-[98px] flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[33]'>
                                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[18px] font-semibold leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[34]">
                                            기업명: {company.username}
                                        </span>
                                    </div>
                                    <div className='flex justify-between w-[200px] flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[35]'>
                                        <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#896660] relative text-left whitespace-nowrap z-[36]">
                                            사업자명: {company.name}
                                        </span>
                                        <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#896660] relative text-left whitespace-nowrap z-[36]">
                                            사업자 이메일: {company.email}
                                        </span>
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                    <div className='flex w-[100px] h-[40px] items-start shrink-0 flex-nowrap relative ml-40 z-[37]'>
                        <button
                            onClick={() => handleApprove(company.id)}
                            className="h-[40px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#000] relative text-center whitespace-nowrap z-[39] bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Approve
                        </button>
                    </div>
                </div>
            ))}
            <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] justify-between items-start self-stretch shrink-0 flex-wrap relative z-[73]'>
                <div className='flex w-[288px] flex-col items-start flex-nowrap relative z-[74]'>
                    <span className="h-[40px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[32px] font-bold leading-[40px] text-[#161111] relative text-left whitespace-nowrap z-[75]">
                        Analytics
                    </span>
                </div>
            </div>
            <div className='flex pt-[16px] pr-[16px] pb-[8px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[76]'>
                <span className="h-[23px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[18px] font-bold leading-[23px] text-[#161111] relative text-left whitespace-nowrap z-[77]">
                    Site Traffic
                </span>
            </div>
            <div className='flex pt-[24px] pr-[16px] pb-[24px] pl-[16px] gap-[16px] items-start self-stretch shrink-0 flex-wrap relative z-[78]'>
                <div className='flex pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[8px] items-start grow basis-0 flex-nowrap rounded-[12px] border-solid border border-[#e5dddb] relative z-[79]'>
                    <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[80]'>
                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[81]">
                            Visitors
                        </span>
                    </div>
                    <div className='flex pt-[24px] pr-[16px] pb-[24px] pl-[16px] gap-[16px] items-start self-stretch shrink-0 flex-wrap relative z-[78]'>
                        <div className='flex pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[8px] items-start grow basis-0 flex-nowrap rounded-[12px] border-solid border border-[#e5dddb] relative z-[79]'>
                            <Chart
                                options={chartOptions}
                                series={chartSeries}
                                type="area"
                                height={350}
                                width="800px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ManagerMain: React.FC = () => {
    const [pendingCompany, setPendingCompany] = useState<Company[]>([]);
    const { isStaff, logout } = useAuth();
    const [loginData, setLoginData] = useState<LoginData>({});
    const [showPendingItemPage, setPendingItemPage] = useState(false);

    const fetchPendingCompanies = async () => {
        if (!isStaff) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/managers/pending_companies/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPendingCompany(response.data);
        } catch (error) {
            console.error('Error fetching companies', error);
        }
    };

    const fetchLoginData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/managers/daily_unique_logins/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLoginData(response.data);

            // 데이터 변환
            const sortedDates = Object.keys(response.data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
            const counts = sortedDates.map(date => response.data[date]);

            // 차트 옵션 업데이트
            setChartOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: sortedDates
                }
            }));

            // 차트 시리즈 업데이트
            setChartSeries([{
                name: 'Daily Logins',
                data: counts
            }]);
        } catch (error) {
            console.error('Error fetching login data', error);
        }
    };

    useEffect(() => {
        fetchPendingCompanies();
        fetchLoginData();
    }, []);

    const handleApprove = async (companyId: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8000/api/managers/${companyId}/approve_company/`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchPendingCompanies(); // 승인 후 목록 다시 불러오기
        } catch (error) {
            console.error('Error approving company', error);
        }
    };

    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        chart: {
            height: 350,
            type: 'area',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#008FFB'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            type: 'datetime',
            categories: []
        },
        yaxis: {
            title: {
                text: 'Number of Logins'
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
    });

    const [chartSeries, setChartSeries] = useState<ApexOptions['series']>([
        {
            name: 'Daily Logins',
            data: []
        }
    ]);

    const togglePendingItemPage = () => {
        setPendingItemPage(true);
    };

    const toggleDashboard = () => {
        setPendingItemPage(false);
    };

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex h-[898px] flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex h-[898px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[2]'>
                        <div className='flex w-[320px] h-[841px] flex-col items-start shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex h-[840px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[4]'>
                                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                                    {/* 사이드 바 */}
                                    <div className='flex flex-col gap-[8px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[6]'>
                                        <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f4f2ef] rounded-[20px] relative z-[7]'>
                                            <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[8]'>
                                                <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[9]' />
                                            </div>
                                            <div className='flex w-[76px] flex-col items-start shrink-0 flex-nowrap relative z-10 cursor-pointer'>
                                                <div
                                                    className='flex w-[76px] flex-col items-start shrink-0 flex-nowrap relative z-[11]'
                                                    onClick={toggleDashboard}
                                                >
                                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-medium leading-[21px] text-[#161111] relative text-left whitespace-nowrap z-[12]">
                                                        Dashboard
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap rounded-[20px] relative z-[13]'>
                                            <div className='flex w-[24px] flex-col items-start shrink-0 flex-nowrap relative z-[14]'>
                                                <div className='w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[15]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[16]' />
                                                </div>
                                            </div>
                                            <div
                                                className='flex w-[79px] flex-col items-start shrink-0 flex-nowrap relative z-[17] cursor-pointer'
                                                onClick={togglePendingItemPage}
                                            >
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-medium leading-[21px] text-[#161111] relative text-left whitespace-nowrap z-[18]">
                                                    Companies
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative z-[19]'>
                                            <div className='flex w-[24px] flex-col items-start shrink-0 flex-nowrap relative z-20'>
                                                <div className='w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[21]'>
                                                    <div className='w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[22]' />
                                                </div>
                                            </div>
                                            <div className='flex w-[58px] flex-col items-start shrink-0 flex-nowrap relative z-[23]'>
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-medium leading-[21px] text-[#161111] relative text-left whitespace-nowrap z-[24]">
                                                    Settings
                                                </span>
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
                            </div>
                        </div>
                        {/* 내용 컴포넌트 */}
                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[25]'>
                            {showPendingItemPage ? (
                                <PendingItemsPage />
                            ) : (
                                <Dashboard
                                    pendingCompany={pendingCompany}
                                    handleApprove={handleApprove}
                                    chartOptions={chartOptions}
                                    chartSeries={chartSeries}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerMain;
