import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-grey flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-eco-green hover:text-eco-green/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("nav.howItWorks")}
          </Link>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-dark-charcoal">
              {t("auth.welcomeBack")}
            </h1>
            <p className="text-dark-charcoal/60 font-raleway">
              {t("auth.signIn")}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                {t("auth.email")}
              </label>
              <input
                type="email"
                placeholder={t("auth.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                {t("auth.password")}
              </label>
              <input
                type="password"
                placeholder={t("auth.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-dark-charcoal/70">
                  {t("auth.rememberMe")}
                </span>
              </label>
              <a
                href="#"
                className="text-eco-green hover:text-eco-green/80"
              >
                {t("auth.forgotPassword")}
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? "Loading..." : t("auth.signInButton")}
            </button>

            <div className="text-center text-sm">
              <p className="text-dark-charcoal/70">
                {t("auth.noAccount")}{" "}
                <Link
                  to="/register"
                  className="text-eco-green hover:text-eco-green/80 font-semibold"
                >
                  {t("auth.registerHere")}
                </Link>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-dark-charcoal/50 mb-3 font-semibold">
              DEMO CREDENTIALS
            </p>
            <div className="space-y-2 text-xs text-dark-charcoal/60">
              <p>
                <span className="font-semibold">Citizen:</span> user@example.com / password123
              </p>
              <p>
                <span className="font-semibold">Admin:</span> admin@example.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
