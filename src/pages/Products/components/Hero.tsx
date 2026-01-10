import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function Hero() {
    const { t } = useTranslation();
    return (
        <div className="" style={{ backgroundImage: "url('/assets/platform-min.jpg')", backgroundSize: 'cover', backgroundPosition: '0px 0px', backgroundRepeat: 'no-repeat' }}>
            <div className="w-full h-full bg-black/65 flex flex-col items-center py-16 md:py-20">
                <div className="mt-30 w-11/12 md:w-15/20 flex flex-col md:items-start items-center text-center md:text-left">
                    <p className="text-2xl font-bold md:text-4xl text-white">{t('equinnox LIMITED')}</p>
                    <p className="text-2xl w-100 font-bold md:text-5xl mt-8 md:mt-15 text-white">{t('Integrated CFD trading platform')}</p>
                    <div>
                        <NavLink to="/terminal" className='flex items-center gap-2 bg-[#023A51] px-10 py-4 mt-8 mb-10 md:my-15 hover:bg-[#F57920] transition-all duration-300'>
                            <p className='font-bold text-white text-sm'>{t('Open Free Account')}</p>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#023A51]">
                <p className="text-center text-white text-xl font-semibold p-5">
                    {t("330K+ Client on equinnox LIMITED | 100+ Tradable assets | 7/24 Trading")}
                </p>
            </div>
        </div>
    )
}

export default Hero

