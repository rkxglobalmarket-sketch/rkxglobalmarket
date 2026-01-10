import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { auth } from "../../Auth/firebase"
import Header from "../components/Header"

export default function Withdraw() {
    const [activeTab, setActiveTab] = useState<"crypto" | "bank">("crypto")
    const [amount, setAmount] = useState("0")
    const [remark, setRemark] = useState("")
    const [balance, setBalance] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchBalance = async () => {
            const user = auth.currentUser?.uid;
            if (user) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/data/balance/${user}`);
                    const data = await response.json();
                    setBalance(data.balance);
                } catch (error) {
                    console.error("Error fetching balance:", error);
                }
            }
        };
        fetchBalance();
    }, []);

    return (
        <div>


            <div className="p-4 bg-white">
                <Header label="Withdraw" />
            </div>
            <div className="min-h-screen bg-white flex justify-center">
                <div className="w-full max-w-md px-6 pt-6">

                    <div className="flex bg-gray-200 rounded-full p-1 mb-6">
                        <button
                            onClick={() => setActiveTab("crypto")}
                            className={`w-1/2 py-2 rounded-full text-sm font-semibold ${activeTab === "crypto"
                                ? "bg-[#BC8600] text-white"
                                : "text-black bg-gray-300"
                                }`}
                        >
                            Digital Currency
                        </button>
                        <button
                            onClick={() => setActiveTab("bank")}
                            className={`w-1/2 py-2 rounded-full text-sm font-semibold ${activeTab === "bank"
                                ? "bg-[#BC8600] text-white"
                                : "text-black bg-gray-300"
                                }`}
                        >
                            Bank Card
                        </button>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b">
                        <span className="text-sm text-black">Currency</span>
                        <div className="flex items-center gap-2 text-sm text-black">
                            {activeTab === "bank" ? "INR" : "USDT-TRC20"}
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {activeTab === "bank" && (
                        <div className="flex justify-between items-center py-4 border-b">
                            <span className="text-sm text-black">Bank</span>
                            <input type="text" placeholder="Enter Your Bank Name" />
                        </div>
                    )}

                    {activeTab === "bank" && (
                        <div className="flex justify-between items-center py-4 border-b">
                            <span className="text-sm text-black">IFSC Code</span>
                            <input type="text" placeholder="Enter Your IFSC Code" />
                        </div>
                    )}


                    {activeTab === "bank" ? (
                        <div className="flex justify-between items-center py-4 border-b">
                            <span className="text-sm text-black">
                                Account No
                            </span>
                            <input className="flex items-center gap-2 text-sm text-gray-400" placeholder="Enter Your Account Number" />
                        </div>
                    ) :
                        (<div className="flex justify-between items-center py-4 border-b">
                            <span className="text-sm text-black">Wallet Address</span>
                            <input type="text" placeholder="Enter Your Wallet Address" />
                        </div>
                        )
                    }

                    <div className="py-4 border-b">
                        <label className="block text-sm text-black mb-2">
                            Amount(USD)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (parseFloat(value) > balance) {
                                    alert("Amount cannot exceed your balance");
                                    return;
                                }
                                setAmount(value);
                            }}
                            max={balance}
                            className="w-full text-sm outline-none"
                        />
                    </div>

                    <div className="py-4 border-b">
                        <label className="block text-sm text-black mb-2">
                            Remark
                        </label>
                        <input
                            type="text"
                            placeholder="Remark"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="w-full text-sm text-gray-400 outline-none"
                        />
                    </div>

                    <div className="pt-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-black">Handling fee</span>
                            <span className="text-black">{(parseFloat(amount) * 0.1 || 0).toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-black">
                                It is expected that
                            </span>
                            <span className="text-black">{(parseFloat(amount) / 0.9 || 0).toFixed(2)} USDT-TRC20</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-black">Balance</span>
                            <span className="text-black">{balance} USD</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (!amount || parseFloat(amount) <= 0) {
                                alert("Please enter a valid amount");
                                return;
                            }
                            if (!remark.trim()) {
                                alert("Please enter a remark");
                                return;
                            }
                            setShowModal(true);
                        }}
                        className="w-full mt-10 bg-[#BC8600] text-white py-4 rounded-full text-sm font-semibold hover:bg-[#a97700] transition"
                    >
                        Submit withdrawal
                    </button>

                    {showModal && (
                        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-80 text-center">
                                <h2 className="text-lg font-semibold text-black mb-4">Processing</h2>
                                <p className="text-sm text-gray-600 mb-6">Your withdrawal request is being processed.</p>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        window.location.href = "/terminal/users";
                                    }}
                                    className="w-full bg-[#BC8600] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#a97700] transition"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

