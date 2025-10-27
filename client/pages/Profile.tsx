import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef } from "react";
import { Upload, Save, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, updateUser, token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: "",
    location: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null,
  );
  const [message, setMessage] = useState("");
  const { t } = useLanguage();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatar) return;

    setIsUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("avatar", avatar);

      const response = await fetch("/api/user/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Avatar uploaded successfully!");
        if (user) {
          updateUser({ ...user, avatar: data.avatar });
        }
        setAvatar(null);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to upload avatar");
      }
    } catch (error) {
      setMessage("Error uploading avatar");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Profile updated successfully!");
        if (user) {
          updateUser({
            ...user,
            firstName: formData.firstName,
            lastName: formData.lastName,
          });
        }
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to update profile");
      }
    } catch (error) {
      setMessage("Error updating profile");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-light-grey min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-eco-green hover:text-eco-green/80 mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-dark-charcoal mb-8">
              {t("common.profile")}
            </h1>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.includes("success") ||
                  message.includes("successfully")
                    ? "bg-eco-green/20 text-eco-green border border-eco-green"
                    : "bg-red-100 text-red-600 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Avatar Section */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-xl font-bold text-dark-charcoal mb-6">
                Profile Picture
              </h2>
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1">
                  {/* Avatar Preview */}
                  <div className="w-24 h-24 rounded-full bg-eco-green/10 flex items-center justify-center overflow-hidden border-4 border-eco-green">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-3xl font-bold text-eco-green">
                        {user?.firstName?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-6 py-3 border-2 border-eco-green text-eco-green font-semibold rounded-lg hover:bg-eco-green hover:text-white transition-colors mb-4 flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    {t("submission.uploadPhoto")}
                  </button>

                  {avatar && (
                    <button
                      onClick={handleAvatarUpload}
                      disabled={isUploading}
                      className="w-full px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUploading ? "Uploading..." : "Confirm Upload"}
                    </button>
                  )}

                  <p className="text-sm text-dark-charcoal/60 mt-4">
                    JPG, PNG or GIF (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-dark-charcoal mb-6">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    {t("auth.firstName")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
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
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* Account Information */}
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-xl font-bold text-dark-charcoal mb-6">
                Account Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-dark-charcoal/60">
                    Email Address
                  </p>
                  <p className="text-lg text-dark-charcoal">{user?.email}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-dark-charcoal/60">
                    Account Type
                  </p>
                  <p className="text-lg text-dark-charcoal capitalize">
                    {user?.role}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-dark-charcoal/60">
                    Total Points
                  </p>
                  <p className="text-lg text-eco-green font-bold">
                    {user?.points}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-dark-charcoal/60">
                    Current Rank
                  </p>
                  <p className="text-lg text-ocean-blue font-bold">
                    {user?.rank}
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="w-full px-6 py-4 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
            >
              <Save className="w-5 h-5" />
              {isLoading ? "Saving..." : t("common.save")}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
