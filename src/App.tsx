import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Nav, Hero, TrustBar } from "./sections/Header";
import { MotionBand, SubjectsSection, LearningPath } from "./sections/Subjects";
import { Personalized, HowItWorks } from "./sections/Approach";
import { ParentDashboard, StudentDashboard, Booking } from "./sections/Dashboards";
import { Programs, Tutors, Why } from "./sections/Offerings";
import { LearningDemo, AIAssistant, Story } from "./sections/Engage";
import { Resources, Faq, BigCta, Contact, Footer } from "./sections/Closing";
import { cx, Icon, UIProvider, scrollToId, useUI } from "./ui";

function FloatingDock() {
  const [show, setShow] = useState(false);
  const { openBooking } = useUI();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-4 right-4 z-[80] flex items-center gap-2 sm:bottom-6 sm:right-6"
        >
          <button
            type="button"
            onClick={() => scrollToId("top")}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/12 bg-white/85 text-ink-800 shadow-[0_18px_34px_-18px_rgba(10,30,60,.6)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
          >
            <Icon name="ChevronDown" size={17} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => openBooking()}
            className={cx(
              "sheen relative flex items-center gap-2 overflow-hidden rounded-full bg-ink-900 py-3 pl-4 pr-5 text-[0.86rem] font-bold text-white shadow-[0_22px_40px_-18px_rgba(10,30,60,.75)] transition-transform duration-300 hover:-translate-y-1"
            )}
          >
            <Icon name="CalendarCheck" size={17} className="text-sun-400" />
            Book a Session
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <UIProvider>
      <a
        href="#subjects"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("subjects");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <Nav />

      <main>
        <Hero />
        <TrustBar />
        <MotionBand />
        <SubjectsSection />
        <LearningPath />
        <Personalized />
        <HowItWorks />
        <ParentDashboard />
        <StudentDashboard />
        <AIAssistant />
        <Booking />
        <Programs />
        <Tutors />
        <Why />
        <LearningDemo />
        <Story />
        <Resources />
        <Faq />
        <BigCta />
        <Contact />
      </main>

      <Footer />
      <FloatingDock />
    </UIProvider>
  );
}
