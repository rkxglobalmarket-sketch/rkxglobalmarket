import { useEffect, useState } from "react"
import Header from "../components/Header"
import { auth } from "../../Auth/firebase"

function Wallet() {
    const [balance, setBalance] = useState(0);

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
        <div className="min-h-screen bg-white p-6 text-black">
            <div className="mx-auto max-w-4xl space-y-6">
                <Header label="Wallet" />

                <section className="space-y-2 border-b pb-4">
                    <p className="text-[10px] text-gray-500">Available balance</p>
                    <p className="text-3xl font-semibold">${balance}</p>
                    <div className="flex gap-2 text-[10px] text-gray-500">
                        <span>Updated just now</span>
                        <span>Protected by 2FA</span>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Wallet

