import { useTranslation } from "react-i18next"

function WishCard() {
    const { t } = useTranslation()
    return (
        <div className="w-full flex items-center justify-center">
            <div className="mt-16 lg:mt-30 flex flex-col items-center justify-center w-11/12 lg:w-10/15 bg-[#023A51] rounded-xl p-8 lg:p-20">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">{t("Our wish is that")}</h1>
                <p className="mt-7 text-base lg:text-lg font-bold text-white text-center">{t("To be the world's leading financial firm trusted by retail and institutional customers with the best products and services in the market under a long-term partnership.")}</p>
            </div>
        </div>
    )
}

export default WishCard

