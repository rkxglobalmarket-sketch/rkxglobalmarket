import { useTranslation } from "react-i18next";

function Exchange() {
    const { t } = useTranslation(); 
    return (
        <div className="flex flex-col justify-center items-center gap-10 mt-10">
            <h1 className="text-4xl font-bold text-center mt-10">
                {t('What is foreign exchange trading?')}
            </h1>
            <p className="text-center text-sm text-gray-700 w-15/20">
                {t("Foreign exchange transactions, broadly defined, refer to the exchange of one country's currency for another. Margin trading of foreign exchange (hereinafter referred to as foreign exchange) is to point to by signed a contract with (designated investment), a trust and investment account, deposit a sum of money (deposit) as a guarantee, are set in the (investment) group (or broker) credit line operation, traders can be freely traded at sight of the same value within the quota of foreign exchange or foreign exchange futures. Most forex margin trading offered by forex brokers to individual traders is spot forex trading with margin.")}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-start gap-10 w-15/20">
                <div className="min-h-full flex flex-col justify-center items-center gap-10 bg-white w-full p-7 rounded border-2 border-black ">
                    <h1 className="text-lg font-bold">{t('How to conduct foreign exchange transactions')}</h1>
                    <p className="text-sm text-gray-700">
                        {t("Most individual traders conduct foreign exchange transactions through foreign exchange brokers. Before starting foreign exchange trading, traders need to choose a reliable broker registered account, registered account deposit margin into the account, after downloading the broker-supported trading platform, traders can trade foreign exchange.")}
                    </p>
                </div>
                <div className="min-h-full flex flex-col justify-center items-center gap-10 bg-white w-full p-7 rounded border-2 border-black">
                    <h1 className="text-lg font-bold">{t('Can foreign exchange trading be profitable')}</h1>
                    <p className="text-sm text-gray-700">
                        {t("In foreign exchange trading, traders enjoy the high returns brought by margin trading, but also face the risk of huge losses. Foreign exchange trading depends on the mentality of the trader, his strategy, his experience and the market conditions.")}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Exchange
