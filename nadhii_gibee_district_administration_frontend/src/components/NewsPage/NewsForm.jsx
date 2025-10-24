import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Calendar,
  MapPin,
  User,
  Tag,
  Image as ImageIcon,
} from "lucide-react";

const NewsForm = ({
  isOpen,
  onClose,
  onSave,
  newsData = null,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    type: "news",
    category: "Development",
    image: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    location: "",
    tags: [],
    featured: false,
    urgent: false,
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [originalImage, setOriginalImage] = useState("");

  // Content types and categories based on your model
  const contentTypes = [
    { value: "news", label: "News" },
    { value: "announcement", label: "Announcement" },
    { value: "event", label: "Event" },
  ];

  const categories = [
    { value: "Development", label: "Development" },
    { value: "Community", label: "Community" },
    { value: "Culture", label: "Culture" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Infrastructure", label: "Infrastructure" },
    { value: "Announcement", label: "Announcement" },
  ];

  // Initialize form with existing data when editing
  useEffect(() => {
    if (newsData && isEditing) {
      const initialData = {
        title: newsData.title || "",
        excerpt: newsData.excerpt || "",
        content: newsData.content || "",
        type: newsData.type || "news",
        category: newsData.category || "Development",
        image: newsData.image || "",
        date: newsData.date
          ? new Date(newsData.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        author: newsData.author || "",
        location: newsData.location || "",
        tags: newsData.tags || [],
        featured: newsData.featured || false,
        urgent: newsData.urgent || false,
      };

      setFormData(initialData);
      setOriginalImage(newsData.image || "");
      setImagePreview(newsData.image || "");
    } else {
      // Reset form for new news
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        type: "news",
        category: "Development",
        image: "",
        date: new Date().toISOString().split("T")[0],
        author: "",
        location: "",
        tags: [],
        featured: false,
        urgent: false,
      });
      setOriginalImage("");
      setImagePreview("");
      setImageFile(null);
    }
    setErrors({});
    setTagInput("");
  }, [newsData, isEditing, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title cannot exceed 200 characters";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    } else if (formData.excerpt.length > 500) {
      newErrors.excerpt = "Excerpt cannot exceed 500 characters";
    }

    if (!formData.image.trim() && !imageFile) {
      newErrors.image = "Image URL or file is required";
    }

    if (!formData.date) {
      newErrors.date = "Publication date is required";
    }

    if (formData.author && formData.author.length > 100) {
      newErrors.author = "Author name cannot exceed 100 characters";
    }

    if (formData.location && formData.location.length > 100) {
      newErrors.location = "Location cannot exceed 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Extract filename from original image URL for update operations
      let oldImageFilename = null;
      if (isEditing && originalImage) {
        const urlParts = originalImage.split("/");
        oldImageFilename = urlParts[urlParts.length - 1];
      }

      await onSave(formData, imageFile, oldImageFilename);
      onClose();
    } catch (error) {
      console.error("Error saving news:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit News Article" : "Add New News Article"}
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
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    // COLOR CHANGE: green-500 -> blue-500
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter news title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // COLOR CHANGE: green-500 -> blue-500
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  // COLOR CHANGE: green-500 -> blue-500
                  errors.excerpt ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter brief excerpt"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                {formData.excerpt.length}/500 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // COLOR CHANGE: green-500 -> blue-500
                placeholder="Enter full content (optional)"
              />
            </div>

            {/* Image Section with Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Image *
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
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          // COLOR CHANGE: green-500 -> blue-500
                          errors.image ? "border-red-500" : "border-gray-300"
                        }`}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // COLOR CHANGE: green-500 -> blue-500
                    />
                  </div>

                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
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

            {/* Media and Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // COLOR CHANGE: green-500 -> blue-500
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publication Date *
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      // COLOR CHANGE: green-500 -> blue-500
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                {/* This space is now used by the image section above */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      // COLOR CHANGE: green-500 -> blue-500
                      errors.author ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter author name"
                  />
                </div>
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      // COLOR CHANGE: green-500 -> blue-500
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter location"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <div className="relative flex-1">
                  <Tag
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // COLOR CHANGE: green-500 -> blue-500
                    placeholder="Add a tag and press Enter"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" // COLOR CHANGE: green-600 -> blue-600, green-700 -> blue-700
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm" // COLOR CHANGE: bg-green-100 -> bg-blue-100, text-green-800 -> text-blue-800
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800" // COLOR CHANGE: text-green-600 -> text-blue-600, hover:text-green-800 -> hover:text-blue-800
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Flags */}
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" // COLOR CHANGE: text-green-600 -> text-blue-600, focus:ring-green-500 -> focus:ring-blue-500
                />
                <span className="ml-2 text-sm text-gray-700">
                  Featured Article
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.urgent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      urgent: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" // COLOR CHANGE: text-green-600 -> text-blue-600, focus:ring-green-500 -> focus:ring-blue-500
                />
                <span className="ml-2 text-sm text-gray-700">Urgent News</span>
              </label>
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
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" // COLOR CHANGE: bg-green-600 -> bg-blue-600, hover:bg-green-700 -> hover:bg-blue-700
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update News"
                : "Add News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
