import axios from "../Utilities/Axios";

export default {
  getAdministrators: async () => {
    try {
      const response = await axios.get(`/administrator/`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error fetching administrators:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch administrators",
          data: [],
        }
      );
    }
  },

  getAdministrator: async (form) => {
    try {
      const response = await axios.get(`/administrator/${form.id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error fetching administrator:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch administrator",
          data: null,
        }
      );
    }
  },

  // Add administrator with image
  addAdministrator: async (formData, imageFile = null) => {
    // console.log("Adding administrator:", formData);
    try {
      let finalFormData = { ...formData };

      // If image file is provided, upload it first
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", imageFile);

        const uploadResponse = await axios.post(
          `/upload/administrator`,
          uploadFormData
        );
        if (uploadResponse.data.success) {
          finalFormData.image = uploadResponse.data.url;
        }
      }

      const response = await axios.post("/administrator/", finalFormData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.error("Error adding administrator:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to add administrator",
        }
      );
    }
  },

  // Update administrator with image
  updateAdministrator: async (
    formData,
    imageFile = null,
    oldImageFilename = null
  ) => {
    // console.log("Updating administrator:", formData);
    try {
      let finalFormData = { ...formData };

      // If new image is provided, update it
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", imageFile);

        const url = oldImageFilename
          ? `/upload/administrator/${oldImageFilename}`
          : `/upload/administrator`;

        const imageResponse = await axios.put(url, uploadFormData);

        if (imageResponse.data.success) {
          finalFormData.image = imageResponse.data.url;
        }
      }

      const response = await axios.put(
        `/administrator/${formData.id}`,
        finalFormData
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.error("Error updating administrator:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update administrator",
        }
      );
    }
  },

  // Delete administrator
  deleteAdministrator: async (form) => {
    // console.log(form);
    try {
      const response = await axios.delete(`/administrator/${form.id}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete administrator",
        }
      );
    }
  },

  // Delete administrator with image cleanup
  deleteAdministratorWithImage: async (administratorId, imageUrl) => {
    try {
      // Extract filename from image URL
      let imageFilename = null;
      if (imageUrl) {
        const urlParts = imageUrl.split("/");
        imageFilename = urlParts[urlParts.length - 1];
      }

      // console.log(
      //   `Deleting administrator ${administratorId} with image: ${imageFilename}`
      // );

      // Delete the administrator first
      const adminResponse = await axios.delete(
        `/administrator/${administratorId}`
      );

      // If administrator deleted successfully and image exists, delete the image
      if (adminResponse.data.success && imageFilename) {
        try {
          await axios.delete(`/upload/administrator/${imageFilename}`);
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

      return adminResponse.data;
    } catch (error) {
      // console.error("❌ Error deleting administrator with image:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete administrator with image",
        }
      );
    }
  },

  // Upload administrator image only
  uploadAdministratorImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`/upload/administrator`, formData);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error uploading administrator image:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to upload administrator image",
        }
      );
    }
  },

  // Update administrator image only
  updateAdministratorImage: async (file, oldFilename = null) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const url = oldFilename
        ? `/upload/administrator/${oldFilename}`
        : `/upload/administrator`;

      const response = await axios.put(url, formData);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error updating administrator image:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update administrator image",
        }
      );
    }
  },

  // Delete administrator image only
  deleteAdministratorImage: async (filename) => {
    try {
      const response = await axios.delete(`/upload/administrator/${filename}`);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error deleting administrator image:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete administrator image",
        }
      );
    }
  },
  handleSaveAdministrator: async (formData, imageFile = null) => {
    try {
      let response;

      if (isEditing && administratorToEdit) {
        // ... update logic
      } else {
        response = await administratorService.addAdministrator(
          formData,
          imageFile // ✅ Image file is passed to the service
        );
      }

      if (response.success) {
        await fetchAdministrator(); // Refresh the administrator data
        toast.success(
          isEditing
            ? "Administrator updated successfully!"
            : "Administrator added successfully!"
        );
      } else {
        toast.error(
          `Failed to ${isEditing ? "update" : "add"} administrator: ${
            response.message
          }`
        );
      }
    } catch (error) {
      // console.error(
      //   `Error ${isEditing ? "updating" : "adding"} administrator:`,
      //   error
      // );
      toast.error(`Error ${isEditing ? "updating" : "adding"} administrator`);
    }
  },
};
