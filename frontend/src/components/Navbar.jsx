import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Floating Navbar – White Glass */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-[1300px] transition-all duration-300 ${
          scrolled ? 'top-3 w-[94%]' : ''
        }`}
      >
        <div
          className={`
            flex items-center justify-between px-6 py-3
            bg-white/90 backdrop-blur-[20px] -webkit-backdrop-blur-[20px]
            border border-white/30
            rounded-[50px]
            shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            transition-all duration-300
            ${scrolled ? 'py-2' : ''}
          `}
        >
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#0F1B3D] whitespace-nowrap">
            Global<span className="text-[#C99A3C]">Leap</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[#0F1B3D] font-medium">
            <li><Link to="/" className="hover:text-[#C99A3C] transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#C99A3C] transition">About</Link></li>
            <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">Destinations</Link></li>
            <li><Link to="/services" className="hover:text-[#C99A3C] transition">Services</Link></li>
            <li><Link to="/universities" className="hover:text-[#C99A3C] transition">Universities</Link></li>
            <li><Link to="/blog" className="hover:text-[#C99A3C] transition">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-[#C99A3C] transition">Contact</Link></li>
          </ul>

          {/* Right Side – CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-block bg-[#C99A3C] text-[#0F1B3D] px-5 py-2 rounded-full font-bold hover:bg-[#D4A84B] hover:shadow-[0_0_25px_rgba(201,154,60,0.4)] transition-all duration-300 whitespace-nowrap text-sm"
            >
              Book Consultation
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 text-[#0F1B3D] focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-[#0F1B3D] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#0F1B3D] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#0F1B3D] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Slide-in Menu (right) */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-[999] bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <button
            onClick={closeMenu}
            className="self-end text-[#0F1B3D] text-2xl p-2 hover:text-[#C99A3C] transition"
          >
            ✕
          </button>

          <ul className="flex flex-col space-y-6 mt-8 text-[#0F1B3D] text-xl font-medium">
            <li><Link to="/" onClick={closeMenu} className="hover:text-[#C99A3C] transition">Home</Link></li>
            <li><Link to="/about" onClick={closeMenu} className="hover:text-[#C99A3C] transition">About</Link></li>
            <li><Link to="/destinations" onClick={closeMenu} className="hover:text-[#C99A3C] transition">Destinations</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="hover:text-[#C99A3C] transition">Services</Link></li>
            <li><Link to="/universities" onClick={closeMenu} className="hover:text-[#C99A3C] transition">Universities</Link></li>
            <li><Link to="/blog" onClick={closeMenu} className="hover:text-[#C99A3C] transition">Blog</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className="hover:text-[#C99A3C] transition">Contact</Link></li>
          </ul>

          <div className="mt-auto pb-8">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="block w-full bg-[#C99A3C] text-[#0F1B3D] text-center px-6 py-4 rounded-full font-bold hover:bg-[#D4A84B] transition"
            >
              Book Consultation
            </Link>
            <p className="text-center text-sm text-[#0F1B3D]/50 mt-4">
              © {new Date().getFullYear()} Global Leap
            </p>
          </div>
        </div>
      </div>
    </>
  );
}