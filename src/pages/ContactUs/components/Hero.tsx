import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function Hero() {
    const { t } = useTranslation();
    return (
        <div className="" style={{ backgroundImage: "url('/assets/184-scaled-1-min.jpg')", backgroundSize: 'cover', backgroundPosition: 'left', backgroundRepeat: 'no-repeat' }}>
            <div className="w-full h-full bg-black/65 flex flex-col items-center py-16 md:py-20">
                <div className='flex flex-col justify-between items-center w-15/20 md:flex-row'>
                    <div className="mt-10 md:mt-30 w-11/12 md:w-15/20 flex flex-col md:items-start items-center text-center md:text-left">
                        <p className="text-2xl font-bold md:text-4xl text-white">{t('Contact us')}</p>
                        <p className="text-2xl font-bold md:text-5xl mt-8 md:mt-15 text-white">{t('connect us')}</p>
                        <div>
                            <NavLink to="/terminal" className='flex items-center gap-2 bg-[#023A51] px-10 py-4 mt-8 mb-10 md:my-15 hover:bg-[#F57920] transition-all duration-300'>
                                <p className='font-bold text-white text-sm'>{t('Open Free Account')}</p>
                            </NavLink>
                        </div>
                    </div>
                    <img src="/assets/ContactUs.png" alt="Just Image" className='w-60 h-60 md:w-100 md:h-100 mt-6 md:mt-10 mx-auto md:mx-0'/>
                </div>
            </div>
        </div>
    )
}

export default Hero
