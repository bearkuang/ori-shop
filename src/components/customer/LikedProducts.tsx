import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ItemImage {
    id: number;
    file: string;
    item_no: number;
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
    item_price: string;
    item_soldout: string;
    item_is_display: string;
    item_company: string;
    images: ItemImage[];
    options: {
        id: number;
        item_no: number;
        opt_color: string;
        opt_size: string;
        opt_item_soldout: string;
        opt_stock: number;
    }[];
    likes: number;
    reviews: any[];
}

const LikedProducts: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9100/api/items/liked_items/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (Array.isArray(response.data)) {
                    setItems(response.data);
                    console.log(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (err) {
                setError('좋아요한 상품 목록을 불러오는데 실패했습니다.');
                console.error('Error fetching liked items:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!items || items.length === 0) return <div>좋아요 한 상품이 없습니다.</div>;

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[2]'>
                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                                <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[5]">
                                    Liked Products
                                </span>
                            </div>
                            {items.map((item) => (
                                <Link
                                    key={item.id}
                                    className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[6] border-b border-gray-300'
                                    to={`/item/${item.id}/info`}
                                >
                                    <div className='flex w-[316px] gap-[16px] items-start shrink-0 flex-nowrap relative z-[7]'>
                                        <div className='w-[70px] h-[93px] shrink-0 bg-cover bg-no-repeat rounded-[8px] relative overflow-hidden z-[8]' style={{ backgroundImage: `url(${item.images[0]?.file})` }} />
                                        <div className='flex flex-col justify-center items-start grow shrink-0 basis-0 flex-nowrap relative z-[9]'>
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-10'>
                                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[11]">
                                                    {item.item_name}
                                                </span>
                                            </div>
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[12]'>
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[13]">
                                                    {item.item_description}
                                                </span>
                                            </div>
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[14]'>
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[15]">
                                                    ${Number(item.item_price).toFixed(2)} ❤️ {item.likes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LikedProducts;
