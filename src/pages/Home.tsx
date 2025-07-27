import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import PopularDeals from "../components/Home/PopularDeals";
import Footer from "../components/Home/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <PopularDeals />
      <Footer />
    </div>
  );
};

export default Home;
