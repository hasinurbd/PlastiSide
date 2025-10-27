import Layout from "@/components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Users, TrendingUp, Package } from "lucide-react";

export default function Register() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "citizen";

  const roles = [
    {
      id: "citizen",
      name: "Citizen",
      icon: Users,
      description: "Recycle plastic and earn rewards",
    },
    {
      id: "buyer",
      name: "Buyer",
      icon: TrendingUp,
      description: "Purchase collected plastic",
    },
    {
      id: "collector",
      name: "Collector",
      icon: Package,
      description: "Manage collection centers",
    },
  ];

  const selectedRole = roles.find((r) => r.id === role) || roles[0];
  const SelectedIcon = selectedRole.icon;

  return (
    <Layout>
      <div className="min-h-screen bg-light-grey py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-eco-green hover:text-eco-green/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl font-montserrat font-bold text-dark-charcoal">
                Create Your Account
              </h1>
              <p className="text-lg text-dark-charcoal/60 font-raleway">
                Join PlastiSide and start making an impact
              </p>
            </div>

            {/* Role Selection */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-8">
                Who are you?
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
                    Register as {selectedRole.name}
                  </h3>
                  <p className="text-sm text-dark-charcoal/60 font-raleway">
                    {selectedRole.description}
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                  <p className="text-xs text-dark-charcoal/50 mt-2 font-raleway">
                    Must be at least 8 characters
                  </p>
                </div>

                {role === "collector" && (
                  <div>
                    <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                      Business Name / Center Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Collection Center"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 rounded border-border mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-dark-charcoal/70 font-raleway">
                    I agree to the{" "}
                    <a href="#" className="text-eco-green hover:text-eco-green/80">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-eco-green hover:text-eco-green/80">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button className="w-full btn-primary py-3 font-semibold">
                  Create Account
                </button>

                <div className="text-center text-sm">
                  <p className="text-dark-charcoal/70">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-eco-green hover:text-eco-green/80 font-semibold"
                    >
                      Sign in here
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
