import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useSmoothScroll } from "./smoothScroll";
import Navbar from "./components/Navbar";
import EducationSection from "./components/EducationSection";
import TechSection from "./components/TechSection";
import MusicSection from "./components/MusicSection";
import VenturesSection from "./components/VenturesSection";

const CURRENT_YEAR = new Date().getFullYear();

function App() {
  const nextSection = useSmoothScroll({ defaultDuration: 1000, defaultOffset: 72 });
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const [starState, setStarState] = useState("idle");
  const isAnimatingMobileRef = useRef(false);
  const mobileTimerRef = useRef(null);
  
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px), (hover: none)").matches;
  };

  const handleMouseEnter = () => {
    if (isMobile()) {
      // Prevent restarting or glitching if already mid-animation
      if (isAnimatingMobileRef.current) return;
      isAnimatingMobileRef.current = true;
      setStarState("enlarge");

      if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
      // Run the animation cycle once, then cleanly shrink back down
      mobileTimerRef.current = setTimeout(() => {
        setStarState((prev) => (prev === "enlarge" ? "shrink" : prev));
      }, 1000);
      return;
    }

    setStarState("enlarge");
  };

  const handleMouseLeave = () => {
    if (isMobile()) return;
    setStarState((prev) => (prev === "enlarge" ? "shrink" : prev));
  };

  const handleClick = () => {
    nextSection(sectionRef);
    if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    setStarState((prev) => (prev === "enlarge" ? "shrink" : prev));
  };

  const handleAnimationEnd = (e) => {
    if (e.animationName === "shrink") {
      setStarState((prev) => {
        if (prev === "shrink") {
          // Reset lock when animation completes so subsequent touches can trigger it again
          isAnimatingMobileRef.current = false;
          return "idle";
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    return () => {
      if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const strings = ["Developer./Musician./Dreamer."];
    let strIdx = 0;
    let charIdx = 0;
    let timer;

    function getDelay(char) {
      if (".!?".includes(char)) return 520;
      if (",;:".includes(char)) return 240;
      return 55 + Math.random() * 30;
    }

    function type() {
      const str = strings[strIdx];
      if (charIdx < str.length) {
        if("/".includes(str[charIdx])){
          el.textContent+="\r\n";
        }
        else{el.textContent += str[charIdx];}
        
        charIdx++;
        timer = setTimeout(type, getDelay(str[charIdx - 1]));
      } else {
        el.dataset.state = "done";
      }
    }

    el.textContent = "";
    el.dataset.state = "typing";
    timer = setTimeout(type, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="section flow cinzel-decorative-black flex-col-center" style={{justifyContent:'center',marginTop:'72px'}}>
        
          <h1 ref={heroRef} className="hero cinzel-decorative-black"></h1>
          <div className="next">
            <button
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleMouseEnter}
              onBlur={handleMouseLeave}
              onTouchStart={handleMouseEnter}
              id="next-button"
            >
              Innovate
            </button>
            {starState !== "idle" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 397 397"
                className={starState}
                onAnimationEnd={handleAnimationEnd}
              >
                <polygon
                  points="374.95,226.45 215.39,204.32 354.75,285.11 212.38,209.74 315.70,333.33 207.70,213.81 262.52,365.28 201.91,216.04 201.62,377.12 195.71,216.15 140.34,367.42 189.84,214.13 86.07,337.34 185.02,210.22 45.37,290.51 181.82,204.90 23.13,232.59 180.64,198.81 22.05,170.55 181.61,192.68 42.25,111.89 184.62,187.26 81.30,63.67 189.30,183.19 134.48,31.72 195.09,180.96 195.38,19.88 201.29,180.85 256.66,29.58 207.16,182.87 310.93,59.66 211.98,186.78 351.63,106.49 215.18,192.10 373.87,164.41 216.36,198.19"
                  fill="#fbbf24"
                />
              </svg>
            )}
          </div>
      </section>

      <EducationSection sectionRef={sectionRef}/>

      {/* 2. Tech Section */}
      <TechSection />

      {/* 3. Music Section */}
      <MusicSection />

      {/* 4. Ventures Section */}
      <VenturesSection />

      {/* Minimalist Site Footer */}
      <footer className="portfolio-footer">
        <div className="portfolio-footer-inner">
          <span className="cinzel-decorative-black footer-brand">INFINITYORB</span>
          <p className="footer-copyright">
            2005 - PRESENT
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
