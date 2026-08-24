import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0F1B3D] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1 – Brand */}
          <div>
            <Link to="/" className="text-3xl font-bold">
              Globa<span className="text-[#C99A3C]">Leap</span>
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              Empowering students to achieve their global education dreams. 
              Trusted study abroad consultants since 2020.
            </p>
            <div className="flex gap-3 mt-6">
              {/* Social Icons – SVG placeholders */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C99A3C] hover:text-[#0F1B3D] transition-colors duration-300 flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(201,154,60,0.3)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C99A3C] hover:text-[#0F1B3D] transition-colors duration-300 flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(201,154,60,0.3)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C99A3C] hover:text-[#0F1B3D] transition-colors duration-300 flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(201,154,60,0.3)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C99A3C] hover:text-[#0F1B3D] transition-colors duration-300 flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(201,154,60,0.3)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="text-[#C99A3C] font-bold text-lg uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-white/70">
              <li><Link to="/" className="hover:text-[#C99A3C] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#C99A3C] transition">About Us</Link></li>
              <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">Destinations</Link></li>
              <li><Link to="/services" className="hover:text-[#C99A3C] transition">Services</Link></li>
              <li><Link to="/universities" className="hover:text-[#C99A3C] transition">Universities</Link></li>
              <li><Link to="/blog" className="hover:text-[#C99A3C] transition">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3 – Top Destinations */}
          <div>
            <h3 className="text-[#C99A3C] font-bold text-lg uppercase tracking-wider mb-4">
              Top Destinations
            </h3>
            <ul className="space-y-2.5 text-white/70">
              {/* Added Georgia at the top */}
              <li><Link to="/georgia" className="hover:text-[#C99A3C] transition">Georgia</Link></li>
              
              <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">USA</Link></li>
              <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">UK</Link></li>
              <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">Canada</Link></li>
              <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">Australia</Link></li>
              <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">Germany</Link></li>
              <li><Link to="/destinations" className="hover:text-[#C99A3C] transition">France</Link></li>
            </ul>
          </div>

          {/* Column 4 – Newsletter & Contact */}
          <div>
            <h3 className="text-[#C99A3C] font-bold text-lg uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe for the latest study abroad opportunities and updates.
            </p>
            

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-white/80 font-semibold text-sm mb-3">Contact Us</h4>
              <p className="text-white/60 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C99A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                globaleap2026@gmail.com
              </p>
              <p className="text-white/60 text-sm flex items-center gap-2 mt-1">
                <svg className="w-4 h-4 text-[#C99A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                 8975869192 / 7000356500
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#C99A3C]/30">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Globaleap. All rights reserved.
          </p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-[#C99A3C] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#C99A3C] transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}