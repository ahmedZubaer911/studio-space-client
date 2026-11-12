"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export default function AddStudioPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageUrl: "",
    overview: "",
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!API_URL) return;

        const response = await fetch(`${API_URL}/studios/categories`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Failed to fetch categories.");
        }

        const availableCategories = Array.isArray(result.data)
          ? result.data.filter(
              (category: string): category is string =>
                typeof category === "string" && category.trim() !== "",
            )
          : [];

        setCategories(availableCategories);
      } catch (error) {
        console.error("Category loading error:", error);
        toast.error("Failed to load studio categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
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

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    if (amenities.some((item) => item.toLowerCase() === value.toLowerCase())) {
      toast.error("This amenity already exists.");
      return;
    }

    setAmenities((prev) => [...prev, value]);
    setAmenityInput("");
  };

  const removeAmenity = (amenity: string) => {
    setAmenities((prev) => prev.filter((item) => item !== amenity));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!API_URL) {
      toast.error("API URL is not configured.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          hourlyRate: Number(formData.hourlyRate),
          securityDeposit: Number(formData.securityDeposit),
          maxCapacity: Number(formData.maxCapacity),
          amenities,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add studio.");
      }

      toast.success("Studio added successfully!");

      router.push(`/studios/${result.data._id}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-950";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-28 dark:bg-[#111019]">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Back Button */}
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
        >
          <ArrowLeft size={18} />
          Back to Explore Studios
        </Link>

        {/* Page Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Add a New Studio
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Share your creative space with people looking for the perfect
            studio.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-[#191824]"
        >
          {/* Basic Information */}
          <section className="space-y-5">
            <h2 className="border-b border-gray-100 pb-3 text-xl font-bold text-gray-900 dark:border-gray-800 dark:text-white">
              Basic Information
            </h2>

            <div>
              <label className={labelClass}>Studio Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Creative Photography Studio"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Category *</label>

              <select
                name="category"
                value={customCategory ? "custom" : formData.category}
                onChange={(e) => {
                  if (e.target.value === "custom") {
                    setCustomCategory(true);
                    setFormData((prev) => ({ ...prev, category: "" }));
                  } else {
                    setCustomCategory(false);
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));
                  }
                }}
                className={inputClass}
                required={!customCategory}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="custom">+ Add New Category</option>
              </select>

              {customCategory && (
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Enter new category name"
                    className={inputClass}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setCustomCategory(false);
                      setFormData((prev) => ({
                        ...prev,
                        category: "",
                      }));
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Choose an existing category instead
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className={labelClass}>Studio Overview *</label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                placeholder="Describe your studio, its purpose and what makes it special..."
                rows={5}
                className={inputClass}
                required
              />
            </div>
          </section>

          {/* Pricing and Capacity */}
          <section className="space-y-5">
            <h2 className="border-b border-gray-100 pb-3 text-xl font-bold text-gray-900 dark:border-gray-800 dark:text-white">
              Pricing and Capacity
            </h2>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Hourly Rate (৳) *</label>
                <input
                  type="number"
                  name="hourlyRate"
                  min="1"
                  max="100000"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="1200"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Security Deposit (৳) *</label>
                <input
                  type="number"
                  name="securityDeposit"
                  min="0"
                  max="100000"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  placeholder="2000"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Max Capacity *</label>
                <input
                  type="number"
                  name="maxCapacity"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  placeholder="8"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </section>

          {/* Location and Image */}
          <section className="space-y-5">
            <h2 className="border-b border-gray-100 pb-3 text-xl font-bold text-gray-900 dark:border-gray-800 dark:text-white">
              Location and Image
            </h2>

            <div>
              <label className={labelClass}>Location *</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Banani, Dhaka"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Studio Image URL *</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/studio-image.jpg"
                className={inputClass}
                required
              />
            </div>
          </section>

          {/* Amenities */}
          <section className="space-y-5">
            <h2 className="border-b border-gray-100 pb-3 text-xl font-bold text-gray-900 dark:border-gray-800 dark:text-white">
              Studio Amenities
            </h2>

            <div className="flex gap-2">
              <input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                placeholder="e.g. High-Speed Wi-Fi"
                className={inputClass}
              />

              <button
                type="button"
                onClick={addAmenity}
                className="shrink-0 rounded-xl bg-blue-600 px-4 text-white transition hover:bg-blue-700"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    aria-label={`Remove ${amenity}`}
                  >
                    <X size={15} />
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end dark:border-gray-800">
            <Link
              href="/studios"
              className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Studio..." : "Add Studio"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
