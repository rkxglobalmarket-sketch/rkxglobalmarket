import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronRight } from 'lucide-react'
import {
    createChart,
    CandlestickSeries,
    type CandlestickData,
    type IChartApi,
    type ISeriesApi,
    type UTCTimestamp,
} from 'lightweight-charts'
import Footer from '../../components/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../User/Auth/firebase'

type BackendCandle = {
    time: string
    open: number
    high: number
    low: number
    close: number
}

type TimeFrame = '1m' | '5m' | '15m' | '30m' | '1h' | '1d'

const getTimeRange = (interval: TimeFrame): { from: number; to: number } => {
    const now = Math.floor(Date.now() / 1000)
    const ranges: Record<TimeFrame, number> = {
        '1m': 60 * 60 * 24,         // 1 day
        '5m': 60 * 60 * 24 * 5,     // 5 days
        '15m': 60 * 60 * 24 * 10,   // 10 days
        '30m': 60 * 60 * 24 * 30,   // 30 days
        '1h': 60 * 60 * 24 * 60,    // 60 days
        '1d': 60 * 60 * 24 * 365,   // 1 year
    }
    return {
        from: now - ranges[interval],
        to: now,
    }
}

export default function AUDJPYTrading() {
    const navigate = useNavigate()
    const [user, setUser] = useState<string | null>(null)
    const [balance, setBalance] = useState(0)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const currentPath = window.location.pathname
    const stockName = currentPath.split('/').pop() || 'UNKNOWN'
    const stock = stockName === 'main' ? 'AUDJPY=X' : stockName

    const chartContainerRef = useRef<HTMLDivElement>(null)
    const chartRef = useRef<IChartApi | null>(null)
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

    const [activeSection, setActiveSection] = useState<'market' | 'pending'>('market')
    const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>('1m')

    const [setLossEnabled, setSetLossEnabled] = useState(false)
    const [setProfitEnabled, setSetProfitEnabled] = useState(false)
    const [multiplier, setMultiplier] = useState('100')
    const [pendingPrice, setPendingPrice] = useState('')
    const [setLossValue, setSetLossValue] = useState(0)
    const [setProfitValue, setSetProfitValue] = useState(0)
    const [lotsValue, setLotsValue] = useState('0.01')

    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [errorModal, setErrorModal] = useState<string | null>(null)

    const [currentPrice, setCurrentPrice] = useState<number | null>(null)
    const [percentChange, setPercentChange] = useState<number | null>(null)
    const [highPrice, setHighPrice] = useState<number | null>(null)
    const [lowPrice, setLowPrice] = useState<number | null>(null)
    const [openPrice, setOpenPrice] = useState<number | null>(null)

    const timeFrames: TimeFrame[] = ['1m', '5m', '15m', '1h', '1d']

    const incrementValue = (setter: React.Dispatch<React.SetStateAction<number>>, step = 1) => {
        setter(prev => Math.round((prev + step) * 100) / 100)
    }

    const decrementValue = (setter: React.Dispatch<React.SetStateAction<number>>, step = 1, min = 0) => {
        setter(prev => Math.max(min, Math.round((prev - step) * 100) / 100))
    }

    const incrementLots = () => {
        const current = parseFloat(lotsValue) || 0
        setLotsValue((Math.round((current + 0.01) * 100) / 100).toString())
    }

    const decrementLots = () => {
        const current = parseFloat(lotsValue) || 0
        const newValue = Math.max(0.01, Math.round((current - 0.01) * 100) / 100)
        setLotsValue(newValue.toString())
    }

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser?.uid || null)
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (!chartContainerRef.current) return

        chartRef.current = createChart(chartContainerRef.current, {
            height: 260,
            width: chartContainerRef.current.clientWidth,
            layout: {
                background: { color: '#f9fafb' },
                textColor: '#6b7280',
            },
            grid: {
                vertLines: { color: '#e5e7eb' },
                horzLines: { color: '#e5e7eb' },
            },
            rightPriceScale: { borderVisible: false },
            timeScale: { borderVisible: false, timeVisible: true },
            crosshair: { mode: 1 },
        })

        seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
            upColor: '#16a34a',
            downColor: '#dc2626',
            wickUpColor: '#16a34a',
            wickDownColor: '#dc2626',
            borderVisible: false,
        })

        const resize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.resize(chartContainerRef.current.clientWidth, 260)
            }
        }

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
            chartRef.current?.remove()
        }
    }, [])

    useEffect(() => {
        const fetchBalance = async () => {
            if (user) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/data/balance/${user}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBalance(data.balance ?? 0);
                    } else {
                        console.error("Failed to fetch balance:", response.statusText);
                        setBalance(0);
                    }
                } catch (error) {
                    console.error("Error fetching balance:", error);
                    setBalance(0);
                }
            } else {
                setBalance(0);
            }
        };
        fetchBalance();
    }, [user]);

    const updateBalanceOnServer = useCallback(async (newBalance: number) => {
        if (!user) return;
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/data/balance/${user}`, {
                method: 'PUT',
                body: JSON.stringify({ amount: newBalance }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Error updating balance:", error);
        }
    }, [user]);

    const fetchCandles = useCallback(async (signal?: AbortSignal) => {
        if (!seriesRef.current) return

        try {
            const { from, to } = getTimeRange(activeTimeFrame)
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_SERVER}/data/yahoo/chart/formatted?symbol=${stock}&interval=${activeTimeFrame}&from=${from}&to=${to}`,
                { signal }
            )

            if (!res.ok) throw new Error('Failed to fetch chart data')

            const response = await res.json()

            const candles: BackendCandle[] = response?.data ?? []

            const formatted: CandlestickData[] =
                candles.map((c: BackendCandle) => ({
                    time: Math.floor(new Date(c.time).getTime() / 1000) as UTCTimestamp,
                    open: Number(c.open),
                    high: Number(c.high),
                    low: Number(c.low),
                    close: Number(c.close),
                })) ?? []

            seriesRef.current?.setData(formatted)

            if (candles.length > 0) {
                const latestCandle = candles[candles.length - 1]
                const firstCandle = candles[0]

                const close = Number(latestCandle.close)
                const open = Number(firstCandle.open)

                setCurrentPrice(close)
                setHighPrice(Number(latestCandle.high))
                setLowPrice(Number(latestCandle.low))
                setOpenPrice(Number(latestCandle.open))

                if (open !== 0) {
                    const change = ((close - open) / open) * 100
                    setPercentChange(Math.round(change * 100) / 100)
                }
            }

            setFetchError(null)
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                console.error('Chart fetch error:', err)
                setFetchError('Unable to connect to server. Please ensure the backend is running on port 4000.')
            }
        } finally {
            setIsLoading(false)
        }
    }, [activeTimeFrame, stock])

    useEffect(() => {
        if (!seriesRef.current) return

        const controller = new AbortController()
        setIsLoading(true)
        setFetchError(null)

        fetchCandles(controller.signal)

        const intervalId = setInterval(() => {
            fetchCandles()
        }, 5000)

        return () => {
            controller.abort()
            clearInterval(intervalId)
        }
    }, [activeTimeFrame, stock, fetchCandles])

    const displayStock = stock.replace('=X', '')

    const formatPrice = (price: number | null) => {
        if (price === null) return '--'
        return price.toFixed(2)
    }

    const formatPercent = (percent: number | null) => {
        if (percent === null) return '--'
        const sign = percent >= 0 ? '+' : ''
        return `${sign}${percent.toFixed(2)}%`
    }

    const isPositive = percentChange !== null && percentChange >= 0

    const handleOpenPosition = (positionType: 'LONG' | 'SHORT') => {
        // Check if user is logged in
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        const lots = parseFloat(lotsValue);
        if (isNaN(lots) || lots < 0.01) {
            setErrorModal('Invalid lots value');
            return;
        }
        if (currentPrice === null) {
            setErrorModal('Current price not available');
            return;
        }
        if (activeSection === 'pending' && !pendingPrice) {
            setErrorModal('Pending price is required for pending orders');
            return;
        }
        const entryPrice = activeSection === 'pending' ? parseFloat(pendingPrice) : currentPrice;

        if (positionType === 'LONG') {
            if (setLossEnabled && setLossValue >= entryPrice) {
                setErrorModal('Stop Loss must be below entry price for Long positions');
                return;
            }
            if (setProfitEnabled && setProfitValue <= entryPrice) {
                setErrorModal('Take Profit must be above entry price for Long positions');
                return;
            }
        } else {
            if (setLossEnabled && setLossValue <= entryPrice) {
                setErrorModal('Stop Loss must be above entry price for Short positions');
                return;
            }
            if (setProfitEnabled && setProfitValue >= entryPrice) {
                setErrorModal('Take Profit must be below entry price for Short positions');
                return;
            }
        }

        const balanceRequired = parseFloat(((lots * 20) + (lots * 100 * currentPrice / parseFloat(multiplier))).toFixed(2));

        if (balance < balanceRequired) {
            setErrorModal(`Insufficient balance. Required: ${balanceRequired} USD, Available: ${balance} USD`);
            return;
        }

        const order = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            type: positionType,
            orderType: activeSection === 'pending' ? 'PENDING' : 'MARKET',
            symbol: stock,
            price: entryPrice,
            lots: lots,
            multiplier: parseInt(multiplier),
            stopLoss: setLossEnabled ? setLossValue : null,
            takeProfit: setProfitEnabled ? setProfitValue : null,
            estimatedFee: parseFloat((lots * 20).toFixed(2)),
            estimatedMargin: parseFloat((lots * 100 * currentPrice / parseFloat(multiplier)).toFixed(2)),
            balanceRequired: balanceRequired,
            timestamp: new Date().toISOString(),
            status: 'OPEN',
            userId: user,
        };

        try {
            const existingTrades = JSON.parse(localStorage.getItem('trades') || '[]');
            existingTrades.push(order);
            localStorage.setItem('trades', JSON.stringify(existingTrades));

            const newBalance = balance - balanceRequired;
            setBalance(newBalance);
            updateBalanceOnServer(newBalance);

            setErrorModal(null);
            alert(`✅ ${positionType} position opened successfully!\n\nSymbol: ${displayStock}\nLots: ${lots}\nEntry Price: ${entryPrice}\nBalance Deducted: ${balanceRequired} USD`);
            console.log(`Opening ${positionType} Position:`, JSON.stringify(order, null, 2));
        } catch (error) {
            setErrorModal('Failed to save trade. Please try again.');
            console.error('Error saving trade:', error);
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <div className="w-full max-w-md p-4 mx-auto pb-20 rounded-xl">

                <div className="mb-5">
                    <div className="flex items-baseline justify-between gap-3 px-3 rounded-xl">
                        <button className="text-sm font-semibold flex items-center gap-2">
                            {displayStock}
                            <NavLink to="/terminal"><ChevronRight /></NavLink>
                        </button>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                {formatPrice(currentPrice)}
                            </span>
                            <span className={`text-base font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                {formatPercent(percentChange)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-1 mb-5 flex-wrap">
                    {timeFrames.map(tf => (
                        <button
                            key={tf}
                            onClick={() => setActiveTimeFrame(tf)}
                            className={`px-3 py-2 rounded-full text-xs font-medium transition-all
                ${activeTimeFrame === tf
                                    ? 'bg-[#BC8600] text-white'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }
              `}
                        >
                            {tf.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div>
                    <div className="flex gap-2 justify-between -mt-2">
                        <button className="text-gray-600 rounded-xl text-[10px]  font-medium hover:bg-gray-300 transition-all">
                            High: {formatPrice(highPrice)}
                        </button>
                        <button className="text-gray-600 rounded-xl text-[10px] font-medium hover:bg-gray-300 transition-all">
                            Low: {formatPrice(lowPrice)}
                        </button>
                        <button className="text-gray-600 rounded-xl text-[10px] font-medium hover:bg-gray-300 transition-all">
                            Open: {formatPrice(openPrice)}
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    <div className="relative w-full bg-gray-50 rounded-2xl">
                        {isLoading && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-2xl">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-6 h-6 border-2 border-[#BC8600] border-t-transparent rounded-full animate-spin" />
                                    <span className="text-xs text-gray-500">Loading chart...</span>
                                </div>
                            </div>
                        )}
                        {fetchError && !isLoading && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 rounded-2xl">
                                <div className="flex flex-col items-center gap-2 p-4 text-center">
                                    <span className="text-red-500 text-sm">{fetchError}</span>
                                    <button
                                        onClick={() => fetchCandles()}
                                        className="mt-2 px-4 py-2 bg-[#BC8600] text-white text-xs rounded-lg hover:bg-[#BC8600]/80"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        )}
                        <div ref={chartContainerRef} className="w-full" style={{ height: 260 }} />
                    </div>
                </div>

                {/* Rest of the component remains the same */}
                <div className="mt-2 border-b border-gray-200 mb-2">
                    <div className="flex gap-0 bg-gray-200 rounded-xl w-full">
                        <button
                            onClick={() => setActiveSection('market')}
                            className={`w-full px-3 py-3 text-sm text-nowrap font-semibold transition-colors border-b-2 ${activeSection === 'market' ? 'text-white bg-[#BC8600] rounded-l-xl' : 'text-gray-600 rounded-l-xl hover:text-gray-900'}`}
                        >
                            Market Price
                        </button>
                        <button
                            onClick={() => setActiveSection('pending')}
                            className={`w-full px-3 text-nowrap overflow-hidden py-3 text-sm font-semibold transition-colors border-b-2 ${activeSection === 'pending' ? 'text-white bg-[#BC8600] rounded-r-xl' : 'text-gray-600 rounded-r-xl hover:text-gray-900'}`}
                        >
                            Pending Orders
                        </button>
                    </div>
                </div>

                <div className="space-y-1">
                    {activeSection === 'pending' && (
                        <div className='flex flex-row items-center gap-2 justify-between border-b-2 border-gray-300'>
                            <label htmlFor="pendingPrice" className='text-md text-gray-500 mb-2'>Price</label>
                            <input
                                id="pendingPrice"
                                type="number"
                                placeholder='Please Enter the Price'
                                value={pendingPrice}
                                onChange={(e) => setPendingPrice(e.target.value)}
                                className="px-3 py-2 border-gray-500 bg-transparent text-gray-900 text-sm w-[180px] focus:border-transparent focus:ring-0"
                            />
                        </div>
                    )}

                    <div className='flex flex-row justify-between items-center'>
                        <label className="block text-sm text-gray-500 mb-2">Multiplier</label>
                        <div className="flex justify-between items-center ml-3 px-4 py-3 bg-gray-100 rounded-lg">
                            <select
                                name="Multiplier"
                                id="multiplier"
                                value={multiplier}
                                onChange={(e) => setMultiplier(e.target.value)}
                                className="bg-transparent text-gray-900 text-sm focus:outline-none"
                            >
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row gap-2 justify-between items-center'>
                        <label className="text-sm text-gray-500 mb-2 flex flex-row items-center gap-2">
                            Set Loss
                            <button
                                onClick={() => setSetLossEnabled(prev => !prev)}
                                className={`ml-1.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${setLossEnabled ? 'bg-yellow-600 border-yellow-600' : 'border-gray-300 hover:border-yellow-600'}`}
                            >
                                {setLossEnabled && <span className="text-white text-xs font-bold">✓</span>}
                            </button>
                        </label>
                        <div className={`flex items-center gap-3 ${!setLossEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                            <button
                                onClick={() => decrementValue(setSetLossValue)}
                                disabled={!setLossEnabled}
                                className="w-5 h-5 flex items-center justify-center border border-gray-300 hover:border-yellow-600 hover:text-yellow-600 transition-all"
                            >
                                <span className="text-lg">−</span>
                            </button>
                            <input
                                type="number"
                                value={setLossValue}
                                disabled={!setLossEnabled}
                                onChange={(e) => setSetLossValue(parseFloat(e.target.value) || 0)}
                                className="px-3 py-2 border border-gray-300 bg-white text-gray-900 text-xs w-[100px] disabled:bg-gray-100"
                            />
                            <button
                                onClick={() => incrementValue(setSetLossValue)}
                                disabled={!setLossEnabled}
                                className="w-5 h-5 flex items-center justify-center border border-gray-300 hover:border-yellow-600 hover:text-yellow-600 transition-all"
                            >
                                <span className="text-lg">+</span>
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-row gap-2 justify-between items-center'>
                        <label className="text-sm text-gray-500 mb-2 flex flex-row items-center gap-2">
                            Set Profit
                            <button
                                onClick={() => setSetProfitEnabled(prev => !prev)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${setProfitEnabled ? 'bg-yellow-600 border-yellow-600' : 'border-gray-300 hover:border-yellow-600'}`}
                            >
                                {setProfitEnabled && <span className="text-white text-xs font-bold">✓</span>}
                            </button>
                        </label>
                        <div className={`flex items-center gap-3 ${!setProfitEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                            <button
                                onClick={() => decrementValue(setSetProfitValue)}
                                disabled={!setProfitEnabled}
                                className="w-5 h-5 flex items-center justify-center border border-gray-300 hover:border-yellow-600 hover:text-yellow-600 transition-all"
                            >
                                <span className="text-lg">−</span>
                            </button>
                            <input
                                type="number"
                                value={setProfitValue}
                                disabled={!setProfitEnabled}
                                onChange={(e) => setSetProfitValue(parseFloat(e.target.value) || 0)}
                                className="px-3 py-2 border border-gray-300 bg-white text-gray-900 text-xs w-[100px] disabled:bg-gray-100"
                            />
                            <button
                                onClick={() => incrementValue(setSetProfitValue)}
                                disabled={!setProfitEnabled}
                                className="w-5 h-5 flex items-center justify-center border border-gray-300 hover:border-yellow-600 hover:text-yellow-600 transition-all"
                            >
                                <span className="text-lg">+</span>
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-row gap-2 justify-between items-center'>
                        <label className="text-sm text-gray-500 mb-2 flex flex-row items-center gap-2">
                            Lots(Step:0.01)
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={decrementLots}
                                className="w-5 h-5 flex items-center justify-center border border-gray-300 hover:border-yellow-600 hover:text-yellow-600 transition-all"
                            >
                                <span className="text-lg">−</span>
                            </button>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={lotsValue}
                                onChange={(e) => setLotsValue(e.target.value)}
                                onBlur={() => {
                                    const parsed = parseFloat(lotsValue);
                                    if (isNaN(parsed) || parsed < 0.01) {
                                        setLotsValue('0.01');
                                    }
                                }}
                                className="px-3 py-2 border border-gray-300 bg-white text-gray-900 text-xs w-[100px]"
                            />
                            <button
                                onClick={incrementLots}
                                className="w-5 h-5 flex items-center justify-center border border-gray-300 hover:border-yellow-600 hover:text-yellow-600 transition-all"
                            >
                                <span className="text-lg">+</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='border-t-2 mt-2 border-gray-300 pb-2'>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <div className='flex flex-row gap-2 w-full justify-between items-center text-sm text-gray-500 py-1'>
                            <p>Each Sheet</p>
                            <p>1 Sheet = 100 {displayStock}</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 w-full justify-between items-center text-sm text-gray-500 py-1'>
                        <p>Estimated Handling Fee</p>
                        <p>{(parseFloat(lotsValue) * 20).toFixed(2)} USD</p>
                    </div>
                    <div className='flex flex-row gap-2 w-full justify-between items-center text-sm text-gray-500 py-1'>
                        <p>Estimated Margin</p>
                        <p>{(parseFloat(lotsValue) * 100 * (currentPrice || 0) / parseFloat(multiplier)).toFixed(2)}</p>
                    </div>
                    <div className='flex w-full flex-row gap-2 justify-between items-center text-sm text-gray-500 py-1'>
                        <p>Balance required</p>
                        <p>{((parseFloat(lotsValue) * 20) + (parseFloat(lotsValue) * 100 * (currentPrice || 0) / parseFloat(multiplier))).toFixed(2)}</p>
                    </div>

                    {/* Login Modal */}
                    {showLoginModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Login Required</h3>
                                <p className="text-gray-600 text-sm mb-4">Please login to place an order.</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowLoginModal(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowLoginModal(false);
                                            navigate('/auth/login');
                                        }}
                                        className="flex-1 bg-[#BC8600] text-white py-2 rounded-lg hover:bg-[#BC8600]/80 transition-all"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Modal */}
                    {errorModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl">
                                <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
                                <p className="text-gray-700 text-sm mb-4">{errorModal}</p>
                                <button
                                    onClick={() => setErrorModal(null)}
                                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    <div className='flex flex-row gap-2 w-full justify-between items-center text-sm text-gray-500 py-1 mt-3'>
                        <button
                            onClick={() => handleOpenPosition('LONG')}
                            className="w-full bg-yellow-600 text-white py-2 rounded-xl hover:bg-yellow-600/80 transition-all"
                        >
                            Open Long
                        </button>
                        <button
                            onClick={() => handleOpenPosition('SHORT')}
                            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600/70 transition-all"
                        >
                            Open Short
                        </button>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}

