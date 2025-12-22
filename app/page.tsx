import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ReasonsSection from "@/components/ReasonsSection";
import RegistrationSection from "@/components/RegistrationSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      <AboutSection />
      <CTASection />
      <RegistrationSection />
      <ReasonsSection />
      <TestimonialsCarousel />
      <Footer />
    </main>
  );
}
