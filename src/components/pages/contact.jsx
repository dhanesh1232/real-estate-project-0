"use client";
import {
  MoveRight,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Label } from "../ui/label";
import { Icons } from "../icons";
import { ContactData } from "@/lib/client/default_data";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Luxury Home Buyer",
      content:
        "The team provided exceptional service throughout our home buying process. Their attention to detail and market knowledge is unmatched.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Investor",
      content:
        "Professional, responsive, and truly understands the luxury market. They found exactly what we were looking for in record time.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "First-time Seller",
      content:
        "Sold our property above asking price within a week. Their marketing strategy and negotiation skills are impressive.",
      rating: 5,
    },
  ];

  const renderStars = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Premium decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-24 right-10 hidden xl:block"
      >
        <div className="relative">
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full absolute -bottom-4 -right-2 animate-ping"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-40 left-16 hidden xl:block"
      >
        <div className="relative">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full absolute -top-4 -left-2 animate-ping"></div>
        </div>
      </motion.div>

      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-primary mr-4"></div>
            <span className="text-sm font-medium text-primary tracking-widest">
              CONTACT US
            </span>
            <div className="w-12 h-px bg-primary ml-4"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-gray-900">
            Experience <span className="text-primary italic">Exceptional</span>{" "}
            Service
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with our luxury real estate experts for personalized
            assistance with your property journey. We're committed to delivering
            excellence at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div {...slideIn("left")} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-yellow-400/5 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <form
              onSubmit={handleSubmit}
              className="relative space-y-6 bg-white p-10 rounded shadow-xl border border-gray-100/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif text-gray-900 mb-2">
                  Send us a Message
                </h3>
                <p className="text-gray-500">
                  We typically respond within 24 hours
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <span>Full Name</span>
                  <span className="text-primary ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-200 px-4 py-3.5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white outline-none rounded  hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <span>Email Address</span>
                  <span className="text-primary ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border border-gray-200 px-4 py-3.5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white outline-none rounded hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <span>Your Message</span>
                  <span className="text-primary ml-1">*</span>
                </Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="How can we assist you with your real estate needs?"
                  className="w-full border border-gray-200 px-4 py-3.5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white outline-none resize-none rounded hover:border-gray-300"
                  required
                ></Textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 rounded font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center group/btn transform hover:-translate-y-0.5 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Send Message
                    <MoveRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover/btn:translate-x-1" />
                  </>
                )}
              </button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-700 p-4 rounded flex items-center"
                >
                  <Icons.check className="w-5 h-5 mr-2" />
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div {...slideIn("right")} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-8 rounded shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
              <h3 className="text-2xl font-serif mb-8 text-gray-900 text-center">
                Contact Information
              </h3>
              <div className="space-y-6">
                {ContactData.map((item, index) => {
                  const Icon = Icons[item.icon];
                  return (
                    <Link
                      href={item.href}
                      key={index}
                      className="flex items-center space-x-5 group cursor-pointer p-4 rounded-xl hover:bg-gray-50/50 transition-all duration-300"
                    >
                      <div className="p-3 rounded-full bg-gradient-to-br from-primary/5 to-yellow-400/5 group-hover:from-primary/10 group-hover:to-yellow-400/10 transition-colors duration-300 shadow-sm">
                        <Icon className="text-primary w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{item.tag}</p>
                        <span className="text-gray-800 inline-flex gap-2 font-medium group-hover:text-primary transition-colors duration-300 items-center">
                          <span>{item.label}</span>{" "}
                          {item.address && (
                            <div className="relative inline-block">
                              <button className="group">
                                <Icons.info className="w-4 h-4 text-gray-400 hover:text-primary transition-colors duration-200" />
                                <div className="absolute z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white/80 p-4 rounded shadow-lg border border-gray-100 min-w-[200px] right-0 mt-2 transition-all duration-300">
                                  <div className="space-y-2 text-sm">
                                    <p className="font-medium text-gray-900">
                                      {item.description}
                                    </p>
                                    <div className="text-gray-600">
                                      <p>{item.address.street}</p>
                                      <p>{item.address.area}</p>
                                      <p>
                                        {item.address.city},{" "}
                                        {item.address.state}
                                      </p>
                                      <p>
                                        {item.address.country} -{" "}
                                        {item.address.pincode}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          )}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-yellow-600/50 to-yellow-400/90 text-white p-8 rounded shadow-xl">
              <h3 className="text-xl font-serif mb-6 flex items-center">
                <Clock className="mr-2 w-5 h-5" />
                Business Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center">
                <MapPin className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium">Our Location</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3995371210514!2d78.4866713148777!3d17.38504458807908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb976c21a123%3A0x49f84a7ecae9c789!2sHyderabad!5e0!3m2!1sen!2sin!4v1617952742465!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-b"
                title="Location Map"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-8 h-px bg-primary mr-4"></div>
              <span className="text-sm font-medium text-primary tracking-widest">
                TESTIMONIALS
              </span>
              <div className="w-8 h-px bg-primary ml-4"></div>
            </div>
            <h2 className="text-3xl font-serif text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about their experience with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-24 text-center bg-gradient-to-r from-primary/5 to-yellow-400/5 p-12 rounded border border-gray-100/50"
        >
          <h2 className="text-3xl font-serif text-gray-900 mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let our expert team guide you through every step of your real estate
            journey with personalized service and unmatched market knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="md" asChild>
              <Link href="tel:+919876543210">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Link>
            </Button>
            <Button variant="outline" asChild size="md">
              <Link href="mailto:contact@ecodrixrealty.com">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="text-center py-8 text-gray-500 text-sm flex items-center justify-center"
      >
        Made with <Heart className="w-4 h-4 mx-1 text-primary fill-primary" />{" "}
        by Luxury Estates
      </motion.div>
    </div>
  );
}
