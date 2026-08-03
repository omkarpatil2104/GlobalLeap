import { useState } from 'react';
import API from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/contact', form);
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
      console.error(error);
    }
  };

  return (
    <main>
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Get In <span className="text-gold">Touch</span></h1>
          <p className="text-lg mt-4">We’d love to hear from you. Reach out for a free consultation.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gold text-navy py-3 rounded-xl font-bold text-lg hover:bg-opacity-80 transition"
            >
              Send Message
            </button>
            {status && <p className="text-center text-gray-700">{status}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}