import React, { useEffect } from "react";
import Footer from "../components/common/Footer";
import '../styles/Landing.css'
import { useTheme } from "../contexts/ThemeContext";
import { NavLinks } from "../components/landing/NavLinks";
import { HeroSection } from "../components/landing/HeroSection";
import { FeatureSection } from "../components/landing/FeatureSection";
import { HowSection } from "../components/landing/HowSection";
import { WhyUsSection } from "../components/landing/WhyUsSection";
import { TrustSection } from "../components/landing/TrustSection";
import { FAQSection } from "../components/landing/FAQSection";
import { CTASection } from "../components/landing/CTASection";

const HEADER_HEIGHT = 88; // px - adjust if you change header padding

const Landing: React.FC = () => {
  // theme state (persisted)
  const { isDark } = useTheme();

  // fade-in observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            (entry.target as HTMLElement).classList.add("in-view");
        });
      },
      {
        threshold: 0.14,
        rootMargin: `-${HEADER_HEIGHT}px 0px -${HEADER_HEIGHT}px 0px`,
      }
    );
    document.querySelectorAll(".fade-in").forEach(
      (el) => obs.observe(el)
    );
    return () =>
      document.querySelectorAll(".fade-in").forEach(
        (el) => obs.unobserve(el)
      );
  }, []);

  return (
    <div
      className={`${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900"
      } min-h-screen`}
    >

      <NavLinks />

      {/* Main Content Container (No scroll-snap) */}
      <div className="pt-[120px] pb-12" role="main">
        {/* HERO */}
        <HeroSection />

        {/* FEATURES */}
        <FeatureSection />

        {/* HOW */}
        <HowSection />

        {/* WHY US */}
        <WhyUsSection />

        {/* TRUSTED BY DEVELOPERS WORLDWIDE */}
        <TrustSection />

        {/* FAQ SECTION */}
        <FAQSection />

        {/* Final CTA Section */}
        <CTASection />

        {/* Add the new Footer component */}
        <Footer isDark={isDark} />
      </div>
    </div>
  );
};

export default Landing;