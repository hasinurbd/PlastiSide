import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";

export default function AdminRegister() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
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

    if (!formData.inviteCode.trim()) {
      setError(t("adminAuth.inviteCodeRequired"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError(t("auth.mustBe8Chars"));
      return;
    }

    setIsLoading(true);

    try {
      // Verify invite code on the server
      const verifyResponse = await fetch("/api/auth/verify-admin-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inviteCode: formData.inviteCode,
          email: formData.email,
        }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.message || t("adminAuth.invalidInviteCode"));
      }

      // Register as admin
      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        "admin",
      );
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Admin registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-grey py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-eco-green hover:text-eco-green/80 mb-8 max-w-2xl mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.home")}
          </Link>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 bg-eco-green/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-eco-green" />
                </div>
                <div>
                  <h1 className="font-montserrat font-bold text-2xl text-dark-charcoal">
                    {t("adminAuth.adminRegistration")}
                  </h1>
                  <p className="text-sm text-dark-charcoal/60">
                    {t("adminAuth.manageSettings")}
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-100 text-red-600 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    {t("adminAuth.inviteCode")} *
                  </label>
                  <input
                    type="text"
                    name="inviteCode"
                    value={formData.inviteCode}
                    onChange={handleInputChange}
                    placeholder={t("adminAuth.inviteCodePlaceholder")}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      {t("auth.firstName")} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t("auth.firstNamePlaceholder")}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      {t("auth.lastName")} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t("auth.lastNamePlaceholder")}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    {t("auth.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("auth.emailPlaceholder")}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      {t("auth.password")} *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={t("auth.passwordPlaceholder")}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder={t("auth.passwordPlaceholder")}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 font-semibold disabled:opacity-50"
                >
                  {isLoading
                    ? t("common.loading")
                    : t("auth.createAccountButton")}
                </button>

                <div className="text-center text-sm">
                  <p className="text-dark-charcoal/70">
                    {t("auth.haveAccount")}{" "}
                    <Link
                      to="/login"
                      className="text-eco-green hover:text-eco-green/80 font-semibold"
                    >
                      {t("auth.signInHere")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
