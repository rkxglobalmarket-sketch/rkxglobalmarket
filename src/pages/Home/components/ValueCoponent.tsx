import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface MarketData {
    symbol: string;
    bid: number;
    ask: number;
    spread: number;
    change: number;
    changePct: number;
    open: number;
    low: number;
    high: number;
    previous: number;
}

interface ApiResponse {
    symbolId: number;
    u: number;      // timestamp
    v: number;      // volume
    o: number;      // open
    h: number;      // high
    l: number;      // low
    c: number;      // close (bid)
    a: number;      // ask
    lc: number;     // last close (previous)
}

// Symbol ID to Symbol Name mapping
const SYMBOL_MAP: Record<number, string> = {
    5: "AUDUSD",
    19: "EURUSD",
    25: "USDJPY",
    29: "GBPUSD",
    31: "NZDUSD",
    36: "USDCAD",
    144: "BTCUSD",
    66: "ETHUSD",
    145: "LTCUSD",
    146: "XRPUSD",
    69: "BCHUSD",
    51: "US30",
    157: "NAS100",
    53: "SPX500",
    155: "GER30",
    143: "FRA40",
    148: "JPN225",
    546: "AAPL",
    547: "MSFT",
    544: "GOOGL",
    566: "AMZN",
    589: "FB",
    591: "TSLA",
    628: "SPY",
    629: "IVV",
    43: "XAUUSD",
    44: "XAGUSD",
    128: "WTI",
    129: "BRENT",
    108: "NGAS",
    111: "COPPER"
};

const TABS_CONFIG: Record<string, number[]> = {
    "Forex": [5, 19, 25, 29, 31, 36],
    "CryptoCurrency": [144, 66, 145, 146, 69],
    "Indices": [51, 157, 53, 155, 143, 148],
    "Stocks": [546, 547, 544, 566, 589, 591],
    "ETFs": [628, 629],
    "Commodities": [43, 44, 128, 129, 108, 111]
};

const TABS = Object.keys(TABS_CONFIG);

const TableHead = [
    "Symbol", "Bid", "Ask", "Spread", "Change", "Change %", "Open", "Low", "High", "Previous"
];

const REFRESH_INTERVAL = 500;

export const MarketTable: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("Forex");
    const [data, setData] = useState<MarketData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchData = useCallback(async (showLoading = false) => {
        if (showLoading) {
            setLoading(true);
        }
        setError(null);

        try {
            const symbolIds = TABS_CONFIG[activeTab].join(',');
            const response = await fetch(
                `https://gw.finlogix.com/quoting/api/v1/history/latest-prices?symbol_ids=${symbolIds}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result: ApiResponse[] = await response.json();

            const transformedData: MarketData[] = result.map((item) => {
                const change = parseFloat((item.c - item.lc).toFixed(5));
                const changePct = parseFloat(((change / item.lc) * 100).toFixed(2));
                const spread = parseFloat((item.a - item.c).toFixed(5));

                return {
                    symbol: SYMBOL_MAP[item.symbolId] || `Symbol ${item.symbolId}`,
                    bid: item.c,
                    ask: item.a,
                    spread: spread,
                    change: change,
                    changePct: changePct,
                    open: item.o,
                    low: item.l,
                    high: item.h,
                    previous: item.lc
                };
            });

            setData(transformedData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    }, [activeTab]);

    useEffect(() => {
        fetchData(true);

        intervalRef.current = setInterval(() => {
            fetchData(false);
        }, REFRESH_INTERVAL);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [fetchData]);

    return (
        <div className="bg-white rounded-xl border p-6 w-full max-w-5xl mx-auto shadow-md mt-20">
            <nav aria-label="Market tabs" className="mb-4 flex gap-4 border-b overflow-scroll">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`py-2 px-6 text-sm font-semibold border-b-2 transition-colors
                                ${tab === activeTab
                                ? 'border-blue-400 text-blue-900 bg-blue-50'
                                : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                            } rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        tabIndex={0}
                        aria-selected={tab === activeTab}
                        role="tab"
                        onClick={() => setActiveTab(tab)}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                setActiveTab(tab);
                            }
                        }}
                    >
                        {t(tab)}
                    </button>
                ))}
            </nav>

            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500">
                        {t("Error")}: {error}
                    </div>
                ) : (
                    <table className="min-w-full text-sm md:text-base">
                        <thead>
                            <tr>
                                {TableHead.map(head => (
                                    <th
                                        key={head}
                                        className="text-left py-3 px-2 font-bold text-gray-800 bg-gray-50 border-b"
                                    >{t(head)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, idx) => (
                                <tr
                                    key={row.symbol}
                                    className={idx % 2 ? "bg-gray-50" : ""}
                                >
                                    <td className="font-semibold px-2 py-2">{row.symbol}</td>
                                    <td className="px-2 py-2">{row.bid}</td>
                                    <td className="px-2 py-2">{row.ask}</td>
                                    <td className="px-2 py-2">{row.spread}</td>
                                    <td className={`px-2 py-2 ${row.change >= 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}`}>
                                        {row.change >= 0 ? `+${row.change}` : row.change}
                                    </td>
                                    <td className={`px-2 py-2 ${row.changePct >= 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}`}>
                                        {row.changePct >= 0 ? `+${row.changePct}%` : `${row.changePct}%`}
                                    </td>
                                    <td className="px-2 py-2">{row.open}</td>
                                    <td className="px-2 py-2">{row.low}</td>
                                    <td className="px-2 py-2">{row.high}</td>
                                    <td className="px-2 py-2">{row.previous}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="text-center text-sm text-blue-600 mt-4">
                <a href="https://www.finlogix.com/?utm_source=https://www.equinnoxfx.com/&utm_medium=widget&utm_campaign=SymbolList&utm_term=hyperlink" className="underline hover:text-blue-800">
                    {t("Track Market Trends and Live Prices on Finlogix")}
                </a>
            </div>
        </div>
    );
};

export default MarketTable;

