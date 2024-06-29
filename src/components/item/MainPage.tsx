import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  return (
    <div className="main-container flex w-[1280px] flex-col items-start flex-nowrap bg-[#fff] relative mx-auto my-0">
      <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden">
        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
          <div className="flex pt-[12px] pr-[40px] pb-[12px] pl-[40px] justify-between items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#e5e8ea] relative z-[2]">
            <div className="flex w-[72px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[3]">
              <div className="flex w-[16px] flex-col items-start shrink-0 flex-nowrap relative z-[4]">
                <div className="w-[16px] grow shrink-0 basis-0 bg-cover bg-no-repeat relative overflow-hidden z-[5]" />
              </div>
              <div className="flex w-[40px] flex-col items-start shrink-0 flex-nowrap relative z-[6]">
                <span className="h-[23px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[18px] font-bold leading-[23px] text-[#161111] relative text-left whitespace-nowrap z-[7]">
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
                      <div className="w-[20px] h-[20px] bg-cover bg-no-repeat absolute top-0 left-0 z-20" />
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
          <div className="flex h-[1780px] pt-[20px] pr-[160px] pb-[20px] pl-[160px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[25]">
            <div className="flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[26]">
              <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[27]">
                <div className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[28]">
                  <div className="h-[480px] self-stretch shrink-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-[29]" style={{ backgroundImage: 'url("https://i.ibb.co/10Mvfky/d-ori-banner.png")' }}>
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
                    <div className="flex w-[121px] h-[48px] pt-0 pr-[20px] pb-0 pl-[20px] justify-center items-center flex-nowrap bg-[#f46047] rounded-[24px] relative overflow-hidden z-[35] mt-[32px] mr-0 mb-0 ml-[56px]">
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
                  <div className="h-[279px] grow shrink-0 basis-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-40" style={{ backgroundImage: 'url("https://i.ibb.co/10Mvfky/d-ori-banner.png")' }} />
                  <div className="flex w-[400px] h-[279px] flex-col gap-[32px] justify-center items-start shrink-0 flex-nowrap relative z-[41]">
                    <div className="flex w-[400px] flex-col items-center shrink-0 flex-nowrap relative z-[42]">
                      <span className="h-[60px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[48px] font-bold leading-[60px] text-[#1c0f0c] tracking-[-2px] relative text-center whitespace-nowrap z-[43]">
                        Summer Sale
                      </span>
                    </div>
                    <div className="flex w-[400px] gap-[12px] items-start shrink-0 flex-wrap relative z-[44]">
                      <div className="flex w-[147px] h-[48px] pt-0 pr-[20px] pb-0 pl-[20px] justify-center items-center flex-nowrap bg-[#f45442] rounded-[12px] relative overflow-hidden z-[45]">
                        <div className="flex w-[107px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[46]">
                          <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-bold leading-[24px] text-[#fcf7f7] relative text-center overflow-hidden whitespace-nowrap z-[47]">
                            Shop Women
                          </span>
                        </div>
                      </div>
                      <div className="flex w-[121px] h-[48px] pt-0 pr-[20px] pb-0 pl-[20px] justify-center items-center flex-nowrap bg-[#f4e8e8] rounded-[12px] relative overflow-hidden z-[48]">
                        <div className="flex w-[81px] flex-col items-center shrink-0 flex-nowrap relative overflow-hidden z-[49]">
                          <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-bold leading-[24px] text-[#1c0f0c] relative text-center overflow-hidden whitespace-nowrap z-50">
                            Shop Men
                          </span>
                        </div>
                      </div>
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
                        className="h-[297px] self-stretch shrink-0 bg-cover bg-no-repeat rounded-[12px] relative overflow-hidden z-[56]"
                        style={{ backgroundImage: `url(${item.images[0]?.file})` }}
                      />
                      <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[57]">
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[58]">
                          <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-medium leading-[24px] text-[#161111] relative text-left whitespace-nowrap z-[59]">
                            ${item.item_price}
                          </span>
                        </div>
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[60]">
                          <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#896660] relative text-left whitespace-nowrap z-[61]">
                            D'ori • {item.likes} likes
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
                        <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[92]">
                          <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[14px] font-normal leading-[21px] text-[#896660] relative text-left whitespace-nowrap z-[93]">
                            D'ori
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[115]">
            <div className="flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[116]">
              <div className="flex pt-[40px] pr-[20px] pb-[40px] pl-[20px] flex-col gap-[24px] items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[117]">
                <div className="flex justify-between items-center self-stretch shrink-0 flex-wrap relative z-[118]">
                  <div className="flex w-[160px] flex-col items-center flex-nowrap relative z-[119]">
                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[120]">
                      About Us
                    </span>
                  </div>
                  <div className="flex w-[160px] flex-col items-center flex-nowrap relative z-[121]">
                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[122]">
                      Contact
                    </span>
                  </div>
                  <div className="flex w-[160px] flex-col items-center flex-nowrap relative z-[123]">
                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[124]">
                      Terms of Service
                    </span>
                  </div>
                </div>
                <div className="flex gap-[16px] justify-center items-start self-stretch shrink-0 flex-wrap relative z-[125]">
                  <div className="flex w-[24px] flex-col items-center flex-nowrap relative z-[126]">
                    <div className="flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[127]">
                      <div className="w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[128]">
                        <div className="w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[129]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[24px] flex-col items-center flex-nowrap relative z-[130]">
                    <div className="flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[131]">
                      <div className="w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[132]">
                        <div className="w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[133]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[24px] flex-col items-center flex-nowrap relative z-[134]">
                    <div className="flex w-[24px] flex-col items-center grow shrink-0 basis-0 flex-nowrap relative z-[135]">
                      <div className="w-[24px] grow shrink-0 basis-0 relative overflow-hidden z-[136]">
                        <div className="w-[24px] h-[24px] bg-cover bg-no-repeat absolute top-0 left-0 z-[137]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center self-stretch shrink-0 flex-nowrap relative z-[138]">
                  <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Epilogue'] text-[16px] font-normal leading-[24px] text-[#896660] relative text-center whitespace-nowrap z-[139]">
                    @2023 D'ori
                  </span>
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
