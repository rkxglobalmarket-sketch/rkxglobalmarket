import { useTranslation } from "react-i18next";
function Gold() {
    const {t} = useTranslation();
    return (
        <div className="flex flex-col justify-center items-center gap-10 mt-10 bg-[#F8F8F8]">
            <h1 className="text-4xl font-bold text-center mt-10">
                {t('Gold')}
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-start gap-10 w-15/20 mb-10">
                <div className="flex flex-col justify-center items-center gap-10 bg-white w-full p-5 rounded">
                    <h1 className="text-lg font-bold">{t('Introduction to gold margin trading')}</h1>
                    <p className="text-sm text-gray-700">
                        {t('Gold margin trading refers to the gold trading business, the market participants do not need to carry out full capital transfer of the gold transaction, only according to the total amount of gold transaction to pay a certain proportion of the price, as the gold physical delivery performance guarantee. Gold margin trading can be divided into gold spot margin trading and gold futures margin trading. The most famous market for gold margin trading is the London Gold Market, commonly known as London Gold, and its code in the financial trading market is XAU.')}
                    </p>
                    <p className="text-sm text-gray-700">
                        {t("Gold margin trading provides a convenient way for traders to invest. Through gold margin trading, traders can hedge their risks. Especially in times of market turbulence. Gold margin trading can be a two-way long/short trade. Traders can go long or short to take advantage of market conditions. In gold margin trading, if a trader holds a position overnight, as in foreign exchange trading, it also incurs overnight interest. Overnight interest usually occurs when a customer holds a position overnight. It is when the settlement of a trade is carried forward to the next delivery date, and the position is held beyond the specified time. It reflects the difference between the current spot price and the interest rate of the two currencies given the customer's service level.")}
                    </p>
                    <p className="text-sm text-gray-700">
                        {t('The overnight interest rate is based on the difference between the interest rates of the two currencies and the spot price. Overnight interest The Swap point is used to calculate the amount of daily overnight financing adjustments for foreign exchange products. All open positions at the close of trading (5 p.m. Et) are automatically extended to the next settlement date. The adjustment of overnight interest is simply a calculation of the cost of daily position extension. In line with industry practice, equinnox LIMITED calculates its positions through the weekend on Wednesday Eastern time. So the overnight interest rate on Wednesday Eastern time (Thursday morning Beijing time) is three days of overnight interest.')}
                    </p>
                </div>
                <img src="/assets/Group-35.png" alt="gold" className="h-[500px]"/>
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-center items-start gap-10 w-15/20 mb-10">
                <div className="flex flex-col justify-center items-center gap-10 bg-white w-full p-5 rounded">
                    <h1 className="text-lg font-bold">{t('How to trade Gold')}</h1>
                    <p className="text-sm text-gray-700">
                        {t('Gold can be traded in a variety of ways, such as buying physical bullion; Traders can also buy gold futures; Traders can also buy mutual funds and Exchange Traded funds; Contracts for difference, options and shares are also important ways to trade gold.')}
                    </p>
                    <p className="text-sm text-gray-700">
                        {t('For MOST TRADERS, BUYING PHYSICAL GOLD FOR INVESTMENT IS NOT THE BEST option due to storage AND purchase issues, SO choosing online gold trading platforms is a convenient option. Traders who invest in futures can choose futures margin trading platforms. As the largest spot gold trading market in the world, London Gold is the most mature spot gold trading market, which is trusted and welcomed by traders.')}
                    </p>
                    <p className="text-sm text-gray-700">
                        {t('After choosing what to trade, traders need to choose a qualified broker to open an account and deposit a certain amount of margin, then they can trade. A trader trades in anticipation of a long or short direction in order to gain from price changes. Due to the influence of many factors, the gold price is difficult to predict. But like any precious metal or financial trading product, gold can be traded using both fundamental and technical analysis.')}
                    </p>
                    <p className="text-sm text-gray-700">
                        {t('There are many factors affecting the price of gold, notably the strength of the US dollar. However, the relationship between gold and the US dollar is in a dynamic change. In times of financial stress, the negative correlation between the US dollar and gold is more reliable. Economic growth and market uncertainty are also important factors affecting gold prices, including inflation, interest rates, and central bank demand. ; The price of gold is driven as much by politics as by war. Because of its safe-haven nature, the price of gold can fluctuate wildly in these situations. Since gold trading takes the way of margin trading, traders need to be clearly aware that margin trading is a double-edged sword, and traders are faced with the risk of huge losses while enjoying high profits.')}
                    </p>
                </div>
                <img src="/assets/Group-34.png" alt="gold" className="h-[500px]" />
            </div>
        </div>
    )
}
export default Gold

