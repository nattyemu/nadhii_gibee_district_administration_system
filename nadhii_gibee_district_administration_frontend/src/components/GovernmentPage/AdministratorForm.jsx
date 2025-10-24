import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Plus,
  Trash2,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";

const AdministratorForm = ({
  isOpen,
  onClose,
  onSave,
  administratorData = null,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    bio: "",
    tenure: "",
    message: "",
    email: "",
    phone: "",
    office: "",
    achievements: [],
  });
  const [achievementInput, setAchievementInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (administratorData && isEditing) {
      const initialData = {
        name: administratorData.name || "",
        title: administratorData.title || "",
        image: administratorData.image || "",
        bio: administratorData.bio || "",
        tenure: administratorData.tenure || "",
        message: administratorData.message || "",
        email: administratorData.email || "",
        phone: administratorData.phone || "",
        office: administratorData.office || "",
        achievements: administratorData.achievements || [],
      };

      setFormData(initialData);
      setOriginalImage(administratorData.image || "");
      setImagePreview(administratorData.image || "");
    } else {
      // Reset form for new administrator
      setFormData({
        name: "",
        title: "",
        image: "",
        bio: "",
        tenure: "",
        message: "",
        email: "",
        phone: "",
        office: "",
        achievements: [],
      });
      setOriginalImage("");
      setImagePreview("");
      setImageFile(null);
    }
    setErrors({});
    setTouched({});
    setAchievementInput("");
  }, [administratorData, isEditing, isOpen]);

  // Phone validation regex
  const phoneRegex = /^(0\d{9}|\+\d{12})$/;

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        "Please enter a valid phone number (0XXXXXXXXX or +251XXXXXXXXX)";
    }

    // Bio validation
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    } else if (formData.bio.trim().length < 50) {
      newErrors.bio = "Bio must be at least 50 characters long";
    } else if (formData.bio.trim().length > 1000) {
      newErrors.bio = "Bio cannot exceed 1000 characters";
    }

    // Tenure validation
    if (!formData.tenure.trim()) {
      newErrors.tenure = "Tenure is required";
    } else if (formData.tenure.trim().length < 5) {
      newErrors.tenure =
        "Please enter a valid tenure period (e.g., 2020 - Present)";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters long";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message cannot exceed 500 characters";
    }

    // Office validation
    if (formData.office.trim() && formData.office.trim().length < 5) {
      newErrors.office = "Office location must be at least 5 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters long";
        } else {
          delete newErrors.name;
        }
        break;

      case "title":
        if (!value.trim()) {
          newErrors.title = "Title is required";
        } else if (value.trim().length < 5) {
          newErrors.title = "Title must be at least 5 characters long";
        } else {
          delete newErrors.title;
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        if (value.trim() && !phoneRegex.test(value.trim())) {
          newErrors.phone =
            "Please enter a valid phone number (0XXXXXXXXX or +251XXXXXXXXX)";
        } else {
          delete newErrors.phone;
        }
        break;

      case "bio":
        if (!value.trim()) {
          newErrors.bio = "Bio is required";
        } else if (value.trim().length < 50) {
          newErrors.bio = "Bio must be at least 50 characters long";
        } else if (value.trim().length > 1000) {
          newErrors.bio = "Bio cannot exceed 1000 characters";
        } else {
          delete newErrors.bio;
        }
        break;

      case "tenure":
        if (!value.trim()) {
          newErrors.tenure = "Tenure is required";
        } else if (value.trim().length < 5) {
          newErrors.tenure =
            "Please enter a valid tenure period (e.g., 2020 - Present)";
        } else {
          delete newErrors.tenure;
        }
        break;

      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.trim().length < 20) {
          newErrors.message = "Message must be at least 20 characters long";
        } else if (value.trim().length > 500) {
          newErrors.message = "Message cannot exceed 500 characters";
        } else {
          delete newErrors.message;
        }
        break;

      case "office":
        if (value.trim() && value.trim().length < 5) {
          newErrors.office =
            "Office location must be at least 5 characters long";
        } else {
          delete newErrors.office;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Real-time validation for touched fields
    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    const allFields = [
      "name",
      "title",
      "email",
      "phone",
      "bio",
      "tenure",
      "message",
      "office",
    ];
    const allTouched = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData, imageFile, originalImage);
      onClose();
    } catch (error) {
      console.error("Error saving administrator:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAchievement = () => {
    if (
      achievementInput.trim() &&
      !formData.achievements.includes(achievementInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput("");
    }
  };

  const handleRemoveAchievement = (achievementToRemove) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter(
        (achievement) => achievement !== achievementToRemove
      ),
    }));
  };

  const handleAchievementInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAchievement();
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
    setImagePreview(url);
    setImageFile(null); // Clear file when URL is entered
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Clear URL input when file is selected
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({
      ...prev,
      image: originalImage,
    }));
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  // Helper function to check if field should show error
  const shouldShowError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Administrator" : "Add New Administrator"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    shouldShowError("name")
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter full name"
                />
                {shouldShowError("name") && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title/Position *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  onBlur={() => handleBlur("title")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    shouldShowError("title")
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="e.g., Chief Administrator of Nadhii Gibee District"
                />
                {shouldShowError("title") && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.title}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className={`absolute left-3 top-3 ${
                      shouldShowError("email")
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      shouldShowError("email")
                        ? "border-red-500 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter email address"
                  />
                </div>
                {shouldShowError("email") && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className={`absolute left-3 top-3 ${
                      shouldShowError("phone")
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      shouldShowError("phone")
                        ? "border-red-500 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="0XXXXXXXXX or +251XXXXXXXXX"
                  />
                </div>
                {shouldShowError("phone") && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.phone}
                  </div>
                )}
                {!errors.phone && formData.phone && (
                  <p className="text-green-600 text-xs mt-1">
                    ✓ Valid phone number
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure Period *
                </label>
                <input
                  type="text"
                  name="tenure"
                  value={formData.tenure}
                  onChange={(e) => handleChange("tenure", e.target.value)}
                  onBlur={() => handleBlur("tenure")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    shouldShowError("tenure")
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="e.g., 2020 - Present"
                />
                {shouldShowError("tenure") && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.tenure}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Location
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className={`absolute left-3 top-3 ${
                      shouldShowError("office")
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    name="office"
                    value={formData.office}
                    onChange={(e) => handleChange("office", e.target.value)}
                    onBlur={() => handleBlur("office")}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      shouldShowError("office")
                        ? "border-red-500 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter office location"
                  />
                </div>
                {shouldShowError("office") && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.office}
                  </div>
                )}
              </div>
            </div>

            {/* Image Section with Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                {(imageFile || imagePreview) && (
                  <button
                    type="button"
                    onClick={clearImageSelection}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear Image
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Input */}
                <div className="space-y-4">
                  {/* URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <Upload
                        size={16}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        type="text"
                        value={formData.image}
                        onChange={handleImageUrlChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                        disabled={!!imageFile}
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or Upload Image File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Image Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-48 flex items-center justify-center">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={getImageUrl(imagePreview)}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {imageFile ? "New Image" : "Current Image"}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImageIcon size={32} className="mx-auto mb-2" />
                        <p>No image selected</p>
                        <p className="text-sm">Preview will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography *
                <span className="text-xs text-gray-500 ml-2">
                  {formData.bio.length}/1000 characters
                </span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                onBlur={() => handleBlur("bio")}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                  shouldShowError("bio")
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter administrator biography (minimum 50 characters)"
              />
              {shouldShowError("bio") && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.bio}
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message from Administrator *
                <span className="text-xs text-gray-500 ml-2">
                  {formData.message.length}/500 characters
                </span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                  shouldShowError("message")
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter inspirational message from the administrator (minimum 20 characters)"
              />
              {shouldShowError("message") && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.message}
                </div>
              )}
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Achievements
              </label>
              <div className="flex gap-2 mb-2">
                <div className="relative flex-1">
                  <Award
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={achievementInput}
                    onChange={(e) => setAchievementInput(e.target.value)}
                    onKeyPress={handleAchievementInputKeyPress}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add an achievement and press Enter"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-blue-50 text-blue-800 px-3 py-2 rounded-lg"
                  >
                    <span>{achievement}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(achievement)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Administrator"
                : "Add Administrator"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdministratorForm;
