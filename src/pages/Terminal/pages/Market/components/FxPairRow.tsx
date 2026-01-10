import React, { useEffect, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts";

interface FxPairRowProps {
    symbol: string;
    price: number;
    changePercent: number;
    imageUrl: string;
    yahooChartUrl?: string;
    showPrice?: boolean;
}

interface ChartPoint {
    time: number;
    value: number;
}

export const FxPairRow: React.FC<FxPairRowProps> = ({
    symbol,
    price,
    changePercent,
    imageUrl,
    yahooChartUrl = "EURUSD=X",
    showPrice = true,
}) => {
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const isNegative = changePercent < 0;

    useEffect(() => {
        async function fetchChart() {
            try {
                const now = Math.floor(Date.now() / 1000);
                const from = now - 24 * 60 * 60;

                const url = `${import.meta.env.VITE_BACKEND_SERVER}/data/yahoo/chart?symbol=${encodeURIComponent(
                    yahooChartUrl
                )}&from=${from}&to=${now}&interval=5m`;

                const res = await fetch(url);
                const json = await res.json();

                const result = json.chart?.result?.[0];
                if (!result) return;

                const timestamps: number[] = result.timestamp || [];
                const closes: (number | null)[] =
                    result.indicators?.quote?.[0]?.close || [];

                let merged: ChartPoint[] = timestamps
                    .map((_, i) => ({ time: i, value: closes[i] }))
                    .filter((p): p is ChartPoint => typeof p.value === "number")
                    .slice(-20);

                if (merged.length > 0) {
                    const min = Math.min(...merged.map(p => p.value));
                    const max = Math.max(...merged.map(p => p.value));
                    merged = merged.map(p => ({
                        time: p.time,
                        value: max === min ? 0.5 : (p.value - min) / (max - min),
                    }));
                }

                setChartData(merged);
            } catch (e) {
                console.error("Chart fetch failed:", e);
            }
        }

        fetchChart();
    }, [symbol]);

    useEffect(() => {

    }, []);

    return (
        <NavLink to={"/terminal/main/"+yahooChartUrl} className="flex items-center rounded-2xl bg-white px-2 py-3 shadow-sm border border-gray-100 w-full mb-1">
            <div className="flex flex-1 items-center justify-between gap-2">

                <div className="flex items-center gap-2">
                    <img src={imageUrl} alt={symbol} width={30} height={30} />
                    <span className="text-sm font-semibold text-gray-800">
                        {symbol}
                    </span>
                </div>

                {showPrice && (
                    <div className={`flex flex-col items-end min-w-[70px] ${!showPrice ? "invisible" : ""}`}>
                        <div className="text-sm font-semibold text-gray-900">
                            {price.toFixed(5)}
                        </div>
                        <div
                            className={`flex items-center justify-end text-xs font-semibold ${isNegative ? "text-red-500" : "text-emerald-500"
                                }`}
                        >
                            {changePercent.toFixed(2)}%
                            <HiOutlineChevronDown
                                className={`ml-0.5 h-3 w-3 ${isNegative ? "" : "rotate-180"}`}
                            />
                        </div>
                    </div>
                )}

                <div className="w-32 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 2, bottom: 2, left: 0, right: 0 }}
                        >
                            <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#B9D6FF" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" hide />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={"#1677FF"}
                                fill={"url(#areaGradient)"}
                                strokeWidth={1.5}
                                dot={false}
                                isAnimationActive={false}
                                connectNulls
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </NavLink>
    );
};


