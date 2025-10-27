import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [activeTeam, setActiveTeam] = useState(true);

  const teamMembers: TeamMember[] = [
    { name: "John Smith", role: "Founder & CEO" },
    { name: "Sarah Johnson", role: "Lead Developer" },
    { name: "Mike Chen", role: "Product Manager" },
    { name: "Emma Wilson", role: "Community Manager" },
    { name: "Alex Martinez", role: "Sustainability Lead" },
    { name: "Lisa Anderson", role: "Operations Manager" },
  ];

  return (
    <footer className="bg-dark-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
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

          {/* Platform Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-semibold text-lg">
              {t("footer.platform")}
            </h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>
                <a
                  href="/#how-it-works"
                  className="hover:text-eco-green transition-colors"
                >
                  {t("nav.howItWorks")}
                </a>
              </li>
              <li>
                <a
                  href="/#roles"
                  className="hover:text-eco-green transition-colors"
                >
                  {t("nav.forEveryone")}
                </a>
              </li>
              <li>
                <a
                  href="/#impact"
                  className="hover:text-eco-green transition-colors"
                >
                  {t("nav.impact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-semibold text-lg">
              {t("footer.company")}
            </h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-eco-green transition-colors"
                >
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={() => setActiveTeam(!activeTeam)}
                  className="hover:text-eco-green transition-colors cursor-pointer"
                >
                  {t("footer.team")}
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-eco-green transition-colors"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-semibold text-lg">
              {t("footer.contact")}
            </h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>{t("footer.email")}</li>
              <li>{t("footer.phone")}</li>
              <li>{t("footer.headquarters")}</li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-semibold text-lg">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-eco-green transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-eco-green transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-eco-green transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {activeTeam && (
          <div className="bg-dark-charcoal/50 rounded-lg p-8 mb-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-montserrat font-bold">
                {t("footer.team")}
              </h3>
              <button
                onClick={() => setActiveTeam(false)}
                className="text-gray-400 hover:text-eco-green transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Meet the passionate team building PlastiSide to create a
              sustainable future.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-eco-green transition-colors text-center"
                >
                  <div className="w-16 h-16 bg-eco-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-eco-green">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-white">{member.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} PlastiSide. {t("footer.rights")}
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-eco-green transition-colors text-sm"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-eco-green transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-eco-green transition-colors text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
