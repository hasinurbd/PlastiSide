import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Settings, Users, BarChart3, LogOut, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  points: number;
  rank: string;
}

interface Analytics {
  totalUsers: number;
  totalSubmissions: number;
  totalPoints: number;
  submissionsByType: Array<{ plasticType: string; _sum: { weight: number } }>;
}

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "settings">(
    "overview",
  );
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsData, setSettingsData] = useState({
    companyName: "PlastiSide",
    primaryColor: "#2ECC71",
    secondaryColor: "#1A73E8",
  });

  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settingsData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Settings saved successfully!");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <Layout>
      <div className="bg-light-grey min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-dark-charcoal mb-2">
                Admin Dashboard
              </h1>
              <p className="text-dark-charcoal/60">
                Welcome, {user?.firstName}! Manage your platform here.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 bg-white rounded-lg p-2 shadow-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "overview"
                  ? "bg-eco-green text-white"
                  : "text-dark-charcoal hover:bg-light-grey"
              }`}
            >
              <BarChart3 className="w-5 h-5 inline-block mr-2" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "users"
                  ? "bg-eco-green text-white"
                  : "text-dark-charcoal hover:bg-light-grey"
              }`}
            >
              <Users className="w-5 h-5 inline-block mr-2" />
              Users ({users.length})
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === "settings"
                  ? "bg-eco-green text-white"
                  : "text-dark-charcoal hover:bg-light-grey"
              }`}
            >
              <Settings className="w-5 h-5 inline-block mr-2" />
              Settings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-eco-green">
                  <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                    Total Users
                  </p>
                  <div className="text-4xl font-bold text-eco-green mb-4">
                    {analytics?.totalUsers || 0}
                  </div>
                  <div className="w-full bg-light-grey rounded-full h-2">
                    <div
                      className="bg-eco-green h-2 rounded-full"
                      style={{
                        width: `${Math.min((analytics?.totalUsers || 0) / 10, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-ocean-blue">
                  <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                    Total Submissions
                  </p>
                  <div className="text-4xl font-bold text-ocean-blue">
                    {analytics?.totalSubmissions || 0}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-eco-green">
                  <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                    Total Points Distributed
                  </p>
                  <div className="text-3xl font-bold text-eco-green">
                    {(analytics?.totalPoints || 0).toLocaleString()}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-ocean-blue">
                  <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                    Active Citizens
                  </p>
                  <div className="text-4xl font-bold text-ocean-blue">
                    {users.filter((u) => u.role === "citizen").length}
                  </div>
                </div>
              </div>

              {/* Plastic Types Chart */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-dark-charcoal mb-6">
                  Plastic Distribution by Type
                </h2>
                <div className="space-y-4">
                  {analytics?.submissionsByType?.map((item) => (
                    <div key={item.plasticType}>
                      <div className="flex justify-between mb-2">
                        <p className="font-semibold text-dark-charcoal">
                          {item.plasticType}
                        </p>
                        <p className="font-bold text-eco-green">
                          {item._sum.weight?.toFixed(1) || 0} kg
                        </p>
                      </div>
                      <div className="w-full bg-light-grey rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-eco-green to-ocean-blue h-4 rounded-full"
                          style={{
                            width: `${Math.min(
                              ((item._sum.weight || 0) /
                                (analytics.submissionsByType.reduce(
                                  (sum, t) => sum + (t._sum.weight || 0),
                                  0,
                                ) || 1)) *
                                100,
                              100,
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-dark-charcoal mb-6">
                User Management
              </h2>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin h-8 w-8 border-4 border-eco-green border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                          Role
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                          Rank
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-dark-charcoal">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr
                          key={u.id}
                          className="border-b border-border hover:bg-light-grey transition-colors"
                        >
                          <td className="py-4 px-4 text-dark-charcoal">
                            {u.firstName} {u.lastName}
                          </td>
                          <td className="py-4 px-4 text-dark-charcoal text-sm">
                            {u.email}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-3 py-1 bg-eco-green/20 text-eco-green rounded-full text-xs font-semibold capitalize">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                u.status === "active"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-dark-charcoal">
                            {u.rank}
                          </td>
                          <td className="py-4 px-4 font-bold text-ocean-blue">
                            {u.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-dark-charcoal mb-8">
                Platform Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settingsData.companyName}
                    onChange={(e) =>
                      setSettingsData({
                        ...settingsData,
                        companyName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="color"
                      value={settingsData.primaryColor}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-20 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settingsData.primaryColor}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          primaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="color"
                      value={settingsData.secondaryColor}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="w-20 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settingsData.secondaryColor}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="w-full px-6 py-4 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-5 h-5" />
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
