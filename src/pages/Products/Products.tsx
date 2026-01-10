import Footer from "../Home/components/Footer"
import Header from "../Home/components/Header"
import Hero from "./components/Hero"
import What from "./components/What"
import Info from "./components/Info"

function Products() {
    return (
        <div className="max-w-full overflow-x-hidden">
            <Header />
            <Hero />
            <What />
            <Info />
            <Footer />
        </div>
    )
}

export default Products
