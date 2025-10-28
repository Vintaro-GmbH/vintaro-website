import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StellarSection } from "@/components/StellarSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StellarSection />
      <FeaturesSection />
      <SolutionsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
