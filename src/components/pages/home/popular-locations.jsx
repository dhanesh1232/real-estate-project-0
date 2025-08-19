"use client";

const locations = [
  {
    id: 1,
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
    listings: "320+",
  },
  {
    id: 2,
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800",
    listings: "280+",
  },
  {
    id: 3,
    name: "Hyderabad",
    image: "https://images.unsplash.com/photo-1623776025811-fd139155a39b?w=800",
    listings: "190+",
  },
  {
    id: 4,
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    listings: "250+",
  },
];

export function PopularLocations() {
  return (
    <section className="py-16 px-6 bg-white" id="locations">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold">Popular Locations</h2>
        <p className="text-gray-600 mt-2">Find properties in trending areas</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="relative overflow-hidden rounded shadow-lg group"
          >
            <img
              src={loc.image}
              alt={loc.name}
              className="h-64 w-full object-cover group-hover:scale-105 transition"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold text-xl">{loc.name}</h3>
              <p className="text-white/80 text-sm">{loc.listings} Listings</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
