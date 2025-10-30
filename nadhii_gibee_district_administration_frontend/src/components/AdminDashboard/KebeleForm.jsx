import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  MapPin,
  Users,
  BarChart3,
  Building2,
  Phone,
  Mail,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

const KebeleForm = ({ isOpen, onClose, onSave, kebeleData, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Rural Kebele",
    population: "",
    area: "",
    elevation: "",
    image: "",
    description: "",
    features: [],
    contact: {
      administrator: "",
      phone: "",
      email: "",
    },
    status: {
      schools: 0,
      healthCenters: 0,
      roads: "",
      developmentIndex: "Medium",
    },
  });

  const [newFeature, setNewFeature] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission control

  useEffect(() => {
    if (isEditing && kebeleData) {
      setFormData({
        name: kebeleData.name || "",
        type: kebeleData.type || "Rural Kebele",
        population: kebeleData.population || "",
        area: kebeleData.area || "",
        elevation: kebeleData.elevation || "",
        image: kebeleData.image || "",
        description: kebeleData.description || "",
        features: kebeleData.features || [],
        contact: {
          administrator: kebeleData.contact?.administrator || "",
          phone: kebeleData.contact?.phone || "",
          email: kebeleData.contact?.email || "",
        },
        status: {
          schools: kebeleData.status?.schools || 0,
          healthCenters: kebeleData.status?.healthCenters || 0,
          roads: kebeleData.status?.roads || "",
          developmentIndex: kebeleData.status?.developmentIndex || "Medium",
        },
      });
      setImagePreview(kebeleData.image || "");
    } else {
      // Reset form for new kebele
      setFormData({
        name: "",
        type: "Rural Kebele",
        population: "",
        area: "",
        elevation: "",
        image: "",
        description: "",
        features: [],
        contact: {
          administrator: "",
          phone: "",
          email: "",
        },
        status: {
          schools: 0,
          healthCenters: 0,
          roads: "",
          developmentIndex: "Medium",
        },
      });
      setImagePreview("");
      setImageFile(null);
    }
    // Reset submitting state when form opens/closes
    setIsSubmitting(false);
  }, [isEditing, kebeleData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        [name]:
          name === "schools" || name === "healthCenters"
            ? parseInt(value) || 0
            : value,
      },
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !isSubmitting) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    if (!isSubmitting) {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }));
    }
  };

  const handleImageChange = (e) => {
    if (isSubmitting) return;

    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSave(formData, imageFile, kebeleData?.image);
      // The onSave function should handle closing the form or resetting the state
    } catch (error) {
      // console.error("Error saving kebele:", error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Kebele" : "Add New Kebele"}
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kebele Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter kebele name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="Rural Kebele">Rural Kebele</option>
                <option value="City Kebele">City Kebele</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Population *
              </label>
              <input
                type="text"
                name="population"
                value={formData.population}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., 120,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area *
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., 1,200 km²"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Elevation
              </label>
              <input
                type="text"
                name="elevation"
                value={formData.elevation}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., 1,780 m"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Development Index
              </label>
              <select
                name="developmentIndex"
                value={formData.status.developmentIndex}
                onChange={handleStatusChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Describe the kebele..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kebele Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {imagePreview && (
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={getImageUrl(imagePreview)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Features
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature..."
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                disabled={isSubmitting || !newFeature.trim()}
                className="bg-[#21203C] text-white px-4 py-2 rounded-lg hover:bg-[#2D2B4A] transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    disabled={isSubmitting}
                    className="ml-2 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administrator *
              </label>
              <input
                type="text"
                name="administrator"
                value={formData.contact.administrator}
                onChange={handleContactChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Administrator name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.contact.phone}
                onChange={handleContactChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.contact.email}
                onChange={handleContactChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Email address"
              />
            </div>
          </div>

          {/* Status Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Schools
              </label>
              <input
                type="number"
                name="schools"
                value={formData.status.schools}
                onChange={handleStatusChange}
                min="0"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Centers
              </label>
              <input
                type="number"
                name="healthCenters"
                value={formData.status.healthCenters}
                onChange={handleStatusChange}
                min="0"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Road Network
              </label>
              <input
                type="text"
                name="roads"
                value={formData.status.roads}
                onChange={handleStatusChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., 120 km"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#21203C] text-white rounded-lg hover:bg-[#2D2B4A] transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : isEditing ? (
                "Update Kebele"
              ) : (
                "Create Kebele"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KebeleForm;
