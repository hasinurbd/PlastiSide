import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Plus, Eye } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/hooks/useLanguage";

interface Submission {
  id: string;
  plasticType: string;
  weight: number;
  quantity: number;
  location: string;
  pointsEarned: number;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/submissions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (data.success) {
          setSubmissions(data.submissions);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const totalPlastic = submissions.reduce((sum, sub) => sum + sub.weight, 0);

  return (
    <Layout>
      <div className="bg-light-grey min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-dark-charcoal mb-2">
              {t("dashboard.myDashboard")}
            </h1>
            <p className="text-lg text-dark-charcoal/60">
              Welcome back, {user?.firstName}! Here's your recycling progress.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* Points Card */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-eco-green">
              <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                {t("dashboard.points")}
              </p>
              <div className="text-4xl font-bold text-eco-green mb-4">
                <AnimatedCounter end={user?.points || 0} />
              </div>
              <div className="w-full bg-light-grey rounded-full h-2">
                <div
                  className="bg-eco-green h-2 rounded-full"
                  style={{
                    width: `${Math.min((user?.points || 0) / 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Rank Card */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-ocean-blue">
              <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                {t("dashboard.rank")}
              </p>
              <div className="text-3xl font-bold text-ocean-blue mb-4">
                {user?.rank || "Bronze"}
              </div>
              <div className="text-xs text-dark-charcoal/60">
                Keep submitting to level up!
              </div>
            </div>

            {/* Total Submissions */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-eco-green">
              <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                {t("dashboard.submissions")}
              </p>
              <div className="text-3xl font-bold text-eco-green mb-4">
                {submissions.length}
              </div>
              <div className="text-xs text-dark-charcoal/60">
                Total submissions made
              </div>
            </div>

            {/* Total Plastic */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-ocean-blue">
              <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                Plastic Submitted
              </p>
              <div className="text-3xl font-bold text-ocean-blue mb-4">
                {totalPlastic.toFixed(1)} kg
              </div>
              <div className="text-xs text-dark-charcoal/60">
                Total weight recycled
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-12">
            <Link
              to="/submit"
              className="flex items-center gap-2 px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              {t("submission.submitPlastic")}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-6 py-3 border-2 border-ocean-blue text-ocean-blue font-semibold rounded-lg hover:bg-ocean-blue hover:text-white transition-colors"
            >
              <Eye className="w-5 h-5" />
              {t("common.profile")}
            </Link>
          </div>

          {/* Recent Submissions */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-charcoal">
                {t("dashboard.recentSubmissions")}
              </h2>
              <Link
                to="/dashboard"
                className="text-eco-green hover:text-eco-green/80 font-semibold"
              >
                {t("dashboard.viewAll")}
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin h-8 w-8 border-4 border-eco-green border-t-transparent rounded-full"></div>
                <p className="mt-4 text-dark-charcoal/60">
                  {t("common.loading")}
                </p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-dark-charcoal/30 mx-auto mb-4" />
                <p className="text-dark-charcoal/60 mb-6">
                  No submissions yet. Start submitting plastic to earn rewards!
                </p>
                <Link
                  to="/submit"
                  className="inline-block px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
                >
                  {t("submission.submitPlastic")}
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                        Plastic Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                        Weight (kg)
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                        Quantity
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                        Points
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.slice(0, 5).map((submission) => (
                      <tr
                        key={submission.id}
                        className="border-b border-border hover:bg-light-grey transition-colors"
                      >
                        <td className="py-4 px-4 text-dark-charcoal">
                          {submission.plasticType}
                        </td>
                        <td className="py-4 px-4 text-dark-charcoal">
                          {submission.weight}
                        </td>
                        <td className="py-4 px-4 text-dark-charcoal">
                          {submission.quantity}
                        </td>
                        <td className="py-4 px-4 font-semibold text-eco-green">
                          +{submission.pointsEarned}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              submission.status === "verified"
                                ? "bg-eco-green/20 text-eco-green"
                                : submission.status === "rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {submission.status.charAt(0).toUpperCase() +
                              submission.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-dark-charcoal/60 text-sm">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
