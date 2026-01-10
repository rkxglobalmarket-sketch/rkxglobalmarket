import React, { useState, useEffect, useCallback } from "react";
import { PositionHoldingCard } from "./components/PositionHoldingCard";

type OrderStatus = "OPEN" | "PENDING" | "CLOSED";

interface Trade {
    id: string;
    symbol: string;
    price: number;
    lots: number;
    type: "LONG" | "SHORT";
    status: OrderStatus;
    timestamp: string;
    stopLoss: number;
    takeProfit: number;
    estimatedMargin: number;
    estimatedFee: number;
    balanceRequired: number;
    multiplier: number;
    orderType: string;
    userId: string;
}

interface CurrentPrices {
    [symbol: string]: number;
}

const getStoredTrades = (): Trade[] => {
    const storedTrades = localStorage.getItem("trades");
    if (storedTrades) {
        try {
            return JSON.parse(storedTrades);
        } catch (error) {
            console.error("Error parsing trades from localStorage:", error);
        }
    }
    return [];
};

export const Orders: React.FC = () => {
    const [trades] = useState<Trade[]>(getStoredTrades);
    const [currentPrices, setCurrentPrices] = useState<CurrentPrices>({});

    const fetchCurrentPrices = useCallback(async () => {
        if (trades.length === 0) return;

        const uniqueSymbols = [...new Set(trades.map((trade: Trade) => trade.symbol))];

        try {
            const pricePromises = uniqueSymbols.map(async (symbol): Promise<{ symbol: string; price: number }> => {
                const now = Math.floor(Date.now() / 1000);
                const from = now - 60 * 60;
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_SERVER + `/data/yahoo/chart/formatted?symbol=${symbol}&from=${from}&to=${now}&interval=1m`
                );
                const data = await response.json();
                const candles = data.data || [];
                const lastCandle = candles[candles.length - 1];
                return { symbol, price: lastCandle?.close ?? 0 };
            });

            const results = await Promise.all(pricePromises);
            const prices: CurrentPrices = {};
            results.forEach(({ symbol, price }) => {
                prices[symbol] = price;
            });
            setCurrentPrices(prices);
        } catch (error) {
            console.error("Error fetching current prices:", error);
        }
    }, [trades]);

    useEffect(() => {
        fetchCurrentPrices();

        const interval = setInterval(fetchCurrentPrices, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [fetchCurrentPrices]);

    const orders = trades.map((trade: Trade) => {
        const currentPrice = currentPrices[trade.symbol] ?? trade.price;
        const priceDiff = currentPrice - trade.price;
        const pnl = trade.type === "LONG" ? priceDiff * trade.lots : -priceDiff * trade.lots;

        return {
            id: trade.id,
            pair: trade.symbol,
            entryPrice: trade.price,
            currentPrice,
            type: trade.type === "LONG" ? ("BUY" as const) : ("SELL" as const),
            lots: trade.lots,
            pnl,
            createdAt: new Date(trade.timestamp).toLocaleString(),
            status: trade.status,
            stopLoss: trade.stopLoss,
            takeProfit: trade.takeProfit,
        };
    });

    const totalMargin = trades.reduce((sum: number, trade: Trade) => sum + trade.estimatedMargin, 0);

    return (
        <div className="min-h-screen flex items-start justify-center">
            <PositionHoldingCard
                currentMargin={totalMargin || 0}
                riskRate={0}
                orders={orders}
            />
        </div>
    );
};

