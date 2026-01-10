// PositionHoldingCard.tsx
import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { auth } from "../../User/Auth/firebase";

type OrderType = "BUY" | "SELL";
type OrderStatus = "OPEN" | "PENDING" | "CLOSED";
type TradeOrderType = "MARKET" | "PENDING";

interface Order {
    id: string;
    pair: string;
    entryPrice: number;
    currentPrice: number;
    type: OrderType;
    lots: number;
    pnl: number;
    createdAt: string;
    status: OrderStatus;
    orderType?: TradeOrderType;
    stopLoss?: number;
    takeProfit?: number;
    closedAt?: string;
    closePrice?: number;
}

interface PositionHoldingCardProps {
    currentMargin: number;
    riskRate: number;
    orders: Order[];
    onClosePosition?: (orderId: string) => void;
    onCancelOrder?: (orderId: string) => void;
}

const TabButton: React.FC<{
    label: string;
    active?: boolean;
    onClick: () => void;
}> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-2 py-2 text-xs font-medium rounded-full transition-colors ${active
            ? "bg-[#BC8600] text-white"
            : "text-gray-500 hover:text-gray-700"
            }`}
        type="button"
    >
        {label}
    </button>
);

const SummaryRow: React.FC<{
    label: string;
    value: string | number;
}> = ({ label, value }) => (
    <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{label}</span>
        <span className="font-semibold text-gray-800">{value}</span>
    </div>
);

const OrderBadge: React.FC<{ type: OrderType; lots: number }> = ({ type, lots }) => {
    const isBuy = type === "BUY";
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${isBuy ? "bg-yellow-500 text-white" : "bg-red-500 text-white"
                }`}
        >
            {isBuy ? "Buy" : "Open Short"}
            <span className="text-[9px] bg-white/20 rounded-full px-1.5 py-0.5">
                {lots} Lots
            </span>
        </span>
    );
};

interface ClosePositionModalProps {
    order: Order;
    onClose: () => void;
    onConfirmClose: (orderId: string) => void;
}

