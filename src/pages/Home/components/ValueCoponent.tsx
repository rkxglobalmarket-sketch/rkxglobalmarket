import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TABS = [
    "Forex",
    "CryptoCurrency",
    "Indices",
    "Stocks",
    "ETFs",
    "Commodities"
];

const FOREX_DATA = [
    {
        symbol: "AUDUSD", bid: 0.64316, ask: 0.64317, spread: 0.1,
        change: -0.00081, changePct: -0.13, open: 0.64390,
        low: 0.64231, high: 0.64576, previous: 0.64397
    },
    {
        symbol: "EURUSD", bid: 1.15178, ask: 1.15179, spread: 0.1,
        change: -0.00103, changePct: -0.09, open: 1.15173,
        low: 1.15125, high: 1.15525, previous: 1.15281
    },
    {
        symbol: "GBPUSD", bid: 1.30571, ask: 1.30574, spread: 0.3,
        change: -0.00149, changePct: -0.11, open: 1.30688,
        low: 1.30505, high: 1.31028, previous: 1.30720
    },
    {
        symbol: "NZDUSD", bid: 0.55928, ask: 0.55930, spread: 0.2,
        change: 0.00099, changePct: 0.18, open: 0.55797,
        low: 0.55750, high: 0.56073, previous: 0.55829
    },
    {
        symbol: "USDCAD", bid: 1.40951, ask: 1.40954, spread: 0.3,
        change: -0.00013, changePct: -0.01, open: 1.40819,
        low: 1.40816, high: 1.41056, previous: 1.40964
    },
    {
        symbol: "USDJPY", bid: 156.739, ask: 156.747, spread: 0.8,
        change: -0.706, changePct: -0.45, open: 157.418,
        low: 156.554, high: 157.537, previous: 157.445
    }
];

const TableHead = [
    "Symbol", "Bid", "Ask", "Spread", "Change", "Change %", "Open", "Low", "High", "Previous"
];

export const MarketTable: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("Forex");

    const data = FOREX_DATA;

    return (
        <div className="bg-white rounded-xl border p-6 w-full max-w-5xl mx-auto shadow-md mt-20">
            <nav aria-label="Market tabs" className="mb-4 flex gap-4 border-b overflow-scroll ">
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
            </div>

            <div className="text-center text-sm text-blue-600 mt-4">
                <a href="#" className="underline hover:text-blue-800">
                    {t("Track Market Trends and Live Prices on Finlogix")}
                </a>
            </div>
        </div>
    );
};

export default MarketTable;
