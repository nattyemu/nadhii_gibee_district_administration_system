import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

const SectorForm = ({ isOpen, onClose, onSave, sectorData, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "administrative",
    description: "",
    image: "",
    address: "",
    phone: "",
    email: "",
    hours: "",
    services: [],
    officials: [],
    status: {
      employees: 0,
      facilities: 0,
      serving: "",
      schools: 0,
      students: "",
      programs: 0,
      farmers: "",
      projects: 0,
      roads: "",
      budget: "",
      departments: 0,
    },
  });

  const [newService, setNewService] = useState("");
  const [newOfficial, setNewOfficial] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission control

  const categories = [
    "administrative",
    "health",
    "education",
    "agriculture",
    "infrastructure",
    "finance",
  ];

  // Category-specific status field configurations
  const categoryStatusFields = {
    administrative: [
      { name: "employees", label: "Employees", type: "number" },
      { name: "departments", label: "Departments", type: "number" },
      { name: "serving", label: "Serving Population", type: "text" },
    ],
    health: [
      { name: "employees", label: "Medical Staff", type: "number" },
      { name: "facilities", label: "Health Facilities", type: "number" },
      { name: "serving", label: "Patients Served", type: "text" },
      { name: "programs", label: "Health Programs", type: "number" },
    ],
    education: [
      { name: "employees", label: "Teachers", type: "number" },
      { name: "schools", label: "Schools", type: "number" },
      { name: "students", label: "Students", type: "text" },
      { name: "programs", label: "Educational Programs", type: "number" },
    ],
    agriculture: [
      { name: "employees", label: "Agricultural Experts", type: "number" },
      { name: "farmers", label: "Farmers Supported", type: "text" },
      { name: "programs", label: "Agricultural Programs", type: "number" },
      { name: "projects", label: "Ongoing Projects", type: "number" },
    ],
    infrastructure: [
      { name: "employees", label: "Engineers & Staff", type: "number" },
      { name: "projects", label: "Active Projects", type: "number" },
      { name: "roads", label: "Roads Maintained (km)", type: "text" },
      { name: "budget", label: "Annual Budget", type: "text" },
    ],
    finance: [
      { name: "employees", label: "Financial Staff", type: "number" },
      { name: "departments", label: "Financial Units", type: "number" },
      { name: "budget", label: "Managed Budget", type: "text" },
      { name: "programs", label: "Financial Programs", type: "number" },
    ],
  };

  useEffect(() => {
    if (isEditing && sectorData) {
      setFormData({
        name: sectorData.name || "",
        category: sectorData.category || "administrative",
        description: sectorData.description || "",
        image: sectorData.image || "",
        address: sectorData.address || "",
        phone: sectorData.phone || "",
        email: sectorData.email || "",
        hours: sectorData.hours || "",
        services: sectorData.services || [],
        officials: sectorData.officials || [],
        status: sectorData.status || {
          employees: 0,
          facilities: 0,
          serving: "",
          schools: 0,
          students: "",
          programs: 0,
          farmers: "",
          projects: 0,
          roads: "",
          budget: "",
          departments: 0,
        },
      });
      setImagePreview(sectorData.image || "");
    } else {
      setFormData({
        name: "",
        category: "administrative",
        description: "",
        image: "",
        address: "",
        phone: "",
        email: "",
        hours: "",
        services: [],
        officials: [],
        status: {
          employees: 0,
          facilities: 0,
          serving: "",
          schools: 0,
          students: "",
          programs: 0,
          farmers: "",
          projects: 0,
          roads: "",
          budget: "",
          departments: 0,
        },
      });
      setImagePreview("");
      setImageFile(null);
    }
    // Reset submitting state when form opens/closes
    setIsSubmitting(false);
  }, [isEditing, sectorData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        [name]:
          name.includes("employees") ||
          name.includes("facilities") ||
          name.includes("schools") ||
          name.includes("programs") ||
          name.includes("projects") ||
          name.includes("departments")
            ? parseInt(value) || 0
            : value,
      },
    }));
  };

  const handleAddService = () => {
    if (newService.trim() && !isSubmitting) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }));
      setNewService("");
    }
  };

  const handleRemoveService = (index) => {
    if (!isSubmitting) {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddOfficial = () => {
    if (newOfficial.trim() && !isSubmitting) {
      setFormData((prev) => ({
        ...prev,
        officials: [...prev.officials, newOfficial.trim()],
      }));
      setNewOfficial("");
    }
  };

  const handleRemoveOfficial = (index) => {
    if (!isSubmitting) {
      setFormData((prev) => ({
        ...prev,
        officials: prev.officials.filter((_, i) => i !== index),
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
      await onSave(formData, imageFile, sectorData?.image);
      // The onSave function should handle closing the form or resetting the state
      // If onSave doesn't close the form, you might want to reset isSubmitting here
    } catch (error) {
      // console.error("Error saving sector:", error);
      setIsSubmitting(false);
    }
    // Note: We don't reset isSubmitting here because the form should close on successful save
    // If the parent component doesn't close the form on save, you'll need to handle that differently
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

  // Get current category status fields
  const currentStatusFields = categoryStatusFields[formData.category] || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Sector" : "Add New Sector"}
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
                Sector Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter sector name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
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
              placeholder="Describe the sector..."
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Sector address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Hours *
              </label>
              <input
                type="text"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., Mon-Fri: 8:30 AM - 5:30 PM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Email address"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector Image
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

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services Offered
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add a service..."
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddService();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddService}
                disabled={isSubmitting || !newService.trim()}
                className="bg-[#21203C] text-white px-4 py-2 rounded-lg hover:bg-[#2D2B4A] transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    disabled={isSubmitting}
                    className="ml-2 text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Officials */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Officials
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newOfficial}
                onChange={(e) => setNewOfficial(e.target.value)}
                placeholder="Add an official..."
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddOfficial();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddOfficial}
                disabled={isSubmitting || !newOfficial.trim()}
                className="bg-[#21203C] text-white px-4 py-2 rounded-lg hover:bg-[#2D2B4A] transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.officials.map((official, index) => (
                <div
                  key={index}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {official}
                  <button
                    type="button"
                    onClick={() => handleRemoveOfficial(index)}
                    disabled={isSubmitting}
                    className="ml-2 text-purple-600 hover:text-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Status Information - Category Specific */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {formData.category.charAt(0).toUpperCase() +
                formData.category.slice(1)}{" "}
              Status Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentStatusFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData.status[field.name]}
                    onChange={handleStatusChange}
                    min={field.type === "number" ? "0" : undefined}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
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
                "Update Sector"
              ) : (
                "Create Sector"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectorForm;
