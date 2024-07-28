import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AddProductProps {
    onProductAdded: () => void;
}

interface Category {
    id: number;
    main_cate_name: string;
    cate_name: string;
}

interface FormData {
    cate_no: number;
    item_name: string;
    item_description: string;
    item_price: number;
    images: File[];
    options: { opt_color: string; opt_size: string; opt_stock: number; }[];
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
    const [formData, setFormData] = useState<FormData>({
        cate_no: 0,
        item_name: '',
        item_description: '',
        item_price: 0,
        images: [],
        options: [{ opt_color: '', opt_size: '', opt_stock: 0 }],
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? selectedFiles.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % selectedFiles.length
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'cate_no' ? parseInt(value, 10) : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handlePrevFile = () => {
        setSelectedFiles((prevFiles) => [prevFiles[prevFiles.length - 1], ...prevFiles.slice(0, prevFiles.length - 1)]);
    };

    const handleNextFile = () => {
        setSelectedFiles((prevFiles) => [...prevFiles.slice(1), prevFiles[0]]);
    };

    const handleOptionChange = (index: number, field: string, value: string | number) => {
        const newOptions = [...formData.options];
        newOptions[index] = { ...newOptions[index], [field]: value };
        setFormData({ ...formData, options: newOptions });
    };

    const addOption = () => {
        setFormData({
            ...formData,
            options: [...formData.options, { opt_color: '', opt_size: '', opt_stock: 0 }],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        // 기본 필드 추가
        data.append('cate_no', formData.cate_no.toString());
        data.append('item_name', formData.item_name);
        data.append('item_description', formData.item_description);
        data.append('item_price', formData.item_price.toString());

        // 누락된 필드 추가
        data.append('item_soldout', 'N');  // 기본값 설정
        data.append('item_is_display', 'N');  // 기본값 설정

        // 옵션 데이터 추가
        data.append('options', JSON.stringify(formData.options));

        // 이미지 파일 추가
        selectedFiles.forEach((file, index) => {
            data.append(`images`, file);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/items/add_item/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Product added successfully:', response.data);
            onProductAdded();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    useEffect(() => {
        // 카테고리 데이터 가져오기
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='main-container flex w-full h-full flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0 overflow-y-auto'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-visible w-full'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1] w-full'>
                    <div className='flex h-auto pt-[20px] pr-[20px] pb-[20px] pl-[0px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[2] w-full'>
                        <div className='flex h-auto pt-[20px] pr-[160px] pb-[20px] pl-[1px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[2] w-full'>
                            <div className='flex w-full h-auto pt-0 pr-0 pb-[20px] pl-0 flex-col items-start shrink-0 flex-nowrap relative overflow-visible z-[3]'>
                                <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
                                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Add a Product</h1>
                                    <form onSubmit={handleSubmit} className='space-y-6'>
                                        {/* 이미지 업로드 섹션 */}
                                        <div className='space-y-2'>
                                            <label className="block text-lg font-semibold text-gray-700">Product Images</label>
                                            <div className="relative w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                                {selectedFiles.length > 0 ? (
                                                    <>
                                                        {selectedFiles[currentImageIndex].type.startsWith('image/') && (
                                                            <img
                                                                src={URL.createObjectURL(selectedFiles[currentImageIndex])}
                                                                alt="Selected"
                                                                className="object-contain w-full h-full"
                                                            />
                                                        )}
                                                        {selectedFiles[currentImageIndex].type.startsWith('video/') && (
                                                            <video controls className="object-contain w-full h-full">
                                                                <source src={URL.createObjectURL(selectedFiles[currentImageIndex])} />
                                                            </video>
                                                        )}
                                                        {selectedFiles.length > 1 && (
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
                                                                    {selectedFiles.map((_, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                                                                        ></div>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center">
                                                        <p className="text-center text-gray-500">사진과 동영상을 여기에 끌어다 놓으세요</p>
                                                        <label htmlFor="file-upload" className="mt-4 cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                                                            파일 선택
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            accept="image/*,video/*"
                                                            multiple
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 제품명 입력 */}
                                        <div className='space-y-2'>
                                            <label htmlFor="item_name" className="block text-lg font-semibold text-gray-700">Product Name</label>
                                            <input
                                                type="text"
                                                id="item_name"
                                                name="item_name"
                                                value={formData.item_name}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter product name"
                                                required
                                            />
                                        </div>

                                        {/* 제품 설명 입력 */}
                                        <div className='space-y-2'>
                                            <label htmlFor="item_description" className="block text-lg font-semibold text-gray-700">Product Description</label>
                                            <textarea
                                                id="item_description"
                                                name="item_description"
                                                value={formData.item_description}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                                                placeholder="Enter product description"
                                                required
                                            />
                                        </div>

                                        {/* 옵션 입력 */}
                                        <div className='space-y-2'>
                                            <label className="block text-lg font-semibold text-gray-700">Options</label>
                                            {formData.options.map((option, index) => (
                                                <div key={index} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Color"
                                                        value={option.opt_color}
                                                        onChange={(e) => handleOptionChange(index, 'opt_color', e.target.value)}
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Size"
                                                        value={option.opt_size}
                                                        onChange={(e) => handleOptionChange(index, 'opt_size', e.target.value)}
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Stock"
                                                        value={option.opt_stock}
                                                        onChange={(e) => handleOptionChange(index, 'opt_stock', parseInt(e.target.value))}
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                                                    />
                                                </div>
                                            ))}
                                            <button type="button" onClick={addOption} className="mt-2 p-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition">
                                                Add Option
                                            </button>
                                        </div>

                                        {/* 가격 입력 */}
                                        <div className='space-y-2'>
                                            <label htmlFor="item_price" className="block text-lg font-semibold text-gray-700">Price</label>
                                            <input
                                                type="number"
                                                id="item_price"
                                                name="item_price"
                                                value={formData.item_price}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter price"
                                                required
                                            />
                                        </div>

                                        {/* 카테고리 입력 */}
                                        <div className='space-y-2'>
                                            <label htmlFor="cate_no" className="block text-lg font-semibold text-gray-700">Category</label>
                                            <select
                                                id="cate_no"
                                                name="cate_no"
                                                value={formData.cate_no.toString()}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id.toString()}>
                                                        {category.main_cate_name} - {category.cate_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* 제출 및 취소 버튼 */}
                                        <div className='flex justify-end space-x-4'>
                                            <button
                                                type="button"
                                                className='px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition'
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className='px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition'
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;