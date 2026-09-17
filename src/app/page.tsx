import Navbar from "@/components/Navbar";
import Hero from "@/components/customs/landings/Hero";
import AboutSection from "@/components/customs/landings/AboutSection";
import StepsSection from "@/components/customs/landings/StepsSection";
import ServiceSection from "@/components/customs/landings/ServiceSection";
import CtaSection from "@/components/customs/landings/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <StepsSection />
      <ServiceSection />
      <CtaSection />
      <Footer />
    </main>
  );
}