
import { useTranslation } from "react-i18next"

function WhyCrypto() {
    const {t} = useTranslation()
    return (
        <div className="flex flex-col justify-center items-center gap-10 mt-10 bg-[#F8F8F8] pb-20">
            <h1 className="text-4xl font-bold text-center mt-10 ">
                {t('Why trade cryptocurrency CFDS?')}
            </h1>
            <p className="text-center text-sm text-gray-700 w-15/20">
                {t('Trading cryptocurrencies through contracts for difference (CFDS) is a new way to trade this volatile market. And, you don\'t even need to be an expert CFD trader on how to trade bitcoin and other crypto CFD. equinnox LIMITED offers cryptocurrency CFDS for major assets such as bitcoin, XRP (XRP), Bitcoin Cash, Litecoin and Ethereum for positions against the US dollar and Australian dollar.')}
            </p>
        </div>
    )
}

export default WhyCrypto