const ClosePositionModal: React.FC<ClosePositionModalProps> = ({
    order,
    onClose,
    onConfirmClose,
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-[90%] max-w-sm rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">
                Close Position
            </h3>
            <div className="mb-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Pair:</span>
                    <span className="font-medium">{order.pair}</span>
                </div>
                <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{order.type}</span>
                </div>
                <div className="flex justify-between">
                    <span>Entry Price:</span>
                    <span className="font-medium">{order.entryPrice.toFixed(5)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Current Price:</span>
                    <span className="font-medium">{order.currentPrice.toFixed(5)}</span>
                </div>
                <div className="flex justify-between">
                    <span>P&L:</span>
                    <span className={`font-semibold ${order.pnl >= 0 ? "text-[#BC8600]" : "text-red-500"}`}>
                        {order.pnl.toFixed(2)}
                    </span>
                </div>
                {order.stopLoss && (
                    <div className="flex justify-between">
                        <span>Stop Loss:</span>
                        <span className="font-medium text-red-500">{order.stopLoss.toFixed(5)}</span>
                    </div>
                )}
                {order.takeProfit && (
                    <div className="flex justify-between">
                        <span>Take Profit:</span>
                        <span className="font-medium text-green-500">{order.takeProfit.toFixed(5)}</span>
                    </div>
                )}
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirmClose(order.id)}
                    className="flex-1 rounded-full bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600"
                    type="button"
                >
                    Close Position
                </button>
            </div>
        </div>
    </div>
);

interface OrderCardProps {
    order: Order;
    onClick: (order: Order) => void;
    showCloseButton?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, showCloseButton = true }) => (
    <div
        className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-100 cursor-pointer hover:border-[#BC8600] transition-colors"
        onClick={() => showCloseButton && onClick(order)}
    >
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-800">
                {order.pair}
            </span>
            <OrderBadge type={order.type} lots={order.lots} />
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
            <span>
                {order.entryPrice.toFixed(5)} {" -> "} {order.currentPrice.toFixed(5)}
            </span>
            <span className={"text-md font-semibold " + (order.pnl >= 0 ? "text-[#BC8600]" : "text-red-500")}>
                {order.pnl.toFixed(2)}
            </span>
        </div>

        {(order.stopLoss || order.takeProfit) && (
            <div className="flex gap-3 text-[10px] mb-2">
                {order.stopLoss && (
                    <span className="text-red-500">SL: {order.stopLoss.toFixed(5)}</span>
                )}
                {order.takeProfit && (
                    <span className="text-green-500">TP: {order.takeProfit.toFixed(5)}</span>
                )}
            </div>
        )}

        <div className="text-[10px] text-gray-400">
            <div>Orders ID #{order.id}</div>
            <div>{order.createdAt}</div>
            {order.closedAt && <div>Closed: {order.closedAt}</div>}
            {order.closePrice && <div>Close Price: {order.closePrice.toFixed(5)}</div>}
        </div>
    </div>
);

const PendingOrderCard: React.FC<{
    order: Order;
    onCancel: (orderId: string) => void;
}> = ({ order, onCancel }) => (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-800">
                {order.pair}
            </span>
            <OrderBadge type={order.type} lots={order.lots} />
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
            <span>Entry: {order.entryPrice.toFixed(5)}</span>
            <span className="text-gray-600 font-medium">Pending</span>
        </div>

        {(order.stopLoss || order.takeProfit) && (
            <div className="flex gap-3 text-[10px] mb-2">
                {order.stopLoss && (
                    <span className="text-red-500">SL: {order.stopLoss.toFixed(5)}</span>
                )}
                {order.takeProfit && (
                    <span className="text-green-500">TP: {order.takeProfit.toFixed(5)}</span>
                )}
            </div>
        )}

        <div className="text-[10px] text-gray-400 mb-2">
            <div>Orders ID #{order.id}</div>
            <div>{order.createdAt}</div>
        </div>

        <button
            onClick={() => onCancel(order.id)}
            className="w-full rounded-full border border-red-300 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
            type="button"
        >
            Cancel Order
        </button>
    </div>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
    <div className="rounded-2xl bg-white px-4 py-8 shadow-sm border border-gray-100 text-center">
        <span className="text-sm text-gray-400">{message}</span>
    </div>
);

export const PositionHoldingCard: React.FC<PositionHoldingCardProps> = ({
    currentMargin,
    riskRate,
    orders: initialOrders,
    onClosePosition,
    onCancelOrder,
}) => {
    const [activeTab, setActiveTab] = useState<"Position holding" | "Pending Orders" | "History">("Position holding");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [orders, setOrders] = useState<Order[]>(initialOrders);

    // Update orders when initialOrders prop changes
    useEffect(() => {
        setOrders(initialOrders);
    }, [initialOrders]);

    // Fetch balance
    useEffect(() => {
        const fetchBalance = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_SERVER}/data/balance/${user.uid}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setBalance(data.balance ?? 0);
                    }
                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                }
            }
        };

        fetchBalance();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchBalance();
            }
        });

        return () => unsubscribe();
    }, []);

    // Filter orders based on status and orderType
    // Open positions: MARKET orders with status OPEN
    const openPositions = orders.filter(
        (order) => order.status === "OPEN" && order.orderType !== "PENDING"
    );
    
    // Pending orders: PENDING orderType with status OPEN (not yet executed)
    const pendingOrders = orders.filter(
        (order) => order.orderType === "PENDING" && order.status === "OPEN"
    );
    
    // History: CLOSED orders
    const historyOrders = orders.filter((order) => order.status === "CLOSED");

    // Calculate P&L only from open positions
    const openPositionsPnL = openPositions.reduce((sum, order) => sum + order.pnl, 0);

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleConfirmClose = (orderId: string) => {
        // Find the order to close
        const orderToClose = orders.find((o) => o.id === orderId);
        if (!orderToClose) return;

        // Update the order status to CLOSED
        const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
                return {
                    ...order,
                    status: "CLOSED" as OrderStatus,
                    closedAt: new Date().toLocaleString(),
                    closePrice: order.currentPrice,
                };
            }
            return order;
        });

        setOrders(updatedOrders);

        // Update localStorage
        const storedTrades = localStorage.getItem("trades");
        if (storedTrades) {
            try {
                const trades = JSON.parse(storedTrades);
                const updatedTrades = trades.map((trade: { id: string; status?: string; closedAt?: string; closePrice?: number }) => {
                    if (trade.id === orderId) {
                        return {
                            ...trade,
                            status: "CLOSED",
                            closedAt: new Date().toISOString(),
                            closePrice: orderToClose.currentPrice,
                        };
                    }
                    return trade;
                });
                localStorage.setItem("trades", JSON.stringify(updatedTrades));
            } catch (error) {
                console.error("Failed to update trades in localStorage:", error);
            }
        }

        if (onClosePosition) {
            onClosePosition(orderId);
        }
        setSelectedOrder(null);
    };

    const handleCancelOrder = (orderId: string) => {
        // Remove the pending order
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);

        // Update localStorage
        const storedTrades = localStorage.getItem("trades");
        if (storedTrades) {
            try {
                const trades = JSON.parse(storedTrades);
                const updatedTrades = trades.filter((trade: { id: string }) => trade.id !== orderId);
                localStorage.setItem("trades", JSON.stringify(updatedTrades));
            } catch (error) {
                console.error("Failed to update trades in localStorage:", error);
            }
        }

        if (onCancelOrder) {
            onCancelOrder(orderId);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Position holding":
                return (
                    <div className="space-y-3">
                        {openPositions.length > 0 ? (
                            openPositions.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onClick={handleOrderClick}
                                />
                            ))
                        ) : (
                            <EmptyState message="No open positions" />
                        )}
                    </div>
                );

            case "Pending Orders":
                return (
                    <div className="space-y-3">
                        {pendingOrders.length > 0 ? (
                            pendingOrders.map((order) => (
                                <PendingOrderCard
                                    key={order.id}
                                    order={order}
                                    onCancel={handleCancelOrder}
                                />
                            ))
                        ) : (
                            <EmptyState message="No pending orders" />
                        )}
                    </div>
                );

            case "History":
                return (
                    <div className="space-y-3">
                        {historyOrders.length > 0 ? (
                            historyOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onClick={() => {}}
                                    showCloseButton={false}
                                />
                            ))
                        ) : (
                            <EmptyState message="No trade history" />
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full p-2">
            <div className="w-full rounded-3xl pt-4 text-gray-900">
                <div className="bg-white mb-4 flex items-center justify-between text-xs whitespace-nowrap gap-2 rounded-3xl">
                    <TabButton
                        label="Position holding"
                        active={activeTab === "Position holding"}
                        onClick={() => setActiveTab("Position holding")}
                    />
                    <TabButton
                        label="Pending Orders"
                        active={activeTab === "Pending Orders"}
                        onClick={() => setActiveTab("Pending Orders")}
                    />
                    <TabButton
                        label="History"
                        active={activeTab === "History"}
                        onClick={() => setActiveTab("History")}
                    />
                </div>

                <div className="mb-4 rounded-3xl bg-white px-4 py-5 shadow-sm border border-gray-100">
                    <div className="mb-3 text-center text-xs font-semibold text-gray-700">
                        Profit and Loss
                    </div>
                    <div
                        className={
                            "mb-4 text-center text-2xl font-bold " +
                            (openPositionsPnL >= 0 ? "text-[#BC8600]" : "text-red-500")
                        }
                    >
                        {openPositionsPnL.toFixed(2)}
                    </div>
                    <div className="space-y-1.5">
                        <SummaryRow label="Balance" value={balance.toFixed(2)} />
                        <SummaryRow label="Current Margin" value={currentMargin.toFixed(2)} />
                        <SummaryRow label="Risk Rate" value={`${riskRate.toFixed(6)}%`} />
                        <SummaryRow label="Open Positions" value={openPositions.length} />
                        <SummaryRow label="Pending Orders" value={pendingOrders.length} />
                    </div>
                </div>

                {renderTabContent()}
            </div>

            {selectedOrder && (
                <ClosePositionModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    onConfirmClose={handleConfirmClose}
                />
            )}

            <Footer />
        </div>
    );
};

