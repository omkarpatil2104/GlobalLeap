import { useState, useEffect, useRef } from 'react';
import heroVideo from '../assets/7695550-uhd_3840_2160_25fps.mp4'; // ← YOUR VIDEO HERE

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
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80'
};

const whyPoints = [
  {
    title: 'Expert Counselling',
    desc: 'One-on-one guidance from experienced counsellors who understand your goals and match you with the right university.',
  },
  {
    title: 'End-to-End Support',
    desc: 'From shortlisting universities to visa filing, we handle every step so you can focus on preparing for your journey.',
  },
  {
    title: 'Scholarship Assistance',
    desc: 'We help you identify and apply for scholarships that reduce your financial burden abroad.',
  },
  {
    title: '100% Transparent Process',
    desc: 'No hidden costs, no false promises — just honest advice tailored to your profile and budget.',
  },
];

const carouselImages = [
  { src: 'https://www.applyboard.com/wp-content/uploads/2023/01/Quiz_-Which-Destination-Country-Should-I-Study-Abroad-In.png', alt: 'Graduate students celebrating at convocation ceremony' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80', alt: 'International university campus building' },
  { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80', alt: 'Students studying together in a library' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80', alt: 'Student walking on university campus abroad' },
  { src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&q=80', alt: 'Group of international students collaborating on a project' },
];

const offerItems = [
  {
    title: 'Find the Right Course & University',
    desc: 'Personalised shortlisting based on your academic profile, budget, and career goals.',
    icon: (
      <path d="M6 34 L32 20 L58 34 L32 48 Z M18 40 V52 Q32 58 46 52 V40" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: 'Scholarships, Grants & Bursaries',
    desc: 'Access to exclusive scholarship opportunities that reduce your overall study cost.',
    icon: (
      <>
        <circle cx="32" cy="24" r="12" />
        <path d="M22 34 L16 56 L32 48 L48 56 L42 34" strokeLinejoin="round" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Application Submission & Fee Waivers',
    desc: 'We handle documentation and applications, unlocking waived fees wherever possible.',
    icon: (
      <>
        <rect x="16" y="10" width="32" height="44" rx="3" />
        <path d="M24 22 H40 M24 30 H40 M24 38 H34" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Offer Acceptance & Tuition Payment',
    desc: 'Guided support to accept offers correctly and pay tuition securely, on time.',
    icon: (
      <>
        <rect x="8" y="18" width="48" height="32" rx="4" />
        <path d="M8 28 H56" strokeLinecap="round" />
        <path d="M16 40 H28" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Visa Information & Assistance',
    desc: 'Step-by-step visa filing support to maximise approval chances and avoid delays.',
    icon: (
      <>
        <rect x="10" y="14" width="44" height="36" rx="3" />
        <circle cx="24" cy="30" r="6" />
        <path d="M34 26 H46 M34 34 H46 M16 44 H48" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Pre-Departure Orientation',
    desc: 'Practical briefings on travel, accommodation, and settling into your new country.',
    icon: (
      <path d="M10 42 L28 24 L36 32 L54 14 M54 14 H42 M54 14 V26" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
];

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

function ZoomCarousel({ images, interval = 3500 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div
      style={{
        position: 'relative',
        height: '480px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
      }}
    >
      <style>{`
        @keyframes kenBurnsZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        .kb-slide-active {
          animation: kenBurnsZoom 4s ease-out forwards;
        }
      `}</style>

      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={i === index ? 'kb-slide-active' : ''}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,27,61,0.25), transparent 40%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 5,
        }}
      >
        {images.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === index ? '22px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              background: i === index ? '#C99A3C' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function OfferCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={0.1 * index}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? 'rgba(201,154,60,0.5)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '18px',
          padding: '32px 28px',
          height: '100%',
          backdropFilter: 'blur(6px)',
          transform: hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.35)' : '0 8px 20px rgba(0,0,0,0.15)',
          transition: 'all 0.35s ease',
          cursor: 'default',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: hovered ? '#C99A3C' : 'rgba(201,154,60,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            transition: 'all 0.35s ease',
          }}
        >
          <svg
            viewBox="0 0 64 64"
            style={{
              width: '30px',
              height: '30px',
              fill: 'none',
              stroke: hovered ? '#0F1B3D' : '#C99A3C',
              strokeWidth: 3,
              transition: 'stroke 0.35s ease',
            }}
          >
            {item.icon}
          </svg>
        </div>

        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>
          {item.title}
        </h3>
        <p style={{ margin: '10px 0 0', fontSize: '14.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
          {item.desc}
        </p>

        <div
          style={{
            marginTop: '18px',
            width: hovered ? '40px' : '24px',
            height: '2px',
            background: '#C99A3C',
            transition: 'width 0.35s ease',
          }}
        />
      </div>
    </Reveal>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(countryImages[countries[0]]);
  const [bgPosition, setBgPosition] = useState('center');
  const listRef = useRef(null);
  const intervalRef = useRef(null);
  const itemHeight = 48;
  const isDesktop = useIsDesktop(1024);
  const isDesktopMd = useIsDesktop(768);
  const isTablet = useIsTablet(640);

  useEffect(() => {
    const handleResize = () => {
      setBgPosition(window.innerWidth < 768 ? '60% center' : 'center');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentImage(countryImages[countries[activeIndex]]);
  }, [activeIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % countries.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleCountryClick = (index) => {
    setActiveIndex(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % countries.length);
    }, 3000);
  };

  const translateY = -(activeIndex * itemHeight);

  return (
    <main>
      {/* ============ HERO SECTION WITH VIDEO BACKGROUND ============ */}
      <section
        aria-label="Hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '80px',
        }}
      >
        {/* ─── VIDEO BACKGROUND ─── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={heroVideo} type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <img
            src={currentImage}
            alt="University campus"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </video>

        {/* ─── DARK OVERLAY (LIGHTER) ─── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to right,
                rgba(10, 15, 26, 0.6) 0%,
                rgba(10, 15, 26, 0.35) 45%,
                rgba(10, 15, 26, 0.15) 75%,
                rgba(10, 15, 26, 0.05) 100%
              ),
              linear-gradient(
                to top,
                rgba(10, 15, 26, 0.5) 0%,
                rgba(10, 15, 26, 0.1) 40%,
                rgba(10, 15, 26, 0) 70%
              )
            `,
            zIndex: 1,
          }}
        />

        {/* ─── CONTENT ─── */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '7fr 5fr' : '1fr',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* LEFT COLUMN */}
            <div style={{ color: '#fff' }}>
              <div
                style={{
                  display: 'inline-block',
                  marginBottom: '24px',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                Trusted Study Abroad Consultants
              </div>

              {/* ─── HERO HEADING – White Text, Smaller ─── */}
              <h1 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 3.5vw, 48px)', 
                fontWeight: 700, 
                lineHeight: 1.2, 
                margin: 0,
                color: '#FFFFFF',
              }}>
                Your Global{' '}
                <span style={{ color: '#C99A3C' }}>Education</span>
                {' '}Journey Starts Here
              </h1>

              {/* ─── HERO SUBHEADING – Smaller ─── */}
              <p style={{ 
                marginTop: '14px', 
                fontSize: 'clamp(14px, 1.2vw, 17px)', 
                color: 'rgba(255,255,255,0.85)', 
                maxWidth: '520px',
                lineHeight: 1.6,
              }}>
                Expert guidance from university selection to visa approval
                helping students achieve their dream of studying abroad.
              </p>

              <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <button
                  style={{
                    background: '#C99A3C',
                    color: '#0F1B3D',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#D4A84B';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#C99A3C';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Explore Opportunities
                </button>
                <button
                  style={{
                    border: '2px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '14px 28px',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#fff',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Free Consultation
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN – Popular Destinations */}
            {/* <div>
              <h2
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '24px',
                  textAlign: isDesktopMd ? 'right' : 'center',
                }}
              >
                Popular Destinations
              </h2>

              <div style={{ position: 'relative', overflow: 'hidden', height: `${itemHeight * 5}px` }}>
                <div
                  ref={listRef}
                  style={{
                    transform: `translateY(${translateY}px)`,
                    transition: 'transform 0.6s ease-in-out',
                    textAlign: isDesktopMd ? 'right' : 'center',
                  }}
                >
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      onClick={() => handleCountryClick(index)}
                      style={{
                        height: `${itemHeight}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isDesktopMd ? 'flex-end' : 'center',
                        cursor: 'pointer',
                        fontSize: index === activeIndex ? '1.25rem' : '1rem',
                        fontWeight: index === activeIndex ? 700 : 400,
                        color: index === activeIndex ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                        opacity: index === activeIndex ? 1 : 0.4,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (index !== activeIndex) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        if (index !== activeIndex) {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                        }
                      }}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ============ WHY GLOBAL LEAP SECTION (white bg) ============ */}
      <section aria-label="Why Choose Global Leap" style={{ position: 'relative', overflow: 'hidden', background: '#F7F5F0', padding: '90px 0' }}>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '40px', left: '20px', width: '70px', height: '70px', transform: 'rotate(-10deg)', stroke: '#0F1B3D', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
          <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
          <path d="M58 26 V40" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '220px', left: '8%', width: '60px', height: '60px', transform: 'rotate(6deg)', stroke: '#C99A3C', opacity: 0.10, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M6 14 Q20 8 32 14 V50 Q20 44 6 50 Z" strokeLinejoin="round" />
          <path d="M58 14 Q44 8 32 14 V50 Q44 44 58 50 Z" strokeLinejoin="round" />
          <path d="M32 14 V50" />
        </svg>

        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '60px', left: '30%', width: '55px', height: '55px', transform: 'rotate(18deg)', stroke: '#0F1B3D', opacity: 0.07, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M12 52 L40 24 Q44 20 48 24 Q52 28 48 32 L20 60 L10 62 Z" strokeLinejoin="round" />
          <path d="M36 28 L44 36" />
        </svg>

        {isDesktop && (
          <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '60px', right: '6%', width: '65px', height: '65px', transform: 'rotate(-8deg)', stroke: '#C99A3C', opacity: 0.08, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
            <rect x="14" y="24" width="36" height="16" rx="2" />
            <circle cx="12" cy="32" r="6" />
            <circle cx="52" cy="32" r="6" />
            <path d="M20 30 H44 M20 34 H44" />
          </svg>
        )}

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '56px',
              alignItems: 'center',
            }}
          >
            <article>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    Why Choose Us
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.2, margin: 0 }}>
                  Why Study Abroad with <span style={{ color: '#C99A3C' }}>Global Leap</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{ marginTop: '16px', color: 'rgba(15,27,61,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '480px' }}>
                  Global Leap is a trusted overseas education consultancy helping students
                  achieve admission, scholarships, and visa approval at top universities
                  worldwide — with honest, personalised guidance at every step.
                </p>
              </Reveal>

              <ul style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px', listStyle: 'none', padding: 0 }}>
                {whyPoints.map((point, i) => (
                  <Reveal key={i} delay={0.15 * i}>
                    <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          flexShrink: 0,
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(201,154,60,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#C99A3C',
                          fontWeight: 700,
                          fontSize: '14px',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#0F1B3D' }}>{point.title}</h3>
                        <p style={{ margin: '4px 0 0', fontSize: '15px', color: 'rgba(15,27,61,0.6)', lineHeight: 1.6 }}>{point.desc}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </article>

            <Reveal delay={0.2}>
              <ZoomCarousel images={carouselImages} interval={3500} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHAT GLOBAL LEAP OFFERS SECTION (navy bg, card grid) ============ */}
      <section aria-label="What Global Leap Offers" style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: '100px 0' }}>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '50px', right: '5%', width: '90px', height: '90px', transform: 'rotate(10deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
          <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
          <path d="M58 26 V40" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '40px', left: '4%', width: '70px', height: '70px', transform: 'rotate(-12deg)', stroke: '#C99A3C', opacity: 0.07, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M6 14 Q20 8 32 14 V50 Q20 44 6 50 Z" strokeLinejoin="round" />
          <path d="M58 14 Q44 8 32 14 V50 Q44 44 58 50 Z" strokeLinejoin="round" />
          <path d="M32 14 V50" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                  Our Services
                </span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                What <span style={{ color: '#C99A3C' }}>Global Leap</span> Offers
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ marginTop: '14px', color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7 }}>
                Everything you need for a smooth study-abroad journey — handled by our team, in one place.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr',
              gap: '24px',
            }}
          >
            {offerItems.map((item, i) => (
              <OfferCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY STUDY ABROAD SECTION (white bg, split layout) ============ */}
      <section
        aria-label="Why Study Abroad"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#FFFFFF',
          padding: '100px 0',
        }}
      >
        {/* SKETCHES */}
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '30px', left: '20px', width: '80px', height: '80px', transform: 'rotate(-8deg)', stroke: '#0F1B3D', opacity: 0.05, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
          <path d="M32 10 L58 22 L32 34 L6 22 Z" strokeLinejoin="round" />
          <path d="M18 28 V42 Q32 50 46 42 V28" strokeLinejoin="round" />
          <path d="M58 22 V36" strokeLinecap="round" />
          <rect x="26" y="48" width="12" height="6" rx="2" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '50px', right: '6%', width: '90px', height: '90px', transform: 'rotate(12deg)', stroke: '#C99A3C', opacity: 0.08, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
          <circle cx="32" cy="32" r="22" strokeLinejoin="round" />
          <path d="M10 32 H54" strokeLinecap="round" />
          <path d="M32 10 A22 22 0 0 0 32 54" strokeLinecap="round" />
          <path d="M32 10 A22 22 0 0 1 32 54" strokeLinecap="round" />
          <circle cx="22" cy="18" r="3" strokeLinejoin="round" />
          <circle cx="42" cy="46" r="2.5" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '3%', width: '65px', height: '65px', transform: 'translateY(-50%) rotate(-5deg)', stroke: '#0F1B3D', opacity: 0.04, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
          <rect x="10" y="14" width="20" height="36" rx="2" strokeLinejoin="round" />
          <rect x="34" y="14" width="20" height="36" rx="2" strokeLinejoin="round" />
          <path d="M30 14 V50" strokeLinecap="round" />
          <path d="M20 22 H28 M20 30 H28 M20 38 H26" strokeLinecap="round" />
          <path d="M44 22 H52 M44 30 H52 M44 38 H50" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '55%', right: '2%', width: '75px', height: '75px', transform: 'translateY(-50%) rotate(15deg)', stroke: '#C99A3C', opacity: 0.07, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
          <path d="M20 42 L28 26 L44 14 L40 18 L34 22 L40 28 L48 30 L52 36 L44 34 L38 40 L32 48 L28 44 L20 42 Z" strokeLinejoin="round" />
          <path d="M12 42 L20 42 L28 26" strokeLinejoin="round" />
          <path d="M44 14 L52 10 L48 18 L44 14" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '40px', left: '8%', width: '60px', height: '60px', transform: 'rotate(-8deg)', stroke: '#0F1B3D', opacity: 0.05, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
          <circle cx="32" cy="32" r="18" strokeLinejoin="round" />
          <path d="M32 14 V18" strokeLinecap="round" />
          <path d="M32 46 V50" strokeLinecap="round" />
          <path d="M14 32 H18" strokeLinecap="round" />
          <path d="M46 32 H50" strokeLinecap="round" />
          <path d="M20 20 L28 28 L36 20 L28 36 Z" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '60px', right: '5%', width: '70px', height: '70px', transform: 'rotate(6deg)', stroke: '#C99A3C', opacity: 0.08, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
          <rect x="16" y="10" width="32" height="44" rx="3" strokeLinejoin="round" />
          <path d="M16 18 H48" strokeLinecap="round" />
          <path d="M24 26 H44" strokeLinecap="round" />
          <path d="M20 40 L30 48 L44 36" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '25%', left: '45%', width: '40px', height: '40px', transform: 'rotate(10deg)', stroke: '#C99A3C', opacity: 0.06, fill: '#C99A3C', pointerEvents: 'none' }}>
          <circle cx="10" cy="10" r="2" />
          <circle cx="30" cy="6" r="1.5" />
          <circle cx="50" cy="12" r="2" />
          <circle cx="18" cy="24" r="1.5" />
          <circle cx="38" cy="28" r="2" />
          <circle cx="8" cy="34" r="1.5" />
          <circle cx="54" cy="30" r="1.5" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '56px',
              alignItems: 'center',
            }}
          >
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Why Go Abroad</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.2, margin: 0 }}>
                  Why Study <span style={{ color: '#C99A3C' }}>Abroad</span>
                  <span style={{ display: 'block', fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 400, color: 'rgba(15,27,61,0.5)', marginTop: '6px' }}>
                    A life-changing decision
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ marginTop: '16px', color: 'rgba(15,27,61,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '480px' }}>
                  Studying abroad is more than an academic pursuit — it's a journey
                  that transforms your perspective, builds global networks, and opens
                  doors to opportunities you never imagined.
                </p>
              </Reveal>
              <ul style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: isTablet ? '1fr 1fr' : '1fr', gap: '12px 24px', listStyle: 'none', padding: 0 }}>
                {[
                  'Broaden your global horizons',
                  'Experience top-tier education',
                  'Choose from a wide range of courses',
                  'Enhance your career prospects',
                  'Embrace diverse cultures',
                  'Connect with a global community',
                  'Develop independence and self-confidence',
                  'Experience of a lifetime',
                ].map((text, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#0F1B3D', fontWeight: 500 }}>
                      <span style={{ flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(201,154,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#C99A3C', fontWeight: 700 }}>✓</span>
                      {text}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Image Collage with Hover Zoom */}
            <Reveal delay={0.2}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <img
                    src="https://images.collegexpress.com/blog/top-benefits-study-abroad-programs-personal-growth.jpg"
                    alt="Graduation celebration"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    }}
                  />
                  <img
                    src="https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202307/why-new-zealand-is-a-hotspot-for-indian-students-studying-abroad-052348-16x9.jpg?VersionId=UbZmua8LDJi5sqfrnbazlvdCj8zO5xWK&size=690:388"
                    alt="Students studying"
                    style={{
                      width: '100%',
                      height: '240px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                  <img
                    src="https://cdn.prod.website-files.com/68ca71f09a4062cd6374c690/6956582ed92860c0f19076d6_69438ce5cd345a791c2ea58f_million-indian-students-studying-abroad.jpeg"
                    alt="Campus building"
                    style={{
                      width: '100%',
                      height: '260px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80"
                    alt="International students"
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ POPULAR DESTINATIONS – MARQUEE ============ */}
      <section
        aria-label="Popular Destinations"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#F7F5F0',
          padding: '80px 0',
        }}
      >
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '30px', right: '5%', width: '70px', height: '70px', transform: 'rotate(15deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <circle cx="32" cy="32" r="18" />
          <path d="M32 14 V18 M32 46 V50 M14 32 H18 M46 32 H50" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '20px', left: '3%', width: '60px', height: '60px', transform: 'rotate(-8deg)', stroke: '#0F1B3D', opacity: 0.05, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
          <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Explore Opportunities</span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', margin: 0, lineHeight: 1.2 }}>
                Educational Destinations <span style={{ color: '#C99A3C' }}>Include</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ marginTop: '12px', color: 'rgba(15,27,61,0.6)', fontSize: '16px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
                Choose from a wide range of countries each offering unique academic experiences, career pathways.
              </p>
            </Reveal>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', width: '100%', padding: '8px 0' }}>
            <style>{`
              @keyframes marqueeScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track {
                display: flex;
                gap: 20px;
                width: max-content;
                animation: marqueeScroll ${countries.length * 4}s linear infinite;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
              .dest-card {
                display: block;
                flex: 0 0 200px;
                height: 280px;
                border-radius: 16px;
                background-size: cover;
                background-position: center;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 16px rgba(0,0,0,0.08);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                cursor: pointer;
                text-decoration: none;
              }
              .dest-card:hover {
                transform: scale(1.05);
                box-shadow: 0 12px 32px rgba(15,27,61,0.18);
              }
              .dest-card .overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 24px 16px 18px;
                background: linear-gradient(to top, rgba(15,27,61,0.7), transparent);
                color: #fff;
                text-align: center;
              }
              .dest-card .overlay h3 {
                margin: 0;
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 0.5px;
              }
              @media (max-width: 640px) {
                .dest-card {
                  flex: 0 0 150px;
                  height: 220px;
                }
                .dest-card .overlay h3 {
                  font-size: 16px;
                }
                .marquee-track {
                  gap: 14px;
                }
              }
            `}</style>

            <div className="marquee-track">
              {countries.map((country, i) => (
                <a
                  key={`${country}-${i}`}
                  href="#"
                  className="dest-card"
                  style={{ backgroundImage: `url(${countryImages[country]})` }}
                >
                  <div className="overlay">
                    <h3>{country}</h3>
                  </div>
                </a>
              ))}
              {countries.map((country, i) => (
                <a
                  key={`${country}-dup-${i}`}
                  href="#"
                  className="dest-card"
                  style={{ backgroundImage: `url(${countryImages[country]})` }}
                >
                  <div className="overlay">
                    <h3>{country}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
