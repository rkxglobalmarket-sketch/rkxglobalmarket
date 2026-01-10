import TiltedCard from '../../../components/TiltedCard';
import { useTranslation } from "react-i18next";

const DownloadButton: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-center items-center my-5">
            <button
                className="flex items-center bg-[#0b455b] text-white font-bold text-base px-5 py-3 rounded-md gap-3 hover:bg-[#136181] transition-colors sm:text-lg sm:px-8 sm:py-4"
            >
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" />
                        <path d="M16 6l2 2-4 4-2-2-6 6V12h2v3.58L10 12l2 2 4-4 2 2V6z" />
                    </svg>
                </span>
                {t("Download equinnox LIMITED")}
            </button>
        </div>
    )
};

function TiltedCardDisplay() {
    const { t } = useTranslation();
    return (
        <div className='mt-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] max-w-[950px] w-full px-4 sm:px-6'>
            <h1 className='text-3xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#023A51] text-center'>{t("Best Trading Experience")}</h1>
            <p className='text-sm text-center mb-4'>{t("We offer equinnox LIMITED, one of the world's most recognized and widely used online trading platforms. equinnox LIMITED provides powerful chart analysis tools:")}</p>
            <p className='text-sm text-center mb-4'>
                {t("More than 50 technical indicators and disk analysis tools. It is safe, reliable, easy to use, and has the functional characteristics of high-level traders.")}
            </p>
            <DownloadButton />
            <TiltedCard
                imageSrc="/assets/experience_mt5.png"
                altText="Animated Image"
                imageHeight="auto"
                imageWidth="100%"
                rotateAmplitude={6}
                scaleOnHover={1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
            />
        </div>
    )
}

export default TiltedCardDisplay

