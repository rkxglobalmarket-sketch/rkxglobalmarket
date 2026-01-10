import Footer from "../Home/components/Footer"
import Header from "../Home/components/Header"
import Hero from "./components/Hero"
import WhyCrypto from "./components/WhyCrypto"
import WhyCrude from "./components/WhyCrude"
import Gold from "./components/Gold"
import Exchange from './components/Exchange'
import Products from "./components/Products"
import Features from "./components/Features"

function Platform() {
    return (
        <div>
            <Header />
            <Hero />
            <Features />
            <Products />
            <Exchange />
            <Gold />
            <WhyCrude />
            <WhyCrypto />
            <Footer />
        </div>
    )
}

export default Platform
