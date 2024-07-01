import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const CategorizedItemPage: React.FC = () => {
    const [mainCategory, setMainCategory] = useState<string>('');
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [colorFilter, setColorFilter] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 600000 });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (mainCategory) {
            fetchSubCategories(mainCategory);
        }
    }, [mainCategory]);

    useEffect(() => {
        if (selectedSubCategory !== null) {
            fetchItems(selectedSubCategory);
        }
    }, [selectedSubCategory]);

    useEffect(() => {
        fetchAllItems();
    }, []);

    const fetchSubCategories = async (mainCateName: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/categories/sub-categories/?main_cate_name=${mainCateName}`);
            setSubCategories(response.data);
        } catch (error) {
            console.error('서브 카테고리를 불러오는 데 실패했습니다:', error);
            setError('서브 카테고리를 불러오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchItems = async (cateNo: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/items/categorized/?cate_no=${cateNo}`);
            setItems(response.data);
        } catch (error) {
            console.error('아이템을 불러오는 데 실패했습니다:', error);
            setError('아이템을 불러오는 데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const applyFilters = () => {
        fetchFilteredItems();
        setIsSidebarOpen(false);
    };

    const resetFilters = () => {
        setColorFilter([]);
        setPriceRange({ min: 0, max: 1000000 });
    };

    const fetchFilteredItems = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let url = selectedSubCategory !== null
                ? `http://localhost:8000/api/items/categorized/?cate_no=${selectedSubCategory}`
                : 'http://localhost:8000/api/items/all/';

            if (colorFilter.length > 0) {
                url += (url.includes('?') ? '&' : '?') + colorFilter.map(color => `color=${color}`).join('&');
            }
            if (priceRange.min > 0) {
                url += `${url.includes('?') ? '&' : '?'}min_price=${priceRange.min}`;
            }
            if (priceRange.max < 600000) {
                url += `${url.includes('?') ? '&' : '?'}max_price=${priceRange.max}`;
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
        <div className='main-container flex flex-col items-start bg-white relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-white relative overflow-hidden z-0'>
                <div className='flex pt-0 pr-0 pb-3 pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative'>
                    {/* main_cate_name */}
                    <div className='flex py-0 px-4 gap-8 justify-center items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-gray-300 relative'>
                        <div className='flex h-14 pt-4 pr-0 pb-3 pl-0 flex-col justify-center items-center shrink-0 flex-nowrap border-solid border-t-3 border-t-white relative'>
                            <div className='flex gap-8 justify-center items-center'>
                                {['top', 'pants', 'OUTER'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setMainCategory(cat)}
                                        className={`px-4 py-2 rounded ${mainCategory === cat ? 'bg-[#9c524a] text-white' : 'bg-white text-[#9c524a]'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* cate_name */}
                    <div className='flex pt-0 pr-4 pb-0 pl-4 gap-8 justify-center items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-gray-300 relative'>
                        <div className='flex h-14 pt-4 pr-0 pb-3 pl-0 flex-col justify-center items-center shrink-0 flex-nowrap border-solid border-t-3 border-t-white relative'>
                            <div className='flex gap-8 justify-center items-center mt-4'>
                                <button
                                    onClick={() => {
                                        setSelectedSubCategory(null);
                                        fetchAllItems();
                                    }}
                                    className={`px-4 py-2 rounded ${selectedSubCategory === null ? 'bg-[#9c524a] text-white' : 'bg-white text-[#9c524a]'}`}
                                >
                                    전체 상품
                                </button>
                                {subCategories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedSubCategory(cat.id)}
                                        className={`px-4 py-2 rounded ${selectedSubCategory === cat.id ? 'bg-[#9c524a] text-white' : 'bg-white text-[#9c524a]'}`}
                                    >
                                        {cat.cate_name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative'>
                    <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[8px] justify-center items-center self-stretch shrink-0 flex-wrap relative z-[54]'>
                        <div className='flex w-[30px] flex-col items-start flex-nowrap relative z-[55]'>
                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#4f7296] relative text-left whitespace-nowrap z-[56]">
                                랭킹
                            </span>
                        </div>
                    </div>
                    <div className='flex py-5 px-40 justify-center items-start self-stretch shrink-0 flex-nowrap relative'>
                        <div className='flex flex-col items-start grow shrink-0 relative overflow-hidden'>
                            {isLoading && <div>로딩 중...</div>}
                            {error && <div className="text-red-500">{error}</div>}
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                                {items.map(item => (
                                    <div key={item.id} className='flex flex-col'>
                                        <div className='h-44 bg-cover bg-no-repeat rounded-lg relative overflow-hidden'
                                            style={{ backgroundImage: `url(${item.images[0]?.file})` }} />
                                        <span className="text-base font-medium text-gray-900">
                                            {item.item_name}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            ₩{item.item_price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex py-5 px-40 justify-center items-start self-stretch shrink-0 flex-nowrap relative'>
                    <div className='flex flex-col items-start grow shrink-0 relative overflow-hidden border-t'>
                        {/* 필터링 */}
                        <div className='flex pt-4 pr-4 pb-4 pl-4 gap-2 items-start self-stretch shrink-0 flex-wrap relative border-b'>
                            {/* 색상으로 필터링 */}
                            <div className='flex flex-col items-start flex-nowrap relative cursor-pointer' onClick={toggleSidebar}>
                                <span className="text-base font-medium text-gray-900">
                                    색상
                                </span>
                            </div>
                            <div className='flex w-2 h-6 p-0 flex-col items-start flex-nowrap relative' />
                            {/* 가격으로 필터링 */}
                            <div className='flex flex-col items-start flex-nowrap relative cursor-pointer' onClick={toggleSidebar}>
                                <span className="text-base font-medium text-gray-900">
                                    가격
                                </span>
                            </div>
                        </div>
                        {/* 필터링된 상품 리스트 */}
                        <div className='flex pt-4 pr-4 pb-4 pl-4 flex-col gap-3 items-start self-stretch shrink-0 relative'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                                {items.map(item => (
                                    <div key={item.id} className='flex flex-col'>
                                        <div className='h-44 bg-cover bg-no-repeat rounded-lg relative overflow-hidden'
                                            style={{ backgroundImage: `url(${item.images[0]?.file})` }} />
                                        <span className="text-base font-medium text-gray-900">
                                            {item.item_name}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            ₩{item.item_price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {isSidebarOpen && (
                    <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-4 z-50">
                        <h2 className="text-lg font-bold mb-4">필터</h2>
                        <div className="mb-4">
                            <h3 className="font-medium mb-2">색상</h3>
                            {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].map(color => (
                                <label key={color} className="flex items-center mb-2">
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
                                        className="mr-2"
                                    />
                                    {color}
                                </label>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h3 className="font-medium mb-2">가격 범위</h3>
                            <input
                                type="range"
                                min="0"
                                max="600000"
                                value={priceRange.max}
                                onChange={e => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                                className="w-full"
                            />
                            <div className="flex justify-between">
                                <span>₩0</span>
                                <span>₩{priceRange.max}</span>
                            </div>
                        </div>
                        <button onClick={resetFilters} className="bg-gray-200 px-4 py-2 rounded mr-2">초기화</button>
                        <button onClick={applyFilters} className="bg-[#9c524a] text-white px-4 py-2 rounded">결과 보기</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategorizedItemPage;
