import { useTranslation } from "react-i18next";

interface OurMissionCardProps {
    content: string
}

function OurMissionCard({
    content
}: OurMissionCardProps) {
    return (
        <div className="w-80 bg-white h-80 flex flex-col items-center justify-center text-center p-10 border border-gray hover:border-black cursor-pointer transition-all duration-300 shadow-2xs">
            <p>{content}</p>
        </div>
    )
}

function OurMission() {
    const { t } = useTranslation();
    return (
        <div className="w-full flex flex-col items-center justify-center bg-[#F7F7F7]">
            <div className="w-full md:w-15/20 flex flex-col items-center justify-center px-4 md:px-0">
                <p className="mt-10 w-full md:w-15/18 text-2xl md:text-4xl font-bold text-[#023A51] text-center">
                    {t('Our Mission is to Provide the Most Innovative Trading Experience')}
                </p>
                <p className="font-bold text-center text-md md:text-xl mt-6 md:mt-10">
                    {t("equinnox LIMITED was founded in 2016 by a team of talented IT and FinTech specialists who wanted to prove that people don’t need to compromise to earn on financial markets — that trading should be accessible, convenient and more fun.")}
                </p>
                <p className="font-bold text-center text-md md:text-lg mt-6 md:mt-10">
                    {t("Today, we continue to develop, improve and constantly innovate trading experience. We do believe that trading should be available to anyone in the world.")}
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center mt-10 gap-10 mb-10">
                <OurMissionCard content={t("equinnox LIMITED's mission is to provide its clients with the best spread and variety of financial trading products in the market, while providing unmatched turnover rates and the strongest solvency through the world's most technologically advanced order trading platform.")} />
                <OurMissionCard content={t("Fund segregation We keep your funds entirely separate from our own operational funds in various top-tier banking institutions. We won't ever use any of your money for either our own use or any other investment, ensuring your protection at all times.")} />
                <OurMissionCard content={t("Encryption We use the SSL (Secure Sockets Layer) network security protocol to guarantee a secure connection in all communications with you, protect your safety during transactions with us and keep all your information private.")} />
            </div>
        </div>
    )
}

export default OurMission;

