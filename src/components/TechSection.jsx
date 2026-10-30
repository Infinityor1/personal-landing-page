import "./Sections.css";
import PixelBorderCanvas from "./PixelBorderCanvas";
import {useRef,useState} from 'react';


const TECH_PROJECTS = [
  {
    id: "web-apps",
    title: "Full-Stack Web Engineering",
    description:
      "Crafting responsive and attractive web applications. Cutting-edge or legacy tech, all worth the time! Involved in the process from the idea to the production pipeline.",
    tags: ["React","Vue","Laravel", "Vite", "Node.js","Javascript", "CSS", "REST APIs"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "iot-embedded",
    title: "IoT & Hardware Prototyping",
    description:
      "Bridging the physical and digital with microcontrollers, solving problems in everyday life. Hands-on experience developing interactive hardware systems.",
    tags: ["Arduino", "C/C++", "Computer Vision", "Sensors"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    id: "product-design",
    title: "UI/UX Design and Prototyping",
    description:
      "Leveraging modern tools to develop product experiences that feel effortless. Building wireframes that have clear navigation flow and which solve problems efficiently.",
    tags: ["Figma", "Flow charts", "Prototyping","Specifications"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon" aria-hidden="true">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

const SKILL_PILLS = [
  "JavaScript",
  "React",
  "HTML & Modern CSS",
  "Node.js",
  "Python",  "Java",
  "C++ / Arduino",
  "Git & GitHub",
  "Vite & Tooling",
  "UI/UX Interaction",
  "Figma Design",

];

export default function TechSection() {
  const isAnimatingRef = useRef(false);
  const [techTitleState,setTechTitleState]=useState("idle");
  const handleMouseEnter = () => {
    setTechTitleState("hover-glitch");
  };
  const handleMouseLeave= () => {
    if(techTitleState=="hover-glitch")
    {console.log("exit");
      setTechTitleState("exit");}
  };
  const handleAnimationEnd = (e) => {
    if(techTitleState=="exit"){
      console.log(true);
      setTechTitleState("idle");
    }
    isAnimatingRef.current=false;
  };
  const handleAnimationStart = (e)=>{
    isAnimatingRef.current=true;
  };
  return (
    <section id="tech" className="portfolio-section portfolio-section--alt">
      {/* Top Border Glitch & Dissipating Pixel Canvas */}
      <PixelBorderCanvas position="top" />
      <span className="glitch-border-a"></span>
      <span className="glitch-border-b"></span>
      <div className="section-inner">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-tag">Capabilities</span>
          <div id="tech-title-container" onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave} onAnimationStart={handleAnimationStart} onAnimationEnd={handleAnimationEnd}>
          <h2 id="tech-title" className={`header ${techTitleState}`}>Tech & Engineering</h2></div>
          <p className="section-subtitle">
            Changing society, one bit at a time.
          </p>
        </header>

        {/* Project & Domain Cards Grid */}
        <div className="cards-grid">
          {TECH_PROJECTS.map((item) => (
            <article key={item.id} className="portfolio-card">
              <div className="card-top">
                <div className="card-icon-wrap">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
              <ul className="card-tags">
                {item.tags.map((tag) => (
                  <li key={tag} className="card-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Skills & Tech Stack Row */}
        <div className="tech-stack-showcase">
          <h3 className="tech-stack-title">Core Technologies & Tools</h3>
          <div className="tech-pills-row">
            {SKILL_PILLS.map((pill) => (
              <span key={pill} className="tech-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Border Glitch & Dissipating Pixel Canvas */}
      <PixelBorderCanvas position="bottom" />
    </section>
  );
}

