import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewsLetter = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-transparent text-center p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive property listings, market
            insights, and real estate trends delivered right to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 py-3 h-12 rounded focus:ring-2 focus:ring-primary/50"
            />
            <Button className="bg-primary cursor-pointer hover:bg-primary/90 text-white font-semibold px-8 h-12 rounded transition-all duration-300 transform">
              Subscribe Now
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service
          </p>
        </div>
      </div>
    </section>
  );
};
