import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface TeamMember {
  name: string;
  role: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"links" | "team">("links");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch team members from admin settings
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        const data = await response.json();
        if (data.success && data.settings?.footerTeam) {
          setTeamMembers(JSON.parse(data.settings.footerTeam));
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <footer className="bg-dark-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-6 mb-8 border-b border-gray-700 pb-4">
          <button
            onClick={() => setActiveTab("links")}
            className={`font-semibold transition-colors ${
              activeTab === "links"
                ? "text-eco-green border-b-2 border-eco-green"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t("footer.platform")}
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`font-semibold transition-colors ${
              activeTab === "team"
                ? "text-eco-green border-b-2 border-eco-green"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t("footer.team")}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "links" ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center text-dark-charcoal font-bold text-lg">
                  P
                </div>
                <span className="font-montserrat font-bold text-xl">
                  {t("common.plastisideApp")}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {t("footer.platform")} - {t("common.plastisideApp")} is building a sustainable future through citizen-powered plastic recycling.
              </p>
            </div>

            {/* Quick Links */}
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

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h4 className="font-montserrat font-semibold text-lg">
                {t("footer.company")}
              </h4>
              <ul className="flex flex-col gap-2 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/"
                    className="hover:text-eco-green transition-colors"
                  >
                    {t("footer.aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-eco-green transition-colors"
                  >
                    {t("footer.contactUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
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
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-2xl font-montserrat font-bold text-eco-green mb-8">
              {t("footer.team")}
            </h3>
            {teamMembers && teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map(
                  (member, idx) =>
                    member.name && (
                      <div
                        key={idx}
                        className="bg-dark-charcoal border border-gray-700 rounded-lg p-6 text-center hover:border-eco-green transition-colors"
                      >
                        <div className="w-16 h-16 bg-eco-green rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-dark-charcoal">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-semibold text-lg text-white mb-1">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    )
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                Team members will be displayed here.
              </p>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {t("common.plastisideApp")}. {t("footer.rights")}
            </p>
            <div className="flex gap-6">
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
      </div>
    </footer>
  );
}
