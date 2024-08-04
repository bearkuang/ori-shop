import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Option {
    opt_color: string;
    opt_size: string;
    opt_stock: number;
}

interface Product {
    id: number;
    item_name: string;
    item_price: number;
    item_soldout: string;
    item_is_display: string;
    sales_count: number;
    options: Option[];
    image_url?: string;
}

const AddedProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/companies/added_items/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('상품 목록을 불러오는데 실패했습니다:', error);
            }
        };

        fetchProducts();
    }, []);

    const getTotalStock = (options: Option[]) => {
        return options.reduce((total, option) => total + option.opt_stock, 0);
    };

    return (
        <div className="w-full pl-4 h-full overflow-y-auto bg-[#ffffff] p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#1c0f0c]">등록된 상품 목록</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/item/${product.id}/info`}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        {product.image_url && (
                            <img src={product.image_url} alt={product.item_name} className="w-full h-48 object-cover mb-4 rounded" />
                        )}
                        <h3 className="text-xl font-semibold mb-2 text-[#1c0f0c]">{product.item_name}</h3>
                        <p className="text-gray-700 mb-2">가격: {product.item_price.toLocaleString()}원</p>
                        <p className={`mb-2 ${product.item_soldout === 'N' ? 'text-green-600' : 'text-red-600'}`}>
                            재고 상태: {product.item_soldout === 'N' ? '재고 있음' : '품절'}
                        </p>
                        <p className={`mb-2 ${product.item_is_display === 'N' ? 'text-red-600' : 'text-green-600'}`}>
                            등록 상태: {product.item_is_display === 'N' ? '등록 대기 중' : '판매 중'}
                        </p>
                        <p className="text-gray-700 mb-2">총 재고: {getTotalStock(product.options)}</p>
                        <p className="text-gray-700 mb-2">총 판매량: {product.sales_count}</p>
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2 text-[#1c0f0c]">옵션:</h4>
                            <ul className="list-disc list-inside">
                                {product.options.map((option, index) => (
                                    <li key={index} className="text-gray-700">
                                        {option.opt_color} / {option.opt_size} - 재고: {option.opt_stock}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AddedProduct;