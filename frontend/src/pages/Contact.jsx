import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

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

export default function Contact() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    agree: false,
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries] = useState([
    'Select a country',
    'India',
    'USA',
    'UK',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'New Zealand',
    'Ireland',
    'Other',
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.agree) {
    alert('Please agree to the Privacy Policy.');
    return;
  }

  try {
    await emailjs.send(
      'service_qy4x84k',
      'template_uqiv30k',
      {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        message: formData.message,
      },
      'uKj1jJ2AiEnsEhEWf'
    );

    alert('Your consultation request has been sent successfully!');

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      message: '',
      agree: false,
    });

  } catch (error) {
    console.error('EmailJS error:', error);
    alert('Failed to send message. Please try again.');
  }
};

  // ─── hero background cycling ───────────────────────────
  const heroImages = [
    'https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202307/why-new-zealand-is-a-hotspot-for-indian-students-studying-abroad-052348-16x9.jpg?VersionId=UbZmua8LDJi5sqfrnbazlvdCj8zO5xWK&size=690:388',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80',
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ background: '#F7F5F0', position: 'relative', overflow: 'hidden' }}>
      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '80px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroImages[heroIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.7) brightness(0.5)',
            transition: 'all 1s ease-in-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(15,27,61,0.8), rgba(15,27,61,0.5), transparent)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px', width: '100%' }}>
          <Reveal>
           
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.2 }}>
              We'd love to <span style={{ color: '#C99A3C' }}>hear from you</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: isMobile ? '16px' : 'clamp(16px, 1.5vw, 20px)', color: 'rgba(255,255,255,0.8)', maxWidth: '560px', marginTop: '12px' }}>
              Whether you're ready to start your application or just exploring options, our team is here to guide you every step of the way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section style={{ padding: isMobile ? '40px 0' : '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? '32px' : '48px' }}>
            {/* LEFT – Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
              <Reveal>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    padding: isMobile ? '20px 24px' : '24px 28px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: '#0F1B3D', marginBottom: '8px' }}>
                    Visit Our Office
                  </h3>
                  <p style={{ color: 'rgba(15,27,61,0.7)', lineHeight: 1.8, margin: 0, fontSize: isMobile ? '14px' : '16px' }}>
                    Pune, Maharashtra 411002
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    padding: isMobile ? '20px 24px' : '24px 28px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: '#0F1B3D', marginBottom: '8px' }}>
                    Call Us
                  </h3>
                  <p style={{ color: 'rgba(15,27,61,0.7)', margin: 0, lineHeight: 1.6, fontSize: isMobile ? '14px' : '16px' }}>
                    +91 8975869192
                    <br />
                  +91 7000356500
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    padding: isMobile ? '20px 24px' : '24px 28px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: '#0F1B3D', marginBottom: '8px' }}>
                    Email Us
                  </h3>
                  <p style={{ color: 'rgba(15,27,61,0.7)', margin: 0, fontSize: isMobile ? '14px' : '16px' }}>
                    globaleap2026@gmail.com
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    padding: isMobile ? '20px 24px' : '24px 28px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: '#0F1B3D', marginBottom: '8px' }}>
                    Working Hours
                  </h3>
                  <p style={{ color: 'rgba(15,27,61,0.7)', margin: 0, lineHeight: 1.6, fontSize: isMobile ? '14px' : '16px' }}>
                    Monday–Saturday: 10:00 AM – 7:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </Reveal>
            </div>

            {/* RIGHT – Form */}
            <div>
              <Reveal>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    padding: isMobile ? '24px 20px' : '32px 40px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  <h2 style={{ fontSize: isMobile ? 'clamp(22px, 6vw, 28px)' : 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#0F1B3D', marginBottom: '8px' }}>
                    Book a <span style={{ color: '#C99A3C' }}>Free Consultation</span>
                  </h2>
                  <p style={{ color: 'rgba(15,27,61,0.6)', marginBottom: '24px', fontSize: isMobile ? '14px' : '16px' }}>
                    Fill in the details and our counsellor will reach out to you within 24 hours.
                  </p>

                  {status.message && (
                    <div
                      style={{
                        padding: '16px 24px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                        background: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
                        border: `1px solid ${status.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                        color: status.type === 'success' ? '#166534' : '#991b1b',
                        fontSize: isMobile ? '14px' : '16px',
                      }}
                    >
                      {status.type === 'success' ? '✅' : '❌'}
                      <span style={{ fontWeight: 500 }}>{status.message}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Full Name */}
                    <div>
                      <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: 500, color: 'rgba(15,27,61,0.7)', display: 'block', marginBottom: '6px' }}>
                        Full Name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 14px' : '12px 16px',
                          borderRadius: '16px',
                          border: '1px solid rgba(15,27,61,0.1)',
                          background: 'rgba(255,255,255,0.5)',
                          fontSize: isMobile ? '14px' : '16px',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#C99A3C';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,154,60,0.2)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(15,27,61,0.1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                      {/* Email */}
                      <div>
                        <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: 500, color: 'rgba(15,27,61,0.7)', display: 'block', marginBottom: '6px' }}>
                          Email Address <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: isMobile ? '10px 14px' : '12px 16px',
                            borderRadius: '16px',
                            border: '1px solid rgba(15,27,61,0.1)',
                            background: 'rgba(255,255,255,0.5)',
                            fontSize: isMobile ? '14px' : '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#C99A3C';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,154,60,0.2)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(15,27,61,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          placeholder="you@example.com"
                        />
                      </div>
                      {/* Phone */}
                      <div>
                        <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: 500, color: 'rgba(15,27,61,0.7)', display: 'block', marginBottom: '6px' }}>
                          Phone Number <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: isMobile ? '10px 14px' : '12px 16px',
                            borderRadius: '16px',
                            border: '1px solid rgba(15,27,61,0.1)',
                            background: 'rgba(255,255,255,0.5)',
                            fontSize: isMobile ? '14px' : '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#C99A3C';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,154,60,0.2)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(15,27,61,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: 500, color: 'rgba(15,27,61,0.7)', display: 'block', marginBottom: '6px' }}>
                        Country of Interest
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 14px' : '12px 16px',
                          borderRadius: '16px',
                          border: '1px solid rgba(15,27,61,0.1)',
                          background: 'rgba(255,255,255,0.5)',
                          fontSize: isMobile ? '14px' : '16px',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          appearance: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#C99A3C';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,154,60,0.2)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(15,27,61,0.1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {countries.map((c, i) => (
                          <option key={i} value={c === 'Select a country' ? '' : c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: 500, color: 'rgba(15,27,61,0.7)', display: 'block', marginBottom: '6px' }}>
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={isMobile ? '3' : '4'}
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 14px' : '12px 16px',
                          borderRadius: '16px',
                          border: '1px solid rgba(15,27,61,0.1)',
                          background: 'rgba(255,255,255,0.5)',
                          fontSize: isMobile ? '14px' : '16px',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'all 0.3s ease',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#C99A3C';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,154,60,0.2)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(15,27,61,0.1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        placeholder="Tell us about your academic background, preferred course, and any questions you have..."
                      />
                    </div>

                    {/* Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        style={{
                          marginTop: '4px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: '1px solid rgba(15,27,61,0.2)',
                          accentColor: '#C99A3C',
                          cursor: 'pointer',
                        }}
                      />
                      <label style={{ fontSize: isMobile ? '13px' : '14px', color: 'rgba(15,27,61,0.7)' }}>
                        I agree to the Privacy Policy and consent to GlobalLeap processing my information.
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        background: isSubmitting ? '#C99A3C' : '#C99A3C',
                        color: '#0F1B3D',
                        padding: isMobile ? '14px' : '16px',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: isMobile ? '15px' : '16px',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.background = '#D4A84B';
                          e.currentTarget.style.boxShadow = '0 0 30px rgba(201,154,60,0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.background = '#C99A3C';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
                            ⏳
                          </span>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'rgba(15,27,61,0.4)', textAlign: 'center', marginTop: '8px' }}>
                      By submitting this form, you agree to our Privacy Policy. We respect your privacy and will never share your data.
                    </p>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

     
    </main>
  );
}