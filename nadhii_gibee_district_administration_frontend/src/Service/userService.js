import axios from "../Utilities/Axios";

export default {
  getUsers: async () => {
    try {
      const response = await axios.get(`/user/get/`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error fetching ingredients:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch ingredients",
          data: [],
        }
      );
    }
  },
  getUser: async (form) => {
    try {
      const response = await axios.get(`/user/get/${form.id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error fetching ingredients:",
      //   error.response?.data || error.message
      // );
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch ingredients",
          data: [],
        }
      );
    }
  },
  updateUser: async (form) => {
    // console.log(form);
    try {
      const response = await axios.put(`/user/edit/${form.id}`, form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteUser: async (form) => {
    // console.log(form);
    try {
      const response = await axios.delete(`/user/delete/${form.id}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addUser: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/register/", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  forgetPassword: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/forget-password", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  confirmOtp: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/confirm-otp", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  resetPassword: async (form) => {
    // console.log(form);
    try {
      const response = await axios.post("/user/new-password", form);
      // console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};
