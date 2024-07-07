



const Dashboard = () => {
    return (
        <>

            <div className="bg-[url('/public/clouds.jpg')] bg-cover bg-no-repeat bg-center min-h-screen ">
                <div className="h-[70px]">
                    <div className="flex justify-between items-center h-[70px] px-4">
                        <p className="text-white font-bold text-2xl"> WHEATHER WORLD</p>
                        <form action="">
                            <input className="border border-black p-1 rounded focus:outline-none" placeholder="search city..." type="search" />
                        </form>
                    </div>
                </div>

                <div className="flex flex-col px-6">
                    <div className="bg-[#424242] h-[200px] bg-opacity-30 rounded-xl flex justify-between p-2">
                        <div className=" w-[33%] flex justify-center items-center">
                            <div className="flex flex-col gap-5 py-2 items-center bg-[#37ce19] h-[100px] rounded-xl w-[50%]">
                                <p className="text-white font-bold text-xl">Humidity</p>
                                <p className="text-white font-semibold text-lg">46.56</p>
                            </div>
                        </div>
                        <div className=" w-[33%] flex justify-center">
                            <div>
                                <p className="text-white font-bold text-xl px-6">New York</p>
                                <div className="pl-6 pt-7 flex justify-center items-center">
                                    <img src="/public/sun.png" className="h-[100px]" alt="sun" />
                                    <p className="text-white font-bold text-[40px]">39.04 c</p>
                                </div>
                            </div>

                        </div>
                        <div className=" w-[33%] flex justify-center items-center">
                            <div className="flex flex-col gap-5 py-2 items-center bg-[#304df0] h-[100px] rounded-xl w-[50%]">
                                <p className="text-white font-bold text-xl">Wind Speed</p>
                                <p className="text-white font-semibold text-lg">46.56</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <p className="text-[#525252] font-extrabold">Next 7 day forcasting</p>
                    </div>
                    <div className="py-2 flex gap-3">
                        <div className="w-[10%] flex flex-col px-1 bg-[#424242] bg-opacity-30 rounded-lg">
                            <div className="flex justify-center">
                                <p className="text-white font-semibold">monday</p>
                            </div>
                            <hr />
                            <div className="flex flex-col items-center ">
                                <img src="/public/sun-smile.png" className="h-[80px]" alt="sun" />
                                <p className="text-white font-bold pt-4">48.4 c</p>
                            </div>
                        </div>
                        <div className="w-[10%] flex flex-col px-1 bg-[#424242] bg-opacity-30 rounded-lg">
                            <div className="flex justify-center">
                                <p className="text-white font-semibold">monday</p>
                            </div>
                            <hr />
                            <div className="flex flex-col items-center ">
                                <img src="/public/sun-smile.png" className="h-[80px]" alt="sun" />
                                <p className="text-white font-bold pt-4">48.4 c</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <p className="text-[#525252] font-extrabold">Last 7 day forcasting</p>
                    </div>
                    <div className="py-2 flex gap-3">
                        <div className="w-[10%] flex flex-col px-1 bg-[#424242] bg-opacity-30 rounded-lg">
                            <div className="flex justify-center">
                                <p className="text-white font-semibold">monday</p>
                            </div>
                            <hr />
                            <div className="flex flex-col items-center ">
                                <img src="/public/sun-smile.png" className="h-[80px]" alt="sun" />
                                <p className="text-white font-bold pt-4">48.4 c</p>
                            </div>
                        </div>
                        <div className="w-[10%] flex flex-col px-1 bg-[#424242] bg-opacity-30 rounded-lg">
                            <div className="flex justify-center">
                                <p className="text-white font-semibold">monday</p>
                            </div>
                            <hr />
                            <div className="flex flex-col items-center ">
                                <img src="/public/sun-smile.png" className="h-[80px]" alt="sun" />
                                <p className="text-white font-bold pt-4">48.4 c</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Dashboard