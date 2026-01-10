import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { FxPairRow } from "./components/FxPairRow"
import Footer from "../../components/Footer"
import { NavLink } from "react-router-dom"
import Products from "./data/Products.json"

interface PriceMap {
    [symbol: string]: {
        price: number
        changePercent: number
    }
}

function Market() {
    const [prices, setPrices] = useState<PriceMap>({})

    useEffect(() => {
        async function fetchPrices() {
            try {
                const res = await fetch(
                    "https://api.capitalmanager.link/currency/getCurrencyList",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({}),
                    }
                )

                const json = await res.json()

                const list = json?.data || []

                const mapped: PriceMap = {}

                list.forEach((item: any) => {
                    mapped[item.Code] = {
                        price: item.LastPrice,
                        changePercent: item.ForexQuotations?.Change ?? 0,
                    }
                })

                setPrices(mapped)
            } catch (e) {
                console.error("Price fetch failed", e)
            }
        }

        fetchPrices()

        // refresh every 5 seconds (safe)
        const interval = setInterval(fetchPrices, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-screen w-screen bg-[#f5f3f3] flex flex-col">
            <div className="fixed top-0 w-full z-10 bg-[#f5f3f3]">
                <div className="flex flex-row justify-between items-center pt-2">
                    <div></div>
                    <div>
                        <img src="/assets/logo.png" alt="logo" className="h-12 w-15 ml-15" />
                    </div>
                    <NavLink
                        to="/terminal/market/search"
                        className="mr-5 bg-white p-2 h-10 w-10 rounded-xl pl-2.5"
                    >
                        <button>
                            <Search size={20} />
                        </button>
                    </NavLink>
                </div>

                <div className="mt-2 flex flex-row justify-between items-center p-2 text-sm font-semibold text-gray-400 mx-3 bg-white rounded-xl px-4">
                    <button>Name</button>
                    <button>Last Price</button>
                    <button>Trend</button>
                </div>
            </div>

            <div className="flex-1 mt-28 mb-18 overflow-y-auto flex items-start justify-center px-3">
                <div className="w-full max-w-md">
                    {Products.map((product) => {
                        const priceInfo = prices[product.symbol]

                        return (
                            <FxPairRow
                                key={product.id}
                                imageUrl={product.imageUrl}
                                symbol={product.symbol}
                                price={priceInfo?.price ?? 0}
                                yahooChartUrl={product.yahooSymbol}
                                changePercent={priceInfo?.changePercent ?? 0}
                            />
                        )
                    })}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Market

