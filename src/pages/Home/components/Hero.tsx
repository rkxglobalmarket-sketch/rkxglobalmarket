import { NavLink } from "react-router-dom";
import SplitText from "../../../components/SplitText";
import { useTranslation } from "react-i18next";

const FancyBgSection: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => (
    <div
        className="relative w-full min-h-[536px] flex flex-col items-center justify-center"
        style={{
            backgroundColor: "#333",
            backgroundImage:
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR4AWJiYGD4D8QMIAYjiAEAAAD//7nL8I4AAAAGSURBVAMADj8BBRD7ez4AAAAASUVORK5CYII=')",
        }}
    >
        <div
            className="absolute left-0 top-0 bottom-0 w-1/2 h-full pointer-events-none"
            style={{
                background:
                    "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
            }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            {children}
        </div>
    </div>
);

function Hero() {
    const { t } = useTranslation();
    return (
        <div className="relative">
            <FancyBgSection />
            <div className="w-11/12 mt-18 max-w-5xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-around gap-8 md:gap-8 px-4 md:px-0">
                <SplitText
                    text={t("Your trust, we do our best")}
                    className="text-xl sm:text-4xl md:text-5xl font-semibold text-center"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                />
                <SplitText
                    text={t("Every quarter, equinnox LIMITED strategically cooperates with world-class accounting firms to audit the firm's trading volume and clients' real-time financial assets")}
                    className="text-sm sm:text-lg md:text-3xl text-center max-w-4xl"
                    delay={1}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                />
                <NavLink to="/terminal" className="text-sm sm:text-lg md:text-xl text-[#023A51] px-5 sm:px-7 bg-white py-3 sm:py-3 rounded-md font-semibold transition-colors duration-200 border-2 border-white hover:bg-transparent hover:text-white hover:border-white">
                    {t("Sign up now")}
                </NavLink>
            </div>
        </div>
    );
}

export default Hero;


