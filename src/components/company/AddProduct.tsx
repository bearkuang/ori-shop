import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
    cate_no: string;
    item_name: string;
    item_description: string;
    item_price: string;
    images: File[];
    options: { opt_color: string; opt_size: string; opt_stock: number; }[];
}

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        cate_no: '',
        item_name: '',
        item_description: '',
        item_price: '',
        images: [],
        options: [{ opt_color: '', opt_size: '', opt_stock: 0 }],
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        data.append('cate_no', formData.cate_no);
        data.append('item_name', formData.item_name);
        data.append('item_description', formData.item_description);
        data.append('item_price', formData.item_price);
        
        // 누락된 필드 추가
        data.append('item_soldout', 'N');  // 기본값 설정
        data.append('item_is_display', 'Y');  // 기본값 설정
        
        // 옵션 데이터 추가
        data.append('options', JSON.stringify(formData.options));
        
        // 이미지 파일 추가
        selectedFiles.forEach((file, index) => {
            data.append(`images`, file);
        });
    
        try {
            const response = await axios.post('http://localhost:9100/api/items/add_item/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Product added successfully:', response.data);
            navigate("/companypage")
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className='main-container flex w-full min-w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0 overflow-x-auto overflow-y-auto'>
            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-visible w-full'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1] w-full'>
                    <div className='flex h-auto pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[2] w-full'>
                        <div className='flex w-full h-auto pt-[20px] pr-0 pb-[20px] pl-0 flex-col items-start shrink-0 flex-nowrap relative overflow-visible z-[3]'>
                            <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] justify-between items-start self-stretch shrink-0 flex-wrap relative z-[4]'>
                                <div className='flex w-[288px] flex-col items-start flex-nowrap relative z-[5]'>
                                    <span className="h-[40px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[32px] font-bold leading-[40px] text-[#161111] relative text-left whitespace-nowrap z-[6]">
                                        Add a product
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                                {/* Product Images */}
                                <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[7]'>
                                    <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#161111] relative text-left whitespace-nowrap z-[8]">
                                        Product Images
                                    </span>
                                </div>
                                <div className="relative w-[702px] h-full flex items-center justify-center bg-gray-200">
                                    {selectedFiles.length > 0 ? (
                                        <>
                                            {selectedFiles[0].type.startsWith('image/') && (
                                                <img src={URL.createObjectURL(selectedFiles[0])} alt="Selected" className="object-contain h-full" />
                                            )}
                                            {selectedFiles[0].type.startsWith('video/') && (
                                                <video controls className="object-contain h-full">
                                                    <source src={URL.createObjectURL(selectedFiles[0])} />
                                                </video>
                                            )}
                                            {selectedFiles.length > 1 && (
                                                <>
                                                    <button onClick={handlePrevFile} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-50 hover:opacity-100">
                                                        &lt;
                                                    </button>
                                                    <button onClick={handleNextFile} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-50 hover:opacity-100">
                                                        &gt;
                                                    </button>
                                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                        {selectedFiles.map((_, index) => (
                                                            <div
                                                                key={index}
                                                                className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-gray-800' : 'bg-gray-400'}`}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <p className="text-center">사진과 동영상을 여기에 끌어다 놓으세요</p>
                                            <input type="file" accept="image/*,video/*" multiple onChange={handleImageChange} className="mt-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Product Name */}
                                <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[25]'>
                                    <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#161111] relative text-left whitespace-nowrap z-[26]">
                                        Product Name
                                    </span>
                                </div>
                                <div className='flex w-[480px] h-[78px] pt-[31px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end shrink-0 flex-wrap relative z-[27]'>
                                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative z-[28]'>
                                        <div className='flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dddb] relative overflow-hidden z-[29]'>
                                            <input
                                                type="text"
                                                id="item_name"
                                                name="item_name"
                                                value={formData.item_name}
                                                onChange={handleInputChange}
                                                className="w-full h-full border-none outline-none font-['Epilogue'] text-[16px] text-[#896660]"
                                                placeholder="Enter product name"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Description */}
                                <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[31]'>
                                    <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#161111] relative text-left whitespace-nowrap z-[32]">
                                        Product Description
                                    </span>
                                </div>
                                <div className='flex w-[480px] h-[189px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] justify-center items-center shrink-0 flex-wrap relative z-[33]'>
                                    <div className='flex h-[103px] flex-col justify-center items-center grow basis-0 flex-nowrap relative z-[34]'>
                                        <div className='flex pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dddb] relative overflow-hidden z-[35]'>
                                            <textarea
                                                id="item_description"
                                                name="item_description"
                                                value={formData.item_description}
                                                onChange={handleInputChange}
                                                className="w-full h-full border-none outline-none font-['Epilogue'] text-[16px] text-[#896660]"
                                                placeholder="Enter product description"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Options */}
                                <div className='flex h-[62px] pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[36]'>
                                    <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#161111] relative text-left whitespace-nowrap z-[37]">
                                        Options
                                    </span>
                                </div>
                                <div className='flex flex-col w-full px-4'>
                                    <div className='flex pt-[12px] pb-[12px] gap-[8px] items-start self-stretch shrink-0 flex-wrap relative z-[38] w-[700px]'>
                                        {formData.options.map((option, index) => (
                                            <div key={index} className="flex gap-2 mb-2 w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Color"
                                                    value={option.opt_color}
                                                    onChange={(e) => handleOptionChange(index, 'opt_color', e.target.value)}
                                                    className="flex-[2] p-2 border rounded font-['Epilogue'] text-[14px] text-[#896660]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Size"
                                                    value={option.opt_size}
                                                    onChange={(e) => handleOptionChange(index, 'opt_size', e.target.value)}
                                                    className="flex-[2] p-2 border rounded font-['Epilogue'] text-[14px] text-[#896660]"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Stock"
                                                    value={option.opt_stock}
                                                    onChange={(e) => handleOptionChange(index, 'opt_stock', parseInt(e.target.value))}
                                                    className="flex-[1] p-2 border rounded font-['Epilogue'] text-[14px] text-[#896660]"
                                                />
                                            </div>
                                        ))}
                                        <button type="button" onClick={addOption} className="mt-2 p-2 bg-[#f4f2ef] rounded-[16px] font-['Epilogue'] text-[14px] font-medium text-[#161111]">
                                            Add Option
                                        </button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className='flex h-[67px] pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[78]'>
                                    <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#161111] relative text-left whitespace-nowrap z-[79]">
                                        Price
                                    </span>
                                </div>
                                <div className='flex w-[480px] h-[74px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[16px] items-end shrink-0 flex-wrap relative z-[80]'>
                                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative z-[81]'>
                                        <div className='flex h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dddb] relative overflow-hidden z-[82]'>
                                            <input
                                                type="number"
                                                id="item_price"
                                                name="item_price"
                                                value={formData.item_price}
                                                onChange={handleInputChange}
                                                className="w-full h-full border-none outline-none font-['Epilogue'] text-[16px] text-[#896660]"
                                                placeholder="Enter price"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className='flex pt-[20px] pr-[16px] pb-[12px] pl-[16px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[84]'>
                                    <span className="h-[28px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[22px] font-bold leading-[28px] text-[#161111] relative text-left whitespace-nowrap z-[85]">
                                        Category
                                    </span>
                                </div>
                                <div className='flex w-[480px] justify-center items-center shrink-0 flex-nowrap relative z-[86]'>
                                    <div className='flex w-[448px] h-[56px] pt-[15px] pr-[15px] pb-[15px] pl-[15px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[12px] border-solid border border-[#e5dddb] relative overflow-hidden z-[87]'>
                                        <input
                                            type="number"
                                            id="cate_no"
                                            name="cate_no"
                                            value={formData.cate_no}
                                            onChange={handleInputChange}
                                            className="w-full h-full border-none outline-none font-['Epilogue'] text-[16px] text-[#896660]"
                                            placeholder="Enter category number"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit and Cancel buttons */}
                                <div className='flex h-[93px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[50px] items-end self-stretch shrink-0 flex-nowrap relative z-[89]'>
                                    <button
                                        type="submit"
                                        className='flex w-[84px] h-[40px] pt-0 pr-[16px] pb-0 pl-[16px] gap-[15px] items-center shrink-0 flex-nowrap bg-[#f46047] rounded-[20px] relative overflow-hidden z-[90]'
                                    >
                                        <div className='flex w-[51px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[91]'>
                                            <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#fff] relative text-center overflow-hidden whitespace-nowrap z-[92]">
                                                Submit
                                            </span>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        className='flex w-[84px] h-[40px] pt-0 pr-[16px] pb-0 pl-[16px] gap-[15px] items-center shrink-0 flex-nowrap bg-[#f4f2ef] rounded-[20px] relative overflow-hidden z-[93]'
                                    >
                                        <div className='flex w-[50px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[94]'>
                                            <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#161111] relative text-center overflow-hidden whitespace-nowrap z-[95]">
                                                Cancel
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
