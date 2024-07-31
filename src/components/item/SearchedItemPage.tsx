import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaFilter, FaPalette, FaWonSign, FaSearch } from 'react-icons/fa';

interface SubCategory {
    id: number;
    cate_name: string;
}

interface Item {
    id: number;
    cate_no: number;
    category: {
        id: number;
        main_cate_name: string;
        cate_name: string;
    };
    item_name: string;
    item_description: string;
    item_price: number;
    item_soldout: string;
    item_is_display: string;
    item_company: string;
    images: Array<{
        id: number;
        file: string;
        item_no: number;
    }>;
    options: Array<{
        id: number;
        item_no: number;
        opt_color: string;
        opt_size: string;
        opt_item_soldout: string;
        opt_stock: number;
    }>;
    likes: number;
}

const SearchedItemPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const [items, setItems] = useState<Item[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [colorFilter, setColorFilter] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 600000 });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        if (query) {
            setSearchTerm(query);
            fetchFilteredItems();
            fetchSearchResults(query);
        } else {
            fetchAllItems();
        }
    }, [location.search, colorFilter, priceRange]);

    const fetchSearchResults = async (query: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/items/search/?q=${encodeURIComponent(query)}`);
            setItems(response.data);
        } catch (error) {
            console.error('검색 결과를 불러오는 데 실패했습니다:', error);
            setError('검색 결과를 불러오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const fetchFilteredItems = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let url = `http://localhost:8000/api/items/search/?q=${encodeURIComponent(searchTerm)}`;
    
            if (colorFilter.length > 0) {
                url += '&' + colorFilter.map(color => `color=${encodeURIComponent(color)}`).join('&');
            }
            if (priceRange.min > 0) {
                url += `&min_price=${priceRange.min}`;
            }
            if (priceRange.max < 600000) {
                url += `&max_price=${priceRange.max}`;
            }
    
            const response = await axios.get(url);
            setItems(response.data);
        } catch (error) {
            console.error('필터링된 아이템을 불러오는 데 실패했습니다:', error);
            setError('필터링된 아이템을 불러오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const applyFilters = () => {
        fetchFilteredItems();
        setIsSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const resetFilters = () => {
        setColorFilter([]);
        setPriceRange({ min: 0, max: 600000 });
        fetchFilteredItems();
    };

    const fetchAllItems = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8000/api/items/all/');
            setItems(response.data);
        } catch (error) {
            console.error('전체 아이템을 불러오는 데 실패했습니다:', error);
            setError('전체 아이템을 불러오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='main-container flex flex-col items-start relative mx-auto my-0 p-8'>
            <div className='w-full max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6'>
                {/* 검색창 */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="검색어를 입력하세요"
                            className="w-full p-2 border rounded-l-lg"
                        />
                        <button type="submit" className="bg-[#9c524a] text-white p-2 rounded-r-lg">
                            <FaSearch />
                        </button>
                    </div>
                </form>

                {/* 필터 버튼 */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center bg-[#9c524a] text-white px-4 py-2 rounded-md hover:bg-[#7d413b] transition duration-300 ease-in-out"
                    >
                        <FaFilter className="mr-2" />
                        필터
                    </button>
                </div>
                <div className='flex pt-0 pr-0 pb-3 pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative'>
                    <div className='flex flex-col items-start grow shrink-0 relative overflow-hidden border-t'>
                        {/* 상품 리스트 */}
                        <div className='w-full'>
                            {isLoading && (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#9c524a]"></div>
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">오류!</strong>
                                    <span className="block sm:inline"> {error}</span>
                                </div>
                            )}
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                                {items.map(item => (
                                    <Link
                                        key={item.id}
                                        className='group'
                                        to={`/item/${item.id}/info`}
                                    >
                                        <div className='bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl'>
                                            <div
                                                className='h-48 bg-cover bg-center bg-no-repeat transition duration-300 ease-in-out transform group-hover:scale-105'
                                                style={{ backgroundImage: `url(${item.images[0]?.file})` }}
                                            />
                                            <div className='p-4'>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                                    {item.item_name}
                                                </h3>
                                                <p className="text-sm font-medium text-gray-600">
                                                    ₩{item.item_price.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 사이드바 */}
                {isSidebarOpen && (
                    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 z-50 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">필터</h2>
                            <button
                                onClick={toggleSidebar}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mb-6">
                            <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-700">
                                <FaPalette className="mr-2" />
                                색상
                            </h3>
                            {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].map(color => (
                                <label key={color} className="flex items-center mb-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={colorFilter.includes(color)}
                                        onChange={() => {
                                            if (colorFilter.includes(color)) {
                                                setColorFilter(colorFilter.filter(c => c !== color));
                                            } else {
                                                setColorFilter([...colorFilter, color]);
                                            }
                                        }}
                                        className="form-checkbox h-5 w-5 text-[#9c524a]"
                                    />
                                    <span className="ml-2 text-gray-700">{color}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mb-6">
                            <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-700">
                                <FaWonSign className="mr-2" />
                                가격 범위
                            </h3>
                            <input
                                type="range"
                                min="0"
                                max="600000"
                                value={priceRange.max}
                                onChange={e => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between mt-2 text-gray-600">
                                <span>₩0</span>
                                <span>₩{priceRange.max.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
                            >
                                초기화
                            </button>
                            <button
                                onClick={() => {
                                    applyFilters();
                                    toggleSidebar();
                                }}
                                className="px-4 py-2 bg-[#9c524a] text-white rounded-md hover:bg-[#7d413b] transition duration-300 ease-in-out"
                            >
                                적용하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default SearchedItemPage;
