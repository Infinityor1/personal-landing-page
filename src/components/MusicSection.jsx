import "./Sections.css";

const MUSIC_HIGHLIGHTS = [
  {
    id: "harmonica-ensemble",
    title: "Harmonica Ensemble & Soloist",
    description:
      "President and Conductor of my high school's harmonica band. Competitions, arrangements, conducting, leadership. All to continue the legacy.",
    tags: [
      "Chromatic Harmonica",
      "Conducting",
      "Ensemble arrangement",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="card-icon"
        aria-hidden="true"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: "conductor-leadership",
    title: "Leadership & Musical Direction",
    description:
"From musician to Head of Department in Kuayue Song Composing Concert and Yao Lan Shou Song Composing Unit, part of the effort to bring music to everyone!",    tags: [
      "Band Management",
      "Song Composition",
      "Music Production",
      "Team Coordination",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="card-icon"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
  },
  {
    id: "repertoire-composition",
    title: "Repertoire & Musical Artistry",
    description:
      "Diverse and greedy passion, from classical music to Chinese tunes, J-pop, and fusion jazz. Always eager to learn about new genres of music.",
    tags: ["Classical", "Contemporary", "Jazz"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="card-icon"
        aria-hidden="true"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
];

export default function MusicSection() {
  return (
    <section id="music" className="portfolio-section portfolio-section--white">
      <div className="section-inner">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-tag">Art & Sound</span>
          <h2 className="section-title">Musical Resonance </h2>
          <p className="section-subtitle">
            A lifelong passion for expression through music, songwriting, and
            community.
          </p>
        </header>

        {/* Featured Music Spotlight Banner */}
        <div className="music-feature-card">
          <span className="music-feature-badge">Best years of my life</span>
          <h3 className="music-feature-title">Campus Bands</h3>
          <p className="music-feature-desc">
            Getting into modern bands was the best choice of my life! Melding
            together with the band in sync, feeling the heat of the stage. Part of the core effort to organise concerts and share our stories with the public.
          </p>
        </div>

        {/* Music Domain Cards */}
        <div className="cards-grid">
          {MUSIC_HIGHLIGHTS.map((item) => (
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
      </div>
    </section>
  );
}
