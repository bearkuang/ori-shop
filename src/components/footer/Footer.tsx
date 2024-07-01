import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='flex justify-center items-start self-stretch shrink-0 relative'>
            <div className='flex flex-col items-start grow shrink-0 relative'>
                <div className='flex py-10 px-5 flex-col gap-6 items-start self-stretch grow shrink-0 relative'>
                    <div className='flex justify-between items-center self-stretch shrink-0 flex-wrap relative'>
                        <div className='flex w-40 flex-col items-center relative'>
                            <span className="text-base font-normal text-gray-600">
                                About Us
                            </span>
                        </div>
                        <div className='flex w-40 flex-col items-center relative'>
                            <span className="text-base font-normal text-gray-600">
                                Contact
                            </span>
                        </div>
                        <div className='flex w-40 flex-col items-center relative'>
                            <span className="text-base font-normal text-gray-600">
                                Terms of Service
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-4 justify-center items-start self-stretch shrink-0 flex-wrap relative'>
                        <div className='flex w-6 flex-col items-center relative'>
                            <div className='flex w-6 flex-col items-center grow shrink-0 relative'>
                                <div className='w-6 grow shrink-0 relative overflow-hidden'>
                                    <div className='w-6 h-6 bg-cover bg-no-repeat absolute top-0 left-0' />
                                </div>
                            </div>
                        </div>
                        <div className='flex w-6 flex-col items-center relative'>
                            <div className='flex w-6 flex-col items-center grow shrink-0 relative'>
                                <div className='w-6 grow shrink-0 relative overflow-hidden'>
                                    <div className='w-6 h-6 bg-cover bg-no-repeat absolute top-0 left-0' />
                                </div>
                            </div>
                        </div>
                        <div className='flex w-6 flex-col items-center relative'>
                            <div className='flex w-6 flex-col items-center grow shrink-0 relative'>
                                <div className='w-6 grow shrink-0 relative overflow-hidden'>
                                    <div className='w-6 h-6 bg-cover bg-no-repeat absolute top-0 left-0' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center self-stretch shrink-0 relative'>
                        <span className="text-base font-normal text-gray-600">
                            @2023 D'ori
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
