import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function What() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-4xl font-bold">
                {t("What is INTRAGLOBAL LIMITED")}
            </h1>
            <p className="text-sm font-semibold w-180 text-center mt-5 text-gray-600">
                {t("INTRAGLOBAL LIMITED offers multiple asset classes - Forex, equities, equity indices, commodities, Cryptocurrencies and synthetic indices -- on one platform. With exclusive access to innovative trade types, Bringing a higher level of INTRAGLOBAL LIMITED experience to new and existing traders on our platform.")}
            </p>
            <div className="w-full bg-[#023A51] mt-20">
                <p className="text-center text-white text-2xl font-bold p-5 pt-10">
                    {t("Download INTRAGLOBAL LIMITED")}
                </p>
                <div className="flex items-center justify-center gap-20">
                    <NavLink to="/terminal" className="bg-white px-10 py-4 font-bold text-sm rounded-lg">
                        {t("ios Download")}
                    </NavLink>
                    <NavLink to="/terminal" className="bg-white px-10 py-4 my-10 font-bold text-sm rounded-lg">
                        {t("Android Download")}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default What