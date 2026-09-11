import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Added Link import for contact routing

const countries = [
  'Georgia', 
  'New Zealand',
  'United Kingdom',
  'Ireland',
  'USA',
  'Canada',
  'Australia',
  'Germany',
];

const countryImages = {
  'Georgia': 'https://internationalbanker.com/wp-content/uploads/2025/03/Georgia.jpg',
  'New Zealand': 'https://hblimg.mmtcdn.com/content/hubble/img/destgalleryimages/mmt/activities/m_Wellington_1_l_667_1000.jpg',
  'United Kingdom': 'https://www.nationsonline.org/gallery/UK/Palace-of-Westminster-Parliament.jpg',
  'Ireland': 'https://www.authentic-europe.com/travel-tips/why-visit-ireland/_/image/46d1f421-ac03-478a-b88e-584a656488e3:7635e060a3b71f486d43a19ae7a6e846c7e4ff23/width-768/cathedral-and-colored-houses-in-cobh',
  'USA': 'https://jooinn.com/images/statute-of-liberty-at-daytime.jpg',
  'Canada': 'https://gotourismguides.com/toronto/wp-content/themes/gotourism-v1/img/tornot-tourism-guide-2.jpg',
  'Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVzdHJhbGlhJTIwc3lkbmV5fGVufDB8fDB8fHww',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80'
};

const whyPoints = [
  { title: 'Expert Counselling', desc: 'One-on-one guidance from experienced counsellors who understand your goals and match you with the right university.' },
  { title: 'End-to-End Support', desc: 'From shortlisting universities to visa filing, we handle every step so you can focus on preparing for your journey.' },
  { title: 'Scholarship Assistance', desc: 'We help you identify and apply for scholarships that reduce your financial burden abroad.' },
  { title: '100% Transparent Process', desc: 'No hidden costs, no false promises — just honest advice tailored to your profile and budget.' },
];

