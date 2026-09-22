import Hero from "@/components/landing/Hero";
import AboutSection from "@/components/landing/AboutSection";
import StepsSection from "@/components/landing/StepsSection";
import ServiceSection from "@/components/landing/ServiceSection";
import CtaSection from "@/components/landing/CtaSection";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
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
