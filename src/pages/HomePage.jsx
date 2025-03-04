import AboutUs from "../components/AboutUs/AboutUs";
import Discount from "../components/Discount/Discount";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Responses from "../components/Responses/Responses";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Discount />
      <Responses />
      <Footer />
    </main>
  );
};

export default HomePage;