const carouselImages = [
  { src: 'https://www.applyboard.com/wp-content/uploads/2023/01/Quiz_-Which-Destination-Country-Should-I-Study-Abroad-In.png', alt: 'Graduate students celebrating at convocation ceremony' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80', alt: 'International university campus building' },
  { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80', alt: 'Students studying together in a library' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80', alt: 'Student walking on university campus abroad' },
  { src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&q=80', alt: 'Group of international students collaborating on a project' },
];

const offerItems = [
  { title: 'Find the Right Course & University', desc: 'Personalised shortlisting based on your academic profile, budget, and career goals.', icon: (<path d="M6 34 L32 20 L58 34 L32 48 Z M18 40 V52 Q32 58 46 52 V40" strokeLinejoin="round" strokeLinecap="round" />) },
  { title: 'Scholarships, Grants & Bursaries', desc: 'Access to exclusive scholarship opportunities that reduce your overall study cost.', icon: (<><circle cx="32" cy="24" r="12" /><path d="M22 34 L16 56 L32 48 L48 56 L42 34" strokeLinejoin="round" strokeLinecap="round" /></>) },
  { title: 'Application Submission & Fee Waivers', desc: 'We handle documentation and applications, unlocking waived fees wherever possible.', icon: (<><rect x="16" y="10" width="32" height="44" rx="3" /><path d="M24 22 H40 M24 30 H40 M24 38 H34" strokeLinecap="round" /></>) },
  { title: 'Offer Acceptance & Tuition Payment', desc: 'Guided support to accept offers correctly and pay tuition securely, on time.', icon: (<><rect x="8" y="18" width="48" height="32" rx="4" /><path d="M8 28 H56" strokeLinecap="round" /><path d="M16 40 H28" strokeLinecap="round" /></>) },
  { title: 'Visa Information & Assistance', desc: 'Step-by-step visa filing support to maximise approval chances and avoid delays.', icon: (<><rect x="10" y="14" width="44" height="36" rx="3" /><circle cx="24" cy="30" r="6" /><path d="M34 26 H46 M34 34 H46 M16 44 H48" strokeLinecap="round" /></>) },
  { title: 'Pre-Departure Orientation', desc: 'Practical briefings on travel, accommodation, and settling into your new country.', icon: (<path d="M10 42 L28 24 L36 32 L54 14 M54 14 H42 M54 14 V26" strokeLinejoin="round" strokeLinecap="round" />) },
];

function useIsDesktop(breakpoint = 1024) { const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true); useEffect(() => { const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint); handleResize(); window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize); }, [breakpoint]); return isDesktop; }
function useIsTablet(breakpoint = 640) { const [isTablet, setIsTablet] = useState(typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true); useEffect(() => { const handleResize = () => setIsTablet(window.innerWidth >= breakpoint); handleResize(); window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize); }, [breakpoint]); return isTablet; }

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(node); }
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function ZoomCarousel({ images, interval = 3500 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => { setIndex((prev) => (prev + 1) % images.length); }, interval); return () => clearInterval(id); }, [images.length, interval]);

  return (
    <div style={{ position: 'relative', height: '480px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
      <style>{`@keyframes kenBurnsZoom { 0% { transform: scale(1); } 100% { transform: scale(1.12); } } .kb-slide-active { animation: kenBurnsZoom 4s ease-out forwards; }`}</style>
      {images.map((img, i) => (
        <img key={i} src={img.src} alt={img.alt} className={i === index ? 'kb-slide-active' : ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === index ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,27,61,0.25), transparent 40%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 5 }}>
        {images.map((_, i) => (
          <span key={i} style={{ width: i === index ? '22px' : '8px', height: '8px', borderRadius: '9999px', background: i === index ? '#C99A3C' : 'rgba(255,255,255,0.5)', transition: 'all 0.4s ease' }} />
        ))}
      </div>
    </div>
  );
}

function OfferCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={0.1 * index}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: 'relative', background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hovered ? 'rgba(201,154,60,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '18px', padding: '32px 28px', height: '100%', backdropFilter: 'blur(6px)', transform: hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.35)' : '0 8px 20px rgba(0,0,0,0.15)', transition: 'all 0.35s ease', cursor: 'default' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: hovered ? '#C99A3C' : 'rgba(201,154,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', transition: 'all 0.35s ease' }}>
          <svg viewBox="0 0 64 64" style={{ width: '30px', height: '30px', fill: 'none', stroke: hovered ? '#0F1B3D' : '#C99A3C', strokeWidth: 3, transition: 'stroke 0.35s ease' }}>{item.icon}</svg>
        </div>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>{item.title}</h3>
        <p style={{ margin: '10px 0 0', fontSize: '14.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>{item.desc}</p>
        <div style={{ marginTop: '18px', width: hovered ? '40px' : '24px', height: '2px', background: '#C99A3C', transition: 'width 0.35s ease' }} />
      </div>
    </Reveal>
  );
}

