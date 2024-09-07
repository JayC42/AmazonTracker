import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

const Home = async () => {
  const allProducts = (await getAllProducts()) || [];
  // Create a Set to store unique product URLs
  const uniqueProductUrls = new Set();

  // Filter out duplicate products
  const uniqueProducts = allProducts.filter((product) => {
    if (!uniqueProductUrls.has(product.url)) {
      uniqueProductUrls.add(product.url);
      return true;
    }
    return false;
  });
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              <span className="text-white">
                Track Smarter, Save Bigger, Shop Better! with
              </span>
              <span className="text-primary"> AmazonTrackr </span>
            </h1>

            <p className="mt-6">
              Effortlessly track your favorite products on Amazon with our
              advanced web scraping tool. Get instant alerts on price drops and
              never miss a deal!
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {uniqueProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};
export default Home;
