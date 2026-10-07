import AllProducts from "@/components/Home/AllProducts";
import Banner from "@/components/Home/Banner";
import TopFallers from "@/components/Home/TopFallers";
import TopRisers from "@/components/Home/TopRisers";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopRisers />
      <TopFallers />
      <AllProducts />
    </div>
  );
}
