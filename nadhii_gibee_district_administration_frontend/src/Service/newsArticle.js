import axios from "../Utilities/Axios";

// Create a self-reference for internal method calls
const api = {
  // Your methods will go here
};

export default {
  getNewsArticles: async () => {
    try {
      const response = await axios.get(`/news-article/`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error fetching news articles:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch news articles",
          data: [],
        }
      );
    }
  },

  getUpdatedNewsArticles: async () => {
    try {
      const response = await axios.get(`/news-article/updated`);
      // console.log("updated article", response.data);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error fetching updated news articles:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch updated news articles",
          data: [],
        }
      );
    }
  },

  getNewsArticle: async (form) => {
    try {
      const response = await axios.get(`/news-article/${form.id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error fetching news article:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch news article",
          data: [],
        }
      );
    }
  },

  // Image Upload Methods (single uploadImage method)
  uploadImage: async (type, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`/upload/${type}`, formData);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error uploading image:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to upload image",
        }
      );
    }
  },

  updateImage: async (type, file, oldFilename = null) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // If oldFilename is provided, include it in the URL for deletion
      const url = oldFilename
        ? `/upload/${type}/${oldFilename}`
        : `/upload/${type}`;

      const response = await axios.put(url, formData);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error updating image:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update image",
        }
      );
    }
  },

  deleteImage: async (type, filename) => {
    try {
      const response = await axios.delete(`/upload/${type}/${filename}`);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error deleting image:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete image",
        }
      );
    }
  },

  // News CRUD Methods
  updateNews: async (form) => {
    // console.log(form);
    try {
      const response = await axios.put(`/news-article/${form.id}`, form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update news",
        }
      );
    }
  },

  deleteNews: async (form) => {
    // console.log(form);
    try {
      const response = await axios.delete(`/news-article/${form.id}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete news",
        }
      );
    }
  },

  addNews: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/news-article/", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return (
        error.response?.data || {
          success: false,
          message: "Failed to add news",
        }
      );
    }
  },

  // Combined operations - fixed to use direct axios calls
  updateNewsWithImage: async (
    newsId,
    newsData,
    newImageFile,
    oldImageFilename
  ) => {
    try {
      let updatedData = { ...newsData };

      // If new image is provided, update it
      if (newImageFile) {
        const formData = new FormData();
        formData.append("image", newImageFile);

        const url = oldImageFilename
          ? `/upload/news/${oldImageFilename}`
          : `/upload/news`;

        const imageResponse = await axios.put(url, formData);

        if (imageResponse.data.success) {
          // Use the correct field name - might be 'image' instead of 'imageUrl'
          updatedData.image = imageResponse.data.url;
          // Also try imageUrl if that's what your model expects
          updatedData.imageUrl = imageResponse.data.url;
        }
      }

      // console.log("Sending update data:", updatedData); // Add this to debug

      // Update news with new data
      const newsResponse = await axios.put(
        `/news-article/${newsId}`,
        updatedData
      );

      return newsResponse.data;
    } catch (error) {
      // console.error("Error updating news with image:", error);
      // console.error("Error response:", error.response?.data); // Add this to see validation details
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update news with image",
        }
      );
    }
  },
  // Delete news and its associated image
  // Delete news and its associated image
  deleteNewsWithImage: async (newsId, imageUrl) => {
    try {
      // Extract filename from image URL
      let imageFilename = null;
      if (imageUrl) {
        const urlParts = imageUrl.split("/");
        imageFilename = urlParts[urlParts.length - 1];
      }

      // console.log(`Deleting news ${newsId} with image: ${imageFilename}`);

      // Delete the news article first
      const newsResponse = await axios.delete(`/news-article/${newsId}`);

      // If news deleted successfully and image exists, delete the image
      if (newsResponse.data.success && imageFilename) {
        try {
          await axios.delete(`/upload/news/${imageFilename}`);
          // console.log(
          //   `✅ Successfully deleted associated image: ${imageFilename}`
          // );
        } catch (imageError) {
          // console.warn(
          //   `⚠️ Failed to delete image ${imageFilename}:`,
          //   imageError.response?.data || imageError.message
          // );
          // Continue even if image deletion fails
        }
      }

      return newsResponse.data;
    } catch (error) {
      // console.error("❌ Error deleting news with image:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete news with image",
        }
      );
    }
  },

  // Bulk delete images
  bulkDeleteImages: async (type, filenames) => {
    try {
      const response = await axios.delete(`/upload/${type}`, {
        data: { filenames },
      });
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error bulk deleting images:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete images",
        }
      );
    }
  },
};
