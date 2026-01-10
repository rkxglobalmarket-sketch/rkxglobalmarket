import { useTranslation } from "react-i18next";

function ContactInfo() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-wrap justify-center w-full bg-[#FCFCFC]">
            <div className="w-full bg-[#023A51]">
                <p className="text-center text-white text-4xl font-semibold p-5">
                    {t("Have a question or need expert help?")}
                </p>
            </div>
            <div className="bg-white border-2 border-white shadow-md py-10 px-16 m-20 hover:shadow-2xl hover:border-2 hover:border-gray-500 mb-10 transition-all duration-300 ease-in-out">
                <h1 className="text-3xl font-bold text-center">
                    {t("Contact us")}
                </h1>
                <p className="mt-5 text-gray-600 text-center">
                    {t("customer@equinnoxtrading.com")}
                </p>
            </div>
        </div>
    )
}

export default ContactInfo

