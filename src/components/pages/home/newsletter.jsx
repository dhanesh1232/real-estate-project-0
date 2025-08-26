import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewsLetter = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br to-white from-blue-50 overflow-hidden">
      {/* Background subtle decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-100/40 blur-3xl"></div>
      </div>

      <div className="relative max-w-3xl mx-auto text-center px-6">
        {/* Premium Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Stay Informed, Stay Ahead
          </span>
        </h2>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
          Join our exclusive newsletter to receive curated insights, premium
          updates, and market trends delivered straight to your inbox.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 h-12 px-4 rounded border border-gray-200 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
          />
          <Button className="h-12 px-8 text-white font-semibold rounded bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all duration-300">
            Subscribe
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          By subscribing, you agree to our{" "}
          <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
          <span className="underline cursor-pointer">Terms of Service</span>.
        </p>
      </div>
    </section>
  );
};
