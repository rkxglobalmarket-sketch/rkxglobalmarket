// utils/symbolMap.ts

export const symbolMap: Record<string, string[]> = {
  // Forex
  EURUSD: ["EURUSD"],
  GBPUSD: ["GBPUSD"],
  USDJPY: ["USDJPY"],
  AUDUSD: ["AUDUSD"],
  AUDNZD: ["AUDNZD"],
  AUDJPY: ["AUDJPY"],
  NZDUSD: ["NZDUSD"],
  USDCAD: ["USDCAD"],
  USDCHF: ["USDCHF"],
  CADJPY: ["CADJPY"],
  EURJPY: ["EURJPY"],
  EURGBP: ["EURGBP"],
  EURCHF: ["EURCHF"],
  EURAUD: ["EURAUD"],
  EURCAD: ["EURCAD"],
  EURNZD: ["EURNZD"],
  GBPAUD: ["GBPAUD"],
  GBPJPY: ["GBPJPY"],
  GBPNZD: ["GBPNZD"],

  // Crypto
  BTCUSD: ["BTCUSD"],
  ETHUSD: ["ETHUSD"],

  // Metals
  XAUUSD: ["XAUUSD", "GOLDUSD"],
  XAGUSD: ["XAGUSD", "SILVERUSD"],

  // Oil (critical fix)
  USOIL: ["WTIUSD", "USOILUSD", "OIL.WTI"],
  UKOIL: ["BRENTUSD", "UKOILUSD", "OIL.BRENT"],
}
