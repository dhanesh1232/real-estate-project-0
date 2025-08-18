"use client";

const partners = [
  {
    name: "HDFC Bank",
    logo: "https://companieslogo.com/img/orig/HDB-bb6241fe.png",
    link: "https://www.hdfcbank.com",
  },
  {
    name: "ICICI Bank",
    logo: "https://res.cloudinary.com/ddqz4s18g/image/upload/v1755530953/ICICI-Bank-logo-vector-01_gtvzxq.svg",
    link: "https://www.icicibank.com",
  },
  {
    name: "SBI",
    logo: "https://res.cloudinary.com/ddqz4s18g/image/upload/v1755530979/sbi-logo-sbi-icon-transparent-free-png_ha0wh9.png",
    link: "https://www.onlinesbi.com",
  },
];

export function Partners() {
  return (
    <section
      className="py-16 px-8 bg-gradient-to-b from-white to-gray-50"
      id="partners"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We collaborate with India's leading financial institutions to provide
          you with the best mortgage options.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-12 max-w-4xl mx-auto">
        {partners.map((partner, idx) => (
          <a
            key={idx}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <img
                src={partner.logo}
                alt={`${partner.name} Logo`}
                className="h-16 md:h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-lg transition-opacity"></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
