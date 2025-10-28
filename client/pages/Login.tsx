import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
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
            {t("common.home")}
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
            <div className="p-4 bg-red-100 text-red-600 rounded-lg mb-6 text-sm">
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("auth.emailPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                {t("auth.password")}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t("auth.passwordPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                required
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
              className="w-full btn-primary disabled:opacity-50"
            >
              {isLoading ? t("common.loading") : t("auth.signInButton")}
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
        </div>
      </div>
    </Layout>
  );
}
