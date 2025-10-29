import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="font-montserrat font-bold text-xl text-dark-charcoal">
            {t("common.plastisideApp")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#how-it-works"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            {t("nav.howItWorks")}
          </a>
          <a
            href="/#roles"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            {t("nav.forEveryone")}
          </a>
          <a
            href="/#impact"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            {t("nav.impact")}
          </a>
          <Link
            to="/dashboard"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            {t("common.dashboard")}
          </Link>
          <Link
            to="/submit"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            {t("submission.submitPlastic")}
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
            >
              {t("common.settings")}
            </Link>
          )}
        </div>

        {/* Language Switcher & Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-dark-charcoal hover:text-eco-green transition-colors flex items-center gap-2 font-semibold"
            title={language === "en" ? "Switch to Bangla" : "Switch to English"}
          >
            <Globe className="w-5 h-5" />
            {language.toUpperCase()}
          </button>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2 text-eco-green font-semibold border-2 border-eco-green rounded-lg hover:bg-eco-green hover:text-white transition-colors"
              >
                {t("common.login")}
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
              >
                {t("common.register")}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="px-6 py-2 text-eco-green font-semibold border-2 border-eco-green rounded-lg hover:bg-eco-green hover:text-white transition-colors"
              >
                {user?.firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                {t("common.logout")}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-dark-charcoal" />
          ) : (
            <Menu className="w-6 h-6 text-dark-charcoal" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-light-grey">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="/#how-it-works"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.howItWorks")}
            </a>
            <a
              href="/#roles"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.forEveryone")}
            </a>
            <a
              href="/#impact"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.impact")}
            </a>
            <Link
              to="/dashboard"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("common.dashboard")}
            </Link>
            <Link
              to="/submit"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("submission.submitPlastic")}
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("common.settings")}
              </Link>
            )}

            <button
              onClick={toggleLanguage}
              className="px-3 py-2 text-dark-charcoal hover:text-eco-green transition-colors flex items-center gap-2 font-semibold w-full justify-start"
            >
              <Globe className="w-5 h-5" />
              {t("common.switchLanguageName")}
            </button>

            <div className="flex flex-col gap-3 pt-4 border-t border-light-grey">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="text-center px-6 py-2 text-eco-green font-semibold border-2 border-eco-green rounded-lg hover:bg-eco-green hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("common.login")}
                  </Link>
                  <Link
                    to="/register"
                    className="text-center px-6 py-2 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("common.register")}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="text-center px-6 py-2 text-eco-green font-semibold border-2 border-eco-green rounded-lg hover:bg-eco-green hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user?.firstName}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {t("common.logout")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
