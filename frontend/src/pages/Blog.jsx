import React, { useState, useEffect, useRef } from 'react';

// ─── reusable Reveal animation ─────────────────────────
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

// ─── Custom hook for window width ──────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// ─── Country Images (same as Home.jsx) ──────────────────
const countryImages = {
  'New Zealand': 'https://hblimg.mmtcdn.com/content/hubble/img/destgalleryimages/mmt/activities/m_Wellington_1_l_667_1000.jpg',
  'United Kingdom': 'https://www.nationsonline.org/gallery/UK/Palace-of-Westminster-Parliament.jpg',
  'Ireland': 'https://www.authentic-europe.com/travel-tips/why-visit-ireland/_/image/46d1f421-ac03-478a-b88e-584a656488e3:7635e060a3b71f486d43a19ae7a6e846c7e4ff23/width-768/cathedral-and-colored-houses-in-cobh',
  'USA': 'https://jooinn.com/images/statute-of-liberty-at-daytime.jpg',
  'Canada': 'https://gotourismguides.com/toronto/wp-content/themes/gotourism-v1/img/tornot-tourism-guide-2.jpg',
  'Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVzdHJhbGlhJTIwc3lkbmV5fGVufDB8fDB8fHww',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80'
};

// ─── Blog Data ──────────────────────────────────────────
const featuredPost = {
  title: '7 Study-Abroad Rule Changes Actually in Effect for the 2026 Intake',
  excerpt:
    'The US has replaced open-ended F-1 status with a fixed four-year admission period, Canada has frozen its PGWP-eligible course list, Australia\'s Genuine Student test now scores four written answers, Georgia\'s government just barred four state universities from taking new international students, and New Zealand is adding a short-term graduate visa in November. Here\'s what each change means for an Indian applicant.',
  date: 'Aug 2026',
  readTime: '9 min read',
  category: 'Flagship Guide',
  image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
};

const countryGuides = [
  { country: 'US', flag: '🇺🇸', updated: 'Aug 2026' },
  { country: 'GB', flag: '🇬🇧', updated: 'Jul 2026' },
  { country: 'CA', flag: '🇨🇦', updated: 'Jul 2026' },
  { country: 'AU', flag: '🇦🇺', updated: 'Jun 2026' },
  { country: 'NZ', flag: '🇳🇿', updated: 'Jun 2026' },
  { country: 'IE', flag: '🇮🇪', updated: 'May 2026' },
  { country: 'DE', flag: '🇩🇪', updated: 'May 2026' },
  { country: 'FR', flag: '🇫🇷', updated: 'Apr 2026' },
];

const allPosts = [
  {
    title: 'Germany Blocked Account 2026: The New €11,904 Requirement Explained',
    date: '2026',
    readTime: '4 min read',
    category: 'Study Guides',
    country: 'Germany',
    checked: 'Aug 2026',
    image: countryImages['Germany'],
  },
  {
    title: 'UK Graduate Route 2026: Post-Study Work Visa Guide',
    date: '2026',
    readTime: '5 min read',
    category: 'Study Guides',
    country: 'United Kingdom',
    checked: 'Aug 2026',
    image: countryImages['United Kingdom'],
  },
  {
    title: 'F-1 Visa 2026: Fixed Four-Year Admission Replaces "Duration of Study"',
    date: '2026',
    readTime: '5 min read',
    category: 'Visa & Immigration',
    country: 'USA',
    checked: 'Aug 2026',
    image: countryImages['USA'],
  },
  {
    title: 'Canada PGWP Eligibility 2026: Updated Course List',
    date: '2026',
    readTime: '6 min read',
    category: 'Visa & Immigration',
    country: 'Canada',
    checked: 'Jul 2026',
    image: countryImages['Canada'],
  },
  {
    title: 'MBBS in Germany 2026: Admission Requirements & Costs',
    date: '2026',
    readTime: '7 min read',
    category: 'MBBS Abroad',
    country: 'Germany',
    checked: 'Jun 2026',
    image: countryImages['Germany'],
  },
  {
    title: 'Australia Genuine Student Test 2026: What to Expect',
    date: '2026',
    readTime: '4 min read',
    category: 'Visa & Immigration',
    country: 'Australia',
    checked: 'Jun 2026',
    image: countryImages['Australia'],
  },
];

const categories = ['All Posts', 'Study Guides', 'Visa & Immigration', 'MBBS Abroad'];

// ─── Hero background images ──────────────────────────────
const heroImages = [
  'https://images.collegexpress.com/blog/top-benefits-study-abroad-programs-personal-growth.jpg',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80',
];

