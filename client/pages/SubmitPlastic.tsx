import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef } from "react";
import { Send, Upload, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useNavigate } from "react-router-dom";

const PLASTIC_TYPES = [
  { value: "PET", label: "PET (Plastic bottles, containers)" },
  { value: "HDPE", label: "HDPE (Milk jugs, detergent bottles)" },
  { value: "PVC", label: "PVC (Pipes, vinyl)" },
  { value: "LDPE", label: "LDPE (Plastic bags, squeeze bottles)" },
  { value: "PP", label: "PP (Yogurt containers, bottle caps)" },
  { value: "PS", label: "PS (Foam cups, takeout containers)" },
  { value: "Other", label: "Other" },
];

export default function SubmitPlastic() {
  const { user, token, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    plasticType: "PET",
    weight: "",
    quantity: "",
    location: "",
    description: "",
  });
  const { t } = useLanguage();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("plasticType", formData.plasticType);
      submitFormData.append("weight", formData.weight);
      submitFormData.append("quantity", formData.quantity);
      submitFormData.append("location", formData.location);
      submitFormData.append("description", formData.description);

      if (photo) {
        submitFormData.append("photo", photo);
      }

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitFormData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Submission successful! Points will be added after verification.",
        );
        // Reset form
        setFormData({
          plasticType: "PET",
          weight: "",
          quantity: "",
          location: "",
          description: "",
        });
        setPhoto(null);
        setPhotoPreview(null);

        // Update user with new points
        if (user && data.submission) {
          const newPoints = user.points + data.submission.pointsEarned;
          const ranks = ["Bronze", "Silver", "Gold", "Platinum"];
          let newRank = "Bronze";
          if (newPoints >= 5000) newRank = "Platinum";
          else if (newPoints >= 3000) newRank = "Gold";
          else if (newPoints >= 1000) newRank = "Silver";

          updateUser({
            ...user,
            points: newPoints,
            rank: newRank,
          });
        }

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage("Failed to submit plastic. Please try again.");
      }
    } catch (error) {
      setMessage("Error submitting plastic");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-light-grey min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-eco-green hover:text-eco-green/80 mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-dark-charcoal mb-2">
              {t("submission.submitPlastic")}
            </h1>
            <p className="text-dark-charcoal/60 mb-8">
              Help us track and manage plastic recycling. Fill in the details
              below.
            </p>

            {/* Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.includes("success") || message.includes("successful")
                    ? "bg-eco-green/20 text-eco-green border border-eco-green"
                    : "bg-red-100 text-red-600 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Plastic Type */}
              <div>
                <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                  {t("submission.plasticType")} *
                </label>
                <select
                  name="plasticType"
                  value={formData.plasticType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition bg-white"
                >
                  {PLASTIC_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-dark-charcoal/50 mt-2">
                  Select the type of plastic you're submitting
                </p>
              </div>

              {/* Weight and Quantity Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    {t("submission.weight")} *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0.5"
                    step="0.1"
                    min="0"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                    {t("submission.quantity")} *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="5"
                    min="1"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                  {t("submission.location")} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Collection center name or address"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-dark-charcoal mb-2">
                  {t("submission.description")}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add any additional details about the plastic..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-dark-charcoal mb-4">
                  {t("submission.uploadPhoto")}
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                {photoPreview ? (
                  <div className="mb-4">
                    <img
                      src={photoPreview}
                      alt="Photo preview"
                      className="max-h-48 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null);
                        setPhotoPreview(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="mt-3 text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-6 py-8 border-2 border-dashed border-eco-green rounded-lg hover:bg-eco-green/5 transition-colors flex flex-col items-center justify-center gap-3"
                  >
                    <Upload className="w-8 h-8 text-eco-green" />
                    <div className="text-center">
                      <p className="font-semibold text-dark-charcoal">
                        Click to upload a photo
                      </p>
                      <p className="text-sm text-dark-charcoal/60">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </button>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-eco-green/10 border border-eco-green/30 rounded-lg p-6">
                <h3 className="font-semibold text-dark-charcoal mb-3">
                  Points Calculation
                </h3>
                <p className="text-sm text-dark-charcoal/70">
                  Your points are calculated based on the plastic type and
                  weight submitted. The submission will be verified by our team,
                  and points will be awarded upon confirmation.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-green/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
              >
                <Send className="w-5 h-5" />
                {isLoading ? "Submitting..." : t("submission.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
