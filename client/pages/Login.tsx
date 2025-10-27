import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  return (
    <Layout>
      <div className="min-h-screen bg-light-grey flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <Link to="/" className="flex items-center gap-2 text-eco-green hover:text-eco-green/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-dark-charcoal">
              Welcome Back
            </h1>
            <p className="text-dark-charcoal/60 font-raleway">
              Sign in to your PlastiSide account
            </p>
          </div>

          <div className="space-y-6">
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-dark-charcoal/70">Remember me</span>
              </label>
              <a href="#" className="text-eco-green hover:text-eco-green/80">
                Forgot password?
              </a>
            </div>

            <button className="w-full btn-primary">
              Sign In
            </button>

            <div className="text-center text-sm">
              <p className="text-dark-charcoal/70">
                Don't have an account?{" "}
                <Link to="/register" className="text-eco-green hover:text-eco-green/80 font-semibold">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
