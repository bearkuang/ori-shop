import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';
import ReviewStats from './ReviewStats';
import axios from 'axios';

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
    item_company: {
        id: number;
        username: string;
        name: string;
        email: string;
    }
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
    reviews: Array<{
        id: number;
        review_star: number;
        review_contents: string;
        review_create_date: string;
        review_image: string;
        customer_username: string;
    }>;
    rating_stats: {
        total_reviews: number;
        average_rating: number;
        rating_stats: {
            [key: string]: number;
        }
    }
    average_rating: number;
}

const colorMap: { [key: string]: string } = {
    'Sky Blue': '#87CEEB',
    'Denim': '#1560BD',
    'White': '#FFFFFF',
};

const colorImageMap: { [key: string]: string } = {
    'Flower': '/color/flower.png',
};

const ItemDetailPage: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        if (item && item.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
            );
        }
    };

    const handleNextImage = () => {
        if (item && item.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % item.images.length
            );
        }
    };

    const fetchItemDetails = async (id: number): Promise<Item> => {
        try {
            console.log(`Fetching item details for id: ${id}`);
            const response = await axios.get(`http://localhost:8000/api/items/${id}/info/`);
            console.log('Received data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching item details:', error);
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
            }
            throw error;
        }
    };

    useEffect(() => {
        const getItemDetails = async () => {
            try {
                if (itemId) {
                    const numericItemId = parseInt(itemId, 10);
                    if (!isNaN(numericItemId)) {
                        const data = await fetchItemDetails(numericItemId);
                        setItem(data);
                    } else {
                        console.error('Invalid itemId:', itemId);
                    }
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            } finally {
                setLoading(false);
            }
        };

        getItemDetails();
    }, [itemId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!item) {
        return <div>Item not found</div>;
    }

    const handleBuyClick = () => {
        setIsMenuBarOpen(true);
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = async () => {
        if (selectedColor && selectedSize && item) {
            try {
                await axios.post('http://localhost:8000/api/items/add_to_cart/', {
                    quantity,
                    option: {
                        item_no: item.id,
                        opt_color: selectedColor,
                        opt_size: selectedSize
                    }
                });
                alert('장바구니에 담겼습니다.');
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('장바구니에 담는 중 오류가 발생했습니다.');
            }
        } else {
            alert('색상과 사이즈를 선택해주세요.');
        }
    };

    const handleOrderDirect = async () => {
        if (selectedColor && selectedSize && item) {
            try {
                await axios.post('http://localhost:8000/api/orders/order_direct/', {
                    item_id: item.id,
                    option_id: selectedOption?.id,
                    quantity,
                    order_total_price: item.item_price * quantity
                });
                alert('구매가 완료되었습니다.');
            } catch (error) {
                console.error('Error placing order:', error);
                alert('구매 중 오류가 발생했습니다.');
            }
        } else {
            alert('색상과 사이즈를 선택해주세요.');
        }
    };

    const selectedOption = item.options.find(option => option.opt_color === selectedColor && option.opt_size === selectedSize);

    return (
        <div className='main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[23]'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[24]'>
                    <div className='flex pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[25]'>
                        <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[26]'>
                            <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[8px] items-start self-stretch shrink-0 flex-wrap relative z-[27]'>
                                <span className="h-[24px] basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#9b5149] relative text-left whitespace-nowrap z-[28]">
                                    |
                                </span>
                                {/* 상품 기업 이름 */}
                                <div className='flex w-[75px] flex-col items-start flex-nowrap relative z-[29]'>
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#9b5149] relative text-left whitespace-nowrap z-30">
                                        {item.item_company.username}
                                    </span>
                                </div>
                                <div className='flex w-[5px] flex-col items-start flex-nowrap relative z-[31]'>
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#9b5149] relative text-left whitespace-nowrap z-[32]">
                                        |
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-row items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[23]'>
                                {/* 상품 이미지 */}
                                <div className='flex flex-col gap-[8px] items-start grow shrink-0 basis-0 bg-[#fcf7f7] rounded-[12px] relative overflow-hidden z-[34]'>
                                    <div className='flex h-[557px] gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[35]'>
                                        {item.images.length > 0 && (
                                            <>
                                                <img
                                                    src={item.images[currentImageIndex].file}
                                                    alt={`${item.item_name} - ${currentImageIndex + 1}`}
                                                    className='w-full h-full object-contain'
                                                />
                                                {item.images.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={handlePrevImage}
                                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                                                        >
                                                            &#8249;
                                                        </button>
                                                        <button
                                                            onClick={handleNextImage}
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                                                        >
                                                            &#8250;
                                                        </button>
                                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                            {item.images.map((_, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* 상품 정보 */}
                                <div className='flex flex-col items-start shrink-0 flex-nowrap relative z-[23] w-[360px]'>
                                    <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[189]'>
                                        <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[190]">
                                            Product Details
                                        </span>
                                    </div>
                                    <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[191]'>
                                        <div className='flex items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[192]'>
                                            <div className='flex w-[164px] pt-[16px] pr-[8px] pb-[16px] pl-0 flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap border-solid border-b border-b-[#e5e8ea] relative z-[193]'>
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[194]'>
                                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[195]">
                                                        Color
                                                    </span>
                                                </div>
                                                {/* 상품 색상 정보 */}
                                                <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[20px] items-start self-stretch shrink-0 flex-wrap relative z-[73]'>
                                                    {Array.from(new Set(item.options.map((option) => option.opt_color))).map((color, index) => (
                                                        <div key={index} className='flex w-[40px] h-[40px] flex-col items-start flex-nowrap rounded-[20px] border-solid border border-[#e8d1ce] relative z-[74]' style={{ 
                                                            backgroundColor: colorMap[color] || color,
                                                            backgroundImage: colorImageMap[color] ? `url(${colorImageMap[color]})` : 'none'
                                                        }}  />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='flex w-[164px] pt-[16px] pr-0 pb-[16px] pl-[8px] flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap border-solid border-b border-b-[#e5e8ea] relative z-[198]'>
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[199]'>
                                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[200]">
                                                        Size
                                                    </span>
                                                </div>
                                                {/* 상품 사이즈 정보 */}
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[201]'>
                                                    {Array.from(new Set(item.options.map((option) => option.opt_size))).map((size, index) => (
                                                        <span key={index} className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[202]">
                                                            {size}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[205]'>
                                        <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[206]">
                                            Shipping & Returns
                                        </span>
                                    </div>
                                    <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[207]'>
                                        <div className='flex items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[208]'>
                                            <div className='flex w-[164px] pt-[16px] pr-[8px] pb-[16px] pl-0 flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap border-solid border-b border-b-[#e5e8ea] relative z-[209]'>
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[210]'>
                                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[211]">
                                                        Estimated Arrival
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[212]'>
                                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[213]">
                                                        3-5 Business Days
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex w-[164px] pt-[16px] pr-0 pb-[16px] pl-[8px] flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap border-solid border-b border-b-[#e5e8ea] relative z-[214]'>
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[215]'>
                                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[216]">
                                                        Return Policy
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[217]'>
                                                    <span className="flex w-[156px] h-[42px] justify-start items-start self-stretch shrink-0 font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#1c0f0c] relative text-left z-[218]">
                                                        Free returns within 30 days
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 상품 이름 */}
                            <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[37]'>
                                <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[38]">
                                    {item.item_name}
                                </span>
                            </div>
                            {/* 상품 가격 */}
                            <div className='flex pt-[4px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[39]'>
                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-40">
                                    {item.item_price} 원
                                </span>
                            </div>
                            <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[5px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[81]'>
                                <button
                                    onClick={handleBuyClick}
                                    className='flex h-[40px] pt-0 pr-[16px] pb-0 pl-[16px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#f45442] rounded-[12px] relative overflow-hidden z-[42]'
                                >
                                    <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#fcf7f7] relative text-center overflow-hidden whitespace-nowrap z-[44]">
                                        구매하기
                                    </span>
                                </button>
                            </div>
                            <div className='flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[16px] items-start self-stretch shrink-0 flex-wrap relative z-[45]'>
                                <div className='flex w-[82px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap relative z-[46]'>
                                    {/* 좋아요 버튼 */}
                                    <button className='flex items-center gap-2 text-gray-600 hover:text-blue-500'>
                                        <FaThumbsUp className="text-xl" />
                                        {/* 좋아요 수 */}
                                        <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[13px] font-bold leading-[20px] text-[#9b5149] relative text-left whitespace-nowrap z-[51]">
                                            {item.likes}
                                        </span>
                                    </button>
                                </div>
                                <div className='flex w-[84px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap relative z-[52]'>
                                    {/* 댓글 아이콘 */}
                                    <div className='flex w-[24px] flex-col items-start shrink-0 flex-nowrap relative z-[53]'>
                                        <FaComment className="text-xl" />
                                    </div>
                                    {/* 리뷰 수 */}
                                    <div className='flex w-[28px] flex-col items-start shrink-0 flex-nowrap relative z-[56]'>
                                        <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[13px] font-bold leading-[20px] text-[#9b5149] relative text-left whitespace-nowrap z-[57]">
                                            {item.reviews.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex pt-0 pr-0 pb-[12px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[64]'>
                                <div className='flex pt-0 pr-[16px] pb-0 pl-[16px] gap-[32px] items-start self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#e8d1ce] relative z-[65]'>
                                    <div className='flex w-[84px] pt-[16px] pr-0 pb-[13px] pl-0 flex-col justify-center items-center shrink-0 flex-nowrap border-solid border-t-[3px] border-t-[#e5e8ea] relative z-[66]'>
                                        <div className='flex w-[84px] flex-col items-start shrink-0 flex-nowrap relative z-[67]'>
                                            <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[68]">
                                                Description
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 상품 설명 */}
                            <div className='flex pt-[4px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[69]'>
                                <span className="flex w-[836px] h-[72px] justify-start items-start self-stretch shrink-0 font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-left z-[70]">
                                    {item.item_description}
                                </span>
                            </div>
                            {/* ReviewStats 컴포넌트 */}
                            <div className='flex pt-0 pr-0 pb-0 pl-0 w-3/5 gap-[32px] flex-col items-start self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[78]'>
                                {item && item.rating_stats && (
                                    <ReviewStats ratingStats={item.rating_stats} />
                                )}
                            </div>
                            {/* Customer Reviews */}
                            <div className='flex pt-[16px] pr-[16px] pb-[8px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[76]'>
                                <span className="h-[23px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[18px] font-bold leading-[23px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[77]">
                                    Customer Reviews
                                </span>
                            </div>
                            <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap bg-[#fcf7f7] relative overflow-hidden z-[78]'>
                                {item.reviews.map((review) => (
                                    <div key={review.id} className='flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap bg-[#fcf7f7] relative z-[79]'>
                                        {/* 리뷰 작성자 및 날짜 */}
                                        <div className='flex flex-col items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[80]'>
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[81]'>
                                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[20px] font-semibold leading-[10px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[82]">
                                                    {review.customer_username}
                                                </span>
                                            </div>
                                            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[83]'>
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#9b5149] relative text-left whitespace-nowrap z-[84]">
                                                    {new Date(review.review_create_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        {/* 리뷰 별점 */}
                                        <div className='flex gap-[2px] items-start self-stretch shrink-0 flex-nowrap relative z-[85]'>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar key={star} className={`text-2xl ${star <= review.review_star ? 'text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        {/* 리뷰 이미지가 있다면 표시 */}
                                        {review.review_image !== '0' && (
                                            <div className='flex w-[100px] h-[100px] relative z-[103]'>
                                                <img src={review.review_image} alt="Review" className='w-full h-full object-cover' />
                                            </div>
                                        )}
                                        {/* 리뷰 내용 */}
                                        <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[101]'>
                                            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[102]">
                                                {review.review_contents}
                                            </span>
                                        </div>
                                        {/* 리뷰 좋아요/싫어요 버튼 */}
                                        <div className='flex gap-[36px] items-start self-stretch shrink-0 flex-nowrap relative z-[103]'>
                                            <button className='flex items-center gap-2 text-gray-600 hover:text-blue-500'>
                                                <FaThumbsUp className="text-xl" />
                                                <span>0</span>
                                            </button>
                                            <button className='flex items-center gap-2 text-gray-600 hover:text-red-500'>
                                                <FaThumbsDown className="text-xl" />
                                                <span>0</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* "See all reviews" 버튼 */}
                                <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[184]'>
                                    <div className='flex w-[138px] h-[40px] pt-0 pr-[16px] pb-0 pl-[16px] justify-center items-center shrink-0 flex-nowrap rounded-[12px] relative overflow-hidden z-[185]'>
                                        <div className='flex w-[106px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[186]'>
                                            <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#1c0f0c] relative text-center overflow-hidden whitespace-nowrap z-[187]">
                                                See all reviews
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuBarOpen && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-6 z-50 max-w-[1280px] mx-auto">
                    <div className="flex flex-col space-y-6">
                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            <option value="">Select Color</option>
                            {item.options.map(option => (
                                <option key={option.id} value={option.opt_color}>{option.opt_color}</option>
                            ))}
                        </select>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            <option value="">Select Size</option>
                            {item.options.map(option => (
                                <option key={option.id} value={option.opt_size}>{option.opt_size}</option>
                            ))}
                        </select>
                        {selectedOption && (
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                                        <span className="text-lg font-semibold">{`${selectedOption.opt_color}, ${selectedOption.opt_size} - ${quantity} 개 - ${item.item_price * quantity} 원`}</span>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">-</button>
                                            <span className="text-lg">{quantity}</span>
                                            <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">+</button>
                                            <span className="text-lg font-semibold">{`${item.item_price * quantity} 원`}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">{`상품 ${quantity} 개`}</span>
                                        <div className="flex items-center text-lg font-semibold space-x-2">
                                            {`${item.item_price * quantity} 원`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <button onClick={handleAddToCart} className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">장바구니</button>
                            <button onClick={handleOrderDirect} className="bg-[#f45442] text-white px-4 py-2 rounded-lg hover:bg-[#e34331]">구매하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetailPage;
