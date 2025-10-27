import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center text-dark-charcoal font-bold text-lg">
                P
              </div>
              <span className="font-montserrat font-bold text-xl">
                PlastiSide
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Building a sustainable future through citizen-powered plastic
              recycling.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-semibold text-lg">Platform</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>
                <a href="/#how-it-works" className="hover:text-eco-green transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#roles" className="hover:text-eco-green transition-colors">
                  For Everyone
                </a>
              </li>
              <li>
                <a href="/#impact" className="hover:text-eco-green transition-colors">
                  Impact
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-semibold text-lg">Company</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>
                <Link to="/about" className="hover:text-eco-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-eco-green transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-eco-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-semibold text-lg">Contact</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>Email: hello@plastiside.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Headquarters: San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} PlastiSide. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
