const posts = [
  { title: 'Top 10 Scholarships for International Students', date: 'July 15, 2026', excerpt: 'Discover the best scholarships available for studying abroad.' },
  { title: 'How to Ace Your University Application', date: 'July 10, 2026', excerpt: 'Expert tips for writing a compelling personal statement.' },
  { title: 'Visa Interview Tips: What to Expect', date: 'July 5, 2026', excerpt: 'Prepare effectively for your student visa interview.' },
  { title: 'Choosing the Right University: A Complete Guide', date: 'June 28, 2026', excerpt: 'Factors to consider when selecting your dream university.' },
];

export default function Blog() {
  return (
    <main>
      <section className="bg-navy text-white py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our <span className="text-gold">Blog</span></h1>
          <p className="text-lg mt-4">Insights and updates from the study abroad world</p>
        </div>
      </section>

      <section className="py-16 bg-lightgray">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-navy">{post.title}</h3>
              <p className="text-sm text-gold mt-1">{post.date}</p>
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
              <button className="mt-4 text-navy font-semibold hover:text-gold transition">Read More →</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}