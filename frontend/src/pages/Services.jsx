import { useState, useEffect, useRef } from 'react';

/* ============================================================
   DATA
============================================================ */
const workStats = [
  { value: 10, suffix: '+', label: 'Annual Student Walk-ins' },    // changed from 0 → 10
  { value: 12, suffix: '+', label: 'Institutional Tie-ups' },      // changed from 50 → 12
  { value: 18, suffix: '+', label: 'Programs Available' },         // changed from 12000 → 18
];

const mosaicImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80',
  'https://www.nfcc.org/wp-content/uploads/2024/07/financial-counseling.jpg',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80',
  'https://s39613.pcdn.co/wp-content/uploads/2026/05/iStock-1588288383-scaled.jpg',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
  'https://learn.neumann.edu/hubfs/msed-degree.jpg',
  'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=500&q=80',
  'https://www.wgu.edu/blog/2020/02/advancing-your-teaching-career-leadership/_jcr_content/root/container/imageandtext.coreimg.jpeg/1699491680316/advancing-your-teaching-career.jpeg',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=80',
];

const assistanceColumns = [
  {
    title: 'Admission Guidance',
    desc: 'Get admissions into universities and colleges that best suit your personal, academic, and financial parameters.',
    checklist: ['Letter of Recommendation', 'Statement of Purpose', 'Sending & Tracking Applications'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&q=80',
    accentImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80',
  },
  {
    title: 'Financial Guidance',
    desc: 'We help students secure financial aid by assisting with private loan applications and connecting them to funding organisations.',
    checklist: ['Education Loan Guidance', 'Loans at Affordable Rates'],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&q=80',
    accentImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80',
  },
];

const preDepartureItems = [
  {
    title: 'Travel Assistance',
    desc: 'We understand students\' and parents\' anxiety and make the journey quite comfortable and safe.',
    checklist: ['Travel Dates and Discounts', 'Pickup and Accommodation'],
    images: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80',
    ],
  },
  {
    title: 'Forex Assistance',
    desc: 'Currency value keeps fluctuating daily, which can lead to losses in exchange — we help you avoid that.',
    checklist: ['Good Deals at Low Prices', 'Currency Exchange Guidance'],
    images: [
      'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&q=80',
      'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&q=80',
      'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&q=80',
      'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&q=80',
    ],
  },
  {
    title: 'Pre-Departure Assistance',
    desc: 'We organise pre-departure sessions and explain every aspect of the journey ahead to the student.',
    checklist: ['Departure Guidelines', 'Planning Travel Itinerary', 'Contact Information During Travel'],
    images: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=300&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=300&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=300&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=300&q=80',
    ],
  },
];

