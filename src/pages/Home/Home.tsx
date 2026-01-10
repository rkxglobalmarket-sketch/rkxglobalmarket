import Header from "./components/Header"
import Hero from "./components/Hero"
import MarketTable from "./components/ValueCoponent"
import TiltedCardDisplay from "./components/TiltedCardDisplay"
import Footer from "./components/Footer"
import BorkerQuality from "./components/BorkerQuality"
import Features from "./components/Features"
import CompanyQuality from "./components/CompanyQuality"

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <MarketTable />
      <CompanyQuality />
      <Features />
      <div className="h-40 bg-[#EDEEE9] my-10" />
      <BorkerQuality />
      <div className="flex flex-wrap justify-center w-full">
        <TiltedCardDisplay />
      </div>
      <div className="mt-30 md:mt-110">
        <Footer />
      </div>
    </>
  )
}

export default Home
