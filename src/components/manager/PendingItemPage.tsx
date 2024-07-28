import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PendingItem {
    id: number;
    item_name: string;
}

interface CompanyWithPendingItems {
    id: number;
    username: string;
    name: string;
    email: string;
    pending_items: PendingItem[];
}

const PendingItemsPage: React.FC = () => {
    const [companies, setCompanies] = useState<CompanyWithPendingItems[]>([]);
    const { isStaff } = useAuth();

    useEffect(() => {
        const fetchCompaniesWithPendingItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/managers/companies_with_pending_items/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies with pending items', error);
            }
        };

        if (isStaff) {
            fetchCompaniesWithPendingItems();
        }
    }, [isStaff]);

    const handleApproveItem = async (itemId: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8000/api/managers/${itemId}/approve_item/`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // 승인 후 목록 다시 불러오기
            const response = await axios.get('http://localhost:8000/api/managers/companies_with_pending_items/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCompanies(response.data);
        } catch (error) {
            console.error('Error approving item', error);
        }
    };

    return (
        <div className="flex flex-col w-full h-[calc(100%-16px)] bg-white overflow-hidden">
            <h1 className="text-3xl font-bold p-6">Companies with Pending Items</h1>
            <div className="flex-1 px-6 pb-6">
                <div className="max-h-[1000px] overflow-y-auto scrollbar-hide">
                    {companies.map((company) => (
                        <div key={company.id} className="mb-8 p-6 border-b border-gray-200">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    기업명: {company.username}
                                </h2>
                                <p className="text-md text-gray-600 mb-1">
                                    사업자명: {company.name}
                                </p>
                                <p className="text-md text-gray-600">
                                    Email: {company.email}
                                </p>
                            </div>
                            <h3 className="text-lg font-medium mb-3 text-gray-700">Pending Items:</h3>
                            <div className="max-h-40 overflow-y-auto">
                                <ul className="space-y-3">
                                    {company.pending_items.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                                            <Link to={`/item/${item.id}/info`} className="text-gray-800 hover:text-blue-600">
                                                {item.item_name}
                                            </Link>
                                            <button
                                                onClick={() => handleApproveItem(item.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                                            >
                                                Approve
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PendingItemsPage;