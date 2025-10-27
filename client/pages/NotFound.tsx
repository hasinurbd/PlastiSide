import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-light-grey to-white flex items-center justify-center py-12">
        <div className="text-center space-y-8 max-w-md px-4">
          <div className="space-y-4">
            <div className="text-6xl font-montserrat font-bold text-eco-green">
              404
            </div>
            <h1 className="text-3xl font-montserrat font-bold text-dark-charcoal">
              Page Not Found
            </h1>
            <p className="text-lg text-dark-charcoal/60 font-raleway">
              Oops! The page you're looking for doesn't exist. Let's get you
              back on track.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border">
            <p className="text-dark-charcoal/70 font-raleway mb-4">
              This page is still being built or may have been moved. If you have
              a specific request for this page, let us know and we'll prioritize
              it!
            </p>
            <p className="text-sm text-dark-charcoal/50 font-raleway">
              For now, explore the features available on our platform by
              returning to the homepage.
            </p>
          </div>

          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
