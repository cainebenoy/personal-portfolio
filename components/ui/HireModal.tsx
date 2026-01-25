"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { name: string; email: string; phone: string }) => Promise<void>;
}

export default function HireModal({ isOpen, onClose, onSubmit }: HireModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Phone is required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ name: "", email: "", phone: "" });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
      <div className="bg-paper border-2 border-ink rounded-lg shadow-xl p-8 max-w-md w-full mx-4 animate-in fade-in scale-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-ink" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="font-display text-2xl text-ink">Let's Work Together</h3>
          <p className="font-hand text-ink/70 mt-2">Tell me about yourself</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-code text-xs text-ink mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border-2 border-ink rounded bg-white text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight transition-all"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-code text-xs text-ink mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border-2 border-ink rounded bg-white text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight transition-all"
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block font-code text-xs text-ink mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-2 border-2 border-ink rounded bg-white text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight transition-all"
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border-2 border-red-300 rounded text-red-700 font-code text-xs">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border-2 border-ink text-ink rounded font-code text-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-highlight text-white rounded font-code text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
