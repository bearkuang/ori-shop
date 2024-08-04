import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface CartItem {
    id: number;
    item: {
        id: number;
        item_name: string;
        item_price: string;
        images: Array<{
            id: number;
            file: string;
        }>;
    };
    option: {
        opt_color: string;
        opt_size: string;
    };
    cart_order_amount: number;
}

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/items/view_cart/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (Array.isArray(response.data)) {
                    setCartItems(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (err) {
                setError('장바구니 목록을 불러오는데 실패했습니다.');
                console.error('Error fetching cart items:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!cartItems || cartItems.length === 0) return <div>장바구니가 비어있습니다.</div>;

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[2]'>
                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                                <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[5]">
                                    Shopping Cart
                                </span>
                            </div>
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[6] border-b border-gray-300'
                                >
                                    <Link
                                        to={`/item/${item.item.id}/info`}
                                        className='flex w-[316px] gap-[16px] items-start shrink-0 flex-nowrap relative z-[7]'
                                    >
                                        {/* 상품 이미지 */}
                                        <div className='w-[70px] h-[93px] shrink-0 bg-cover bg-no-repeat rounded-[8px] relative overflow-hidden z-[8]' style={{ backgroundImage: `url(http://localhost:8000${item.item.images[0]?.file})` }} />
                                        <div className='flex flex-col justify-center items-start grow shrink-0 basis-0 flex-nowrap relative z-[9]'>
                                            {/* 상품 이름 */}
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-10'>
                                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[11]">
                                                    {item.item.item_name}
                                                </span>
                                            </div>
                                            {/* 옵션 정보 */}
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[12]'>
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[13]">
                                                    {item.option.opt_color}, {item.option.opt_size}
                                                </span>
                                            </div>
                                            {/* 상품 가격 */}
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[14]'>
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[15]">
                                                    ${Number(item.item.item_price).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='flex w-[49px] h-[93px] flex-col items-end shrink-0 flex-nowrap relative z-[16]'>
                                        {/* 수량 */}
                                        <div className='flex w-[49px] flex-col items-end shrink-0 flex-nowrap relative z-[17]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-right whitespace-nowrap z-[18]">
                                                {item.cart_order_amount}개
                                            </span>
                                        </div>
                                        {/* 총 가격 */}
                                        <div className='flex w-[49px] flex-col items-end shrink-0 flex-nowrap relative z-[17]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-right whitespace-nowrap z-[18]">
                                                ${(Number(item.item.item_price) * item.cart_order_amount).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;