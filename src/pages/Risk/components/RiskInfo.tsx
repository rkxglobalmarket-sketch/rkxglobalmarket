import { useTranslation } from "react-i18next";

function RiskInfo() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-15/20 flex flex-col items-start">
                <h1 className="text-lg font-bold mt-10">
                    {t('Risk investment')}
                </h1>
                <p className="text-sm mt-5">
                    {t('Margin forex trading involves high risks and may not be suitable for all investors. A high degree of leverage can affect you negatively or positively. Possibilities include losing more than the amount invested. You should carefully consider your investment objectives, trading experience and risk tolerance before deciding to buy or sell foreign exchange. Investors should be aware of all the risks associated with foreign exchange trading. If in doubt, seek advice from an independent financial adviser. Any comments, news, research, analysis, prices or other information published on this website shall be regarded as general market information only and shall not constitute investment advice. equinnox LIMITED Will not be responsible for any loss or loss (including, without limitation, any loss of earnings) that may arise from the direct or indirect use or reliance on such information.')}
                </p>
                <h1 className="text-lg font-bold mt-10">
                    {t('Margin and Leverage')}
                </h1>
                <p className="text-sm mt-5">
                    {t('In order to trade leveraged CFDS or forex, you will need to deposit a certain amount of money with equinnox LIMITED as margin. Margin is usually a relatively small fraction of the total contract value. For example, trading a 100:1 leverage contract requires 1% of the value of the contract as margin. This means that a small price change can lead to a large change in the value of the contract you are trading, which can be to your advantage or bring you a significant loss.')}
                </p>
                <p className="text-sm mt-5">
                    {t('You may lose your initial capital injection and be required to make margin calls to maintain your position. If the margin requirement is not met, your position will be forced to close, resulting The loss will be borne by you.')}
                </p>
                <h1 className="text-lg font-bold mt-10">
                    {t('Market analysis')}
                </h1>
                <p className="text-sm mt-5">
                    {t('Any views, news, research, analysis, prices and other information posted on this website are general market commentary and not investment advice. equinnox LIMITED shall not be liable for any loss, including, but not limited to, loss of profits, that may result directly or indirectly from reference to such information.')}
                </p>
                <h1 className="text-lg font-bold mt-10">
                    {t('Risk of network transaction')}
                </h1>
                <p className="text-sm mt-5">
                    {t('Transactions over the Internet are subject to risks, including hardware, software and network connection failures. Due to the reliability of the signal, receiving line, equipment configuration and connecting system between the Internet, none of it is determined by equinnox LIMITED Therefore, the Company will not be responsible for communication failures, distortions and delays in transactions through the Internet. equinnox LIMITED CAPITAL The GROUP uses back-up systems and contingency plans to reduce the possibility of system failures and provides mail trading services.')}
                </p>
                <h1 className="text-lg font-bold mt-10">
                    {t('Accuracy of data')}
                </h1>
                <p className="text-sm mt-5">
                    {t('The contents of this website are provided solely to assist traders in making independent investment decisions and are subject to change without notice. equinnox LIMITED has taken reasonable steps to ensure the accuracy of the information on the website, but cannot guarantee the accuracy of the information, We shall not be liable for any loss or loss that may arise, directly or indirectly, from any delay in or failure to transmit or receive the contents of the Website or your inability to access the Website, or any instructions or notices sent through the Website.')}
                </p>
            </div>
        </div>
    )
}

export default RiskInfo

