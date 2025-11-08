import axios from "../Utilities/Axios";

const cabineService = {
  getCabinets: async () => {
    try {
      const response = await axios.get("/cabine");
      return response.data;
    } catch (error) {
      // console.error("Error fetching cabinets:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch cabinets",
          data: [],
        }
      );
    }
  },

  getCabinet: async (id) => {
    try {
      const response = await axios.get(`/cabine/${id}`);
      return response.data;
    } catch (error) {
      // console.error("Error fetching cabinet:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch cabinet",
          data: null,
        }
      );
    }
  },

  createCabinet: async (cabineData) => {
    // console.log("Creating cabinet with data:", cabineData);
    try {
      const response = await axios.post("/cabine", cabineData);
      return response.data;
    } catch (error) {
      // console.error("Error creating cabinet:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to create cabinet",
          data: null,
        }
      );
    }
  },

  updateCabinet: async (id, cabinetData) => {
    // console.log("Updating cabinet with ID:", id, "Data:", cabinetData);
    try {
      const response = await axios.put(`/cabine/${id}`, cabinetData);
      return response.data;
    } catch (error) {
      // console.error("Error updating cabinet:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update cabinet",
          data: null,
        }
      );
    }
  },

  deleteCabinet: async (id) => {
    try {
      const response = await axios.delete(`/cabine/${id}`);
      return response.data;
    } catch (error) {
      // console.error("Error deleting cabinet:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete cabinet",
          data: null,
        }
      );
    }
  },

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

      const response = await axios.delete(`/upload/cabines/${filename}`);
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

  createCabinetWithImage: async (cabineData, imageFile) => {
    // console.log("Creating cabinet with image. Cabine Data:", cabineData);
    try {
      let imageUrl = "";

      // Upload image if provided
      if (imageFile && imageFile instanceof File) {
        try {
          // console.log("Uploading cabinet image:", imageFile.name);
          const imageResponse = await cabineService.uploadImage(
            "cabines",
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
        ...cabineData,
        image: imageUrl || cabineData.image || "",
      };

      // console.log("Sending cabinet data to backend:", requestData);

      // Create cabinet
      return await cabineService.createCabinet(requestData);
    } catch (error) {
      // console.error("Error creating cabinet with image:", error);
      throw error;
    }
  },

  updateCabinetWithImage: async (id, cabineData, imageFile) => {
    // console.log(
    //   "Updating cabinet with image. Cabine ID:",
    //   id,
    //   "Data:",
    //   cabineData
    // );

    try {
      // First, get current cabinet data to identify old image
      const currentCabinet = await cabineService.getCabinet(id);
      const oldImage = currentCabinet.data?.image;

      let imageUrl = oldImage || cabineData.image || "";

      // Upload new image if provided
      if (imageFile && imageFile instanceof File) {
        try {
          // console.log("Uploading new cabinet image:", imageFile.name);
          const imageResponse = await cabineService.uploadImage(
            "cabines",
            imageFile
          );

          if (imageResponse.success && imageResponse.url) {
            imageUrl = imageResponse.url;
            // console.log(`New image uploaded successfully: ${imageUrl}`);

            // Delete old image if it exists and is different from new one
            if (oldImage && oldImage !== imageUrl) {
              try {
                const deleteResult = await cabineService.deleteImage(oldImage);
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
            imageUrl = oldImage || cabineData.image || "";
          }
        } catch (uploadError) {
          // console.error("Failed to upload image:", uploadError);
          // Keep old image if upload fails
          imageUrl = oldImage || cabineData.image || "";
        }
      }

      // Prepare data with updated image URL
      const requestData = {
        ...cabineData,
        image: imageUrl,
      };

      // console.log("Sending update data to backend:", requestData);

      // Update cabinet
      return await cabineService.updateCabinet(id, requestData);
    } catch (error) {
      // console.error("Error updating cabinet with image:", error);
      throw error;
    }
  },

  deleteCabinetWithImages: async (id) => {
    try {
      // First, get cabinet data to identify image
      const cabinet = await cabineService.getCabinet(id);

      if (!cabinet.success) {
        // console.error("Failed to fetch cabinet data for deletion");
        // Still try to delete the cabinet record even if we can't get image
        return await cabineService.deleteCabinet(id);
      }

      const imageUrl = cabinet.data?.image;

      // Delete the cabinet record first
      const deleteResult = await cabineService.deleteCabinet(id);

      // Delete associated image after successful cabinet deletion
      if (deleteResult.success && imageUrl) {
        // console.log("Deleting associated image file...");
        try {
          const imageDeleteResult = await cabineService.deleteImage(imageUrl);
          if (imageDeleteResult.success) {
            // console.log(`✅ Successfully deleted cabinet image: ${imageUrl}`);
          } else {
            // console.warn(
            //   `⚠️ Failed to delete cabinet image: ${imageUrl}`,
            //   imageDeleteResult.message
            // );
          }
        } catch (imageDeleteError) {
          // console.error(
          //   `❌ Error deleting cabinet image ${imageUrl}:`,
          //   imageDeleteError.message
          // );
        }
      } else if (!deleteResult.success) {
        // console.error("Cabinet deletion failed, skipping image cleanup");
      } else {
        // console.log("No image to delete for this cabinet");
      }

      return deleteResult;
    } catch (error) {
      // console.error("Error deleting cabinet with images:", error);
      throw error;
    }
  },
};

export default cabineService;
