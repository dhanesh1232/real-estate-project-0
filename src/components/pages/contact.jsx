"use client";
import { Mail, Phone, MapPin, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Label } from "../ui/label";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const slideIn = (direction) => ({
    initial: { opacity: 0, x: direction === "left" ? -50 : 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: direction === "left" ? 0.2 : 0.4 },
  });

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gold-50/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-gray-900">
            Get in <span className="text-yellow-500 italic">Touch</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            Experience exceptional service. Connect with our luxury real estate
            experts for personalized assistance with your property journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.form
            {...slideIn("left")}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-10 rounded shadow backdrop-blur-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border-b-2 border-gray-200 px-4 py-3 focus:border-primary transition-colors duration-300 bg-transparent outline-none hover:border-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full border-b-2 border-gray-200 px-4 py-3 focus:border-primary transition-colors duration-300 bg-transparent outline-none hover:border-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Your Message
              </Label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="How can we assist you?"
                className="w-full border-b-2 border-gray-200 px-4 py-3 focus:border-primary transition-colors duration-300 bg-transparent outline-none resize-none hover:border-gray-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded cursor-pointer font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group transform"
            >
              Send Message
              <MoveRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div {...slideIn("right")} className="space-y-8">
            <div className="bg-white p-8 rounded shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-serif mb-6 text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "123 Main Street, Hyderabad, India",
                  },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email", value: "info@realestate.com" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 group cursor-pointer"
                  >
                    <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                      <item.icon className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-gray-800 font-medium group-hover:text-primary transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded shadow overflow-hidden border border-border hover:shadow-md transition-shadow duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3995371210514!2d78.4866713148777!3d17.38504458807908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb976c21a123%3A0x49f84a7ecae9c789!2sHyderabad!5e0!3m2!1sen!2sin!4v1617952742465!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded"
                title="Location Map"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
