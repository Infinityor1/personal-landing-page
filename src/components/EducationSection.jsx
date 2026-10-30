import "./Sections.css";
import {useRef,useState,forwardRef} from 'react';
import JourneyMap from './JourneyMap.jsx'
export default function EducationSection({sectionRef}){ 
    
    
    return(
    /* 1. Education Section (Treasure Map Journey) */
      <section id="education" ref={sectionRef} className="portfolio-section portfolio-section--white">
        <div className="section-inner">
        <header className="section-header">      <h1 className="header cinzel-decorative-black">Education</h1></header>

        <JourneyMap />
        </div>
      </section>);
}