// Four Connected Paths Data
const connectedPaths = [
  { num: '01', title: 'Study Abroad', desc: 'Explore the world.', image: 'https://thumbs.dreamstime.com/b/handsome-indian-student-man-read-notebooks-standing-street-handsome-young-indian-student-man-read-notebooks-166903871.jpg' },
  { num: '02', title: 'Career', desc: 'Find your direction.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80' },
  { num: '03', title: 'Communication', desc: 'Learn to express it.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' },
  { num: '04', title: 'Student Education Diagnostics', desc: 'Understand the learner.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80' },
];

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
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  // 60-SECOND CHALLENGE MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isAnswering, setIsAnswering] = useState(false);

  // Modal Timer Logic
  useEffect(() => {
    let timer;
    if (isModalOpen && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isModalOpen) {
      setIsModalOpen(false);
      alert("Time's up! Your 60 seconds are over.");
    }
    return () => clearInterval(timer);
  }, [isModalOpen, timeLeft]);

  // Handle Asking a Question (Mock AI Response)
  const handleAskQuestion = () => {
    if (!question.trim() || timeLeft === 0) return;

    const userQ = question;
    setChatHistory(prev => [...prev, { role: 'user', text: userQ }]);
    setQuestion('');
    setIsAnswering(true);

    setTimeout(() => {
      let answer = "MBBS in Georgia is a great option for Indian students. The total cost is around $30,000 - $40,000 for 6 years. You need to qualify NEET to practice in India.";
      
      const lowerQ = userQ.toLowerCase();
      if (lowerQ.includes('fee') || lowerQ.includes('cost') || lowerQ.includes('money')) {
        answer = "The total cost for MBBS in Georgia (including tuition, hostel, and food) is approximately $4,000 - $6,000 per year. Total for 6 years is around $30,000.";
      } else if (lowerQ.includes('eligib') || lowerQ.includes('neet') || lowerQ.includes('requirement')) {
        answer = "Yes, NEET qualification is mandatory for Indian students. You also need 50% in Physics, Chemistry, and Biology in 12th grade.";
      } else if (lowerQ.includes('university') || lowerQ.includes('college')) {
        answer = "Top universities include Caucasus University, Tbilisi State Medical University, and Ilia State University. We partner with Caucasus University.";
      } else if (lowerQ.includes('visa') || lowerQ.includes('travel')) {
        answer = "We provide full visa assistance. The Georgian student visa process is straightforward and we have a 98% success rate.";
      } else if (lowerQ.includes('hostel') || lowerQ.includes('accommodation')) {
        answer = "Universities provide comfortable hostels with Indian food options. The cost is usually $150 - $250 per month.";
      }

      setChatHistory(prev => [...prev, { role: 'bot', text: answer }]);
      setIsAnswering(false);
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setBgPosition(window.innerWidth < 768 ? '60% center' : 'center');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { setCurrentImage(countryImages[countries[activeIndex]]); }, [activeIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => { setActiveIndex((prev) => (prev + 1) % countries.length); }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleCountryClick = (index) => {
    setActiveIndex(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => { setActiveIndex((prev) => (prev + 1) % countries.length); }, 3000);
  };

  const translateY = -(activeIndex * itemHeight);

  return (
    <main style={{ scrollBehavior: 'smooth' }}> {/* Added smooth scroll behavior */}
      {/* ============ HERO SECTION ============ */}
      <section aria-label="Hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '80px' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="https://res.cloudinary.com/y7u08drb/video/upload/v1789146645/7695550-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          <img src={currentImage} alt="University campus" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </video>

        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, rgba(10, 15, 26, 0.6) 0%, rgba(10, 15, 26, 0.35) 45%, rgba(10, 15, 26, 0.15) 75%, rgba(10, 15, 26, 0.05) 100%), linear-gradient(to top, rgba(10, 15, 26, 0.5) 0%, rgba(10, 15, 26, 0.1) 40%, rgba(10, 15, 26, 0) 70%)`, zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '7fr 5fr' : '1fr', gap: '48px', alignItems: 'center' }}>
            <div style={{ color: '#fff' }}>
              <div style={{ display: 'inline-block', marginBottom: '24px', padding: '8px 20px', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}>Trusted Study Abroad Consultants</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.15, margin: 0, color: '#FFFFFF' }}>What's your<br/>next leap?</h1>
              <p style={{ marginTop: '14px', fontSize: 'clamp(16px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.85)', maxWidth: '520px', lineHeight: 1.6 }}>Whether you're choosing a career, studying abroad, helping students discover their strengths, or learning to express yourself with confidence Global Leap helps you take the next step with clarity</p>
              
              {/* UPDATED BUTTONS HERE */}
              <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a 
                  href="#destinations" 
                  style={{ background: '#C99A3C', color: '#0F1B3D', padding: '14px 28px', borderRadius: '9999px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A84B'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)'; e.currentTarget.style.transform = 'scale(1.05)'; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#C99A3C'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Explore Opportunities
                </a>
                <Link 
                  to="/contact" 
                  style={{ border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '14px 28px', borderRadius: '9999px', fontWeight: 700, fontSize: '15px', color: '#fff', textDecoration: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'all 0.3s ease' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1.05)'; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Talk to US
                </Link>
              </div>
            </div>    
          </div>
        </div>
      </section>

      {/* ============ WHY GLOBALEAP SECTION ============ */}
      <section aria-label="Why Choose Globaleap" style={{ position: 'relative', overflow: 'hidden', background: '#F7F5F0', padding: '90px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr', gap: '56px', alignItems: 'center' }}>
            <article>
              <Reveal><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Why Choose Us</span></div></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.2, margin: 0 }}>Why Study Abroad with <span style={{ color: '#C99A3C' }}>Globaleap</span></h2></Reveal>
              <Reveal delay={0.2}><p style={{ marginTop: '16px', color: 'rgba(15,27,61,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '480px' }}>Globaleap is a trusted overseas education consultancy helping students achieve admission, scholarships, and visa approval at top universities worldwide — with honest, personalised guidance at every step.</p></Reveal>
              <ul style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px', listStyle: 'none', padding: 0 }}>
                {whyPoints.map((point, i) => (
                  <Reveal key={i} delay={0.15 * i}><li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(201,154,60,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C99A3C', fontWeight: 700, fontSize: '14px' }}>{String(i + 1).padStart(2, '0')}</div>
                    <div><h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0F1B3D' }}>{point.title}</h3><p style={{ margin: '4px 0 0', fontSize: '16px', color: 'rgba(15,27,61,0.6)', lineHeight: 1.6 }}>{point.desc}</p></div>
                  </li></Reveal>
                ))}
              </ul>
            </article>
            <Reveal delay={0.2}><ZoomCarousel images={carouselImages} interval={3500} /></Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHAT GLOBALEAP OFFERS SECTION ============ */}
      <section aria-label="What Globaleap Offers" style={{ position: 'relative', overflow: 'hidden', background: '#0F1B3D', padding: '100px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <Reveal><div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Our Services</span><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /></div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>What <span style={{ color: '#C99A3C' }}>Globaleap</span> Offers</h2></Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr', gap: '24px' }}>
            {offerItems.map((item, i) => (<OfferCard key={i} item={item} index={i} />))}
          </div>
        </div>
      </section>

      {/* ============ WHY STUDY ABROAD SECTION ============ */}
      <section aria-label="Why Study Abroad" style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', padding: '100px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktopMd ? '1fr 1fr' : '1fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <Reveal><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Why Go Abroad</span></div></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', lineHeight: 1.2, margin: 0 }}>Why Study <span style={{ color: '#C99A3C' }}>Abroad</span><span style={{ display: 'block', fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 400, color: 'rgba(15,27,61,0.5)', marginTop: '6px' }}>A life-changing decision</span></h2></Reveal>
              <Reveal delay={0.2}><p style={{ marginTop: '16px', color: 'rgba(15,27,61,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '480px' }}>Studying abroad is more than an academic pursuit — it's a journey that transforms your perspective, builds global networks, and opens doors to opportunities you never imagined.</p></Reveal>
              <ul style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: isTablet ? '1fr 1fr' : '1fr', gap: '12px 24px', listStyle: 'none', padding: 0 }}>
                {['Broaden your global horizons','Experience top-tier education','Choose from a wide range of courses','Enhance your career prospects','Embrace diverse cultures','Connect with a global community','Develop independence and self-confidence','Experience of a lifetime'].map((text, i) => (
                  <Reveal key={i} delay={0.08 * i}><li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: '#0F1B3D', fontWeight: 500 }}><span style={{ flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(201,154,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#C99A3C', fontWeight: 700 }}>✓</span>{text}</li></Reveal>
                ))}
              </ul>
            </div>
            <Reveal delay={0.2}><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <img src="https://images.collegexpress.com/blog/top-benefits-study-abroad-programs-personal-growth.jpg" alt="Graduation celebration" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202307/why-new-zealand-is-a-hotspot-for-indian-students-studying-abroad-052348-16x9.jpg?VersionId=UbZmua8LDJi5sqfrnbazlvdCj8zO5xWK&size=690:388" alt="Students studying" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <img src="https://cdn.prod.website-files.com/68ca71f09a4062cd6374c690/6956582ed92860c0f19076d6_69438ce5cd345a791c2ea58f_million-indian-students-studying-abroad.jpeg" alt="Campus building" style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80" alt="International students" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
              </div>
            </div></Reveal>
          </div>
        </div>
      </section>

      {/* ============ FOUR CONNECTED PATHS ============ */}
      <section style={{ padding: '80px 0', background: '#FFFFFF', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal>
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', color: '#C99A3C', textTransform: 'uppercase' }}>
                What can Global Leap help you with?
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', margin: '10px 0 0', lineHeight: 1.2, fontFamily: "'Playfair Display', serif" }}>
                Four connected paths.<br />One clear next step.
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>
            {connectedPaths.map((path, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div 
                  onMouseEnter={() => setHoveredPath(i)} 
                  onMouseLeave={() => setHoveredPath(null)} 
                  style={{ position: 'relative', padding: '40px 32px', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.3s ease', cursor: 'pointer', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${path.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1, transform: hoveredPath === i ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease', zIndex: 0 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.2) 100%)', zIndex: 1 }} />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px', color: '#C99A3C' }}>{path.num}</span>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F1B3D', margin: '12px 0 8px', fontFamily: "'Playfair Display', serif" }}>{path.title}</h3>
                    <p style={{ fontSize: '16px', color: 'rgba(15,27,61,0.7)', margin: 0 }}>{path.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ YOUR NEXT LEAP COULD TAKE YOU TO GEORGIA ============ */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <Reveal delay={0.1}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
                <img src="https://thumbs.dreamstime.com/b/handsome-indian-student-man-read-notebooks-standing-street-handsome-young-indian-student-man-read-notebooks-166903871.jpg" alt="Handsome Indian student reading notebooks" style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }} />
              </div>
            </Reveal>
            <div>
              <Reveal><span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Currently at Global Leap</span></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', margin: '20px 0 16px', lineHeight: 1.2, fontFamily: "'Playfair Display', serif" }}>Your next leap could take you to Georgia.</h2></Reveal>
              <Reveal delay={0.2}><p style={{ fontSize: '16px', color: 'rgba(15,27,61,0.7)', lineHeight: 1.7, marginBottom: '32px' }}>From eligibility and application to pre-departure preparation, arrival in Georgia, on-ground support and career planning beyond MBBS.</p></Reveal>
              <Reveal delay={0.3}><a href="/georgia" style={{ display: 'inline-block', background: '#C99A3C', color: '#0F1B3D', padding: '14px 28px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A84B'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#C99A3C'; e.currentTarget.style.boxShadow = 'none'; }}>Explore MBBS in Georgia</a></Reveal>
              <Reveal delay={0.4}><div style={{ marginTop: '48px', borderTop: '1px solid #e5e5e5', paddingTop: '32px' }}><p style={{ fontSize: '16px', color: 'rgba(15,27,61,0.7)', lineHeight: 1.7, marginBottom: '16px' }}>Want to know what it's really like? Speak directly with our Global Leap Ambassador — a current student living and studying in Georgia.</p><a href="/contact" style={{ color: '#0F1B3D', fontSize: '16px', fontWeight: 700, textDecoration: 'underline', textDecorationColor: '#C99A3C', textDecorationThickness: '2px', textUnderlineOffset: '6px' }}>Talk to a student in Georgia →</a></div></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMMUNICATION SECTION (WITH 60-SECOND CHALLENGE BUTTON) ============ */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <Reveal>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>COMMUNICATION</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', margin: '20px 0 16px', lineHeight: 1.2, fontFamily: "'Playfair Display', serif" }}>
                  You know what you want to say. Can you express it?
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize: '16px', color: 'rgba(15,27,61,0.7)', lineHeight: 1.7, marginBottom: '32px' }}>
                  Knowing English is one thing. Thinking clearly, expressing your ideas and being understood is another.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div style={{ border: '1px solid #ddd', padding: '32px', marginTop: '48px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>THE 60-SECOND CHALLENGE</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F1B3D', margin: '12px 0 24px', fontFamily: "'Playfair Display', serif" }}>
                    One question. 60 seconds. Just you.
                  </h3>
                  <button 
                    onClick={() => { setIsModalOpen(true); setTimeLeft(60); setChatHistory([]); }}
                    style={{ display: 'inline-block', background: '#C99A3C', color: '#0F1B3D', padding: '14px 28px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} 
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A84B'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)'; }} 
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#C99A3C'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    Take the 60-Second Challenge
                  </button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                <img src="https://media.base44.com/images/public/6a93f8131bd5e72c5c88ec10/25fbd2a48_generated_c3b9b3d5.png/v1/fill/w_479,h_598,al_c,q_90,usm_0.66_1.00_0.01,enc_webp,quality_auto/25fbd2a48_generated_c3b9b3d5.webp" alt="Woman speaking confidently" style={{ width: '100%', height: '600px', objectFit: 'cover', display: 'block' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ POPULAR DESTINATIONS – MARQUEE (ADDED id="destinations") ============ */}
      <section id="destinations" aria-label="Popular Destinations" style={{ position: 'relative', overflow: 'hidden', background: '#F7F5F0', padding: '80px 0' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Reveal><div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /><span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#C99A3C', textTransform: 'uppercase' }}>Explore Opportunities</span><span style={{ width: '24px', height: '2px', background: '#C99A3C' }} /></div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0F1B3D', margin: 0, lineHeight: 1.2 }}>Educational Destinations <span style={{ color: '#C99A3C' }}>Include</span></h2></Reveal>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', width: '100%', padding: '8px 0' }}>
            <style>{`
              @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .marquee-track { display: flex; gap: 20px; width: max-content; animation: marqueeScroll ${countries.length * 4}s linear infinite; }
              .marquee-track:hover { animation-play-state: paused; } 
              .dest-card { display: block; flex: 0 0 200px; height: 280px; border-radius: 16px; background-size: cover; background-position: center; position: relative; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; text-decoration: none; }
              .dest-card:hover { transform: scale(1.05); box-shadow: 0 12px 32px rgba(15,27,61,0.18); }
              .dest-card .overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 16px 18px; background: linear-gradient(to top, rgba(15,27,61,0.7), transparent); color: #fff; text-align: center; }
              .dest-card .overlay h3 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; color: #fff; }
              @media (max-width: 640px) { .dest-card { flex: 0 0 150px; height: 220px; } .dest-card .overlay h3 { font-size: 16px; color: #fff; } .marquee-track { gap: 14px; } }
            `}</style>
            <div className="marquee-track">
              {countries.map((country, i) => (
                <a key={`${country}-${i}`} href="#" className="dest-card" style={{ backgroundImage: `url(${countryImages[country]})` }}>
                  <div className="overlay"><h3>{country}</h3></div>
                </a>
              ))}
              {countries.map((country, i) => (
                <a key={`${country}-dup-${i}`} href="#" className="dest-card" style={{ backgroundImage: `url(${countryImages[country]})` }}>
                  <div className="overlay"><h3>{country}</h3></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 60-SECOND CHALLENGE POPUP MODAL ============ */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            
            <div style={{ background: '#0F1B3D', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: 700 }}>60-Second MBBS Challenge</h3>
                <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Ask any question about MBBS in Georgia</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: timeLeft <= 10 ? '#dc3545' : '#C99A3C', color: '#fff', padding: '6px 14px', borderRadius: '9999px', fontWeight: 700, fontSize: '16px', minWidth: '70px', textAlign: 'center', transition: 'background 0.3s ease' }}>
                  00:{String(timeLeft).padStart(2, '0')}
                </div>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', padding: '0 4px' }}>✕</button>
              </div>
            </div>

            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {chatHistory.length === 0 && (
                <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
                  <p style={{ fontSize: '16px' }}>Type your question below about MBBS in Georgia.</p>
                  <p style={{ fontSize: '13px' }}>e.g., "What is the fee?", "Do I need NEET?", "Which universities?"</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ background: msg.role === 'user' ? '#C99A3C' : '#F0F0F0', color: msg.role === 'user' ? '#0F1B3D' : '#333', padding: '12px 16px', borderRadius: '12px', maxWidth: '80%', fontSize: '15px', lineHeight: 1.5 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAnswering && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ background: '#F0F0F0', padding: '12px 16px', borderRadius: '12px', fontSize: '15px', color: '#888' }}>
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid #eee', display: 'flex', gap: '12px', background: '#FAFAFA' }}>
              <input 
                type="text" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder={timeLeft > 0 ? "Ask your question..." : "Time's up!"}
                disabled={timeLeft === 0}
                style={{ flex: 1, padding: '12px 16px', borderRadius: '9999px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
              />
              <button 
                onClick={handleAskQuestion} 
                disabled={timeLeft === 0 || !question.trim()}
                style={{ background: timeLeft === 0 || !question.trim() ? '#ccc' : '#0F1B3D', color: '#fff', padding: '12px 24px', borderRadius: '9999px', border: 'none', fontWeight: 700, cursor: timeLeft === 0 || !question.trim() ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease' }}
              >
                Ask
              </button>
            </div>

            {timeLeft === 0 && (
              <div style={{ padding: '12px 24px', background: '#dc3545', color: '#fff', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>
                Time's up! Click "Take the 60-Second Challenge" to try again.
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}