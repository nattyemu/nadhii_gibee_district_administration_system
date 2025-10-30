import axios from "../Utilities/Axios";

const sectorService = {
  // Get all sectors
  getSectors: async () => {
    try {
      const response = await axios.get("/sector");
      return response.data;
    } catch (error) {
      // console.error("Error fetching sectors:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch sectors",
          data: [],
        }
      );
    }
  },

  // Get single sector by ID
  getSector: async (id) => {
    try {
      const response = await axios.get(`/sector/${id}`);
      return response.data;
    } catch (error) {
      // console.error("Error fetching sector:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch sector",
          data: null,
        }
      );
    }
  },

  // Create new sector
  createSector: async (sectorData) => {
    // console.log("Creating sector with data:", sectorData);
    try {
      const response = await axios.post("/sector", sectorData);
      return response.data;
    } catch (error) {
      // console.error("Error creating sector:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to create sector",
          data: null,
        }
      );
    }
  },

  // Update sector
  updateSector: async (id, sectorData) => {
    // console.log("Updating sector with ID:", id, "Data:", sectorData);
    try {
      const response = await axios.put(`/sector/${id}`, sectorData);
      return response.data;
    } catch (error) {
      // console.error("Error updating sector:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to update sector",
          data: null,
        }
      );
    }
  },

  // Delete sector
  deleteSector: async (id) => {
    try {
      const response = await axios.delete(`/sector/${id}`);
      return response.data;
    } catch (error) {
      // console.error("Error deleting sector:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to delete sector",
          data: null,
        }
      );
    }
  },

  // Upload image for sector
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

      const response = await axios.delete(`/upload/sectors/${filename}`);
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

  // Create sector with image upload
  createSectorWithImage: async (sectorData, imageFile) => {
    // console.log("Creating sector with image. Sector Data:", sectorData);
    try {
      let imageUrl = "";

      // Upload image if provided
      if (imageFile && imageFile instanceof File) {
        try {
          // console.log("Uploading sector image:", imageFile.name);
          const imageResponse = await sectorService.uploadImage(
            "sectors",
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
        ...sectorData,
        image: imageUrl || sectorData.image || "",
      };

      // console.log("Sending sector data to backend:", requestData);

      // Create sector
      return await sectorService.createSector(requestData);
    } catch (error) {
      // console.error("Error creating sector with image:", error);
      throw error;
    }
  },

  // Update sector with image upload
  updateSectorWithImage: async (id, sectorData, imageFile) => {
    // console.log(
    //   "Updating sector with image. Sector ID:",
    //   id,
    //   "Data:",
    //   sectorData
    // );

    try {
      // First, get current sector data to identify old image
      const currentSector = await sectorService.getSector(id);
      const oldImage = currentSector.data?.image;

      let imageUrl = oldImage || sectorData.image || "";

      // Upload new image if provided
      if (imageFile && imageFile instanceof File) {
        try {
          // console.log("Uploading new sector image:", imageFile.name);
          const imageResponse = await sectorService.uploadImage(
            "sectors",
            imageFile
          );

          if (imageResponse.success && imageResponse.url) {
            imageUrl = imageResponse.url;
            // console.log(`New image uploaded successfully: ${imageUrl}`);

            // Delete old image if it exists and is different from new one
            if (oldImage && oldImage !== imageUrl) {
              try {
                const deleteResult = await sectorService.deleteImage(oldImage);
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
            imageUrl = oldImage || sectorData.image || "";
          }
        } catch (uploadError) {
          // console.error("Failed to upload image:", uploadError);
          // Keep old image if upload fails
          imageUrl = oldImage || sectorData.image || "";
        }
      }

      // Prepare data with updated image URL
      const requestData = {
        ...sectorData,
        image: imageUrl,
      };

      // console.log("Sending update data to backend:", requestData);

      // Update sector
      return await sectorService.updateSector(id, requestData);
    } catch (error) {
      // console.error("Error updating sector with image:", error);
      throw error;
    }
  },

  // Delete sector with image cleanup
  deleteSectorWithImages: async (id) => {
    try {
      // First, get sector data to identify image
      const sector = await sectorService.getSector(id);

      if (!sector.success) {
        // console.error("Failed to fetch sector data for deletion");
        // Still try to delete the sector record even if we can't get image
        return await sectorService.deleteSector(id);
      }

      const imageUrl = sector.data?.image;

      // Delete the sector record first
      const deleteResult = await sectorService.deleteSector(id);

      // Delete associated image after successful sector deletion
      if (deleteResult.success && imageUrl) {
        // console.log("Deleting associated image file...");
        try {
          const imageDeleteResult = await sectorService.deleteImage(imageUrl);
          if (imageDeleteResult.success) {
            // console.log(`✅ Successfully deleted sector image: ${imageUrl}`);
          } else {
            // console.warn(
            //   `⚠️ Failed to delete sector image: ${imageUrl}`,
            //   imageDeleteResult.message
            // );
          }
        } catch (imageDeleteError) {
          // console.error(
          //   `❌ Error deleting sector image ${imageUrl}:`,
          //   imageDeleteError.message
          // );
        }
      } else if (!deleteResult.success) {
        // console.error("Sector deletion failed, skipping image cleanup");
      } else {
        // console.log("No image to delete for this sector");
      }

      return deleteResult;
    } catch (error) {
      // console.error("Error deleting sector with images:", error);
      throw error;
    }
  },
};

export default sectorService;
