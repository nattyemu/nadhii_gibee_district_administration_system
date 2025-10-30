import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Download,
  Upload,
  Newspaper,
} from "lucide-react";
import { toast } from "react-toastify";
import newsService from "../../Service/newsArticle";
import ConfirmationModal from "../NewsPage/ConfirmationModal";
import NewsForm from "../NewsPage/NewsForm";

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [articleToEdit, setArticleToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const categories = [
    "All",
    "Infrastructure",
    "Agriculture",
    "Announcement",
    "Culture",
    "Community",
    "Development",
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsService.getNewsArticles();
      if (response.success) {
        setNews(response.data);
      } else {
        toast.error("Failed to fetch news articles");
      }
    } catch (error) {
      // console.error("Error fetching news:", error);
      toast.error("Error loading news articles");
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt &&
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (article.content &&
        article.content.toLowerCase().includes(searchTerm.toLowerCase()));

    // Fix category filter - compare with actual category values
    const matchesCategory =
      filterCategory === "all" ||
      article.category.toLowerCase() === filterCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleAddNews = () => {
    setArticleToEdit(null);
    setIsEditing(false);
    setShowNewsForm(true);
  };

  const handleEdit = (article) => {
    setArticleToEdit(article);
    setIsEditing(true);
    setShowNewsForm(true);
  };

  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      const response = await newsService.deleteNewsWithImage(
        articleToDelete.id,
        articleToDelete.image
      );

      if (response.success) {
        setNews((prev) =>
          prev.filter((item) => item.id !== articleToDelete.id)
        );
        toast.success("News article deleted successfully!");
      } else {
        toast.error("Failed to delete news article");
      }
    } catch (error) {
      // console.error("Error deleting article:", error);
      toast.error("Error deleting news article");
    } finally {
      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  const handleSaveNews = async (
    formData,
    imageFile = null,
    oldImageFilename = null
  ) => {
    try {
      let response;

      if (isEditing && articleToEdit) {
        if (imageFile && oldImageFilename) {
          response = await newsService.updateNewsWithImage(
            articleToEdit.id,
            formData,
            imageFile,
            oldImageFilename
          );
        } else {
          response = await newsService.updateNews({
            ...formData,
            id: articleToEdit.id,
          });
        }
      } else {
        if (imageFile) {
          const imageResponse = await newsService.uploadImage(
            "news",
            imageFile
          );
          if (imageResponse.success) {
            response = await newsService.addNews({
              ...formData,
              image: imageResponse.url,
            });
          } else {
            throw new Error("Failed to upload image");
          }
        } else {
          response = await newsService.addNews(formData);
        }
      }

      if (response.success) {
        await fetchNews();
        toast.success(
          isEditing ? "News updated successfully!" : "News added successfully!"
        );
        setShowNewsForm(false);
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "add"} news`);
      }
    } catch (error) {
      // console.error(`Error ${isEditing ? "updating" : "adding"} news:`, error);
      toast.error(`Error ${isEditing ? "updating" : "adding"} news article`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-1">
            Manage news articles and announcements ({filteredNews.length}{" "}
            articles)
          </p>
        </div>
        <button
          onClick={handleAddNews}
          className="mt-4 lg:mt-0 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
        >
          <Plus size={20} className="mr-2" />
          Add News Article
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C]"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Article Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={getImageUrl(article.image)}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#21203C] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
              {article.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar size={14} className="mr-1" />
                {formatDate(article.date)}
                <span className="mx-2">•</span>
                <User size={14} className="mr-1" />
                {article.author}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(article)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No news articles found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first news article."}
          </p>
          <button
            onClick={handleAddNews}
            className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            Add News Article
          </button>
        </div>
      )}

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setArticleToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete News Article"
        message={`Are you sure you want to delete "${articleToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <NewsForm
        isOpen={showNewsForm}
        onClose={() => {
          setShowNewsForm(false);
          setArticleToEdit(null);
          setIsEditing(false);
        }}
        onSave={handleSaveNews}
        newsData={articleToEdit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default AdminNews;
