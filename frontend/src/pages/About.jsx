export default function About() {
  return (
    <main>
      <section className="bg-navy text-white py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">About <span className="text-gold">Global Leap</span></h1>
          <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">
            We are a premier overseas education consultancy, dedicated to helping students achieve their dream of studying abroad.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-gray-700 text-lg leading-relaxed">
            Founded in 2020, Global Leap has successfully placed over 500 students in top universities worldwide. Our team of experienced counselors provides personalized support from university selection to visa approval. We believe in making international education accessible and stress-free.
          </p>
        </div>
      </section>
    </main>
  );
}