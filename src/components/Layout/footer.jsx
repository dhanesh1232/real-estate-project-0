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
import { FaWhatsapp } from "react-icons/fa";
import { ContactData, NavLinks, SocialData } from "@/lib/client/default_data";
import { Icons } from "../icons";

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
              {SocialData.map((each) => {
                const Icon = Icons[each.icon];
                return (
                  <Link
                    target="_blank"
                    key={each.id}
                    href={each.href}
                    className="hover:text-blue-600 w-8 h-8 bg-white/30 rounded flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {NavLinks.map((each) => {
                const Icon = Icons[each.icon];
                return (
                  <li key={each.id} className="group">
                    <Link
                      href={each.href}
                      className="inline-flex items-center gap-1"
                    >
                      <Icon
                        size={16}
                        className="group-hover:text-blue-600 transition ease-in-out duration-150"
                      />
                      <span className="group-hover:underline group-hover:text-blue-500 group-hover:font-semibold">
                        {each.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              {ContactData.map((each) => {
                const Icon = Icons[each.icon];
                return (
                  <li key={each.id} className="group">
                    <Link
                      href={each.href}
                      target="_blank"
                      className="inline-flex items-center gap-1"
                    >
                      <Icon
                        size={16}
                        className="group-hover:text-blue-600 transition ease-in-out duration-150"
                      />
                      <span className="group-hover:text-blue-500">
                        {each.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
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
                className="rounded rounded-r-none outline-none border-0 focus:ring-0 focus-within:ring-0 bg-white text-black flex-1"
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
