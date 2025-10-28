import Layout from "@/components/Layout";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, TrendingUp, Package } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const role = searchParams.get("role") || "citizen";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const roles = [
    {
      id: "citizen",
      name: t("roles.citizens"),
      icon: Users,
      description: t("roles.citizensDesc"),
    },
    {
      id: "buyer",
      name: t("roles.buyers"),
      icon: TrendingUp,
      description: t("roles.buyersDesc"),
    },
    {
      id: "collector",
      name: t("roles.collectors"),
      icon: Package,
      description: t("roles.collectorsDesc"),
    },
  ];

  const selectedRole = roles.find((r) => r.id === role) || roles[0];
  const SelectedIcon = selectedRole.icon;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        role,
        role === "collector" ? formData.businessName : undefined
      );
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
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
            className="flex items-center gap-2 text-eco-green hover:text-eco-green/80 mb-8 max-w-4xl mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.home")}
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl font-montserrat font-bold text-dark-charcoal">
                {t("auth.createAccount")}
              </h1>
              <p className="text-lg text-dark-charcoal/60 font-raleway">
                {t("auth.joinPlatform")}
              </p>
            </div>

            {/* Role Selection */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-8">
                {t("auth.whoAreYou")}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = r.id === role;
                  return (
                    <Link
                      key={r.id}
                      to={`/register?role=${r.id}`}
                      className={`p-6 rounded-lg border-2 transition-all cursor-pointer text-center ${
                        isSelected
                          ? "border-eco-green bg-eco-green/5"
                          : "border-border hover:border-eco-green/50"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 mx-auto mb-3 ${
                          isSelected ? "text-eco-green" : "text-dark-charcoal/40"
                        }`}
                      />
                      <h3 className="font-montserrat font-bold text-dark-charcoal">
                        {r.name}
                      </h3>
                      <p className="text-sm text-dark-charcoal/60 font-raleway mt-2">
                        {r.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 bg-eco-green/10 rounded-lg flex items-center justify-center">
                  <SelectedIcon className="w-6 h-6 text-eco-green" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-dark-charcoal">
                    {t("auth.createAccount")} {selectedRole.name}
                  </h3>
                  <p className="text-sm text-dark-charcoal/60 font-raleway">
                    {selectedRole.description}
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-100 text-red-600 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      {t("auth.firstName")}
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
                      {t("auth.lastName")}
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
                    {t("auth.email")}
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
                      {t("auth.password")}
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
                      Confirm Password
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

                {role === "collector" && (
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      {t("auth.businessName")}
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder={t("auth.businessNamePlaceholder")}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 rounded border-border mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-dark-charcoal/70 font-raleway">
                    {t("auth.agreeTerms")}{" "}
                    <a href="#" className="text-eco-green hover:text-eco-green/80">
                      {t("auth.termsOfService")}
                    </a>{" "}
                    {t("auth.and")}{" "}
                    <a href="#" className="text-eco-green hover:text-eco-green/80">
                      {t("auth.privacyPolicy")}
                    </a>
                  </label>
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
