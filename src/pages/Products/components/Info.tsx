import { useTranslation } from "react-i18next";

function InfoCard({
    title,
    description,
    number,
}: {
    title: string;
    description: string;
    number: string;
}) {
    return (
        <div className="flex flex-row items-end justify-start h-full w-full gap-2 hover:shadow-xl p-4 rounded-2xl">
            <p className="flex items-center justify-center w-14 h-14 text-3xl border-[3px] border-[#023A51] rounded-full">{number}</p>
            <div className="flex flex-col items-start justify-end gap-2">
                <p className="text-[#023A51] font-bold text-xl">{title}</p>
                <p className="text-gray-600 font-semibold text-lg w-20/20">{description}</p>
            </div>
        </div>
    )
}

function Info() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-center text-2xl md:text-4xl font-bold p-5 pt-10 w-3/4 text-[#023A51]">
                {t("Start trading with equinnox LIMITED with a few simple steps")}
            </p>
            <div className="flex flex-wrap gap-20">
                <img src="/assets/Group-2-1.png" alt="" />
                <div className="flex flex-col items-start justify-center gap-10">
                    <InfoCard title={t("To open an account")} description={t("4 Minutes")} number="1" />
                    <InfoCard title={t("Upload your files")} description={t("Verify youridentity")} number="2" />
                    <InfoCard title={t("Inject capital into your account")} description={t("Choose from a variety of payment methods")} number="3" />
                    <InfoCard title={t("Start trading")} description={t("Stocks | Goods | Foreign Exchange Index ETF | Cryptocurrency")} number="4" />
                </div>
            </div>
        </div>
    )
}

export default Info

