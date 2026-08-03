const services = [
  { icon: '🎓', title: 'University Selection', desc: 'Personalized matching based on your academic profile and preferences.' },
  { icon: '📄', title: 'Application Assistance', desc: 'Expert review of essays, SOPs, and application forms.' },
  { icon: '✈️', title: 'Visa Guidance', desc: 'Step-by-step support for student visa applications.' },
  { icon: '💰', title: 'Scholarship Guidance', desc: 'Find and apply for scholarships to fund your education.' },
];

export default function Services() {
  return (
    <main>
      <section className="bg-navy text-white py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our <span className="text-gold">Services</span></h1>
          <p className="text-lg mt-4">Comprehensive support for your study abroad journey</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-lightgray p-6 rounded-xl shadow-card text-center hover:shadow-lg transition">
              <div className="text-5xl">{s.icon}</div>
              <h3 className="text-navy font-bold mt-3">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}