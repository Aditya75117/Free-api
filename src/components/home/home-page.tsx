import { Hero } from "@/components/home/hero";
import { HomeGeneratorSection } from "@/components/home/home-generator-section";
import { Features } from "@/components/home/features";
import { PopularEndpointsGrid } from "@/components/home/popular-endpoints-grid";

export function HomePage() {
  return (
    <>
      <Hero />
      <HomeGeneratorSection />
      <PopularEndpointsGrid />
      <Features />
    </>
  );
}
