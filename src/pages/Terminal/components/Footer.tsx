import { ArrowLeftRight, Boxes, Clock, TrendingUp, User } from "lucide-react"
import { NavLink } from "react-router-dom"

function Footer() {

    return (
        <div className="fixed bottom-0 w-full">
                <div className="flex flex-row justify-between items-center p-2 text-xs font-semibold text-gray-400 bg-[#FFFFFF] rounded-t-xl px-4">
                    <NavLink to="/terminal/market" className="cursor-pointer">
                        <div className="bg-[#BC8600] p-2 rounded-xl h-9 w-9 text-white">
                            <TrendingUp size={20} />
                        </div>
                        <p >Market</p>
                    </NavLink>
                    <NavLink to="/terminal/orders" className="cursor-pointer">
                        <div className="bg-[#BC8600] p-2 rounded-xl h-9 w-9 text-white">
                            <Boxes size={20} />
                        </div>
                        Orders
                    </NavLink>
                    <NavLink to="/terminal/main" className="relative -top-7 cursor-pointer">
                        <div className="bg-[#BC8600] p-2 rounded-xl h-10 w-10 text-white pl-2.5">
                            <ArrowLeftRight size={20} />
                        </div>
                    </NavLink>
                    <NavLink to="/terminal/rank" className="cursor-pointer">
                        <div className="bg-[#BC8600] p-2 rounded-xl h-9 w-9 text-white">
                            <Clock size={20} />
                        </div>
                        Rank
                    </NavLink>
                    <NavLink to="/terminal/users" className="cursor-pointer">
                        <div className="bg-[#BC8600] p-2 rounded-xl h-9 w-9 text-white">
                            <User size={20} />
                        </div>
                        User
                    </NavLink>
                </div>
            </div>
    )
}

export default Footer
