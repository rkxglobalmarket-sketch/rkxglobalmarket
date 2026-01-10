import { useTranslation } from "react-i18next";


function Footer() {
    const { t } = useTranslation();
    return (
        <div className="w-full mt-20 bg-[#023A51] h-full flex flex-col items-center justify-center">
            <div className="w-15/20">
                <h1 className="text-white text-xl md:text-2xl font-bold py-20 text-center md:text-left">{t("The company is committed to meeting your global asset trading investment needs")}</h1>
                <p className="text-white text-center md:text-left text-sm">
                    {t("Risk Warning: Trading CFDs on margin carries a high level of risk and may not be suitable for all investors. Before deciding to trade foreign exchange, you should carefully consider your investment objectives, level of experience and risk appetite. You may lose some or all of your investment, so you should not invest money you cannot afford to lose. You should be aware of all the risks associated with foreign exchange trading and consult an independent financial advisor if you are in any doubt.")}
                </p>
            </div>
            <div className="border-t border-gray w-full mt-15 mb-6 flex items-center justify-center">
                <p className="w-15/20 text-white text-center md:text-left text-sm md:text-md font-semibold mt-10">
                    {t("Copyright © 2016-2025 equinnox LIMITED. All Rights Reserved.")}
                </p>
            </div>
        </div>
    )
}

export default Footer

