import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Platform Links */}
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
