import "./JourneyMap.css";
import { DEFAULT_JOURNEY_PHOTOS } from "./journeyPhotos";

function PolaroidStack({ photos = [], locationLabel, className = "" }) {
  // Roles for the 3-card stack:
  // Index 0 -> Top (center, fully seen)
  // Index 1 -> Right
  // Index 2 -> Left
  const roleClasses = [
    "polaroid-card--top",
    "polaroid-card--right",
    "polaroid-card--left",
  ];

  return (
    <div
      className={`polaroid-trigger-area ${className}`}
      role="region"
      aria-label={`${locationLabel} polaroid picture collection`}
    >
      <div className="polaroid-stack">
        {photos.slice(0, 3).map((photo, index) => {
          const roleClass = roleClasses[index] || "polaroid-card--top";

          return (
            <div
              key={photo.id || index}
              className={`polaroid-card ${roleClass}`}
            >
              <div className="polaroid-frame">
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.caption}
                    className="polaroid-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="polaroid-placeholder">
                    {/* Vintage Polaroid rainbow stripe */}
                    <div className="polaroid-rainbow-bar" aria-hidden="true">
                      <span className="stripe-red" />
                      <span className="stripe-orange" />
                      <span className="stripe-yellow" />
                      <span className="stripe-green" />
                      <span className="stripe-blue" />
                    </div>

                    <div className="polaroid-placeholder-center">
                      <svg
                        className="polaroid-camera-icon"
                        viewBox="0 0 24 24"
                        width="26"
                        height="26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span className="polaroid-placeholder-title">POLAROID</span>
                      <span className="polaroid-placeholder-hint">Attach Photo</span>
                    </div>

                    <div className="polaroid-placeholder-bottom">
                      <span>600 FILM</span>
                      <span>#{index + 1}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Classic wide bottom polaroid chin */}
              <div className="polaroid-footer">
                <span className="polaroid-caption">{photo.caption}</span>
                {photo.date && <span className="polaroid-date">{photo.date}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function JourneyMap({ photos = DEFAULT_JOURNEY_PHOTOS }) {
  const resolvedPhotos = {
    location1: photos?.location1 || DEFAULT_JOURNEY_PHOTOS.location1,
    location2: photos?.location2 || DEFAULT_JOURNEY_PHOTOS.location2,
    location3: photos?.location3 || DEFAULT_JOURNEY_PHOTOS.location3,
  };

  // Desktop smooth serpentine path
  const desktopMasterPath =
    "M 240 160 C 520 160, 760 280, 760 480 C 760 620, 360 660, 240 780 C 120 900, 500 970, 500 1100";

  // Mobile completely vertical path along the left side
  const mobileVerticalPath = "M 70 125 L 70 1265";

  return (
    <div className="treasure-map-container">
      
      {/* ============================================================== */}
      {/* 1. DESKTOP STAGE (> 768px): Serpentine path & alternating pockets */}
      {/* ============================================================== */}
      <div className="treasure-map-stage treasure-map-stage--desktop">
        <svg
          className="treasure-map-svg"
          viewBox="0 0 1000 1280"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Map animation connecting education institutions Location 1, Location 2, Location 3, and Location 4"
        >
          <defs>
            {/* Arcs for curved location text labels */}
            <path id="arc-loc-1" d="M 30 105 Q 240 35 450 105" fill="none" />
            <path id="arc-loc-2" d="M 550 425 Q 760 355 970 425" fill="none" />
            <path id="arc-loc-3" d="M 30 715 Q 240 645 450 715" fill="none" />
            {/* Location 4 arc placed below the 'X' */}
            <path id="arc-loc-4" d="M 290 1195 Q 500 1165 710 1195" fill="none" />

            {/* Thick, bold, rectangular 'X' mark symbol */}
            <g id="thick-rectangular-x">
              <rect x="-27" y="-7.5" width="54" height="15" fill="#000000" transform="rotate(45)" />
              <rect x="-27" y="-7.5" width="54" height="15" fill="#000000" transform="rotate(-45)" />
            </g>
          </defs>

          {/* FAT DASHED TREASURE MAP PATH */}
          <path
            d={desktopMasterPath}
            fill="none"
            className="treasure-dashed-track"
          />

          {/* TRAVELING BEACON ALONG THE DASHED TRAIL */}
          <g className="treasure-traveler">
            <animateMotion
              path={desktopMasterPath}
              dur="10s"
              repeatCount="indefinite"
            />
            <circle cx="0" cy="0" r="8" fill="#000000" />
          </g>

          {/* LOCATION 1 (Top - Left) */}
          <g transform="translate(240, 160)" className="destination-node">
            <use href="#thick-rectangular-x" />
          </g>
          <text className="curved-location-title cinzel-decorative-black">
            <textPath href="#arc-loc-1" startOffset="50%" textAnchor="middle">
              SMJK Chung Ling
            </textPath>
          </text>

          {/* LOCATION 2 (Middle - Right) */}
          <g transform="translate(760, 480)" className="destination-node">
            <use href="#thick-rectangular-x" />
          </g>
          <text className="curved-location-title cinzel-decorative-black">
            <textPath href="#arc-loc-2" startOffset="50%" textAnchor="middle">
              Matriculation 
            </textPath>
          </text>

          {/* LOCATION 3 (Lower - Left) */}
          <g transform="translate(240, 780)" className="destination-node">
            <use href="#thick-rectangular-x" />
          </g>
          <text className="curved-location-title cinzel-decorative-black">
            <textPath href="#arc-loc-3" startOffset="50%" textAnchor="middle">
              Universiti Malaya
            </textPath>
          </text>

          {/* LOCATION 4 (Bottom - Centered) */}
          <g transform="translate(500, 1100)" className="destination-node">
            <use href="#thick-rectangular-x" />
          </g>
          <text className="curved-location-title cinzel-decorative-black">
            <textPath href="#arc-loc-4" startOffset="50%" textAnchor="middle">
              Next stop...
            </textPath>
          </text>
        </svg>

        {/* POLAROID PICTURE BATCHES (DESKTOP POCKETS) */}
        <PolaroidStack
          locationLabel="SMJK Chung Ling"
          photos={resolvedPhotos.location1}
          className="polaroid-stack--loc-1"
        />

        <PolaroidStack
          locationLabel="Kedah Matriculation College"
          photos={resolvedPhotos.location2}
          className="polaroid-stack--loc-2"
        />

        <PolaroidStack
          locationLabel="Universiti Malaya: Software Engineering"
          photos={resolvedPhotos.location3}
          className="polaroid-stack--loc-3"
        />
      </div>

      {/* ============================================================== */}
      {/* 2. MOBILE STAGE (<= 768px): Vertical path left, images right   */}
      {/* ============================================================== */}
      <div className="treasure-map-stage treasure-map-stage--mobile">
        <svg
          className="treasure-map-svg"
          viewBox="0 0 500 1400"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Mobile vertical map connecting Location 1, Location 2, Location 3, and Location 4"
        >
          <defs>
            <g id="thick-rectangular-x-mob">
              <rect x="-22" y="-6" width="44" height="12" fill="#000000" transform="rotate(45)" />
              <rect x="-22" y="-6" width="44" height="12" fill="#000000" transform="rotate(-45)" />
            </g>
          </defs>

          {/* Completely vertical dashed track on the left */}
          <path
            d={mobileVerticalPath}
            fill="none"
            className="treasure-dashed-track"
          />

          {/* Location 1 (Top Left): Left-aligned straight title within screen */}
          <text
            x="30"
            y="75"
            className="mobile-location-title cinzel-decorative-black"
            textAnchor="start"
          >
            Location 1
          </text>
          <g transform="translate(70, 125)" className="destination-node">
            <use href="#thick-rectangular-x-mob" />
          </g>

          {/* Location 2: Left-aligned straight title within screen */}
          <text
            x="30"
            y="455"
            className="mobile-location-title cinzel-decorative-black"
            textAnchor="start"
          >
            Location 2
          </text>
          <g transform="translate(70, 505)" className="destination-node">
            <use href="#thick-rectangular-x-mob" />
          </g>

          {/* Location 3: Left-aligned straight title within screen */}
          <text
            x="30"
            y="835"
            className="mobile-location-title cinzel-decorative-black"
            textAnchor="start"
          >
            Location 3
          </text>
          <g transform="translate(70, 885)" className="destination-node">
            <use href="#thick-rectangular-x-mob" />
          </g>

          {/* Location 4 (Bottom Left): Left-aligned straight title within screen */}
          <text
            x="30"
            y="1215"
            className="mobile-location-title cinzel-decorative-black"
            textAnchor="start"
          >
            Next stop...
          </text>
          <g transform="translate(70, 1265)" className="destination-node">
            <use href="#thick-rectangular-x-mob" />
          </g>
        </svg>

        {/* Polaroid batches positioned to the right of the path, between the locations */}
        {/* Batch 1: between Location 1 & Location 2 */}
        <PolaroidStack
          locationLabel="Location 1"
          photos={resolvedPhotos.location1}
          className="polaroid-stack--loc-1"
        />

        {/* Batch 2: between Location 2 & Location 3 */}
        <PolaroidStack
          locationLabel="Location 2"
          photos={resolvedPhotos.location2}
          className="polaroid-stack--loc-2"
        />

        {/* Batch 3: between Location 3 & Location 4 */}
        <PolaroidStack
          locationLabel="Location 3"
          photos={resolvedPhotos.location3}
          className="polaroid-stack--loc-3"
        />
      </div>
    </div>
  );
}
