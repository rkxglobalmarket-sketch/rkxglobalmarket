import { useState } from "react";
import Footer from "../../components/Footer";

function RankCard(
    { rank1, rank0, name, instrument , rankno } : {rank1 : number[] , rank0 : number[] , name : string , instrument : string , rankno : number}
) {
    const [modal, setmodal] = useState(false);

    const rank = [
        { name: "Profit margin in the past three weeks", multiple: rank1[0]},
        { name: "Win rate in the past three weeks", multiple: rank1[1] },
        { name: "Revenue in the past three weeks(USD)", multiple: rank1[2] }];
    const rank2 = [
        { name: "Total profit margin", multiple: rank0[0]},
        { name: "Total number of pre orders", multiple: rank0[1] },
    ];
    return (
        <button className="bg-white rounded-xl p-2 w-full cursor-pointer" onClick={() => setmodal(true)}>
            {modal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-900 ease-in-out" onClick={() => setmodal(false)}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative flex flex-col justify-between items-center px-10 pt-10 pb-2 bg-white rounded-xl z-10" onClick={(e) => e.stopPropagation()}>
                        <p></p>
                        <p className="text-md font-bold text-center p-2 pb-10">Coming Soon...</p>
                        <button className="cursor-pointer text-[#BC8600] focus:bg-gray-500/40 focus:text-white w-full p-2 rounded-xl" onClick={() => setmodal(false)}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col justify-center items-center px-1 gap-1 my-1 pr-5">
                    <p className="text-sm ">{name}</p>
                    <p className="text-xs text-gray-400">{"100xMultiple"}</p>
                </div>
                <p className="text-center h-fit w-fit p-1 px-4 bg-[#BC8600] rounded-xl text-white">{rankno}</p>
            </div>
            <div>
                <div className="flex flex-row justify-center items-center px-3 gap-1">
                    {rank.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center items-center px-3 gap-1 text-center ">
                            <p className={`text-lg font-bold ${index == 0 ? "text-[#BC8600]" : ""}`}>{index !== 2 ? "+" : ""}{item.multiple}{index !== 2 ? "%" : ""}</p>
                            <p className="text-[10px] text-gray-400">{item.name}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-center items-center px-3 gap-1 mt-4">
                    {rank2.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center items-center px-3 gap-1 text-center ">
                            <p className={`text-lg font-bold ${index == 0 ? "text-[#BC8600]" : ""}`}>{index !== 1 ? "+" : ""}{item.multiple}{index !== 1 ? "%" : ""}</p>
                            <p className="text-[10px] text-gray-400">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center h-fit w-fit p-1 px-4 bg-gray-100 rounded-xl text-gray-400 font-semibold text-xs m-2">{instrument}</p>
        </button>
    )
}

function Rank() {
    return (
        <div>
            <div className="">
                <h1 className="text-md font-bold text-center p-2">Ranking</h1>
                <div className="flex flex-col items-center justify-start w-full px-4 h-[calc(100vh-56px)] overflow-y-scroll gap-4 pb-15">
                    <RankCard rank1={[80, 75, 58942]} rank0={[70, 244]} name="Amar Sharma" instrument="XAUUSD" rankno={1}/>
                    <RankCard rank1={[78, 67, 55724]} rank0={[65, 482]} name="Gopal Padhi" instrument="XAUUSD" rankno={2}/>
                    <RankCard rank1={[73, 65, 52548]} rank0={[64, 348]} name="Chandra Kanungo" instrument="EURAUD" rankno={3}/>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Rank
