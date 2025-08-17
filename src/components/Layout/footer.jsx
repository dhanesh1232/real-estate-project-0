"use client";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo + Tagline */}
          <div>
            <h2 className="text-white font-bold text-2xl mb-3">LuxEstate</h2>
            <p className="text-gray-400 text-sm">
              Find your dream home with us. Trusted real-estate services with
              premium listings and expert agents.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white">
                <Facebook />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin />
              </a>
              <a href="#" className="hover:text-white">
                <Youtube />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@ecodrixrealty.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Hyderabad, India
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1 md:col-span-3 sm:col-span-3 col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to get the latest property listings and offers.
            </p>
            <div className="flex w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none border-0 bg-white text-black flex-1"
              />
              <Button className="rounded-l-none bg-primary text-white whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <strong>LuxEstate</strong>. All rights
        reserved. | Designed with ❤️ by{" "}
        <Link
          href="https://services.ecodrix.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Develop ECODrIx"
        >
          ECODrIx
        </Link>
      </div>
    </footer>
  );
}
