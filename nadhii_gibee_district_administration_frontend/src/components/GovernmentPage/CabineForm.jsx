import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Mail,
  Phone,
  Building2,
  User,
  Image,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

const CabineForm = ({
  isOpen,
  onClose,
  onSave,
  cabinetData = null,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    position: "",
    image: "",
    phone: "",
    email: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [originalImage, setOriginalImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  // Effect 1: Reset form when opening for NEW cabinet
  useEffect(() => {
    if (isOpen && !isEditing) {
      setFormData({
        name: "",
        title: "",
        position: "",
        image: "",
        phone: "",
        email: "",
      });
      setOriginalImage("");
      setImageFile(null);
    }
    setIsSubmitting(false);
  }, [isOpen, isEditing]);

  // Effect 2: Load data when editing EXISTING cabinet
  useEffect(() => {
    if (isOpen && isEditing && cabinetData) {
      setFormData({
        name: cabinetData.name || "",
        title: cabinetData.title || "",
        position: cabinetData.position || "",
        image: getImageUrl(cabinetData.image),
        phone: cabinetData.phone || "",
        email: cabinetData.email || "",
      });

      if (cabinetData.image && !cabinetData.image.startsWith("blob:")) {
        setOriginalImage(getImageUrl(cabinetData.image));
      }
      setImageFile(null);
    }
  }, [isOpen, isEditing, cabinetData]);

  const handleInputChange = (field, value) => {
    if (isSubmitting) return;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (file) => {
    if (isSubmitting) return;
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: previewUrl,
      }));
    }
  };

  const clearImage = () => {
    if (isSubmitting) return;
    setImageFile(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.title ||
      !formData.position ||
      !formData.image
    ) {
      toast.error(
        "Please fill all required fields (Name, Title, Position, and Image)"
      );
      return false;
    }

    if (formData.phone && formData.phone.trim() !== "") {
      const phoneRegex = /^(0\d{9}|\+\d{12})$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error(
          "Please enter a valid phone number (0XXXXXXXXX or +251XXXXXXXXX)"
        );
        return false;
      }
    }

    if (formData.email && formData.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const saveData = {
        name: formData.name,
        title: formData.title,
        position: formData.position,
        image:
          imageFile || formData.image.startsWith("blob:") ? "" : formData.image,
        phone: formData.phone || "",
        email: formData.email || "",
        order: 0,
      };

      await onSave(saveData, imageFile);
      onClose();
    } catch (error) {
      // console.error("Error saving cabinet:", error);
      toast.error(
        "Error saving cabinet: " + (error.message || "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F5F4FF] bg-gradient-to-r from-[#21203C] to-[#2D2B4A]">
          <div className="flex items-center space-x-3">
            <Building2 className="text-[#E5E4FF]" size={24} />
            <h2 className="text-xl font-bold text-white">
              {isEditing ? "Edit Cabine" : "Add New Cabine"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-[#E5E4FF] hover:text-yellow-400 transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-120px)] bg-[#F5F4FF]"
        >
          <div className="p-6 space-y-8">
            {/* Section 1: Basic Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F5F4FF]">
              <h3 className="text-lg font-semibold text-[#21203C] mb-4 flex items-center">
                <User className="mr-2" size={20} />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#21203C]">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="e.g., Finance Office"
                  />
                </div>

                {/* Position Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#21203C]">
                    Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) =>
                      handleInputChange("position", e.target.value)
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="e.g., Finance Manager"
                  />
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#21203C]">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="e.g., Finance Office or finance-office"
                    pattern="[a-zA-Z0-9-\s]+"
                    title="Only letters, numbers, spaces, and hyphens allowed"
                  />
                  <p className="text-xs text-gray-600">
                    Letters, numbers, spaces, and hyphens allowed
                  </p>
                </div>

                <div></div>
              </div>
            </div>

            {/* Section 2: Image Upload */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F5F4FF]">
              <h3 className="text-lg font-semibold text-[#21203C] mb-4 flex items-center">
                <Image className="mr-2" size={20} />
                Image
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#21203C] mb-2">
                      Upload Image *
                      {isEditing && originalImage && !imageFile && (
                        <span className="text-xs text-green-600 ml-2">
                          (Current image will be kept)
                        </span>
                      )}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required={!isEditing || !formData.image}
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#21203C] file:text-white hover:file:bg-[#2D2B4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {formData.image && (
                    <button
                      type="button"
                      onClick={clearImage}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Clear Image
                    </button>
                  )}
                </div>

                {formData.image && (
                  <div className="flex items-center space-x-4 p-4 bg-[#F5F4FF] rounded-lg border border-gray-200">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#21203C]">
                        {imageFile ? "New Image Selected" : "Current Image"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {imageFile
                          ? `File: ${imageFile.name}`
                          : "Image will be kept"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F5F4FF]">
              <h3 className="text-lg font-semibold text-[#21203C] mb-4 flex items-center">
                <Mail className="mr-2" size={20} />
                Contact Information (Optional)
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#21203C] flex items-center">
                    <Phone className="mr-2" size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="+251 XX XXX XXXX or 0XXXXXXXXX"
                    pattern="^(0\d{9}|\+\d{12})$"
                  />
                  <p className="text-xs text-gray-600">
                    Format: 0XXXXXXXXX or +251XXXXXXXXX
                  </p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#21203C] flex items-center">
                    <Mail className="mr-2" size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="cabine@domain.gov.et"
                  />
                  <p className="text-xs text-gray-600">
                    Optional email address
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-300 bg-gray-50">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-3 text-sm font-medium text-[#21203C] bg-white border border-gray-300 rounded-lg hover:bg-[#F5F4FF] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-sm font-medium text-white bg-[#21203C] rounded-lg hover:bg-[#2D2B4A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isEditing ? "Updating..." : "Saving..."}</span>
                </>
              ) : isEditing ? (
                "Update Cabine"
              ) : (
                "Create Cabine"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CabineForm;
