const countries = [
  { name: 'USA', flag: '🇺🇸', desc: 'Home to Ivy League and top research universities.' },
  { name: 'UK', flag: '🇬🇧', desc: 'Historic institutions with world-class education.' },
  { name: 'Canada', flag: '🇨🇦', desc: 'Known for quality education and welcoming environment.' },
  { name: 'Australia', flag: '🇦🇺', desc: 'Sunny weather, excellent universities, and post-study work options.' },
  { name: 'Europe', flag: '🇪🇺', desc: 'Diverse cultures and affordable tuition in many countries.' },
];

export default function Destinations() {
  return (
    <main>
      <section className="bg-navy text-white py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our <span className="text-gold">Destinations</span></h1>
          <p className="text-lg mt-4">Choose from the best study locations around the world</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((c, i) => (
            <div key={i} className="bg-lightgray p-6 rounded-xl shadow-card hover:shadow-lg transition">
              <div className="text-5xl">{c.flag}</div>
              <h3 className="text-2xl font-bold text-navy mt-2">{c.name}</h3>
              <p className="text-gray-600 mt-2">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}