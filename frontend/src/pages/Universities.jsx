const universities = [
  'Harvard University',
  'University of Oxford',
  'MIT',
  'University of Cambridge',
  'Stanford University',
  'UCL',
  'University of Toronto',
  'University of Sydney',
  'ETH Zurich',
  'National University of Singapore',
];

export default function Universities() {
  return (
    <main>
      <section className="bg-navy text-white py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Partner <span className="text-gold">Universities</span></h1>
          <p className="text-lg mt-4">Top-ranked institutions worldwide that trust Global Leap</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {universities.map((uni, i) => (
              <div key={i} className="bg-lightgray p-4 rounded-xl shadow-card text-center hover:shadow-lg transition">
                <span className="text-sm font-semibold text-navy">{uni}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}