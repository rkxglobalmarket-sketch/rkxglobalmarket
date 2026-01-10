import Header from "../Home/components/Header"
import Footer from "../Home/components/Footer"
import WishCard from "./components/WishCard"
import ProductRange from "./components/ProductRange"
import OurMission from "./components/OurMission"
import Hero from "./components/Hero"

function AboutUS() {
    return (
        <div>
            <Header />
            <Hero />
            <OurMission />
            <ProductRange />
            <WishCard />
            <Footer />
        </div>
    )
}

export default AboutUS
