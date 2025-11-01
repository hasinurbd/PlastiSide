import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Users, BarChart3, Package, Settings } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

interface AdminStats {
  totalUsers: number;
  totalSubmissions: number;
  totalPoints: number;
  submissionsByType: { plasticType: string; _sum: { weight: number } }[];
}

interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  points: number;
  rank: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "users" | "settings"
  >("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    companyName: "Plastixide",
    primaryColor: "#2ECC71",
    secondaryColor: "#1A73E8",
    footerTeam: [{ name: "", role: "" }],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, settingsRes] = await Promise.all([
        fetch("/api/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/admin/settings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      const settingsData = await settingsRes.json();

      if (statsData.success) setStats(statsData.analytics);
      if (usersData.success) setUsers(usersData.users);
      if (settingsData.success && settingsData.settings) {
        const s = settingsData.settings;
        setSettings({
          companyName: s.companyName || "Plastixide",
          primaryColor: s.primaryColor || "#2ECC71",
          secondaryColor: s.secondaryColor || "#1A73E8",
          footerTeam: s.footerTeam
            ? JSON.parse(s.footerTeam)
            : [{ name: "", role: "" }],
        });
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...settings,
          footerTeam: settings.footerTeam,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Settings updated successfully!");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings");
    }
  };

  const handleUpdateUserStatus = async (userId: string, status: string) => {
    try {
      const response = await fetch("/api/admin/users/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchData();
        alert("User status updated!");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <Layout>
      <div className="bg-light-grey min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-dark-charcoal mb-12">
            Admin Dashboard
          </h1>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "dashboard"
                  ? "text-eco-green border-b-2 border-eco-green"
                  : "text-dark-charcoal/60 hover:text-dark-charcoal"
              }`}
            >
              <BarChart3 className="w-5 h-5 inline-block mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "users"
                  ? "text-eco-green border-b-2 border-eco-green"
                  : "text-dark-charcoal/60 hover:text-dark-charcoal"
              }`}
            >
              <Users className="w-5 h-5 inline-block mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "settings"
                  ? "text-eco-green border-b-2 border-eco-green"
                  : "text-dark-charcoal/60 hover:text-dark-charcoal"
              }`}
            >
              <Settings className="w-5 h-5 inline-block mr-2" />
              Settings
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin h-12 w-12 border-4 border-eco-green border-t-transparent rounded-full"></div>
              <p className="mt-4 text-dark-charcoal/60">Loading...</p>
            </div>
          ) : (
            <>
              {/* Dashboard Tab */}
              {activeTab === "dashboard" && stats && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-eco-green">
                      <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                        Total Users
                      </p>
                      <div className="text-4xl font-bold text-eco-green mb-2">
                        <AnimatedCounter end={stats.totalUsers} />
                      </div>
                      <p className="text-xs text-dark-charcoal/60">
                        All registered users
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-ocean-blue">
                      <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                        Submissions
                      </p>
                      <div className="text-4xl font-bold text-ocean-blue mb-2">
                        <AnimatedCounter end={stats.totalSubmissions} />
                      </div>
                      <p className="text-xs text-dark-charcoal/60">
                        Total plastic submissions
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-eco-green">
                      <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                        Total Points
                      </p>
                      <div className="text-4xl font-bold text-eco-green mb-2">
                        <AnimatedCounter end={stats.totalPoints} suffix="K+" />
                      </div>
                      <p className="text-xs text-dark-charcoal/60">
                        Points distributed
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-ocean-blue">
                      <p className="text-sm font-semibold text-dark-charcoal/70 mb-2">
                        Plastic Types
                      </p>
                      <div className="text-4xl font-bold text-ocean-blue mb-2">
                        {stats.submissionsByType.length}
                      </div>
                      <p className="text-xs text-dark-charcoal/60">
                        Types collected
                      </p>
                    </div>
                  </div>

                  {/* Plastic by Type */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-dark-charcoal mb-6">
                      Plastic by Type
                    </h2>
                    <div className="space-y-4">
                      {stats.submissionsByType.map((type) => (
                        <div key={type.plasticType}>
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold text-dark-charcoal">
                              {type.plasticType}
                            </span>
                            <span className="text-eco-green font-bold">
                              {type._sum.weight.toFixed(1)} kg
                            </span>
                          </div>
                          <div className="w-full bg-light-grey rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-eco-green to-ocean-blue h-3 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  (type._sum.weight /
                                    (stats.submissionsByType[0]?._sum.weight ||
                                      1)) *
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
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-light-grey border-b border-border">
                        <tr>
                          <th className="text-left py-4 px-6 font-semibold text-dark-charcoal">
                            Name
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-dark-charcoal">
                            Email
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-dark-charcoal">
                            Role
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-dark-charcoal">
                            Points
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-dark-charcoal">
                            Status
                          </th>
                          <th className="text-left py-4 px-6 font-semibold text-dark-charcoal">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-border hover:bg-light-grey transition-colors"
                          >
                            <td className="py-4 px-6 text-dark-charcoal">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="py-4 px-6 text-dark-charcoal text-sm">
                              {user.email}
                            </td>
                            <td className="py-4 px-6 capitalize">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ocean-blue/20 text-ocean-blue">
                                {user.role}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-dark-charcoal font-semibold">
                              {user.points}
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  user.status === "active"
                                    ? "bg-eco-green/20 text-eco-green"
                                    : user.status === "suspended"
                                      ? "bg-red-100 text-red-600"
                                      : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={user.status}
                                onChange={(e) =>
                                  handleUpdateUserStatus(
                                    user.id,
                                    e.target.value,
                                  )
                                }
                                className="px-3 py-1 border border-border rounded text-sm cursor-pointer"
                              >
                                <option value="active">Active</option>
                                <option value="suspended">Suspend</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
                  <h2 className="text-2xl font-bold text-dark-charcoal mb-6">
                    Platform Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                          Primary Color
                        </label>
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              primaryColor: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-border rounded-lg cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                          Secondary Color
                        </label>
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              secondaryColor: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-border rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-charcoal mb-4">
                        Team Members
                      </label>
                      <div className="space-y-4">
                        {settings.footerTeam.map((member, idx) => (
                          <div
                            key={idx}
                            className="grid md:grid-cols-2 gap-4 p-4 bg-light-grey rounded-lg"
                          >
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => {
                                const newTeam = [...settings.footerTeam];
                                newTeam[idx].name = e.target.value;
                                setSettings({
                                  ...settings,
                                  footerTeam: newTeam,
                                });
                              }}
                              placeholder="Team member name"
                              className="px-4 py-2 border border-border rounded-lg outline-none"
                            />
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => {
                                const newTeam = [...settings.footerTeam];
                                newTeam[idx].role = e.target.value;
                                setSettings({
                                  ...settings,
                                  footerTeam: newTeam,
                                });
                              }}
                              placeholder="Role/Position"
                              className="px-4 py-2 border border-border rounded-lg outline-none"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() =>
                            setSettings({
                              ...settings,
                              footerTeam: [
                                ...settings.footerTeam,
                                { name: "", role: "" },
                              ],
                            })
                          }
                          className="px-4 py-2 border-2 border-eco-green text-eco-green rounded-lg font-semibold hover:bg-eco-green hover:text-white transition-colors"
                        >
                          + Add Team Member
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleUpdateSettings}
                      className="w-full px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
