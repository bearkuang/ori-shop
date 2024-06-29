import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface Category {
    id: number;
    main_cate_name: string;
    cate_name: string;
}

interface SubCategory {
    id: number;
    cate_name: string;
}

interface Item {
    id: number;
    cate_no: number;
    item_name: string;
    item_price: string;
    item_create_date: string;
    item_soldout: string;
    item_is_display: string;
    item_company: string;
    images: { id: number; file: string; item_no: number }[];
    likes: number;
}

const CategorizedItemPage: React.FC = () => {
    const [mainCategories, setMainCategories] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const response = await axios.get<Category[]>('http://localhost:8000/api/categories/');
                const mainCategories = Array.from(new Set(response.data.map((category: Category) => category.main_cate_name)));
                setMainCategories(mainCategories);
            } catch (error) {
                console.error('Error fetching main categories', error);
            }
        };

        fetchMainCategories();
    }, []);

    const fetchSubCategories = async (mainCategory: string) => {
        try {
            const response = await axios.get<SubCategory[]>(`http://localhost:8000/api/categories/sub-categories/?main_cate_name=${mainCategory}`);
            setSubCategories(response.data);
        } catch (error) {
            console.error('Error fetching sub-categories', error);
        }
    };

    const fetchItems = async (subCategoryId: number) => {
        try {
            const response = await axios.get<Item[]>(`http://localhost:8000/api/items/categorized/?cate_no=${subCategoryId}`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items', error);
        }
    };

    const handleMainCategoryClick = (mainCategory: string) => {
        if (selectedMainCategory !== mainCategory) {
            setSelectedMainCategory(mainCategory);
            setSelectedSubCategory('');
            fetchSubCategories(mainCategory); // Fetch sub-categories when a main category is selected
        } else {
            setSelectedMainCategory('');
            setSubCategories([]);
        }
    };

    const handleSubCategoryClick = (subCategory: SubCategory) => {
        setSelectedSubCategory(subCategory.cate_name);
        fetchItems(subCategory.id);
        navigate(`/items?category=${selectedMainCategory}&subCategory=${subCategory.cate_name}`);
    };

    return (
        <div className="main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0">
            <div className="flex w-[1280px] pt-[12px] pr-[40px] pb-[12px] pl-[40px] justify-between items-center shrink-0 flex-nowrap border-solid border-t border-t-[#e5e8ea] relative">
                <div className="flex w-[72px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[1]">
                    <div className="flex w-[16px] flex-col items-start shrink-0 flex-nowrap relative z-[2]">
                        <div className="w-[16px] grow shrink-0 basis-0 bg-cover bg-no-repeat relative overflow-hidden z-[3]" />
                    </div>
                    <div className="flex w-[40px] flex-col items-start shrink-0 flex-nowrap relative z-[4]">
                        <span className="h-[23px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[18px] font-bold leading-[23px] text-[#1c0f0c] relative text-left whitespace-nowrap z-[5]">
                            D'ori
                        </span>
                    </div>
                </div>
                <div className="flex gap-[32px] justify-end items-start grow shrink-0 basis-0 flex-nowrap relative z-[8]">
                    <div className="flex w-[160px] flex-col items-start shrink-0 flex-nowrap relative z-[9]">
                        <div className="flex items-start self-stretch grow shrink-0 basis-0 flex-nowrap rounded-[12px] relative z-10">
                            <div className="flex w-[40px] pt-0 pr-0 pb-0 pl-[16px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#f4f2ef] rounded-tl-[12px] rounded-tr-none rounded-br-none rounded-bl-[12px] relative z-[11]">
                                <div className="h-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[12]">
                                    <div className="w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[13]" />
                                </div>
                            </div>
                            <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[8px] items-center self-stretch grow shrink-0 basis-0 flex-nowrap bg-[#f4f2ef] rounded-tl-none rounded-tr-[12px] rounded-br-[12px] rounded-bl-none relative overflow-hidden z-[14]">
                                <span className="h-[24px] shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-left whitespace-nowrap z-[15]">
                                    Search
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[88px] gap-[8px] items-start shrink-0 flex-nowrap relative z-[16]">
                        <div className="flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#f4f2ef] rounded-[20px] relative overflow-hidden z-[17]">
                            <div className="flex flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[18]">
                                <div className="self-stretch grow shrink-0 basis-0 relative overflow-hidden z-[19]">
                                    <div className="w-[20px] h-[20px] bg-cover bg-no-repeat absolute top-0 left-0 z-[20]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[40px] h-[40px] pt-0 pr-[10px] pb-0 pl-[10px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#f4f2ef] rounded-[20px] relative overflow-hidden z-[21]">
                            <div className="flex flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[22]">
                                <div className="self-stretch grow shrink-0 basis-0 relative overflow-hidden z-[23]">
                                    <div className="w-[20px] h-[20px] bg-cover bg-no-repeat absolute top-0 left-0 z-[24]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-[32px] justify-end items-start grow shrink-0 basis-0 flex-nowrap relative z-[6] ml-5 border-t">
                {mainCategories.map((mainCategory) => (
                    <div key={mainCategory} className="relative group">
                        <div className="flex items-center cursor-pointer" onClick={() => handleMainCategoryClick(mainCategory)}>
                            <span className="font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#9b5149]">
                                {mainCategory}
                            </span>
                            <FiChevronDown className={`ml-2 transition-transform ${selectedMainCategory === mainCategory ? "rotate-180" : ""}`} />
                        </div>
                        <AnimatePresence>
                            {selectedMainCategory === mainCategory && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="absolute z-50 bg-white shadow-md rounded-lg mt-2"
                                    style={{ minWidth: '200px', border: '1px solid #ddd' }} // Ensure visibility
                                >
                                    {subCategories.map((subCategory) => (
                                        <div
                                            key={subCategory.id}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSubCategoryClick(subCategory)}
                                        >
                                            {subCategory.cate_name}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[23]">
                <div className="flex pt-0 pr-0 pb-[12px] pl-0 flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[24]">
                    <div className="flex pt-0 pr-[16px] pb-0 pl-[16px] gap-[32px] items-start self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#e8d1ce] relative z-[25]">
                        {selectedMainCategory && selectedSubCategory && (
                            <div className="flex items-center space-x-2">
                                <span className="font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#9c524a]">
                                    {selectedMainCategory}
                                </span>
                                <span className="font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#9b5149]">
                                    /
                                </span>
                                <span className="font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#9b5149]">
                                    {selectedSubCategory}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex h-[942px] flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[35]">
                    <div className="flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[37]">
                        <div className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[8px] items-start self-stretch shrink-0 flex-wrap relative z-[38]">
                            <div className="flex w-[46px] flex-col items-start flex-nowrap relative z-[39]">
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#4f7296] relative text-left whitespace-nowrap z-40">
                                    Home
                                </span>
                            </div>
                            <div className="flex w-[8px] flex-col items-start flex-nowrap relative z-[41]">
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#4f7296] relative text-left whitespace-nowrap z-[42]">
                                    /
                                </span>
                            </div>
                            <div className="flex w-[30px] flex-col items-start flex-nowrap relative z-[43]">
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#0c141c] relative text-left whitespace-nowrap z-[44]">
                                    {selectedMainCategory}
                                </span>
                            </div>
                            <div className="flex w-[8px] flex-col items-start flex-nowrap relative z-[45]">
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#4f7296] relative text-left whitespace-nowrap z-[46]">
                                    /
                                </span>
                            </div>
                            <div className="flex w-[45px] flex-col items-start flex-nowrap relative z-[47]">
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#0c141c] relative text-left whitespace-nowrap z-[48]">
                                    {selectedSubCategory}
                                </span>
                            </div>
                        </div>
                        <div className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[49]">
                            <div className="flex gap-[12px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-50">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex w-[176px] pt-0 pr-0 pb-[12px] pl-0 flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[51]"
                                    >
                                        <div
                                            className="h-[176px] self-stretch shrink-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-[52]"
                                            style={{ backgroundImage: `url(${item.images[0]?.file})` }}
                                        />
                                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[53]">
                                            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[54]">
                                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[16px] font-medium leading-[24px] text-[#0c141c] relative text-left whitespace-nowrap z-[55]">
                                                    {item.item_name}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[56]">
                                                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Work_Sans'] text-[14px] font-normal leading-[21px] text-[#4f7296] relative text-left whitespace-nowrap z-[57]">
                                                    ${item.item_price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[94]">
                    <div className="flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[95]">
                        <div className="flex pt-[40px] pr-[20px] pb-[40px] pl-[20px] flex-col gap-[24px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[96]">
                            <div className="flex justify-between items-center self-stretch shrink-0 flex-wrap relative z-[97]">
                                <div className="flex w-[160px] flex-col items-center flex-nowrap relative z-[98]">
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[99]">
                                        About Us
                                    </span>
                                </div>
                                <div className="flex w-[160px] flex-col items-center flex-nowrap relative z-[100]">
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[101]">
                                        Contact
                                    </span>
                                </div>
                                <div className="flex w-[160px] flex-col items-center flex-nowrap relative z-[102]">
                                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[103]">
                                        Terms of Service
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-[16px] justify-center items-start self-stretch shrink-0 flex-wrap relative z-[104]">
                                <div className="flex w-[24px] flex-col items-center flex-nowrap relative z-[105]">
                                    <div className="flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[106]">
                                        <div className="w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[107]">
                                            <div className="w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[108]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[24px] flex-col items-center flex-nowrap relative z-[109]">
                                    <div className="flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[110]">
                                        <div className="w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[111]">
                                            <div className="w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[112]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[24px] flex-col items-center flex-nowrap relative z-[113]">
                                    <div className="flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[114]">
                                        <div className="w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[115]">
                                            <div className="w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[116]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[117]">
                                <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[118]">
                                    @2023 D'ori
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorizedItemPage;
