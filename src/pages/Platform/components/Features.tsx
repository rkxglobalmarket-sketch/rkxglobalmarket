import { useTranslation } from "react-i18next";

function FeatureCard(
    {
        description,
        title,
        image,
        list
    }: {
        description: string
        title: string;
        image: string;
        list: string[];
    }
) {
    return (
        <div className="flex flex-col justify-center items-center gap-10 w-full border-2 p-3 border-[#023A51] hover:bg-[#023A51] hover:text-white transition-all duration-500 ease-in pb-10 mb-10">
            <div className="flex flex-col items-start gap-10">
                <div className="flex flex-row justify-between items-end gap-10 w-full">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <div className="bg-white rounded-2xl p-3">
                        <img src={image} alt="image" height={70} width={70} />
                    </div>
                </div>
                <p className="text-lg font-bold text-gray-500">
                    {description}
                </p>
                <ul className="ml-10">
                    {list.map((item, index) => (
                        <li key={index} className="text-sm font-medium list-disc">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function Features() {

    const { t } = useTranslation()
    
    return (
        <div className="flex flex-col justify-center items-center gap-10 mt-10">
            <h1 className="text-4xl font-bold text-center mt-10">
                {t('Our trading products')}
            </h1>
            <div className="flex flex-col md:flex-row  justify-center items-center gap-10 w-full md:w-15/20 p-3">
                <div className="flex flex-col items-center gap-10 w-full md:w-1/2">
                    <FeatureCard title={t("Forex")} description={t("Access to the world's largest forex trading market by volume through equinnox LIMITED's forex trading platform provided by market leader")} image="/assets/money-exchange.png" list={[t("Competitive point spread"), t("Maximize your trading potential through quality trade execution"), t("Trading hours are 24 hours a day, 5 days a week")]} />
                    <FeatureCard title={t("Cryptocurrency")} description={t("Are you ready to be a part of the currency revolution? In equinnox LIMITED, one of the most popular platforms for trading cryptocurrency contracts for difference")} image="/assets/cryptocurrency.png" list={[t("Only a certain percentage of the total value of the gold transaction is paid as a performance guarantee for the physical delivery of gold."), t("Gold margin trading can be divided into gold spot margin trading and gold futures margin trading."), t("It is traded in financial markets under the symbol XAU.")]}/>
                </div>
                <div className="flex flex-col items-center gap-10 w-full md:w-1/2 mt-2 md:mt-50">
                    <FeatureCard title={t("Gold")} description={t("The intact market safe haven is the most popular precious metal in a crisis. Then open the shell account.")} image="/assets/gold-ingots.png" list={[t("Competitive point spread"), t("Maximize your trading potential through quality trade execution"), t("Trading hours are 24 hours a day, 5 days a week")]} />
                    <FeatureCard title={t("Crude oil and commodities trading")} description={t("Trading volatility increases in OTC crude oil versus commodities, select equinnox LIMITED")} image="/assets/fuel.png" list={[t("The outfield spread is as low as 04 points"), t("Excellent trade execution will maximize your potential"), t("Otc U.S. crude oil and U.K. crude oil can be long or short")]} />
                </div>
            </div>
        </div>
    )
}

export default Features

