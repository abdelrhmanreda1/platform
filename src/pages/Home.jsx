import HeroSection from "../components/HeroSection";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import HowItWorks from "../components/Home/HowItWorks";
import Navbar from "../components/Home/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Home;
