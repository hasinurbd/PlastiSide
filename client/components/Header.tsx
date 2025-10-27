import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
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
            PlastiSide
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#how-it-works"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            How It Works
          </a>
          <a
            href="/#roles"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            For Everyone
          </a>
          <a
            href="/#impact"
            className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
          >
            Impact
          </a>
        </div>

        {/* Right Side Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-dark-charcoal border border-border rounded-lg hover:bg-light-grey transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            {language.toUpperCase()}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="px-6 py-2 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
              >
                {user?.firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-eco-green border-2 border-eco-green font-semibold rounded-lg hover:bg-eco-green hover:text-white transition-colors"
              >
                Logout
              </button>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-6 py-2 bg-ocean-blue text-white font-semibold rounded-lg hover:bg-ocean-blue/90 transition-colors"
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 text-eco-green font-semibold border-2 border-eco-green rounded-lg hover:bg-eco-green hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
              >
                Register
              </Link>
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
              How It Works
            </a>
            <a
              href="/#roles"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Everyone
            </a>
            <a
              href="/#impact"
              className="text-dark-charcoal font-medium hover:text-eco-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Impact
            </a>

            {/* Language Switcher Mobile */}
            <button
              onClick={toggleLanguage}
              className="text-left px-0 py-2 text-dark-charcoal font-medium hover:text-eco-green transition-colors flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === "en" ? "Bangla" : "English"}
            </button>

            {isAuthenticated ? (
              <>
                <div className="border-t border-light-grey pt-4 flex flex-col gap-3">
                  <Link
                    to="/dashboard"
                    className="text-center px-6 py-2 text-eco-green font-semibold border-2 border-eco-green rounded-lg hover:bg-eco-green hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-center px-6 py-2 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="text-center px-6 py-2 bg-ocean-blue text-white font-semibold rounded-lg hover:bg-ocean-blue/90 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-center px-6 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t border-light-grey">
                <Link
                  to="/login"
                  className="text-center px-6 py-2 text-eco-green font-semibold border-2 border-eco-green rounded-lg hover:bg-eco-green hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-center px-6 py-2 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
