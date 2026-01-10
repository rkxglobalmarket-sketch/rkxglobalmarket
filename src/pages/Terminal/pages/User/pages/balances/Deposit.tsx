import { useState } from "react"
import Header from "../components/Header";

export default function Recharge() {
    const [activeTab, setActiveTab] = useState<"crypto" | "bank">("crypto")
    const [amount, setAmount] = useState("")
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState(true)
    const url = "https://example.com/wallet-address"

    return (
        <div>
            <div className="p-4 bg-white">
                <Header label="Deposit" />
            </div>
            <div className="min-h-screen bg-white flex justify-center">

                <div className="w-full max-w-md px-6 pt-6">



                    <div className="flex bg-gray-200 rounded-full p-1 mb-6">
                        <button
                            onClick={() => {
                                setActiveTab("crypto")
                                setType(true)
                            }}
                            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "crypto"
                                ? "bg-[#BC8600] text-white"
                                : "text-gray-500"
                                }`}
                        >
                            Digital Currency
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("bank")
                                setType(false)
                            }}
                            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "bank"
                                ? "bg-[#BC8600] text-white"
                                : "text-gray-500"
                                }`}
                        >
                            Bank Card
                        </button>
                    </div>

                    {type && (
                        <><label className="block text-sm font-medium text-black mb-2">
                            Select Network
                        </label>
                            <div className="bg-gray-100 rounded-full px-5 py-3 mb-6 text-sm">
                                USDT-TRC20-
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col items-center mb-6">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}`}
                                    alt="QR Code"
                                    className="w-40 h-40 mb-3"
                                />
                                <p className="text-sm text-black">Wallet Address</p>
                            </div>
                        </>)}

                    <label className="block text-sm font-medium text-black mb-2">
                        Recharge amount
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Please enter the recharge amount"
                        className="w-full bg-gray-100 rounded-full px-5 py-4 text-sm outline-none mb-6"
                    />

                    <div className="flex flex-col items-center mb-10">
                        <label className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden">
                            <input
                                type="file"
                                hidden
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            {file ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Uploaded certificate"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 7h2l2-3h10l2 3h2v13H3V7z"
                                    />
                                    <circle cx="12" cy="13" r="3" />
                                </svg>
                            )}
                        </label>
                        <p className="text-sm mt-3 text-black">
                            {file ? file.name : "Uploading Certificate"}
                        </p>
                    </div>

                    <button
                        className="w-full bg-[#BC8600] text-white py-4 rounded-full text-sm font-semibold hover:bg-[#a97700] transition-all mb-10"
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    )
}

