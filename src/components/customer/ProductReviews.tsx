import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'

interface Review {
    id: number;
    orderproduct_no: number;
    item: number;
    review_star: string;
    review_contents: string;
    review_image: string | null;
    review_create_date: string;
    customer_username: string;
}

interface Item {
    id: number;
    item_name: string;
    images: { file: string }[];
}

const ProductReviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [items, setItems] = useState<{ [key: number]: Item }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9100/api/reviews/my_reviews/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (Array.isArray(response.data)) {
                    setReviews(response.data);
                    // 리뷰에 포함된 모든 상품 ID 추출
                    const itemIds = response.data
                        .map(review => review.item)
                        .filter((value, index, self) => self.indexOf(value) === index);
                    // 각 상품 정보 가져오기
                    const itemPromises = itemIds.map(id =>
                        axios.get(`http://localhost:9100/api/items/${id}/info/`, {
                            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                        })
                    );
                    const itemResponses = await Promise.all(itemPromises);
                    const itemData = itemResponses.reduce((acc, response) => {
                        acc[response.data.id] = response.data;
                        return acc;
                    }, {} as { [key: number]: Item });
                    setItems(itemData);
                } else {
                    setError('Unexpected response format');
                }
            } catch (err) {
                setError('리뷰 목록을 불러오는데 실패했습니다.');
                console.error('Error fetching reviews:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!reviews || reviews.length === 0) return <div>리뷰 내역이 없습니다.</div>;

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[2]'>
                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                                <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[5]">
                                    내가 작성한 리뷰
                                </span>
                            </div>
                            {reviews.map((review) => {
                                const item = items[review.item];
                                return (
                                    <div key={review.id} className='flex flex-col border-b border-gray-300 p-4'>
                                        <div className='flex gap-[16px] items-start relative z-[7]'>
                                            {/* 상품 이미지 */}
                                            <Link to={`/item/${review.item}/info`} className='w-[70px] h-[93px] shrink-0'>
                                                {item && item.images && item.images[0] && (
                                                    <div
                                                        className='w-[70px] h-[93px] shrink-0 bg-cover bg-no-repeat rounded-[8px] relative overflow-hidden z-[8]'
                                                        style={{ backgroundImage: `url(http://localhost:8000${item.images[0].file})` }}
                                                    />
                                                )}
                                            </Link>
                                            <div className='flex flex-col justify-start items-start grow shrink-0 basis-0 flex-nowrap relative z-[9]'>
                                                {/* 상품 이름 */}
                                                <Link to={`/item/${review.item}/info`} className='mb-2'>
                                                    <span className="font-['Epilogue'] text-[16px] font-medium text-[#1c0f0c] whitespace-nowrap z-[11]">
                                                        {item ? item.item_name : '상품 정보 없음'}
                                                    </span>
                                                </Link>
                                                <div className='flex items-center justify-between w-full'>
                                                    {/* 별점 */}
                                                    <div className='flex items-center'>
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar key={i} color={i < Number(review.review_star) ? "#ffc107" : "#e4e5e9"} />
                                                        ))}
                                                    </div>
                                                    {/* 리뷰 작성 날짜 */}
                                                    <span className="font-['Epilogue'] text-[14px] font-normal text-[#9b5149] ml-2 z-[13]">
                                                        {new Date(review.review_create_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* 리뷰 내용 */}
                                        <div className='mt-4'>
                                            <p className="font-['Epilogue'] text-[14px] text-[#1c0f0c]">
                                                {review.review_contents}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;