export default function Blog() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All Posts') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter((post) => post.category === activeCategory));
    }
  }, [activeCategory]);

  // Responsive grid columns
  const countryGridCols = isMobile ? 2 : isTablet ? 3 : 4;
  const postsGridCols = isMobile ? 1 : isTablet ? 2 : 3;
  const featuredGridCols = isMobile ? '1fr' : '1fr 1fr';

  return (
    <main style={{ background: '#F7F5F0', position: 'relative', overflow: 'hidden' }}>
      {/* ===== DECORATIVE SKETCHES (hidden on mobile) ===== */}
      {!isMobile && (
        <>
          <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '100px', left: '3%', width: '70px', height: '70px', transform: 'rotate(-10deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
            <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
            <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '20%', right: '4%', width: '60px', height: '60px', transform: 'rotate(8deg)', stroke: '#0F1B3D', opacity: 0.05, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
            <circle cx="32" cy="32" r="18" />
            <path d="M32 14 V18 M32 46 V50 M14 32 H18 M46 32 H50" strokeLinecap="round" />
          </svg>
        </>
      )}

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          position: 'relative',
          padding: isMobile ? '80px 0 40px' : '100px 0 60px',
          minHeight: isMobile ? '40vh' : '50vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroImages[heroIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.6) brightness(0.5)',
            transition: 'all 1s ease-in-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(15,27,61,0.8), rgba(15,27,61,0.4))',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px', width: '100%', textAlign: 'center' }}>
          <Reveal>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '9999px',
                padding: isMobile ? '6px 16px' : '8px 24px',
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Study Abroad Insights & Country Guides
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              style={{
                fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                color: '#fff',
                marginTop: '20px',
                lineHeight: 1.15,
              }}
            >
              How can I <span style={{ color: '#C99A3C' }}>help</span> you?
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                fontSize: isMobile ? '16px' : 'clamp(16px, 1.5vw, 20px)',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '480px',
                margin: '12px auto 0',
                padding: isMobile ? '0 8px' : 0,
              }}
            >
              Expert insights, country guides, and visa updates — everything you need for a successful study abroad journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      <section style={{ padding: isMobile ? '40px 0 20px' : '60px 0 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? '24px' : '40px' }}>
            <Reveal>
              <div
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  padding: isMobile ? '20px 24px' : '28px 32px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  height: 'fit-content',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: '#C99A3C',
                    color: '#0F1B3D',
                    padding: '4px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {featuredPost.category}
                </span>
                <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: isMobile ? '13px' : '14px', color: 'rgba(15,27,61,0.5)' }}>
                  <span>📅 {featuredPost.date}</span>
                  <span>📍 {featuredPost.readTime}</span>
                </div>
                <p
                  style={{
                    marginTop: '12px',
                    fontSize: isMobile ? '13px' : '14px',
                    color: 'rgba(15,27,61,0.6)',
                    lineHeight: 1.6,
                  }}
                >
                  Our flagship guide covers the most important updates for the upcoming intake.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                }}
              >
                <div style={{ padding: isMobile ? '24px 20px' : '32px 28px' }}>
                  <h2
                    style={{
                      fontSize: isMobile ? 'clamp(18px, 5vw, 24px)' : 'clamp(18px, 2vw, 26px)',
                      fontWeight: 700,
                      color: '#0F1B3D',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p
                    style={{
                      marginTop: '16px',
                      fontSize: isMobile ? '14px' : '15px',
                      color: 'rgba(15,27,61,0.65)',
                      lineHeight: 1.7,
                    }}
                  >
                    {featuredPost.excerpt.substring(0, isMobile ? 120 : 180)}…
                  </p>
                  <button
                    style={{
                      marginTop: '20px',
                      background: 'transparent',
                      border: '2px solid #C99A3C',
                      color: '#0F1B3D',
                      padding: isMobile ? '8px 20px' : '10px 28px',
                      borderRadius: '9999px',
                      fontWeight: 700,
                      fontSize: isMobile ? '13px' : '14px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#C99A3C';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(201,154,60,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Read Full Article →
                  </button>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${featuredPost.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: isMobile ? '200px' : '240px',
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== EXPLORE ALL COUNTRY GUIDES ===== */}
      <section style={{ padding: isMobile ? '10px 0 20px' : '20px 0 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>
          <Reveal>
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  background: '#C99A3C',
                  color: '#0F1B3D',
                  padding: isMobile ? '12px 28px' : '14px 40px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: isMobile ? '14px' : '16px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4A84B';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#C99A3C';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Explore All Country Guides →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== COUNTRY GUIDES ===== */}
     

      {/* ===== ALL POSTS ===== */}
      <section style={{ padding: isMobile ? '40px 0 60px' : '60px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>
          <Reveal>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '40px',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: isMobile ? '8px 16px' : '10px 24px',
                    borderRadius: '9999px',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: activeCategory === cat ? '#C99A3C' : 'rgba(255,255,255,0.7)',
                    color: activeCategory === cat ? '#0F1B3D' : 'rgba(15,27,61,0.6)',
                    boxShadow: activeCategory === cat ? '0 4px 16px rgba(201,154,60,0.3)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = 'rgba(201,154,60,0.15)';
                      e.currentTarget.style.color = '#0F1B3D';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                      e.currentTarget.style.color = 'rgba(15,27,61,0.6)';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${postsGridCols}, 1fr)`,
              gap: isMobile ? '16px' : '24px',
            }}
          >
            {filteredPosts.map((post, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(15,27,61,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(201,154,60,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: isMobile ? '160px' : '200px',
                      backgroundImage: `url(${post.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div style={{ padding: isMobile ? '16px 16px 20px' : '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        background: 'rgba(201,154,60,0.12)',
                        color: '#C99A3C',
                        padding: '4px 14px',
                        borderRadius: '9999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {post.category}
                    </span>
                    <h3
                      style={{
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: 700,
                        color: '#0F1B3D',
                        margin: '0 0 6px',
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontSize: isMobile ? '12px' : '13px',
                        color: 'rgba(15,27,61,0.4)',
                        margin: '0 0 4px',
                      }}
                    >
                      {post.country} · {post.date} · {post.readTime}
                    </p>
                    <p
                      style={{
                        fontSize: isMobile ? '12px' : '13px',
                        color: 'rgba(15,27,61,0.35)',
                        margin: '0 0 16px',
                      }}
                    >
                      Checked {post.checked}
                    </p>
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#C99A3C',
                        fontWeight: 600,
                        fontSize: isMobile ? '13px' : '14px',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s ease',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: 'auto',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#D4A84B';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#C99A3C';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      Read Full Guide →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(15,27,61,0.4)' }}>
              <p style={{ fontSize: '18px' }}>No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}