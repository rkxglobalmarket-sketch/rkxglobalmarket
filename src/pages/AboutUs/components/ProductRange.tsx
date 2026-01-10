import { useTranslation } from "react-i18next"

function ProductRange() {
    const { t } = useTranslation()
    return (
        <div className="w-full flex items-center justify-center">
            <div className="mt-16 md:mt-30 w-15/20 flex flex-wrap justify-between">
                <div className="w-full md:w-1/2 pr-4">
                    <h1 className="text-4xl font-bold">{t("Product range")}</h1>
                    <ul className="flex flex-col items-left justify-center text-sm list-disc list-inside">
                        <li className="mt-10">
                            {t("Foreign exchange : Offers up to dozens of mainstream foreign exchange currency pairs, including Euro USD (EURUSD), US Dollar CAD (USDCAD), British Pound USD (GBPUSD) and so on.")}
                        </li>
                        <li className="mt-10">
                            {t("Precious metals: Provide a variety of metal spot trading: gold (XAUUSD), silver (XAGUSD) precious metals trading.")}
                        </li>
                        <li className="mt-10">
                            {t("Crude OIL: Offers Us OIL trading")}
                        </li>
                        <li className="mt-10">
                            {t("Index: Hong Kong Hang Seng Index (HK 50), German Index (GER 30), S&P 500 (US 500)")}
                        </li>
                        <li className="mt-10">
                            {t("Cryptocurrency: It provides dozens of mainstream digital currency pairs, including bitcoin (BTCUSD), Ethereum (ETHUSD) and XRPUSD.")}
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 pl-4 mt-8 md:mt-0">
                    <img src="/assets/about3-min.jpg" alt="About image" />
                </div>
            </div>
        </div>
    )
}

export default ProductRange
