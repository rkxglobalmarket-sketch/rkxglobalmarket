import BrokerCard from "../../../components/BrokerCard"
import { useTranslation } from "react-i18next"

function BrokerQuality() {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col w-full justify-center items-center mt-20">
            <h1 className="w-full max-w-5xl mx-auto px-4 text-center text-2xl font-bold text-[#023A51] md:text-4xl md:w-15/20">{t("Choose a broker with a global presence that is fair, honest and people-oriented")}</h1>
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl mx-auto px-4 pt-12 md:w-14/20 md:pl-12">
                <BrokerCard image={<img src="/assets/strictly-regulated-broker-min.png" alt="Image 1" className = "max-h-[130px] max-w-[160px]"/>} title={t("A highly regulated broker")} content={t("equinnox LIMITED headquartered in the United States is qualified for financial services and regulated by financial institutions MSB in the United States.")}/>
                <BrokerCard image={<img src="/assets/globally-renowned-min.png" alt="Image 1" className = "max-h-[130px] max-w-[160px]"/>} title={t("The world famous")} content={t("We serve a global audience in more than 150 countries, with a network of offices throughout the Americas, Europe, Africa and Asia.")}/>
                <BrokerCard image={<img src="/assets/customer-focus-min.png" alt="Image 1" className = "max-h-[100px] max-w-[160px]"/>} title={t("Focus on the customer")} content={t("At equinnox LIMITED, we do not care about the size of your funds. The client is the only principle we adhere to, not the type of fund account or the size of the investment. All our customers will receive the same quality of service, the same speed of execution, and the same customer support. The values you started with don't change.")}/>
                <BrokerCard image={<img src="/assets/range-of-products-traded-min.png" alt="Image 1" className = "max-h-[130px] max-w-[160px]"/>} title={t("The range of goods traded")} content={t("Our clients can choose to trade CFDs on Forex, Stocks, Indices, Commodities, Bitcoin, Metals and Energy from the same trading account. One platform can trade multiple products, making trading easier and more efficient.")}/>
                <BrokerCard image={<img src="/assets/transparent-and-fairness-min.png" alt="Image 1" className = "max-h-[130px] max-w-[160px]"/>} title={t("Transparency and Fairness")} content={t("At equinnox LIMITED, what you see is what you get, with no hidden clauses. The price, execution and promotion you see. What we advertise is what we can offer to all our clients, regardless of the size of the investment.")}/>
                <BrokerCard image={<img src="/assets/convenient-and-fast-min.png" alt="Image 1" className = "max-h-[130px] max-w-[160px]"/>} title={t("Convenient and quick")} content={t("All of our systems are built on the principle of customer focus. For example, our account opening procedures, account management, deposit and exchange, It's very easy for the customer to operate.")}/>
            </div>
        </div>  
    )
}

export default BrokerQuality

