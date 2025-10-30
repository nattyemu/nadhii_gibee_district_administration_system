import axios from "../Utilities/Axios";

const kebeleService = {
  // Get all kebeles
  getKebeles: async () => {
    try {
      const response = await axios.get("/kebele");
      return response.data;
    } catch (error) {
      // console.error("Error fetching kebeles:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch kebeles",
          data: [],
        }
      );
    }
  },

  // Get single kebele by ID
  getKebele: async (id) => {
    try {
      const response = await axios.get(`/kebele/${id}`);
      return response.data;
    } catch (error) {
      // console.error("Error fetching kebele:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch kebele",
          data: null,
        }
      );
    }
  },

  // Create new kebele
  createKebele: async (kebeleData) => {
    // console.log("Creating kebele with data:", kebeleData);
    try {
      const response = await axios.post("/kebele", kebeleData);
      return response.data;
    } catch (error) {
      // console.error("Error creating kebele:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to create kebele",
          data: null,
        }
      );
    }
  },

  // Update kebele
  updateKebele: async (id, kebeleData) => {
    // console.log("Updating kebele with ID:", id, "Data:", kebeleData);
    try {
      const response = await axios.put(`/kebele/${id}`, kebeleData);
      return response.data;
    } catch (error) {
      // console.error("Error updating kebele:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update kebele",
          data: null,
        }
      );
    }
  },

  // Delete kebele
  deleteKebele: async (id) => {
    try {
      const response = await axios.delete(`/kebele/${id}`);
      return response.data;
    } catch (error) {
      // console.error("Error deleting kebele:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete kebele",
          data: null,
        }
      );
    }
  },

  // Upload image for kebele
  uploadImage: async (folder, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("folder", folder);

      const response = await axios.post(`/upload/${folder}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("Image upload response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Error uploading image:", error);
      if (error.response) {
        // console.error("Server response:", error.response.data);
        // console.error("Status:", error.response.status);
      }
      return (
        error.response?.data || {
          success: false,
          message: "Failed to upload image",
          data: null,
        }
      );
    }
  },

  // Delete image file
  deleteImage: async (imageUrl) => {
    try {
      if (
        !imageUrl ||
        imageUrl === "" ||
        imageUrl === "null" ||
        imageUrl === "undefined"
      ) {
        // console.log("No image URL provided for deletion");
        return { success: true, message: "No image to delete" };
      }

      // Extract filename from URL
      const filename = imageUrl.split("/").pop();

      if (!filename || filename === "undefined" || filename === "null") {
        // console.log("Invalid filename extracted from URL:", imageUrl);
        return { success: true, message: "Invalid filename" };
      }

      // console.log(`Deleting image: ${filename} from URL: ${imageUrl}`);

      const response = await axios.delete(`/upload/kebeles/${filename}`);
      return response.data;
    } catch (error) {
      // console.error("Error deleting image:", error);
      // Don't throw error for image deletion failures - just log and continue
      return {
        success: false,
        message: "Failed to delete image file",
        error: error.message,
      };
    }
  },

  // Create kebele with image upload
  createKebeleWithImage: async (kebeleData, imageFile) => {
    // console.log("Creating kebele with image. Kebele Data:", kebeleData);
    try {
      let imageUrl = "";

      // Upload image if provided
      if (imageFile && imageFile instanceof File) {
        try {
          // console.log("Uploading kebele image:", imageFile.name);
          const imageResponse = await kebeleService.uploadImage(
            "kebeles",
            imageFile
          );

          if (imageResponse.success && imageResponse.url) {
            imageUrl = imageResponse.url;
            // console.log(`Image uploaded successfully: ${imageUrl}`);
          } else {
            // console.warn("Image upload failed:", imageResponse.message);
          }
        } catch (uploadError) {
          // console.error("Failed to upload image:", uploadError);
        }
      }

      // Prepare data with image URL
      const requestData = {
        ...kebeleData,
        image: imageUrl || kebeleData.image || "",
      };

      // console.log("Sending kebele data to backend:", requestData);

      // Create kebele
      return await kebeleService.createKebele(requestData);
    } catch (error) {
      // console.error("Error creating kebele with image:", error);
      throw error;
    }
  },

  // Update kebele with image upload
  updateKebeleWithImage: async (id, kebeleData, imageFile) => {
    // console.log(
    //   "Updating kebele with image. Kebele ID:",
    //   id,
    //   "Data:",
    //   kebeleData
    // );

    try {
      // First, get current kebele data to identify old image
      const currentKebele = await kebeleService.getKebele(id);
      const oldImage = currentKebele.data?.image;

      let imageUrl = oldImage || kebeleData.image || "";

      // Upload new image if provided
      if (imageFile && imageFile instanceof File) {
        try {
          // console.log("Uploading new kebele image:", imageFile.name);
          const imageResponse = await kebeleService.uploadImage(
            "kebeles",
            imageFile
          );

          if (imageResponse.success && imageResponse.url) {
            imageUrl = imageResponse.url;
            // console.log(`New image uploaded successfully: ${imageUrl}`);

            // Delete old image if it exists and is different from new one
            if (oldImage && oldImage !== imageUrl) {
              try {
                const deleteResult = await kebeleService.deleteImage(oldImage);
                if (deleteResult.success) {
                  // console.log(`✅ Successfully deleted old image: ${oldImage}`);
                } else {
                  // console.warn(
                  //   `⚠️ Failed to delete old image: ${oldImage}`,
                  //   deleteResult.message
                  // );
                }
              } catch (deleteError) {
                // console.error(
                //   `❌ Error deleting old image ${oldImage}:`,
                //   deleteError.message
                // );
              }
            }
          } else {
            // console.warn("Image upload failed:", imageResponse.message);
            // Keep old image if upload fails
            imageUrl = oldImage || kebeleData.image || "";
          }
        } catch (uploadError) {
          // console.error("Failed to upload image:", uploadError);
          // Keep old image if upload fails
          imageUrl = oldImage || kebeleData.image || "";
        }
      }

      // Prepare data with updated image URL
      const requestData = {
        ...kebeleData,
        image: imageUrl,
      };

      // console.log("Sending update data to backend:", requestData);

      // Update kebele
      return await kebeleService.updateKebele(id, requestData);
    } catch (error) {
      // console.error("Error updating kebele with image:", error);
      throw error;
    }
  },

  // Delete kebele with image cleanup
  deleteKebeleWithImages: async (id) => {
    try {
      // First, get kebele data to identify image
      const kebele = await kebeleService.getKebele(id);

      if (!kebele.success) {
        // console.error("Failed to fetch kebele data for deletion");
        // Still try to delete the kebele record even if we can't get image
        return await kebeleService.deleteKebele(id);
      }

      const imageUrl = kebele.data?.image;

      // Delete the kebele record first
      const deleteResult = await kebeleService.deleteKebele(id);

      // Delete associated image after successful kebele deletion
      if (deleteResult.success && imageUrl) {
        // console.log("Deleting associated image file...");
        try {
          const imageDeleteResult = await kebeleService.deleteImage(imageUrl);
          if (imageDeleteResult.success) {
            // console.log(`✅ Successfully deleted kebele image: ${imageUrl}`);
          } else {
            // console.warn(
            //   `⚠️ Failed to delete kebele image: ${imageUrl}`,
            //   imageDeleteResult.message
            // );
          }
        } catch (imageDeleteError) {
          // console.error(
          //   `❌ Error deleting kebele image ${imageUrl}:`,
          //   imageDeleteError.message
          // );
        }
      } else if (!deleteResult.success) {
        // console.error("Kebele deletion failed, skipping image cleanup");
      } else {
        // console.log("No image to delete for this kebele");
      }

      return deleteResult;
    } catch (error) {
      // console.error("Error deleting kebele with images:", error);
      throw error;
    }
  },
};

export default kebeleService;
