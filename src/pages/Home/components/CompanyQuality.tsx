import { useTranslation } from "react-i18next";
interface Quality {
    image: string,
    title: string,
    description: string
}

function CompanyQualityCard({ image, title, description }: Quality) {
    return (
        <div className="flex flex-col justify-center items-center text-white text-center w-100 h-100 p-4 m-4 bg-opacity-50">
            <img src={image} alt="" className="w-30 h-30 object-contain mb-4" />
            <h1 className="text-lg font-bold mb-2">{title}</h1>
            <p className="text-sm">{description}</p>
        </div>
    );
}


function CompanyQuality() {
    const { t } = useTranslation();
    return (
        <div style={{ backgroundImage: "url('/assets/dashboardImage.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }} className="mt-30">
            <div className="bg-[#0B242E]/70 flex flex-col justify-center items-center py-30">
                <h1 className="text-4xl font-bold text-white mt-20 text-center">{t("Ten years of trusted trading")}</h1>
                <p className="text-white font-semibold mt-10 text-sm text-center">{t("Trade FX, CFDs and stocks with an established global broker")}</p>
                <div className="flex flex-wrap justify-center w-full">
                    <CompanyQualityCard image="/assets/Lower-Transaction-Costs.png" title={t("Lower Transaction Costs")} description={t("Competitive handicap, dynamic and variable financing leverage allow you to maximize trading returns")} />
                    <CompanyQualityCard image="/assets/Comprehensive-Investment-Market.png" title={t("A comprehensive investment market")} description={t("Once you open an account, you can invest in global mainstream markets, stocks, gold, crude oil, Bitcoin and currency pairs")} />
                    <CompanyQualityCard image="/assets/Best-Service.png" title={t("The best service")} description={t("Comprehensive local service, multi-channel, round-the-clock, localized professional customer service to answer any questions you have")} />
                </div>
            </div>
        </div>
    );
}

export default CompanyQuality;
