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
    delivery_status: string;
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

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
    if (error) return <div className="text-red-500 text-center text-xl mt-10">{error}</div>;
    if (!orders || orders.length === 0) return <div className="text-gray-500 text-center text-xl mt-10">주문 내역이 없습니다.</div>;

    return (
        <div className='w-full mx-auto my-10 px-4'>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">주문 내역</h1>
            {orders.map((order) => (
                <div key={order.id} className='mb-10 bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className="bg-gray-100 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            주문 날짜: {new Date(order.order_create_date).toLocaleDateString()}
                        </h2>
                        <p className="text-sm text-gray-600">주문 번호: {order.id}</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {order.order_products.map((product) => (
                            <div key={product.id} className='flex items-center p-6 hover:bg-gray-50 transition-colors duration-200'>
                                <Link to={`/item/${product.item.id}/info`} className='flex items-start flex-grow'>
                                    <div className='w-24 h-32 bg-cover bg-center rounded-md mr-6'
                                        style={{ backgroundImage: `url(http://localhost:8000${product.item.images[0]?.file})` }} />
                                    <div className='flex-grow'>
                                        <h3 className="text-lg font-medium text-gray-900">{product.item.item_name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {product.option.opt_color}, {product.option.opt_size}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 mt-1">
                                            ${Number(product.item.item_price).toFixed(2)} x {product.order_amount}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            배송 상태: <span className="font-medium">{product.delivery_status}</span>
                                        </p>
                                    </div>
                                </Link>
                                <div className='flex flex-col items-end ml-6'>
                                    <p className="text-lg font-medium text-gray-900">
                                        ${(Number(product.item.item_price) * product.order_amount).toFixed(2)}
                                    </p>
                                    {product.review_enabled === 'Y' ? (
                                        <button
                                            onClick={() => handleReviewSubmit(product.id)}
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-200"
                                        >
                                            리뷰 작성
                                        </button>
                                    ) : (
                                        <span className="mt-2 px-4 py-2 bg-gray-200 text-gray-600 text-sm font-medium rounded-md">
                                            리뷰 완료
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 px-6 py-4 text-right">
                        <p className="text-lg font-medium text-gray-900">
                            총 주문금액: ${Number(order.order_total_price).toFixed(2)}
                        </p>
                    </div>
                </div>
            ))}
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
