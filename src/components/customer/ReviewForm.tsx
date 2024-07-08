import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewForm: React.FC<{ productId: number, onClose: () => void, onReviewSubmit: (productId: number) => void }> = ({ productId, onClose, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('order_product_id', productId.toString());
        formData.append('review_star', rating.toString());
        formData.append('review_contents', content);
        if (image) {
            formData.append('review_image', image);
        }

        try {
            await axios.post('http://localhost:9100/api/reviews/create_review/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('리뷰가 성공적으로 작성되었습니다.');
            onReviewSubmit(productId);
            onClose();
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('리뷰 작성 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label className="block mb-2">별점</label>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-2">리뷰 내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block mb-2">이미지 업로드</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">제출</button>
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">취소</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;