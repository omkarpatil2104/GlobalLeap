import { useState, useEffect, useRef } from 'react';

/* ============================================================
   DATA
============================================================ */
const stats = [
  { value: 500, suffix: '+', label: 'Students Placed' },
  { value: 50, suffix: '+', label: 'Partner Universities' },
  { value: 15, suffix: '', label: 'Countries Covered' },
];

const mosaicImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
  'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=500&q=80',
  'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=500&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80',
];

const whatWeDoItems = [
  {
    title: 'Wide Range of Filters',
    desc: 'Find the right course and country fast, with filters for eligibility, tuition budget, field of interest, and region.',
    icon: (
      <path d="M8 12 H56 L36 34 V50 L28 46 V34 Z" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: 'Expert Guidance',
    desc: 'On-call and face-to-face sessions with expert counsellors to help you find the right program, every time.',
    icon: (
      <>
        <rect x="12" y="12" width="34" height="34" rx="4" />
        <path d="M20 30 L28 38 L42 20" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Multi-Apply Feature',
    desc: 'Apply to multiple programs and universities at once, all from a single student profile.',
    icon: (
      <>
        <circle cx="24" cy="26" r="10" />
        <circle cx="42" cy="34" r="10" />
      </>
    ),
  },
  {
    title: 'Live Application Tracking',
    desc: 'Track every application in real time, with direct status updates straight from the institutes.',
    icon: (
      <>
        <circle cx="32" cy="32" r="22" />
        <path d="M32 20 V32 L42 38" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

const visionValues = [
  'Integrity', 'Student-First',
  'Excellence', 'Transparency',
  'Global Mindset', 'Collaboration',
  'Empathy',
];

const leaders = [
  {
    name: 'Aditya Chavan',
    role: 'CEO & Co-Founder',
    company: 'Global Leap',
    bio: "Aditya Chavan leads Global Leap's overall strategy and university partnerships. With over 5 years of experience in international education consulting, he has personally guided hundreds of students through admissions to top universities across the UK, Canada, and Australia.",
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
  {
    name: 'Dr. Simran Anand',
    role: 'Director & Co-Founder',
    company: 'Global Leap',
    bio: 'Dr. Simran Anand heads student counselling and academic partnerships at Global Leap. With 5+ years of experience in higher education advisory, she has built a reputation for honest, student-first guidance that has helped shape Global Leap into a trusted admissions partner.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
];

/* ============================================================
   HOOKS
============================================================ */
function useMediaQuery(breakpoint) {
  const [match, setMatch] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true
  );
  useEffect(() => {
    const handle = () => setMatch(window.innerWidth >= breakpoint);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [breakpoint]);
  return match;
}

/* ============================================================
   REUSABLE UI
============================================================ */
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

function CountUp({ target, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

function MosaicGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '6px',
        width: '100%',
        aspectRatio: '1 / 1',
        maxWidth: '520px',
      }}
    >
      {mosaicImages.map((src, i) => {
        const isCircle = i % 2 !== 0;
        return (
          <div
            key={i}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: isCircle ? '50%' : '18px',
              boxShadow: '0 8px 20px rgba(15,27,61,0.10)',
            }}
          >
            <img
              src={src}
              alt="Global Leap team and students at work"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(160deg, rgba(15,27,61,0.15), transparent 60%)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ---- "What We Do" list item (navy bg) ---- */
function WhatWeDoItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={0.1 * index}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          padding: '18px',
          borderRadius: '14px',
          background: hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
          transition: 'background 0.3s ease',
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: hovered ? '#C99A3C' : 'rgba(201,154,60,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease',
          }}
        >
          <svg
            viewBox="0 0 64 64"
            style={{
              width: '26px',
              height: '26px',
              fill: 'none',
              stroke: hovered ? '#0F1B3D' : '#C99A3C',
              strokeWidth: 2.8,
              transition: 'stroke 0.3s ease',
            }}
          >
            {item.icon}
          </svg>
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#fff' }}>{item.title}</h3>
          <p style={{ margin: '8px 0 0', fontSize: '14.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, maxWidth: '380px' }}>
            {item.desc}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ---- Vision & Values checklist item (white bg) ---- */
function CheckItem({ label, index }) {
  return (
    <Reveal delay={0.05 * index}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
          <path
            d="M4 12.5 L9.5 18 L20 6"
            fill="none"
            stroke="#C99A3C"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#0F1B3D' }}>{label}</span>
      </div>
    </Reveal>
  );
}

/* ---- Leadership card (side-by-side grid, no dead whitespace) ---- */
function LeaderCard({ leader, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={0.12 * index}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          background: '#F5F5F3',
          borderRadius: '24px',
          overflow: 'hidden',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? '0 25px 50px rgba(15,27,61,0.18)' : '0 10px 30px rgba(15,27,61,0.08)',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Gold accent bar */}
        <div style={{ height: '5px', width: '100%', background: 'linear-gradient(90deg, #C99A3C, #D4A84B)' }} />

        <div style={{ padding: '40px 36px 36px' }}>
          {/* Large decorative quote mark */}
          <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '20px', right: '24px', width: '56px', height: '56px', fill: 'none', stroke: '#0F1B3D', opacity: 0.06, strokeWidth: 1.5 }}>
            <path d="M14 20 Q14 32 24 34 Q22 44 12 46" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 20 Q38 32 48 34 Q46 44 36 46" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #fff',
                boxShadow: '0 8px 20px rgba(15,27,61,0.15)',
                flexShrink: 0,
              }}
            >
              <img
                src={leader.image}
                alt={`${leader.name}, ${leader.role} at Global Leap`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0F1B3D' }}>{leader.name}</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13.5px', fontWeight: 600, color: '#C99A3C', lineHeight: 1.5 }}>
                {leader.role} · {leader.company}
              </p>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '14.5px', color: 'rgba(15,27,61,0.65)', lineHeight: 1.75 }}>
            {leader.bio}
          </p>

          <div style={{ marginTop: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(201,154,60,0.12)',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#C99A3C',
              }}
            >
              <svg viewBox="0 0 24 24" style={{ width: '13px', height: '13px' }}>
                <path d="M12 2 L14.5 8.5 L21.5 9 L16 13.3 L17.8 20.2 L12 16.4 L6.2 20.2 L8 13.3 L2.5 9 L9.5 8.5 Z" fill="#C99A3C" />
              </svg>
              5+ Years Experience
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function About() {
  const isDesktopMd = useMediaQuery(900);
  const isTablet = useMediaQuery(640);

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ============ HERO SECTION — background image (navy) ============ */}
      <section
        aria-label="About Hero"
        style={{
          position: 'relative',
          minHeight: '62vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '90px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.75) brightness(0.55)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to right, rgba(10,15,26,0.88) 0%, rgba(10,15,26,0.6) 50%, rgba(10,15,26,0.35) 100%),
              linear-gradient(to top, rgba(10,15,26,0.7) 0%, rgba(10,15,26,0.1) 50%, rgba(10,15,26,0) 80%)
            `,
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '60px 24px', width: '100%' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              <span style={{ color: '#C99A3C', fontWeight: 600 }}>Home</span>
              <span>›</span>
              <span>About Us</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                About Global Leap
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: 0, maxWidth: '760px' }}>
              Your Trusted Partner for{' '}
              <span style={{ color: '#C99A3C' }}>Studying Abroad</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p style={{ marginTop: '20px', fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.78)', maxWidth: '560px', lineHeight: 1.7 }}>
              We're a premier overseas education consultancy, dedicated to helping students
              achieve their dream of studying abroad — from the first shortlist to the final visa stamp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ WHO WE ARE SECTION (white bg) ============ */}
      <section aria-label="Who We Are" style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', padding: '100px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    Who We Are
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.2, margin: 0 }}>
                  International education solutions built around{' '}
                  <span style={{ color: '#C99A3C' }}>you.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{ marginTop: '22px', fontSize: '16px', color: 'rgba(15,27,61,0.65)', lineHeight: 1.75, maxWidth: '460px' }}>
                  Founded to make international education accessible and stress-free, Global Leap
                  combines deep counselling expertise with an honest, student-first approach —
                  guiding you from university selection all the way to visa approval.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${stats.length}, auto)`,
                    gap: isTablet ? '48px' : '28px',
                    marginTop: '44px',
                  }}
                >
                  {stats.map((stat, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 'clamp(28px, 3.4vw, 38px)', fontWeight: 800, color: '#0F1B3D', display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '14px', color: 'rgba(15,27,61,0.55)', fontWeight: 500 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
              <MosaicGrid />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO SECTION (navy bg) ============ */}
      <section aria-label="What We Do" style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: '100px 0' }}>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '40px', right: '4%', width: '80px', height: '80px', transform: 'rotate(12deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <circle cx="32" cy="32" r="24" />
          <path d="M32 16 L38 32 L32 48 L26 32 Z" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '50px', left: '4%', width: '70px', height: '70px', transform: 'rotate(-10deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
          <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '64px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left – Text */}
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    What We Do
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 42px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
                  We offer tailor-made options to students with{' '}
                  <span style={{ color: '#C99A3C' }}>end-to-end assistance</span> for admissions.
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{ marginTop: '20px', fontSize: '15.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '420px' }}>
                  We understand each student's goals and background closely, so they receive
                  guidance that actually fits them — not a one-size-fits-all plan.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p style={{ marginTop: '14px', fontSize: '15.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '420px' }}>
                  Global Leap is a one-stop destination, with both on-ground counselling and
                  online access — so you can track your applications and profile anytime.
                </p>
              </Reveal>
            </div>

            {/* Right – Icon list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {whatWeDoItems.map((item, i) => (
                <WhatWeDoItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ VISION & VALUES SECTION (white bg) ============ */}
      <section aria-label="Our Vision and Values" style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', padding: '100px 0' }}>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '30px', left: '4%', width: '65px', height: '65px', transform: 'rotate(-14deg)', stroke: '#0F1B3D', opacity: 0.05, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <circle cx="32" cy="32" r="24" />
          <path d="M32 16 L38 32 L32 48 L26 32 Z" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '20px', right: '5%', width: '75px', height: '75px', transform: 'rotate(10deg)', stroke: '#C99A3C', opacity: 0.09, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M12 52 L40 24 Q44 20 48 24 Q52 28 48 32 L20 60 L10 62 Z" strokeLinejoin="round" />
          <path d="M36 28 L44 36" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left – Heading */}
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    Our Vision & Values
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.25, margin: 0 }}>
                  Making world-class education accessible to every ambitious student.
                </h2>
              </Reveal>
            </div>

            {/* Right – Two-column checklist */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isTablet ? '1fr 1fr' : '1fr',
                columnGap: '48px',
                rowGap: '22px',
              }}
            >
              {visionValues.map((label, i) => (
                <CheckItem key={i} label={label} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ LEADERSHIP SECTION (navy band + card grid) ============ */}
      <section aria-label="Leadership" style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: '90px 0 100px' }}>
        {/* Decorative sketch accents on navy */}
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '30px', left: '3%', width: '80px', height: '80px', transform: 'rotate(-10deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <circle cx="20" cy="22" r="7" />
          <circle cx="44" cy="22" r="7" />
          <circle cx="32" cy="44" r="7" />
          <path d="M20 29 V38 M44 29 V38 M25 24 H39 M27 40 H37" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '20px', right: '4%', width: '90px', height: '90px', transform: 'rotate(14deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
          <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Centered header, consistent with other sections — no big empty gap before cards */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                  Leadership
                </span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                Leading <span style={{ color: '#C99A3C' }}>Ideas</span> to Action
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ marginTop: '14px', color: 'rgba(255,255,255,0.6)', fontSize: '15.5px', lineHeight: 1.7 }}>
                Meet the founders behind Global Leap's student-first approach to overseas education.
              </p>
            </Reveal>
          </div>

          {/* Card grid — side by side, no dead space */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '28px',
            }}
          >
            {leaders.map((leader, i) => (
              <LeaderCard key={i} leader={leader} index={i} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}