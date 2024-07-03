import React from 'react';

interface RatingStats {
    total_reviews: number;
    average_rating: number | null;
    rating_stats: {
        [key: string]: number;
    };
}

interface ReviewStatsProps {
    ratingStats: RatingStats;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ ratingStats }) => {
    const { total_reviews, average_rating, rating_stats } = ratingStats;

    const getPercentage = (count: number): string => {
        return total_reviews > 0 ? ((count / total_reviews) * 100).toFixed(0) : "0";
    };

    if (total_reviews === 0) {
        return (
            <div className="text-center py-4">
                <p>아직 리뷰가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className='main-container flex w-full h-full pt-[20px] pr-[120px] pb-[20px] pl-[130px] justify-center items-start flex-nowrap relative mx-auto my-0'>
            <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden'>
                <div className='flex pt-[16px] pr-[50px] pb-[16px] gap-[32px] items-start self-stretch shrink-0 flex-wrap relative z-[3]'>
                    <div className='flex flex-row justify-between items-start w-full gap-[32px] relative z-[4]'>
                        <div className='flex flex-col gap-[8px] items-start flex-nowrap relative z-[5]'>
                            <div className='flex flex-col items-start shrink-0 flex-nowrap relative z-[6]'>
                                <span className="h-[45px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[36px] font-black leading-[45px] text-[#0c141c] tracking-[-1px] relative text-left whitespace-nowrap z-[7]">
                                    {average_rating ? average_rating.toFixed(1) : "N/A"}
                                </span>
                            </div>
                            <div className='flex w-[107px] gap-[2px] items-start shrink-0 flex-nowrap relative z-[8]'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className='flex w-[18px] flex-col items-start shrink-0 flex-nowrap relative z-[9]'>
                                        <div className='w-[18px] grow shrink-0 basis-0 relative overflow-hidden z-[10]'>
                                            <div className={`w-[18px] h-[18px] bg-cover bg-no-repeat absolute top-0 left-0 z-11 ${star <= (average_rating || 0) ? 'bg-yellow-400' : 'bg-gray-300'}`}>★</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex w-[108px] flex-col items-start shrink-0 flex-nowrap relative z-[12]'>
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-normal leading-[24px] text-[#0c141c] relative text-left whitespace-nowrap z-[13]">
                                    {total_reviews} reviews
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[12px] items-start w-[300px] relative z-[14]'>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className='flex items-center w-full relative z-[15]'>
                                    <div className='flex w-[20px] items-center justify-center shrink-0 relative z-[16]'>
                                        <span className="font-['Work_Sans'] text-[14px] font-normal leading-[21px] text-[#0c141c] z-[17]">
                                            {rating}
                                        </span>
                                    </div>
                                    <div className='flex-grow h-[8px] mx-2 bg-[#d1dbe5] rounded-[4px] relative overflow-hidden z-[18]'>
                                        <div
                                            className='h-full bg-[#358ce8] rounded-[4px] relative z-19'
                                            style={{ width: `${getPercentage(rating_stats[rating] || 0)}%` }}
                                        />
                                    </div>
                                    <div className='w-[40px] text-right shrink-0 relative z-[20]'>
                                        <span className="font-['Work_Sans'] text-[14px] font-normal leading-[21px] text-[#4f7296] z-[21]">
                                            {getPercentage(rating_stats[rating] || 0)}%
                                        </span>
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

export default ReviewStats;