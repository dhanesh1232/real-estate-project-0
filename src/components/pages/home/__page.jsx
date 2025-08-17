import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Home, Bath, Bed } from "lucide-react";
import { ModernHero } from "./hero";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ModernHero />
      {/* Hero Section */}

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Properties
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="rounded-2xl shadow-lg overflow-hidden">
              <img
                src={`https://source.unsplash.com/600x400/?house,real-estate,${item}`}
                alt="Property"
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">Luxury Villa</h3>
                <p className="text-gray-600 mb-3">Beverly Hills, CA</p>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" /> 4 Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" /> 3 Baths
                  </div>
                </div>
                <p className="text-primary font-bold text-lg mb-4">
                  $2,500,000
                </p>
                <Button className="w-full bg-primary text-white rounded-xl">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Locations */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Locations
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["New York", "Los Angeles", "Miami", "Chicago"].map((city) => (
            <div key={city} className="relative group cursor-pointer">
              <img
                src={`https://source.unsplash.com/400x300/?${city},cityscape`}
                alt={city}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all rounded-xl">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{city}</h3>
                  <p>150+ Properties</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Buy Property",
              icon: <Home className="w-12 h-12" />,
              description:
                "Find your dream home from our vast selection of properties",
            },
            {
              title: "Sell Property",
              icon: <Home className="w-12 h-12" />,
              description:
                "List your property and reach potential buyers quickly",
            },
            {
              title: "Property Management",
              icon: <Home className="w-12 h-12" />,
              description:
                "Professional property management services for landlords",
            },
          ].map((service, index) => (
            <Card key={index} className="text-center p-6">
              <div className="flex justify-center text-primary mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://source.unsplash.com/100x100/?portrait,person,${item}`}
                    alt="Client"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-gray-600">Property Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Exceptional service! Found my dream home within weeks. The
                  team was professional and supportive throughout the process."
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Are you a property owner or agent?
        </h2>
        <p className="mb-6 text-lg">
          List your property today and reach thousands of buyers.
        </p>
        <Button className="bg-white text-primary font-semibold px-6 py-3 rounded-xl">
          List Your Property
        </Button>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter for the latest property listings and real
          estate news
        </p>
        <div className="flex max-w-md mx-auto gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button className="bg-primary text-white">Subscribe</Button>
        </div>
      </section>
    </div>
  );
}
