import React, { useState, useEffect, useRef } from 'react';

// ─── data (from Home page) ────────────────────────────
const countries = [
  'New Zealand',
  'United Kingdom',
  'Ireland',
  'USA',
  'Canada',
  'Australia',
  'Germany',
];

const countryImages = {
  'New Zealand': 'https://hblimg.mmtcdn.com/content/hubble/img/destgalleryimages/mmt/activities/m_Wellington_1_l_667_1000.jpg',
  'United Kingdom': 'https://www.nationsonline.org/gallery/UK/Palace-of-Westminster-Parliament.jpg',
  'Ireland': 'https://www.authentic-europe.com/travel-tips/why-visit-ireland/_/image/46d1f421-ac03-478a-b88e-584a656488e3:7635e060a3b71f486d43a19ae7a6e846c7e4ff23/width-768/cathedral-and-colored-houses-in-cobh',
  'USA': 'https://jooinn.com/images/statute-of-liberty-at-daytime.jpg',
  'Canada': 'https://gotourismguides.com/toronto/wp-content/themes/gotourism-v1/img/tornot-tourism-guide-2.jpg',
  'Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVzdHJhbGlhJTIwc3lkbmV5fGVufDB8fDB8fHww',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80',
};

// short descriptions for each (can be extended)
const countryDescriptions = {
  'New Zealand': 'Breathtaking landscapes and top‑tier education.',
  'United Kingdom': 'Historic institutions with world‑class education.',
  'Ireland': 'Rich culture and welcoming academic communities.',
  'USA': 'Home to Ivy League and endless opportunities.',
  'Canada': 'Quality education in a diverse, friendly environment.',
  'Australia': 'Sunny weather, excellent universities, and post‑study work.',
  'Germany': 'Affordable tuition and cutting‑edge research.',
};

// hero background images (cycling)
const heroImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80',
];

// ─── hooks ──────────────────────────────────────────────
function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  );
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isDesktop;
}

function useIsTablet(breakpoint = 640) {
  const [isTablet, setIsTablet] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  );
  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth >= breakpoint);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isTablet;
}

// ─── Reveal animation ──────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────
export default function Destinations() {
  const isDesktop = useIsDesktop(1024);
  const isTablet = useIsTablet(640);

  // hero background cycling
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroImages[heroIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.7) brightness(0.55)',
            transition: 'all 1.2s ease-in-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to right,
                rgba(10, 15, 26, 0.85) 0%,
                rgba(10, 15, 26, 0.55) 45%,
                rgba(10, 15, 26, 0.25) 75%,
                rgba(10, 15, 26, 0.1) 100%
              ),
              linear-gradient(
                to top,
                rgba(10, 15, 26, 0.75) 0%,
                rgba(10, 15, 26, 0.2) 40%,
                rgba(10, 15, 26, 0) 70%
              )
            `,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '60px 24px',
            width: '100%',
            color: '#fff',
          }}
        >
          <div style={{ maxWidth: '700px' }}>
            <Reveal>
              <div
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(4px)',
                  marginBottom: '24px',
                }}
              >
                Explore Your Future
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                style={{
                  fontSize: 'clamp(36px, 6vw, 72px)',
                  fontWeight: 700,
                  lineHeight: 1.12,
                  margin: 0,
                }}
              >
                Our <span style={{ color: '#C99A3C' }}>Destinations</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                style={{
                  marginTop: '16px',
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: '520px',
                }}
              >
                Choose from the best study locations around the world — each offering
                unique academic experiences, career pathways, and cultural richness.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '32px 48px',
                  marginTop: '36px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 700, color: '#C99A3C' }}>
                    50+
                  </span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
                    Countries
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 700, color: '#C99A3C' }}>
                    1000+
                  </span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
                    Universities
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 700, color: '#C99A3C' }}>
                    98%
                  </span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
                    Visa Success
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS GRID – full image cards ===== */}
      <section
        style={{
          padding: '90px 0',
          background: '#F7F5F0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative sketches (same as home) */}
        <svg
          viewBox="0 0 64 64"
          aria-hidden
          style={{
            position: 'absolute',
            top: '40px',
            right: '5%',
            width: '70px',
            height: '70px',
            transform: 'rotate(15deg)',
            stroke: '#C99A3C',
            opacity: 0.06,
            fill: 'none',
            strokeWidth: 1.2,
            pointerEvents: 'none',
          }}
        >
          <circle cx="32" cy="32" r="18" />
          <path d="M32 14 V18 M32 46 V50 M14 32 H18 M46 32 H50" strokeLinecap="round" />
        </svg>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Reveal>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: '#C99A3C',
                    textTransform: 'uppercase',
                  }}
                >
                  Where to go
                </span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 700,
                  color: '#0F1B3D',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Top Study <span style={{ color: '#C99A3C' }}>Destinations</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p
                style={{
                  marginTop: '12px',
                  color: 'rgba(15,27,61,0.6)',
                  fontSize: '16px',
                  maxWidth: '560px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Each destination offers a unique blend of academic excellence, culture,
                and career opportunities. Find the one that fits you best.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr',
              gap: '28px',
            }}
          >
            {countries.map((country, index) => (
              <Reveal key={country} delay={0.08 * index}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '380px', // tall vertical cards
                    backgroundImage: `url(${countryImages[country]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 8px 30px rgba(15,27,61,0.15)',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(15,27,61,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(15,27,61,0.15)';
                  }}
                >
                  {/* gradient overlay for text readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15,27,61,0.7) 0%, rgba(15,27,61,0.2) 60%, transparent 100%)',
                    }}
                  />
                  {/* content at bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '24px 24px 28px',
                      color: '#fff',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {country}
                    </h3>
                    <p
                      style={{
                        margin: '6px 0 16px',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.5,
                        maxWidth: '90%',
                      }}
                    >
                      {countryDescriptions[country] || 'Explore world‑class education and culture.'}
                    </p>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '6px 18px',
                        borderRadius: '9999px',
                        background: 'rgba(201,154,60,0.2)',
                        color: '#C99A3C',
                        fontSize: '13px',
                        fontWeight: 600,
                        border: '1px solid rgba(201,154,60,0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#C99A3C';
                        e.currentTarget.style.color = '#0F1B3D';
                        e.currentTarget.style.borderColor = '#C99A3C';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(201,154,60,0.2)';
                        e.currentTarget.style.color = '#C99A3C';
                        e.currentTarget.style.borderColor = 'rgba(201,154,60,0.3)';
                      }}
                    >
                      Explore →
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}