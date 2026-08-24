import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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

function FaqItem({ q, a, open, onClick }) {
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(15,27,61,0.1)',
        padding: '20px 4px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '16px', color: '#0F1B3D' }}>{q}</p>
        <span
          style={{
            flexShrink: 0,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(201,154,60,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#C99A3C',
            fontSize: '16px',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p style={{ margin: '14px 0 0', color: 'rgba(15,27,61,0.65)', fontSize: '15px', lineHeight: 1.7 }}>{a}</p>
      </div>
    </div>
  );
}

export default function Georgia() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroImages = [
    'https://internationalbanker.com/wp-content/uploads/2025/03/Georgia.jpg',
    'https://www.orexca.com/img/georgia/georgia-banner.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxrkHW7ha5cYJLF6tXir91lmNeQjv0q1IsMsGB9HCM8A&s=10',
  ];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  const mbbsData = {
    description:
      'Georgia has become a destination Indian students actively consider for MBBS — English-medium instruction, structured admission processes and a lower total cost than many private seats in India. Global Leap currently focuses on this pathway as our first international education destination, working with universities including Caucasus University. Choosing to study medicine abroad is a significant decision, and we believe it deserves more than a shortlist of colleges — it deserves a clear, honest look at what the journey actually involves.',
    stats: [
      { value: '6 Years', label: 'Typical MBBS Duration' },
      { value: 'English', label: 'Medium of Instruction' },
      { value: 'NEET', label: 'Qualifying Requirement*' },
      { value: '1', label: 'Current University Partner' },
    ],
  };

  const beforeYouDecide = [
    {
      title: 'The University',
      question: 'What institution are you joining?',
      body: 'Look at accreditation, recognition status, teaching hospital access and how long the university has been running its MBBS programme before you shortlist it.',
    },
    {
      title: 'The Programme',
      question: 'What will you actually study?',
      body: 'Curriculum structure, clinical exposure years, language of instruction, and how the programme is sequenced from pre-clinical to clinical training.',
    },
    {
      title: 'Eligibility',
      question: 'Do you meet the requirements?',
      body: 'NEET qualification, minimum academic scores, age criteria and any university-specific entrance requirements that apply to you.',
    },
    {
      title: 'Investment',
      question: 'What is the full financial commitment?',
      body: 'Tuition across all six years, hostel or accommodation, living costs, travel, and any exam or licensing costs after graduation — not just year one.',
    },
    {
      title: 'Location',
      question: 'What will life in Georgia involve?',
      body: 'Climate, safety, food, the Indian student community already there, and how far the campus is from the city and its teaching hospitals.',
    },
    {
      title: 'The Path After',
      question: 'What comes after graduation?',
      body: 'Requirements to practise in India (such as the NExT/FMGE screening process) and what a student typically needs to prepare for well before the final year.',
    },
  ];

  const universities = [
    { name: 'Caucasus University', partner: true },
    { name: 'Tbilisi State Medical University', partner: false },
    { name: 'Ilia State University — Medical Faculty', partner: false },
    { name: 'Georgian Technical University — Medical School', partner: false },
    { name: 'Batumi State University — Medical Programme', partner: false },
    { name: 'European University — Medical Faculty', partner: false },
  ];

  const popularPrograms = [
    'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    'MD (Doctor of Medicine)',
    'Dentistry (BDS / DDS)',
    'Pharmacy (B.Pharm)',
    'Nursing',
    'Public Health',
  ];

  const faqs = [
    {
      q: 'Is MBBS in Georgia a good option for Indian students?',
      a: 'It can be, for eligible students weighing medical education abroad — but the right choice depends on the specific university, total cost, programme structure, recognition status and your own long-term plans. It is worth understanding the full picture before deciding, not just the admission process.',
    },
    {
      q: 'What should I check before choosing MBBS in Georgia?',
      a: 'Start with the university\'s accreditation and recognition, the full six-year cost (not just tuition), the eligibility criteria you need to meet, and what the pathway back to practising in India looks like after graduation.',
    },
    {
      q: 'Do I need NEET to study MBBS in Georgia?',
      a: 'Most Indian students pursuing MBBS abroad still need to meet NEET qualification requirements to be eligible to practise in India after graduating. Confirm current requirements directly, as regulations can change.',
    },
    {
      q: 'What should parents check before sending their child abroad?',
      a: 'University legitimacy, safety and living conditions in the city, the full cost over the entire programme, communication support for the student, and a realistic understanding of the post-graduation licensing process.',
    },
    {
      q: 'Does Global Leap only help with MBBS in Georgia?',
      a: 'No. MBBS in Georgia is our current international focus, but Global Leap\'s work starts earlier — with student education diagnostics, career roadmaps and communication development — before a destination is even discussed.',
    },
  ];

  return (
    <main style={{ background: '#F7F5F0', position: 'relative', overflow: 'hidden' }}>
      {/* ===== DECORATIVE SKETCHES ===== */}
      <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '100px', left: '3%', width: '70px', height: '70px', transform: 'rotate(-10deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
        <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
        <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', bottom: '20%', right: '4%', width: '60px', height: '60px', transform: 'rotate(8deg)', stroke: '#0F1B3D', opacity: 0.05, fill: 'none', strokeWidth: 1.5, pointerEvents: 'none' }}>
        <circle cx="32" cy="32" r="18" />
        <path d="M32 14 V18 M32 46 V50 M14 32 H18 M46 32 H50" strokeLinecap="round" />
      </svg>

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          position: 'relative',
          padding: isMobile ? '60px 0 40px' : '100px 0 60px',
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
            background: `
              linear-gradient(
                to right,
                rgba(10, 15, 26, 0.85) 0%,
                rgba(10, 15, 26, 0.6) 50%,
                rgba(10, 15, 26, 0.2) 100%
              ),
              linear-gradient(
                to top,
                rgba(10, 15, 26, 0.7) 0%,
                rgba(10, 15, 26, 0.1) 50%,
                rgba(10, 15, 26, 0) 80%
              )
            `,
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              <Link to="/" style={{ color: '#C99A3C', fontWeight: 600, textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <span style={{ color: '#fff' }}>MBBS in Georgia</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#C99A3C',
                textTransform: 'uppercase',
                border: '1px solid rgba(201,154,60,0.4)',
                borderRadius: '9999px',
                padding: '6px 16px',
                marginBottom: '20px',
              }}
            >
              Current International Focus
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              style={{
                fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              MBBS in <span style={{ color: '#C99A3C' }}>Georgia</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              style={{
                marginTop: '16px',
                fontSize: isMobile ? '16px' : 'clamp(16px, 1.5vw, 20px)',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '580px',
                lineHeight: 1.7,
              }}
            >
              Before you compare universities, understand the journey the eligibility, the real cost, and what comes after graduation.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{ display: 'flex', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{
                  background: '#C99A3C',
                  color: '#0F1B3D',
                  padding: '12px 32px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4A84B';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#C99A3C';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Talk to a Counsellor
              </Link>
              <a
                href="#before-you-decide"
                style={{
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '12px 32px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                What to Check First
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== QUICK ANSWER BAND ===== */}
      <section style={{ padding: '0 24px', marginTop: '-1px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', transform: isMobile ? 'translateY(-20px)' : 'translateY(-36px)' }}>
          <Reveal>
            <div
              style={{
                background: '#fff',
                borderRadius: '20px',
                border: '1px solid rgba(201,154,60,0.25)',
                boxShadow: '0 24px 48px rgba(15,27,61,0.12)',
                padding: isMobile ? '24px 20px' : '32px 36px',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                Quick Answer
              </span>
              <p style={{ margin: '12px 0 0', color: '#0F1B3D', fontSize: isMobile ? '16px' : '17px', lineHeight: 1.75, fontWeight: 500 }}>
                MBBS in Georgia can be a genuine option for eligible Indian students considering medical education abroad — but the decision should rest on university-specific eligibility, the complete six-year cost, programme recognition, and a clear view of the path back to practising in India. It isn't the right fit for everyone, and that's exactly what a proper counselling conversation should help you work out.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ABOUT MBBS IN GEORGIA ===== */}
      <section style={{ padding: isMobile ? '20px 0 50px' : '40px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '24px' : '56px',
              alignItems: 'center',
            }}
          >
            <Reveal delay={0.1}>
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                  aspectRatio: '4/3',
                }}
              >
                <img
                  src="https://www.rmcedu.com/_next/image/?url=https%3A%2F%2Fdash.rmcedu.com%2Fuploads%2Falte_medical_university2_5395f7c1eb.webp&w=3840&q=75"
                  alt="Tbilisi, Georgia — a destination for Indian MBBS students"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    About the Pathway
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.2, margin: 0 }}>
                  Why Students Look at <span style={{ color: '#C99A3C' }}>Georgia</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p style={{ marginTop: '16px', color: 'rgba(15,27,61,0.7)', fontSize: '16px', lineHeight: 1.8 }}>
                  {mbbsData.description}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    marginTop: '28px',
                  }}
                >
                  {mbbsData.stats.map((stat, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(15,27,61,0.04)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(201,154,60,0.1)';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(15,27,61,0.04)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#C99A3C' }}>
                        {stat.value}
                      </p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(15,27,61,0.5)' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEFORE YOU DECIDE – BACKGROUND IMAGE + TIMELINE ===== */}
      <section
        id="before-you-decide"
        style={{
          position: 'relative',
          padding: isMobile ? '50px 0' : '80px 0',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        }}
      >
        {/* Light overlay to keep dark text readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.88)',
            zIndex: 1,
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                  Before You Apply
                </span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F1B3D', margin: 0, lineHeight: 1.2 }}>
                Six Things Worth Understanding <span style={{ color: '#C99A3C' }}>First</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p style={{ marginTop: '14px', color: 'rgba(15,27,61,0.6)', fontSize: '16px', lineHeight: 1.7 }}>
                Choosing to study medicine abroad is a major decision. These are the questions we walk through with every family before a university is even shortlisted.
              </p>
            </Reveal>
          </div>

          {/* Vertical timeline – replaces the card grid */}
          <div style={{ position: 'relative', padding: '20px 0' }}>
            {/* Central line (Desktop) or Left line (Mobile) */}
            <div
              style={{
                position: 'absolute',
                left: isMobile ? '10px' : '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'rgba(201,154,60,0.3)',
                transform: isMobile ? 'translateX(0)' : 'translateX(-50%)',
              }}
            />

            {beforeYouDecide.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '20px',
                    marginBottom: index === beforeYouDecide.length - 1 ? 0 : '40px',
                    alignItems: 'center',
                    position: 'relative',
                    paddingLeft: isMobile ? '40px' : '0',
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: isMobile ? '10px' : '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#C99A3C',
                      border: '3px solid #fff',
                      boxShadow: '0 0 0 3px #C99A3C',
                      zIndex: 2,
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      gridColumn: isMobile ? '1 / 2' : (isEven ? '1 / 2' : '2 / 3'),
                      paddingRight: isMobile ? '0' : (isEven ? '30px' : 0),
                      paddingLeft: isMobile ? '0' : (isEven ? 0 : '30px'),
                      textAlign: isMobile ? 'left' : (isEven ? 'right' : 'left'),
                    }}
                  >
                    <Reveal delay={0.1 * (index + 1)}>
                      <div>
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            color: '#C99A3C',
                            background: 'rgba(201,154,60,0.15)',
                            padding: '2px 12px',
                            borderRadius: '9999px',
                            marginBottom: '6px',
                          }}
                        >
                          {item.title}
                        </span>
                        <h3
                          style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#0F1B3D',
                            margin: '0 0 6px',
                          }}
                        >
                          {item.question}
                        </h3>
                        <p
                          style={{
                            fontSize: '15px',
                            lineHeight: 1.6,
                            color: 'rgba(15,27,61,0.7)',
                            margin: 0,
                          }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Empty spacer for layout (Desktop only) */}
                  {!isMobile && (
                    <div style={{ gridColumn: isEven ? '2 / 3' : '1 / 2' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== UNIVERSITIES & PROGRAMS ===== */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '48px',
            }}
          >
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    Medical Universities in Georgia
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F1B3D', marginBottom: '20px' }}>
                  Universities Students <span style={{ color: '#C99A3C' }}>Explore</span>
                </h3>
              </Reveal>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {universities.map((uni, i) => (
                  <Reveal key={i} delay={0.05 * i}>
                    <li
                      style={{
                        padding: '14px 20px',
                        background: uni.partner ? 'rgba(201,154,60,0.08)' : '#fff',
                        border: uni.partner ? '1px solid rgba(201,154,60,0.35)' : 'none',
                        borderRadius: '12px',
                        boxShadow: uni.partner ? 'none' : '0 4px 12px rgba(0,0,0,0.04)',
                        color: '#0F1B3D',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexWrap: 'wrap',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(6px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#C99A3C' }}>▸</span>
                        {uni.name}
                      </span>
                      {uni.partner && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            color: '#C99A3C',
                            background: 'rgba(201,154,60,0.15)',
                            borderRadius: '9999px',
                            padding: '4px 10px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Our Partner
                        </span>
                      )}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <p style={{ marginTop: '14px', fontSize: '12.5px', color: 'rgba(15,27,61,0.45)', lineHeight: 1.6 }}>
                University list reflects institutions we currently guide students through. Partnership status, programmes and fees should always be confirmed against the current formal agreement and official university information.
              </p>
            </div>

            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                    Popular Medical Programs
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F1B3D', marginBottom: '20px' }}>
                  Courses Worth <span style={{ color: '#C99A3C' }}>Knowing About</span>
                </h3>
              </Reveal>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {popularPrograms.map((program, i) => (
                  <Reveal key={i} delay={0.05 * i}>
                    <li
                      style={{
                        padding: '14px 20px',
                        background: 'rgba(15,27,61,0.04)',
                        borderRadius: '12px',
                        color: '#0F1B3D',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(201,154,60,0.15)';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(15,27,61,0.04)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <span style={{ color: '#C99A3C', fontSize: '18px' }}>🎓</span>
                      {program}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAUCASUS UNIVERSITY SPOTLIGHT ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: isMobile ? '50px 0' : '80px 0' }}>
        <svg viewBox="0 0 64 64" aria-hidden="true" style={{ position: 'absolute', top: '50px', right: '5%', width: '90px', height: '90px', transform: 'rotate(10deg)', stroke: '#C99A3C', opacity: 0.06, fill: 'none', strokeWidth: 1.2, pointerEvents: 'none' }}>
          <path d="M32 14 L58 26 L32 38 L6 26 Z" strokeLinejoin="round" />
          <path d="M18 30 V44 Q32 52 46 44 V30" strokeLinejoin="round" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
              Global Leap × Caucasus University
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, color: '#fff', margin: '14px 0 0', lineHeight: 1.25 }}>
              One of our university partnerships in <span style={{ color: '#C99A3C' }}>Georgia</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ marginTop: '18px', color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.8, maxWidth: '680px' }}>
              We don't want a university partnership to mean nothing more than a logo on a website. Before Caucasus University enters your shortlist, we walk students and parents through the programme, admission requirements, fees, location and student experience — so the question you're left with is a useful one.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ marginTop: '10px', color: '#C99A3C', fontSize: '18px', fontWeight: 700 }}>
              Could this be the right fit for you?
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ marginTop: '20px' }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-block',
                  background: '#C99A3C',
                  color: '#0F1B3D',
                  padding: '12px 32px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4A84B';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#C99A3C';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Explore Caucasus University
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ padding: isMobile ? '50px 0' : '80px 0' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>
                  Frequently Asked
                </span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, color: '#0F1B3D', margin: 0 }}>
                Questions Families <span style={{ color: '#C99A3C' }}>Ask Us</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div>
              {faqs.map((item, i) => (
                <FaqItem
                  key={i}
                  q={item.q}
                  a={item.a}
                  open={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: isMobile ? '40px 0' : '60px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>
              Not sure if MBBS in <span style={{ color: '#C99A3C' }}>Georgia</span> is right for you?
            </h2>
            <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
              Talk to us before you shortlist a university. We'll walk you through eligibility, cost and the path ahead honestly.
            </p>
            <div style={{ marginTop: '28px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{
                  background: '#C99A3C',
                  color: '#0F1B3D',
                  padding: '14px 36px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4A84B';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#C99A3C';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Free Counselling
              </Link>
              <Link
                to="/"
                style={{
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '14px 36px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              >
                Back to Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}