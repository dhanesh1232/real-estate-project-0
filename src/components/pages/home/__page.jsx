import { ModernHero } from "./hero";
import { FeaturedProperties } from "./feature-properties";
import { PropertyCategories } from "./properties-categories";
import { WhyChooseUs } from "./why-choose";
import { PopularLocations } from "./popular-locations";
import { Testimonials } from "./testimonials";
import { CallToAction } from "./call-to-action";
import { Partners } from "./partner";
import { NewsLetter } from "./newsletter";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ModernHero />

      {/* Featured Listings */}
      <FeaturedProperties />

      {/* Properties Categories */}
      <PropertyCategories />

      {/* Why Choose US */}
      <WhyChooseUs />

      {/* Popular Locations */}
      <PopularLocations />

      {/* Testimonials */}
      <Testimonials />

      {/* Partner */}
      {/* <Partners /> */}

      {/* Newsletter */}
      <NewsLetter />

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
}
