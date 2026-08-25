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
          maxHeight: open ? '300px' : '0px',
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
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
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

  const processSteps = [
    { title: 'Talk To Us', desc: 'Share your profile, goals & expectations with our expert counsellors.', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { title: 'Eligibility Check', desc: 'Reviews your academic records, NEET scores, and age criteria.', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>) },
    { title: 'Documents', desc: 'Complete checklist and preparation of all required documents.', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>) },
    { title: 'Applications', desc: 'Filling out all forms and submitting to your chosen universities.', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>) },
    { title: 'University Processing', desc: 'Constant contact with the admissions office to track status.', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>) },
    { title: 'Admission', desc: 'Offer acceptance, tuition payment, and preparing for your visa.', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>) },
    { title: 'Georgia', desc: 'Visa filing, travel planning, and on-ground support.', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /><path d="M12 7v6" stroke="#C99A3C" strokeWidth="2" /><path d="M9 10h6" stroke="#C99A3C" strokeWidth="2" /></svg>) }
  ];

  const afterMbbsSteps = [
    { title: 'MBBS', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>) },
    { title: 'Career Counselling', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>) },
    { title: 'Choose Your Intended Pathway', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>) },
    { title: 'Understand Applicable Requirements', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>) },
    { title: 'Plan Early (Exams / Registration)', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>) },
    { title: 'Your Next Professional Step', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="#C99A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v6a5 5 0 0 1-10 0V4z" /><path d="M7 4H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" /><path d="M17 4h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" /></svg>) },
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
    { q: 'Is MBBS in Georgia a good option for Indian students?', a: 'Yes, MBBS in Georgia is an excellent option for Indian students, especially those seeking a high-quality medical education at an affordable cost. Georgian medical universities are recognized by the National Medical Commission (NMC) of India. The education is delivered entirely in English, the total cost of 6 years is significantly lower than private medical colleges in India, and the lifestyle is safe and welcoming for Indian students.' },
    { q: 'What should I check before choosing MBBS in Georgia?', a: 'Before choosing MBBS in Georgia, you must check the university\'s accreditation and recognition by the NMC, the total cost across all 6 years (including tuition, hostel, food, and travel), the eligibility criteria (like NEET qualification), the curriculum structure, teaching hospital access for clinical rotations, and what the pathway back to practising in India looks like after graduation (NExT/FMGE screening).' },
    { q: 'Do I need NEET to study MBBS in Georgia?', a: 'Yes, qualifying NEET is mandatory for Indian students who wish to pursue MBBS abroad and then practise in India. The NEET score is required for the FMGE/NExT screening exam later. You must confirm your NEET qualification status and score before applying to Georgian universities.' },
    { q: 'What should parents check before sending their child abroad?', a: 'Parents should verify the university\'s official recognition by the NMC, ensure the safety and living conditions in the city (like Tbilisi), calculate the full cost over the entire programme, confirm that the consultancy provides ongoing support in Georgia (through an on-ground brand ambassador), and understand the realistic post-graduation licensing process.' },
    { q: 'Does Global Leap only help with MBBS in Georgia?', a: 'No. MBBS in Georgia is our current international focus, but Global Leap\'s work starts much earlier. We specialize in student education diagnostics, career roadmaps, and communication development. We help students identify the right path for their unique goals, build a strong profile, and then guide them through the admission process to the best-fit destination.' },
  ];

  // Helper to make simple list icons
  const IconWrap = ({ type }) => {
    const styles = { width: '16px', height: '16px', stroke: '#C99A3C', strokeWidth: '2', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (type === 'doc') return (<svg viewBox="0 0 24 24" style={styles}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>);
    if (type === 'check') return (<svg viewBox="0 0 24 24" style={styles}><polyline points="20 6 9 17 4 12" /></svg>);
    if (type === 'book') return (<svg viewBox="0 0 24 24" style={styles}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>);
    if (type === 'photo') return (<svg viewBox="0 0 24 24" style={styles}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>);
    if (type === 'form') return (<svg viewBox="0 0 24 24" style={styles}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>);
    if (type === 'plane') return (<svg viewBox="0 0 24 24" style={styles}><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>);
    if (type === 'money') return (<svg viewBox="0 0 24 24" style={styles}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>);
    if (type === 'wallet') return (<svg viewBox="0 0 24 24" style={styles}><path d="M20 7H4a2 2 0 0 1 0-4h14v4" /><path d="M4 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" /><path d="M16 13h2" /></svg>);
    if (type === 'home') return (<svg viewBox="0 0 24 24" style={styles}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>);
    if (type === 'heart') return (<svg viewBox="0 0 24 24" style={styles}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);
    if (type === 'cross') return (<svg viewBox="0 0 24 24" style={styles}><path d="M18 8h-2V4a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v4H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z" /></svg>);
    if (type === 'pin') return (<svg viewBox="0 0 24 24" style={styles}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
    if (type === 'arrow') return (<svg viewBox="0 0 24 24" style={styles}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
    return null;
  };

  return (
    <main style={{ background: '#F7F5F0', position: 'relative', overflow: 'hidden' }}>
      
      {/* ===== HERO SECTION ===== */}
      <section style={{ position: 'relative', padding: isMobile ? '60px 0 40px' : '100px 0 60px', minHeight: isMobile ? '40vh' : '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImages[heroIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.6) brightness(0.5)', transition: 'all 1s ease-in-out' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, rgba(10, 15, 26, 0.85) 0%, rgba(10, 15, 26, 0.6) 50%, rgba(10, 15, 26, 0.2) 100%), linear-gradient(to top, rgba(10, 15, 26, 0.7) 0%, rgba(10, 15, 26, 0.1) 50%, rgba(10, 15, 26, 0) 80%)` }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <Reveal><div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}><Link to="/" style={{ color: '#C99A3C', fontWeight: 600, textDecoration: 'none' }}>Home</Link><span>›</span><span style={{ color: '#fff' }}>MBBS in Georgia</span></div></Reveal>
          <Reveal delay={0.05}><span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase', border: '1px solid rgba(201,154,60,0.4)', borderRadius: '9999px', padding: '6px 16px', marginBottom: '20px' }}>Current International Focus</span></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: 0 }}>MBBS in <span style={{ color: '#C99A3C' }}>Georgia</span></h1></Reveal>
          <Reveal delay={0.2}><p style={{ marginTop: '16px', fontSize: isMobile ? '16px' : 'clamp(16px, 1.5vw, 20px)', color: 'rgba(255,255,255,0.8)', maxWidth: '580px', lineHeight: 1.7 }}>Before you compare universities, understand the journey the eligibility, the real cost, and what comes after graduation.</p></Reveal>
          <Reveal delay={0.3}><div style={{ display: 'flex', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ background: '#C99A3C', color: '#0F1B3D', padding: '12px 32px', borderRadius: '9999px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A84B'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#C99A3C'; e.currentTarget.style.boxShadow = 'none'; }}>Talk to a Counsellor</Link>
            <a href="#process-steps" style={{ border: '2px solid rgba(255,255,255,0.3)', padding: '12px 32px', borderRadius: '9999px', fontWeight: 700, fontSize: '15px', color: '#fff', textDecoration: 'none' }}>How It Works</a>
          </div></Reveal>
        </div>
      </section>

      {/* ===== QUICK ANSWER BAND ===== */}
      <section style={{ padding: '0 24px', marginTop: '-1px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', transform: isMobile ? 'translateY(-20px)' : 'translateY(-36px)' }}>
          <Reveal><div style={{ background: '#fff', borderRadius: '20px', border: '1px solid rgba(201,154,60,0.25)', boxShadow: '0 24px 48px rgba(15,27,61,0.12)', padding: isMobile ? '24px 20px' : '32px 36px' }}><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Quick Answer</span><p style={{ margin: '12px 0 0', color: '#0F1B3D', fontSize: isMobile ? '16px' : '17px', lineHeight: 1.75, fontWeight: 500 }}>MBBS in Georgia can be a genuine option for eligible Indian students considering medical education abroad — but the decision should rest on university-specific eligibility, the complete six-year cost, programme recognition, and a clear view of the path back to practising in India.</p></div></Reveal>
        </div>
      </section>

      {/* ===== WHY STUDENTS LOOK AT GEORGIA (NAVY BLUE) ===== */}
      <section style={{ padding: isMobile ? '40px 0 80px' : '80px 0', background: '#0F1B3D' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '56px', alignItems: 'center' }}>
            <Reveal delay={0.1}><div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', aspectRatio: '4/3' }}><img src="https://www.rmcedu.com/_next/image/?url=https%3A%2F%2Fdash.rmcedu.com%2Fuploads%2Falte_medical_university2_5395f7c1eb.webp&w=3840&q=75" alt="Tbilisi, Georgia" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div></Reveal>
            <div>
              <Reveal><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>About the Pathway</span></div></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Why Students Look at <span style={{ color: '#C99A3C' }}>Georgia</span></h2></Reveal>
              <Reveal delay={0.2}><p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.8 }}>{mbbsData.description}</p></Reveal>
              <Reveal delay={0.3}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '28px' }}>{mbbsData.stats.map((stat, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px 20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,154,60,0.15)'; e.currentTarget.style.transform = 'scale(1.02)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  <p style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#C99A3C' }}>{stat.value}</p><p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{stat.label}</p>
                </div>
              ))}</div></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7-STEP PROCESS TIMELINE ===== */}
      <section id="process-steps" style={{ position: 'relative', padding: isMobile ? '50px 0' : '80px 0', backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: isMobile ? 'scroll' : 'fixed' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.92)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
            <Reveal><div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>How It Works</span><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /></div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0F1B3D', margin: 0, lineHeight: 1.2 }}>Your Journey to <span style={{ color: '#C99A3C' }}>Georgia</span></h2></Reveal>
          </div>
          <div style={{ position: 'relative', padding: '20px 0' }}>
            <div style={{ position: 'absolute', left: isMobile ? '10px' : '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(201,154,60,0.3)', transform: isMobile ? 'translateX(0)' : 'translateX(-50%)' }} />
            {processSteps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: index === processSteps.length - 1 ? 0 : '40px', alignItems: 'center', position: 'relative', paddingLeft: isMobile ? '40px' : '0' }}>
                  <div style={{ position: 'absolute', left: isMobile ? '10px' : '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '38px', height: '38px', borderRadius: '50%', background: '#C99A3C', border: '3px solid #fff', boxShadow: '0 0 0 3px #C99A3C', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>{index + 1}</div>
                  <div style={{ gridColumn: isMobile ? '1 / 2' : (isEven ? '1 / 2' : '2 / 3'), paddingRight: isMobile ? '0' : (isEven ? '30px' : 0), paddingLeft: isMobile ? '0' : (isEven ? 0 : '30px'), textAlign: isMobile ? 'left' : (isEven ? 'right' : 'left') }}>
                    <Reveal delay={0.1 * (index + 1)}><div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(201,154,60,0.15)', marginBottom: '12px', border: '1px solid rgba(201,154,60,0.3)' }}>{item.icon}</span>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F1B3D', margin: '0 0 8px' }}>{item.title}</h3>
                      <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(15,27,61,0.7)', margin: 0 }}>{item.desc}</p>
                    </div></Reveal>
                  </div>
                  {!isMobile && <div style={{ gridColumn: isEven ? '2 / 3' : '1 / 2' }} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== GLOBALEAP GUIDANCE SECTION (NAVY BLUE BACKGROUND) ===== */}
      <section style={{ padding: '80px 0', background: '#0F1B3D' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Complete Support</span>
                <span style={{ width: '24px', height: '2px', background: '#C99A3C' }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: isMobile ? 'clamp(28px, 6vw, 40px)' : 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                Globaleap <span style={{ color: '#C99A3C' }}>Guidance</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.8 }}>
                From the first document to the first day in Tbilisi, we handle every detail of your journey. Here's exactly how we prepare you for success.
              </p>
            </Reveal>
          </div>

          {/* 4-Card Grid with Top Images */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '20px' }}>
            
            {/* Card 1: Documents */}
            <Reveal delay={0.1}>
              <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: '1px solid #eee', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '8px', background: '#C99A3C' }} />
                <div style={{ height: '120px', backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B3D', margin: '0 0 12px' }}>WHAT DOCUMENTS DO YOU NEED?</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Passport', 'Academic mark-sheets', 'NEET-related documents', 'Photographs', 'Application forms', 'Other university-specific docs'].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'rgba(15,27,61,0.8)' }}>
                          <span style={{ marginTop: '3px' }}><IconWrap type={i === 0 ? 'doc' : i === 1 ? 'book' : i === 2 ? 'check' : i === 3 ? 'photo' : i === 4 ? 'form' : 'form'} /></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>DOCUMENTS</span>
                    <Link to="/contact" style={{ color: '#C99A3C', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Explore ↗</Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 2: When can you start? (REPLACED WITH BETTER IMAGE) */}
            <Reveal delay={0.15}>
              <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: '1px solid #eee', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '8px', background: '#C99A3C' }} />
                <div style={{ height: '120px', backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B3D', margin: '0 0 12px' }}>WHEN CAN YOU START?</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Enquiry', 'Eligibility', 'Documents', 'Application', 'University Processing', 'Admission', 'Visa & Pre-departure'].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(15,27,61,0.8)' }}>
                          <span style={{ color: '#C99A3C', fontSize: '10px' }}>●</span> {item}
                        </li>
                      ))}
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#0F1B3D', marginTop: '8px' }}>
                        <span style={{ color: '#C99A3C', display: 'flex' }}><IconWrap type='cross' /></span> GEORGIA
                      </li>
                    </ul>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>INTAKES</span>
                    <Link to="/contact" style={{ color: '#C99A3C', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Explore ↗</Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Cost */}
            <Reveal delay={0.2}>
              <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: '1px solid #eee', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '8px', background: '#C99A3C' }} />
                <div style={{ height: '120px', backgroundImage: 'url(https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B3D', margin: '0 0 12px' }}>WHAT WILL IT COST?</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { icon: 'book', text: 'Education (Tuition)' },
                        { icon: 'home', text: 'Accommodation' },
                        { icon: 'wallet', text: 'Living expenses' },
                        { icon: 'plane', text: 'Travel' },
                        { icon: 'doc', text: 'Documentation' },
                        { icon: 'heart', text: 'Health insurance' },
                        { icon: 'money', text: 'Personal expenses' },
                      ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(15,27,61,0.8)' }}>
                          <span style={{ display: 'flex' }}><IconWrap type={item.icon} /></span> {item.text}
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(201,154,60,0.08)', borderRadius: '8px', fontSize: '12px', color: '#0F1B3D', fontWeight: 600 }}>
                      YOUR BUDGET WILL BE YOUR OWN. We help you build it.
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>BUDGET</span>
                    <Link to="/contact" style={{ color: '#C99A3C', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Explore ↗</Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 4: Landing */}
            <Reveal delay={0.25}>
              <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', border: '1px solid #eee', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '8px', background: '#C99A3C' }} />
                <div style={{ height: '120px', backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B3D', margin: '0 0 12px' }}>WHAT HAPPENS AFTER YOU LAND?</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { icon: 'home', text: 'Settling in' },
                        { icon: 'check', text: 'Practical guidance' },
                        { icon: 'pin', text: 'Surroundings' },
                        { icon: 'heart', text: 'Student support' },
                        { icon: 'arrow', text: 'Navigating daily life' },
                      ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(15,27,61,0.8)' }}>
                          <span style={{ display: 'flex' }}><IconWrap type={item.icon} /></span> {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>SUPPORT</span>
                    <Link to="/contact" style={{ color: '#C99A3C', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Explore ↗</Link>
                  </div>
                </div>
              </div>
            </Reveal>
            
          </div>
        </div>
      </section>

      {/* ===== WHAT HAPPENS AFTER MBBS? SECTION (WITH INDIAN FEMALE DOCTOR) ===== */}
      <section style={{ padding: '80px 0', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Side (Content) */}
            <div>
              <Reveal>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 800, color: '#0F1B3D', lineHeight: 1.1, display: 'block' }}>WHAT HAPPENS</span>
                  <span style={{ fontSize: '36px', fontWeight: 800, color: '#C99A3C', lineHeight: 1.1, display: 'block' }}>AFTER MBBS?</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize: '18px', color: 'rgba(15,27,61,0.6)', fontWeight: 500, marginBottom: '40px' }}>Plan early. Prepare smart. Build your future.</p>
              </Reveal>

              {/* Steps Timeline */}
              <Reveal delay={0.2}>
                <div style={{ position: 'relative', paddingTop: '30px' }}>
                  {/* Connecting Line */}
                  <div style={{ position: 'absolute', top: '60px', left: '10%', right: '10%', height: '2px', background: 'rgba(201,154,60,0.3)', zIndex: 0 }} />

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: '20px', position: 'relative', zIndex: 1 }}>
                    {afterMbbsSteps.map((step, i) => (
                      <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', border: '2px solid #C99A3C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                          {step.icon}
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.4, maxWidth: '100px' }}>{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Side (Indian Female Doctor Image with Animation) */}
            <Reveal delay={0.3}>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <style>{`
                  @keyframes floatDoctor {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                  }
                  .doctor-img {
                    animation: floatDoctor 4s ease-in-out infinite;
                  }
                `}</style>
                <img 
                  src="https://img.magnific.com/free-photo/expressive-young-woman-posing-studio_176474-66963.jpg?semt=ais_hybrid&w=740&q=80" 
                  alt="Indian Female Doctor advising on next steps after MBBS" 
                  className="doctor-img"
                  style={{ 
                    maxWidth: '100%', 
                    height: '400px', 
                    objectFit: 'cover', 
                    borderRadius: '20px', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    position: 'relative',
                    zIndex: 2
                  }} 
                />
              </div>
            </Reveal>

          </div>

          {/* Quote Banner */}
          <Reveal delay={0.4}>
            <div style={{ 
              marginTop: '50px', 
              background: '#0F1B3D', 
              padding: '20px 30px', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(15,27,61,0.3)'
            }}>
              <h3 style={{ 
                margin: 0, 
                color: '#fff', 
                fontSize: 'clamp(16px, 2vw, 24px)', 
                fontWeight: 800, 
                letterSpacing: '1px' 
              }}>
                MBBS IS THE MILESTONE. YOUR CAREER IS THE JOURNEY.
              </h3>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ===== UNIVERSITIES & PROGRAMS (White Background) ===== */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '48px' }}>
            <div>
              <Reveal><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Medical Universities in Georgia</span></div></Reveal>
              <Reveal delay={0.1}><h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F1B3D', marginBottom: '20px' }}>Universities Students <span style={{ color: '#C99A3C' }}>Explore</span></h3></Reveal>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {universities.map((uni, i) => (
                  <Reveal key={i} delay={0.05 * i}><li style={{ padding: '14px 20px', background: uni.partner ? 'rgba(201,154,60,0.08)' : '#fff', border: uni.partner ? '1px solid rgba(201,154,60,0.35)' : 'none', borderRadius: '12px', boxShadow: uni.partner ? 'none' : '0 4px 12px rgba(0,0,0,0.04)', color: '#0F1B3D', fontWeight: 500, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(6px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#C99A3C' }}>▸</span>{uni.name}</span>
                    {uni.partner && <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', color: '#C99A3C', background: 'rgba(201,154,60,0.15)', borderRadius: '9999px', padding: '4px 10px', whiteSpace: 'nowrap' }}>Our Partner</span>}
                  </li></Reveal>
                ))}
              </ul>
              <p style={{ marginTop: '14px', fontSize: '12.5px', color: 'rgba(15,27,61,0.45)', lineHeight: 1.6 }}>University list reflects institutions we currently guide students through. Partnership status, programmes and fees should always be confirmed against the current formal agreement and official university information.</p>
            </div>
            <div>
              <Reveal><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Popular Medical Programs</span></div></Reveal>
              <Reveal delay={0.1}><h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F1B3D', marginBottom: '20px' }}>Courses Worth <span style={{ color: '#C99A3C' }}>Knowing About</span></h3></Reveal>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {popularPrograms.map((program, i) => (
                  <Reveal key={i} delay={0.05 * i}><li style={{ padding: '14px 20px', background: 'rgba(15,27,61,0.04)', borderRadius: '12px', color: '#0F1B3D', fontWeight: 500, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,154,60,0.15)'; e.currentTarget.style.transform = 'scale(1.02)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(15,27,61,0.04)'; e.currentTarget.style.transform = 'scale(1)'; }}><span style={{ color: '#C99A3C', fontSize: '18px' }}>🎓</span>{program}</li></Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAUCASUS UNIVERSITY SPOTLIGHT (Navy Blue Background) ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: isMobile ? '50px 0' : '80px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Global Leap × Caucasus University</span></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, color: '#fff', margin: '14px 0 0', lineHeight: 1.25 }}>One of our university partnerships in <span style={{ color: '#C99A3C' }}>Georgia</span></h2></Reveal>
          <Reveal delay={0.2}><p style={{ marginTop: '18px', color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.8, maxWidth: '680px' }}>We don't want a university partnership to mean nothing more than a logo on a website. Before Caucasus University enters your shortlist, we walk students and parents through the programme, admission requirements, fees, location and student experience — so the question you're left with is a useful one.</p></Reveal>
          <Reveal delay={0.4}><div style={{ marginTop: '20px' }}><Link to="/contact" style={{ display: 'inline-block', background: '#C99A3C', color: '#0F1B3D', padding: '12px 32px', borderRadius: '9999px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A84B'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#C99A3C'; e.currentTarget.style.boxShadow = 'none'; }}>Explore Caucasus University</Link></div></Reveal>
        </div>
      </section>

      {/* ===== FAQ (White Background) ===== */}
      <section style={{ padding: isMobile ? '50px 0' : '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Reveal><div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Frequently Asked</span><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /></div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, color: '#0F1B3D', margin: 0 }}>Questions Families <span style={{ color: '#C99A3C' }}>Ask Us</span></h2></Reveal>
          </div>
          <Reveal delay={0.15}><div>{faqs.map((item, i) => (<FaqItem key={i} q={item.q} a={item.a} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} />))}</div></Reveal>
        </div>
      </section>

      {/* ===== CTA SECTION (Navy Blue Background) ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: isMobile ? '40px 0' : '60px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <Reveal><h2 style={{ fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Not sure if MBBS in <span style={{ color: '#C99A3C' }}>Georgia</span> is right for you?</h2>
          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>Talk to us before you shortlist a university. We'll walk you through eligibility, cost and the path ahead honestly.</p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ background: '#C99A3C', color: '#0F1B3D', padding: '14px 36px', borderRadius: '9999px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A84B'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#C99A3C'; e.currentTarget.style.boxShadow = 'none'; }}>Get Free Counselling</Link>
            <Link to="/" style={{ border: '2px solid rgba(255,255,255,0.3)', color: '#fff', padding: '14px 36px', borderRadius: '9999px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}>Back to Home</Link>
          </div></Reveal>
        </div>
      </section>
    </main>
  );
}