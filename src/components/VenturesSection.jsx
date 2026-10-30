import "./Sections.css";

const VENTURES_LIST = [
  {
    id: "religion",
    title: "Soul with God",
    description:
      "No matter what happens in life, God is still with me in soul and spirit.",
    tags: ["Core Enterprise", "Tech Innovation", "Product Strategy", "Growth"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "content-creation",
    title: "Digital Content",
    description:"Delving into video editing, storyboarding, and managing my own social media pages.",
    tags: ["Youth Empowerment", "STEM Workshops", "Public Speaking", "Mentorship"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "creative-endeavors",
    title: "Creative Research",
    description:
"Constantly improving myself in all areas, cooking, sports, art appreciation, and so much more!",    tags: ["Rapid Prototyping", "Multidisciplinary", "Concept Design", "R&D"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon" aria-hidden="true">
        <path d="M2 12h20" />
        <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
        <path d="M12 2v20" />
        <path d="M12 2a5 5 0 0 1 5 5v5H7V7a5 5 0 0 1 5-5z" />
      </svg>
    ),
  },
];

export default function VenturesSection() {
  return (
    <section id="ventures" className="portfolio-section portfolio-section--alt">
      <div className="section-inner">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-tag">Personal Exploits</span>
          <h2 className="section-title">Ventures & Initiatives</h2>
          <p className="section-subtitle">
            Maintaining a burning curiosity towards what the world has to offer.
          </p>
        </header>

        {/* Heroic Venture Box */}
        {/* <div className="venture-lead-box">
          <span className="venture-lead-tag"></span>
          <h3 className="venture-lead-headline"></h3>
          <p className="venture-lead-body">
          </p>
        </div> */}

        {/* Venture Cards Grid */}
        <div className="cards-grid">
          {VENTURES_LIST.map((item) => (
            <article key={item.id} className="portfolio-card">
              <div className="card-top">
                <div className="card-icon-wrap">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
              {/* <ul className="card-tags">
                {item.tags.map((tag) => (
                  <li key={tag} className="card-tag">
                    {tag}
                  </li>
                ))}
              </ul> */}
            </article>
          ))}
        </div>

        {/* Connect & Contact Footer Row */}
        <div className="ventures-connect">
          <a href="mailto:chernycheah@gmail.com" className="connect-link connect-link--primary">
            Get In Touch
          </a>
          <a href="https://github.com/Infinityor1" target="_blank" rel="noopener noreferrer" className="connect-link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/cheah-yi-chern/" target="_blank" rel="noopener noreferrer" className="connect-link">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

