import * as Lucide from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
type LucideIconName = keyof typeof Lucide
import { useTranslation } from 'react-i18next'

interface FeatureCardProps {
    icon: LucideIconName
    content: string
}

function FeatureCard({
    icon, content
}: FeatureCardProps) {
    const IconComponent = Lucide[icon] as LucideIcon

    if (!IconComponent) {
        console.error(`Lucide icon "${icon}" not found. This should not happen with correct type usage.`)
        return null
    }

    return (
        <div className='flex flex-col items-center  w-[400px] transition-all p-10 bg-white gap-10'>
            <IconComponent className="w-15 h-15 text-[#023A51]" />
            <h1 className="text-black text-md font-bold text-center">{content}</h1>
        </div>
    )
}

function Features() {
    const { t } = useTranslation()
    return (
        <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
            <h1 className="mt-30 w-full max-w-5xl mx-auto px-4 text-center text-2xl font-bold text-[#023A51] md:text-4xl md:w-15/20">
                {t("Rich global investment variety, secure and fast trading environment for one account trading worldwide")}
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center w-15/20 mx-auto gap-10 mt-20'>
                <FeatureCard icon="ShieldCheck" content={t("The product point spread is much lower than the industry average point spread")} />
                <FeatureCard icon="Settings2" content={t("No repeat quotes, the world's top server NY 4")} />
                <FeatureCard icon="Clock" content={t("The maximum execution speed is less than 40 milliseconds")} />
                <FeatureCard icon="VectorSquare" content={t("Multiple ways of entering and exiting gold")} />
                <FeatureCard icon="Building" content={t("Top global banks and liquidity quotes")} />
                <FeatureCard icon="Phone" content={t("Personal Customer Support")} />
            </div>
            <button className='flex items-center gap-2 bg-[#023A51] px-10 py-4 rounded-sm my-15 hover:bg-[#F57920] transition-all duration-300'>
                <Lucide.ChartNoAxesCombined className="w-5 h-5 text-white" />
                <p className='font-bold text-white'>{t("Start Trading Immediately")}</p>
            </button>
        </div>
    )
}


export default Features


