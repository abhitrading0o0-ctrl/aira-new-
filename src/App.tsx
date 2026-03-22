import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MainPage from "./components/MainPage";
import MotivationPage from "./components/MotivationPage";
import ContactPage from "./components/ContactPage";
import Navigation from "./components/Navigation";
import BackgroundAudio from "./components/BackgroundAudio";
import { useSoundEffects } from "./hooks/useSoundEffects";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [hasStarted, setHasStarted] = useState(false);
  const { playClick } = useSoundEffects();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Global click listener for sound
  useEffect(() => {
    const handleGlobalClick = () => {
      if (hasStarted) playClick();
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [hasStarted, playClick]);

  const renderPage = () => {
    switch (currentPage) {
      case "main":
        return <MainPage hasStarted={hasStarted} onStart={() => setHasStarted(true)} />;
      case "motivation":
        return <MotivationPage key="motivation" />;
      case "contact":
        return <ContactPage key="contact" />;
      default:
        return <MainPage hasStarted={hasStarted} onStart={() => setHasStarted(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-shiva-dark selection:bg-shiva-glow selection:text-white">
      <BackgroundAudio forcePlay={hasStarted} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <Navigation currentPage={currentPage} setPage={setCurrentPage} />
      
      {/* Global Overlay for smooth feel */}
      <div className="fixed inset-0 pointer-events-none z-[100] border-[24px] border-shiva-dark/10 mix-blend-overlay opacity-50" />
    </div>
  );
}
