import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import HeaderButton from "../../../components/HeaderButton";
import { LanguageDropdown } from "../../../components/SelectOptions";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";


const NAV_ITEMS = [
    { name: "Home", link: "/" },
    { name: "About us", link: "/about-us" },
    { name: "Trading products", link: "/platform" },
    { name: "Trading platform", link: "/products" },
    { name: "Risk statement", link: "/risk" },
    { name: "Contact us", link: "/contact-us" },
];

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <header className="h-20 w-full bg-white flex items-center justify-between px-4 md:px-10 z-20 fixed top-0 left-0 shadow">
            <div className="flex items-center">
                <img src="/assets/logo.png" alt="Logo" className="h-12 w-auto" />
            </div>

            <div className="hidden md:flex items-center gap-6">
                <HeaderButton items={NAV_ITEMS} />
            </div>

            <AnimatePresence>
                <div className="flex flex-row gap-4 mt-10 mb-6">
                    <LanguageDropdown />
                    <NavLink to="/terminal" className="flex items-center gap-2 px-4 py-2 bg-[#0c3a4e] text-white rounded font-semibold text-xs hover:bg-[#F57920] transition-all hover:scale-110">
                        <User size={16} /> {t("login")}
                    </NavLink>
                </div>
                {drawerOpen && (
                    <motion.div
                        key="drawer"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 w-[85vw] max-w-sm h-screen bg-[#222] z-50 flex flex-col pt-8 px-6"
                        aria-modal="true"
                        aria-label="Main menu"
                        role="dialog"
                    >
                        <button
                            className="absolute top-6 right-6 text-white"
                            onClick={() => setDrawerOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={32} className="hover:text-[#F57920] transition" />
                        </button>
                        <nav className="grow flex flex-col mt-10 gap-2">
                            <HeaderButton
                                items={NAV_ITEMS}
                                vertical
                                onItemClick={() => setDrawerOpen(false)}
                            />
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={() => setDrawerOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
            <div className="md:hidden flex items-center">
                <button
                    aria-label={drawerOpen ? "Close menu" : "Open menu"}
                    className="p-2 focus:outline-none mt-3"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                >
                    {drawerOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
    );
}

export default Header;

