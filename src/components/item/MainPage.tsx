import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  cate_no: number;
  item_name: string;
  item_price: number;
  item_create_date: string;
  item_soldout: string;
  item_is_display: string;
  item_company: string;
  images: { id: number; file: string; item_no: number }[];
  likes: number;
}

const MainPage: React.FC = () => {
  const [popularItems, setPopularItems] = useState<Item[]>([]);
  const [newItems, setNewItems] = useState<Item[]>([]);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/items/popular/');
        setPopularItems(response.data);
      } catch (error) {
        console.error('Error fetching popular items', error);
      }
    };

    const fetchNewItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/items/newest/');
        setNewItems(response.data);
      } catch (error) {
        console.error('Error fetching new items', error);
      }
    };

    fetchPopularItems();
    fetchNewItems();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndexes(prevIndexes => {
        const newIndexes = { ...prevIndexes };
        [...popularItems, ...newItems].forEach(item => {
          if (item.images.length > 1) {
            newIndexes[item.id] = (newIndexes[item.id] + 1) % item.images.length || 0;
          }
        });
        return newIndexes;
      });
    }, 3000); // 3초마다 이미지 변경

    return () => clearInterval(intervalId);
  }, [popularItems, newItems]);

  const getItemImage = (item: Item) => {
    if (item.images.length === 0) return '';
    const currentIndex = currentImageIndexes[item.id] || 0;
    return item.images[currentIndex]?.file || item.images[0]?.file;
  };

  const handleShowItems = () => {
    navigate("/category");
  }

  return (
    <div className="main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0">
      <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden">
        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
          <div className="flex h-[1780px] pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[25]">
            <div className="flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[26]">
              <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[27]">
                <div className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[28]">
                  <div
                    className="h-[480px] self-stretch shrink-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-[29]"
                    style={{ backgroundImage: 'url("/images/dori-banner.png")' }}
                  >
                    <div className="flex w-[645px] flex-col gap-[8px] items-start flex-nowrap relative z-30 mt-[284px] mr-0 mb-0 ml-[56px]">
                      <div className="flex w-[645px] flex-col items-start shrink-0 flex-nowrap relative z-[31]">
                        <span className="h-[60px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[48px] font-bold leading-[60px] text-[#fff] tracking-[-2px] relative text-left whitespace-nowrap z-[32]">
                          Festive Season
                        </span>
                      </div>
                      <div className="flex w-[645px] flex-col items-start shrink-0 flex-nowrap relative z-[33]">
                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[34]">
                          Shop our curated selection of dresses, tops, and more
                          for your holiday occasions
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[121px] h-[48px] pt-0 pr-[20px] pb-0 pl-[20px] justify-center items-center flex-nowrap bg-[#f46047] rounded-[24px] relative overflow-hidden z-[35] mt-[32px] mr-0 mb-0 ml-[56px] cursor-pointer" onClick={handleShowItems}>
                      <div className="flex w-[81px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[36]">
                        <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-bold leading-[24px] text-[#fff] relative text-center overflow-hidden whitespace-nowrap z-[37]">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[38]">
                <div className="flex w-[960px] h-[359px] pt-[40px] pr-[16px] pb-[40px] pl-[16px] gap-[32px] items-start shrink-0 flex-nowrap relative z-[39]">
                  <div className="h-[279px] grow shrink-0 basis-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-40" style={{ backgroundImage: 'url("/images/dori-middle-banner.png")' }} />
                  <div className="flex w-[400px] h-[279px] flex-col gap-[32px] justify-center items-start shrink-0 flex-nowrap relative z-[41]">
                    <div className="flex w-[400px] flex-col items-center shrink-0 flex-nowrap relative z-[42]">
                      <span className="h-[60px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[48px] font-bold leading-[60px] text-[#1c0f0c] tracking-[-2px] relative text-center whitespace-nowrap z-[43]">
                        Summer Sale
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[51]">
                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#896660] relative text-center whitespace-nowrap z-[52]">
                  Most Loved
                </span>
              </div>
              <div className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[53]">
                <div className="flex gap-[12px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[54]">
                  {popularItems.map((item) => (
                    <Link
                      key={item.id}
                      to={`/item/${item.id}/info`}
                      className="flex w-[223px] pt-0 pr-0 pb-[12px] pl-0 flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[55] cursor-pointer"
                    >
                      <div
                        className="h-[297px] self-stretch shrink-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-[56] transition-all duration-500 ease-in-out"
                        style={{ backgroundImage: `url(${getItemImage(item)})` }}
                      />
                      <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[57]">
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[58]">
                          <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[59]">
                            ${item.item_price}
                          </span>
                        </div>
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[60]">
                          <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#896660] relative text-left whitespace-nowrap z-[61]">
                            ❤️ {item.likes} likes
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[83]">
                <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-bold leading-[21px] text-[#896660] relative text-center whitespace-nowrap z-[84]">
                  New Arrivals
                </span>
              </div>
              <div className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[85]">
                <div className="flex gap-[12px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[86]">
                  {newItems.map((item) => (
                    <Link
                      key={item.id}
                      to={`/item/${item.id}/info`}
                      className="flex w-[223px] pt-0 pr-0 pb-[12px] pl-0 flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[87] cursor-pointer"
                    >
                      <div
                        className="h-[297px] self-stretch shrink-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-[88]"
                        style={{ backgroundImage: `url(${item.images[0]?.file})` }}
                      />
                      <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[89]">
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[90]">
                          <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[91]">
                            ${item.item_price}
                          </span>
                        </div>
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[60]">
                          <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#896660] relative text-left whitespace-nowrap z-[61]">
                            ❤️ {item.likes} likes
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
