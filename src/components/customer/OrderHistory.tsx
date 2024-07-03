import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';

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

interface OrderProduct {
    id: number;
    item: Item;
    option: {
        id: number;
        item_no: number;
        opt_color: string;
        opt_size: string;
        opt_item_soldout: string;
        opt_stock: number;
    };
    order_amount: number;
    review_enabled: string;
    order_product_status: string;
}

interface Order {
    id: number;
    cust_no: number;
    order_create_date: string;
    order_payment_status: string;
    order_payment_method: string;
    order_total_price: string;
    cust_address: string;
    order_products: OrderProduct[];
}

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/orders/my_orders/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (err) {
                setError('주문 목록을 불러오는데 실패했습니다.');
                console.error('Error fetching orders:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleReviewSubmit = (productId: number) => {
        setOrders(prevOrders => 
            prevOrders.map(order => ({
                ...order,
                order_products: order.order_products.map(product => 
                    product.id === productId 
                        ? { ...product, review_enabled: 'N' }
                        : product
                )
            }))
        );
    };

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!orders || orders.length === 0) return <div>주문 내역이 없습니다.</div>;

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[2]'>
                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                                <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[5]">
                                    Order History
                                </span>
                            </div>
                            {orders.map((order) => (
                                <div key={order.id} className='flex flex-col'>
                                    <span className="font-['Epilogue'] text-[18px] font-bold text-[#1c0f0c] mb-2 ml-3 mt-2">
                                        주문 날짜: {new Date(order.order_create_date).toLocaleDateString()}
                                    </span>
                                    {order.order_products.map((product) => (
                                        <div
                                            key={product.id}
                                            className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative z-[6] border-b border-gray-300'
                                        >
                                            <Link
                                                to={`/item/${product.item.id}/info`}
                                                className='flex w-[316px] gap-[16px] items-start shrink-0 flex-nowrap relative z-[7]'
                                            >
                                                {/* 주문 한 상품 이미지 */}
                                                <div className='w-[70px] h-[93px] shrink-0 bg-cover bg-no-repeat rounded-[8px] relative overflow-hidden z-[8]' style={{ backgroundImage: `url(http://localhost:8000${product.item.images[0]?.file})` }} />
                                                <div className='flex flex-col justify-center items-start grow shrink-0 basis-0 flex-nowrap relative z-[9]'>
                                                    {/* 주문 한 상품 이름 */}
                                                    <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-10'>
                                                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[11]">
                                                            {product.item.item_name}
                                                        </span>
                                                    </div>
                                                    {/* 주문 한 날짜 */}
                                                    <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[12]'>
                                                        <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[13]">
                                                            {new Date(order.order_create_date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    {/* 상품 가격 */}
                                                    <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[14]'>
                                                        <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[15]">
                                                            ${Number(product.item.item_price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className='flex w-[49px] h-[93px] flex-col items-start shrink-0 flex-nowrap relative z-[16]'>
                                                {/* 주문 한 총 가격 */}
                                                <div className='flex w-[49px] flex-col items-start shrink-0 flex-nowrap relative z-[17]'>
                                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[18]">
                                                        ${Number(order.order_total_price).toFixed(2)}
                                                    </span>
                                                </div>
                                                {/* 리뷰 작성하러 가기 */}
                                                <div className='flex w-[49px] mt-2 flex-col items-start shrink-0 flex-nowrap relative z-[17]'>
                                                    {product.review_enabled === 'Y' ? (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleReviewSubmit(product.id);
                                                            }}
                                                            className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] text-blue-400 font-normal leading-[24px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[18] underline"
                                                        >
                                                            리뷰 작성
                                                        </button>
                                                    ) : (
                                                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] text-gray-400 font-normal leading-[24px] relative text-left whitespace-nowrap z-[18]">
                                                            리뷰 완료
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showReviewForm && selectedProductId && (
                <ReviewForm
                    productId={selectedProductId}
                    onClose={() => {
                        setShowReviewForm(false);
                        setSelectedProductId(null);
                    }}
                    onReviewSubmit={handleReviewSubmit}
                />
            )}
        </div>
    );
};

export default OrderHistory;
