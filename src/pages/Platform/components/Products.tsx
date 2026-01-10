import { useTranslation } from "react-i18next";

function ProductCard({
    image, title, content
}: {
    image: string,
    title: string,
    content: string
}) {
    return (
        <div className=" p-5 w-[350px] rounded-lg">
            <img src={image} alt="" />
            <h2 className="text-center font-bold text-md text-nowrap mt-3">{title}</h2>
            <p className="text-center text-sm mt-3">{content}</p>
        </div>
    )
}

function Products() {
    const { t } = useTranslation();
    return (
        <div className="bg-[#F8F8F8] py-10">
            <h1 className="text-4xl font-bold text-center mt-10">
                {t('Identify trading opportunities in popular global trading products')}
            </h1>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
                <ProductCard image="/assets/Mask-Group-1.png" title={t('Trade in products you are interested in')} content={t('You can trade 24 hours a day, 5 days a week')} />
                <ProductCard image="/assets/Mask-Group-2.png" title={t('Without any commission')} content={t('equinnox LIMITED\'s trading fees on foreign-exchange products are simply the point spread between the bid-ask spread')} />
                <ProductCard image="/assets/Mask-Group-3.png" title={t('Improve your trading potential')} content={t('The foreign exchange market allows you to find opportunities both up and down')} />
                <ProductCard image="/assets/Mask-Group-4.png" title={t('Maximizing value')} content={t('Competitive spread and provide traders with the fastest and highest quality trade execution')} />
            </div>
        </div>
    )
}

export default Products

