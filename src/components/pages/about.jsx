"use client";
import { CheckCircle } from "lucide-react";

export function AboutPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 text-center relative">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/real-estate-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gold">
            About <span className="text-yellow-400">SR Developer's</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            We are redefining real estate with trust, technology, and
            transparency.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">
            Our Mission & Vision
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At{" "}
            <span className="font-semibold text-yellow-500">
              SR Developer's
            </span>
            , our mission is simple: to connect people with their dream homes,
            investments, and commercial spaces.
            <br />
            <br />
            Our vision is to become the most trusted real estate platform across
            India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "5,000+", label: "Verified Properties" },
            { number: "10,000+", label: "Happy Clients" },
            { number: "100+", label: "Cities Covered" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-sm transition border-t-4 border-yellow-400"
            >
              <h3 className="text-3xl font-bold text-blue-800">
                {stat.number}
              </h3>
              <p className="mt-2 text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Transparency First", desc: "No hidden charges" },
              { title: "Verified Listings", desc: "Genuine sellers & buyers" },
              { title: "Personalized Support", desc: "Experts at every step" },
              { title: "Fast Deals", desc: "Close transactions quicker" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400"
              >
                <CheckCircle className="text-blue-700 w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-900 py-16 text-center text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Browse verified listings or list your property with us today.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/search"
              className="bg-yellow-400 text-blue-900 px-6 py-3 rounded font-semibold shadow hover:bg-yellow-300 transition"
            >
              Explore Properties
            </a>
            <a
              href="/post-property"
              className="bg-white text-blue-900 px-6 py-3 rounded font-semibold shadow hover:bg-gray-100 transition"
            >
              Post Your Property
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
