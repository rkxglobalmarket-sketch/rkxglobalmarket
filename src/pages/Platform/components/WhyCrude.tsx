import { useTranslation } from "react-i18next";

function WhyCrude() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-center items-center gap-10 mt-10">
            <h1 className="text-4xl font-bold text-center mt-10">
                {t('Crude oil and commodities trading')}
            </h1>
            <p className="text-center text-sm text-gray-700 w-15/20">
                {t("Bulk commodities are material commodities that can enter the circulation field, but are not retail links, have commodity attributes and are used for industrial and agricultural production and consumption. In the financial investment market, bulk commodities refer to commodities that are homogeneous, tradable and widely used as basic industrial raw materials, such as crude oil, non-ferrous metals, steel, agricultural products, iron ore, coal, etc. Historically, commodities were traded in physical form, but since modern times, commodities are mostly traded electronically. Commodities trading can take many forms. Futures contracts are one of the most common and popular ways to trade commodities. Stocks and exchange-traded funds (ETFs) can also be used to trade commodities. Commodity markets are physical or virtual markets where commodities are bought and sold. There are now about 50 major commodity markets, which facilitate trading in about 100 commodities. Commodities can be divided into hard and soft categories. Hard commodities are often natural resources that often have to be mined or extracted, such as gold, rubber and crude oil; The soft commodities are agricultural products or livestock. The participants in the commodity market are mainly producers, industrial end users, traders and speculators. The world's major commodity exchanges mainly include Chicago Mercantile Exchange (CME), New York Mercantile Exchange (NYMEX), London Metal Exchange, Japan Commodity Exchange, Shanghai Commodity Exchange, Australian Commodity Exchange and so on.")}
            </p>
        </div>
    )
}

export default WhyCrude
