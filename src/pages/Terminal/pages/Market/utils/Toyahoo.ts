export function toYahooSymbol(symbol: string): string {
    // Crypto
    if (symbol === 'BTCUSD') return 'BTC-USD'
    if (symbol === 'ETHUSD') return 'ETH-USD'

    // Metals
    if (symbol === 'XAUUSD') return 'GC=F'
    if (symbol === 'XAGUSD') return 'SI=F'

    // Oil
    if (symbol === 'USOIL') return 'CL=F'
    if (symbol === 'UKOIL') return 'BZ=F'

    // US Stocks
    if (symbol.endsWith('.US')) {
        return symbol.replace('.US', '')
    }

    // Forex (default)
    return `${symbol}=X`
}