const services = [
  {
    title: 'University Selection',
    desc: 'Personalised matching based on your academic profile, budget, and career preferences.',
    icon: (
      <path d="M6 34 L32 20 L58 34 L32 48 Z M18 40 V52 Q32 58 46 52 V40" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: 'Application Assistance',
    desc: 'Expert review of essays, statements of purpose, and every form before submission.',
    icon: (
      <>
        <rect x="16" y="10" width="32" height="44" rx="3" />
        <path d="M24 22 H40 M24 30 H40 M24 38 H34" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Visa Guidance',
    desc: 'Step-by-step, document-by-document support for your student visa application.',
    icon: (
      <>
        <rect x="10" y="14" width="44" height="36" rx="3" />
        <circle cx="24" cy="30" r="6" />
        <path d="M34 26 H46 M34 34 H46 M16 44 H48" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Scholarship Guidance',
    desc: 'We help you find and apply for scholarships that reduce your overall study cost.',
    icon: (
      <>
        <circle cx="32" cy="24" r="12" />
        <path d="M22 34 L16 56 L32 48 L48 56 L42 34" strokeLinejoin="round" strokeLinecap="round" />
      </>
    ),
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

/* ---- Mosaic grid — alternating circle/square photo cutouts (same pattern as About page) ---- */
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
              alt="Global Leap students and counsellors at work"
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

/* ---- Small cutout collage (main image + decorative circle accents) ---- */
function CutoutCollage({ image, accentImage }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 15px 35px rgba(15,27,61,0.12)',
          aspectRatio: '4 / 3',
        }}
      >
        <img
          src={image}
          alt="Global Leap student support"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Top-right small accent circle */}
      <div
        style={{
          position: 'absolute',
          top: '-16px',
          right: '-16px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #FFFFFF',
          boxShadow: '0 8px 20px rgba(15,27,61,0.15)',
        }}
      >
        <img
          src={accentImage}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Bottom-left navy circle with nested white dot */}
      <div
        style={{
          position: 'absolute',
          bottom: '-18px',
          left: '-14px',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: '#0F1B3D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(15,27,61,0.2)',
        }}
      >
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#FFFFFF' }} />
      </div>

      {/* Small gold ring accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '54px',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '3px solid #C99A3C',
        }}
      />
    </div>
  );
}

/* ---- Gold checkmark list item ---- */
function AssistCheckItem({ label, index }) {
  return (
    <Reveal delay={0.05 * index}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg viewBox="0 0 24 24" style={{ width: '17px', height: '17px', flexShrink: 0 }}>
          <path
            d="M4 12.5 L9.5 18 L20 6"
            fill="none"
            stroke="#C99A3C"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(15,27,61,0.75)' }}>{label}</span>
      </div>
    </Reveal>
  );
}

/* ---- Assistance column (collage + title + desc + checklist) ---- */
function AssistanceColumn({ data, index }) {
  return (
    <Reveal delay={0.15 * index}>
      <div>
        <CutoutCollage image={data.image} accentImage={data.accentImage} />
        <h3 style={{ marginTop: '32px', marginBottom: '10px', fontSize: '19px', fontWeight: 700, color: '#0F1B3D' }}>
          {data.title}
        </h3>
        <p style={{ margin: 0, fontSize: '14.5px', color: 'rgba(15,27,61,0.6)', lineHeight: 1.7, maxWidth: '340px' }}>
          {data.desc}
        </p>
        <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.checklist.map((item, i) => (
            <AssistCheckItem key={i} label={item} index={i} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---- Mini interlocking mosaic (same alternating circle/square cutout style as About page, sized for a 3-column layout) ---- */
function MiniMosaic({ images }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '5px',
        width: '100%',
        aspectRatio: '1 / 1',
        maxWidth: '210px',
      }}
    >
      {images.map((src, i) => {
        const isCircle = i % 2 !== 0;
        return (
          <div
            key={i}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: isCircle ? '50%' : '16px',
              boxShadow: '0 6px 16px rgba(15,27,61,0.10)',
            }}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
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

/* ---- Pre-Departure column (mosaic + title + desc + checklist) ---- */
function PreDepartureColumn({ data, index }) {
  return (
    <Reveal delay={0.12 * index}>
      <div>
        <MiniMosaic images={data.images} />
        <h3 style={{ marginTop: '26px', marginBottom: '10px', fontSize: '18px', fontWeight: 700, color: '#0F1B3D' }}>
          {data.title}
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(15,27,61,0.6)', lineHeight: 1.7, maxWidth: '320px' }}>
          {data.desc}
        </p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.checklist.map((item, i) => (
            <AssistCheckItem key={i} label={item} index={i} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ServiceCard({ item, index }) {
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
          padding: '36px 30px',
          height: '100%',
          backdropFilter: 'blur(6px)',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.35)' : '0 8px 20px rgba(0,0,0,0.15)',
          transition: 'all 0.35s ease',
        }}
      >
        <div
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '14px',
            background: hovered ? '#C99A3C' : 'rgba(201,154,60,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '22px',
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
        <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>
          {item.title}
        </h3>
        <p style={{ margin: '10px 0 0', fontSize: '14.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          {item.desc}
        </p>
        <div style={{ marginTop: '20px', width: hovered ? '40px' : '24px', height: '2px', background: '#C99A3C', transition: 'width 0.35s ease' }} />
      </div>
    </Reveal>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function Services() {
  const isDesktopMd = useMediaQuery(900);
  const isDesktop = useMediaQuery(1024);
  const isTablet = useMediaQuery(640);

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ============ HERO SECTION — background image (navy) ============ */}
      <section
        aria-label="Services Hero"
        style={{
          position: 'relative',
          minHeight: '55vh',
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
              "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80')",
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
              <span>Services</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                What We Offer
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: 0, maxWidth: '760px' }}>
              Our <span style={{ color: '#C99A3C' }}>Services</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p style={{ marginTop: '20px', fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.78)', maxWidth: '560px', lineHeight: 1.7 }}>
              Comprehensive, end-to-end support for your study abroad journey — from
              choosing the right course to landing safely in your new university.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ WORKING FOR STUDENTS & INSTITUTES SECTION (white bg) ============ */}
      <section aria-label="Working for Students and Institutes" style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', padding: '110px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            {/* Left – Text + Stats */}
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    Services
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.2, margin: 0 }}>
                  Working for <span style={{ color: '#C99A3C' }}>students</span> and institutes
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{ marginTop: '22px', fontSize: '16px', color: 'rgba(15,27,61,0.65)', lineHeight: 1.75, maxWidth: '460px' }}>
                  At Global Leap, we've designed our services keeping both students and
                  institutes in mind. Connect with us to learn more about our student
                  services and institutional partnerships.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${workStats.length}, auto)`,
                    gap: isTablet ? '48px' : '28px',
                    marginTop: '48px',
                  }}
                >
                  {workStats.map((stat, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 'clamp(26px, 3.2vw, 34px)', fontWeight: 800, color: '#0F1B3D', display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '13.5px', color: 'rgba(15,27,61,0.55)', fontWeight: 500, lineHeight: 1.4, maxWidth: '110px' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right – Interlocking photo mosaic */}
            <Reveal delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
              <MosaicGrid />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SERVICES GRID SECTION (navy bg) ============ */}
      <section aria-label="Our Services" style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: '100px 0' }}>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '50px', right: '5%', width: '90px', height: '90px', transform: 'rotate(10deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
          <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '40px', left: '4%', width: '70px', height: '70px', transform: 'rotate(-12deg)', stroke: '#C99A3C', opacity: 0.07, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <rect x="14" y="24" width="36" height="16" rx="2" />
          <circle cx="12" cy="32" r="6" />
          <circle cx="52" cy="32" r="6" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                  Comprehensive Support
                </span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                Everything You Need to <span style={{ color: '#C99A3C' }}>Study Abroad</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ marginTop: '14px', color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7 }}>
                From your first course search to your first day on campus, we're with you every step.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr',
              gap: '24px',
            }}
          >
            {services.map((item, i) => (
              <ServiceCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPLICATION ASSISTANCE SECTION (white bg) ============ */}
      <section aria-label="Application Assistance" style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', padding: '100px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '600px', marginBottom: '64px' }}>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                  Application Assistance
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.25, margin: 0 }}>
                Personalised attention to each student's applications
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ marginTop: '18px', fontSize: '15.5px', color: 'rgba(15,27,61,0.6)', lineHeight: 1.7 }}>
                Global Leap offers personalised attention to every student's admission
                applications, ensuring the submission of an error-free and well-represented profile.
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr',
              gap: '56px',
            }}
          >
            {assistanceColumns.map((data, i) => (
              <AssistanceColumn key={i} data={data} index={i} />
            ))}
          </div>
        </div>
      </section>

     

    </main>
  );
}