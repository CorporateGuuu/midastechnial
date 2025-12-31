import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { getFeaturedProducts } from "../lib/db";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Header />
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <Newsletter />
      <Footer />
    </>
  );
}
