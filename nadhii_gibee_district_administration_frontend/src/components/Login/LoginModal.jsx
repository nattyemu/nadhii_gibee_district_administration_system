// components/Login/LoginModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, X, ArrowLeft } from "lucide-react";
import userService from "../../Service/userService";

const LoginModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState("login"); // login, forgot-email, forgot-otp, new-password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [forgotPasswordToken, setForgotPasswordToken] = useState(null); // Store token from forgot password step
  const [confirmOtpToken, setConfirmOtpToken] = useState(null); // Store token from OTP confirmation step
  const { login } = useAuth();

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateOTP = (otp) => {
    if (!otp) return "OTP is required";
    if (otp.length !== 6) return "OTP must be 6 digits";
    if (!/^\d+$/.test(otp)) return "OTP must contain only numbers";
    return "";
  };

  const validateNewPassword = (password, confirmPassword) => {
    if (!password) return "New password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    setIsLoading(false);

    if (!result.success) {
      setErrors({ submit: result.error });
    }
  };

  // Handle forgot password email submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    try {
      const result = await userService.forgetPassword({
        email: formData.email,
      });

      if (result.success) {
        // Store the token received from forgot password response
        setForgotPasswordToken(result.data.token);
        setCurrentStep("forgot-otp");
        setSuccessMessage(result.message || "OTP sent to your email");
        setErrors({});
      } else {
        setErrors({ submit: result.message || "Failed to send OTP" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    }
    setIsLoading(false);
  };

  // Handle OTP confirmation
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const otpError = validateOTP(formData.otp);
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }

    setIsLoading(true);
    try {
      // Use the token from forgot password step for OTP confirmation
      const result = await userService.confirmOtp({
        otp: formData.otp,
        token: forgotPasswordToken,
      });

      if (result.success) {
        // Store the new token received from OTP confirmation
        setConfirmOtpToken(result.data.token);
        setCurrentStep("new-password");
        setSuccessMessage("OTP verified successfully");
        setErrors({});
      } else {
        setErrors({ submit: result.message || "Invalid OTP" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    }
    setIsLoading(false);
  };

  // Handle new password submission
  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validateNewPassword(
      formData.newPassword,
      formData.confirmPassword
    );
    if (passwordError) {
      setErrors({ newPassword: passwordError });
      return;
    }

    setIsLoading(true);
    try {
      // Use the token from OTP confirmation step for password reset
      const result = await userService.resetPassword({
        password: formData.newPassword,
        cpassword: formData.confirmPassword,
        token: confirmOtpToken,
      });

      if (result.success) {
        setSuccessMessage(
          "Password reset successfully! Please login with your new password."
        );
        setCurrentStep("login");
        // Clear all tokens and form data
        setForgotPasswordToken(null);
        setConfirmOtpToken(null);
        setFormData((prev) => ({
          ...prev,
          password: "",
          otp: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setErrors({});
      } else {
        setErrors({ submit: result.message || "Failed to reset password" });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (errors.submit) {
      setErrors((prev) => ({ ...prev, submit: "" }));
    }
  };

  const handleBackToLogin = () => {
    setCurrentStep("login");
    setErrors({});
    setSuccessMessage("");
    // Clear tokens when going back to login
    setForgotPasswordToken(null);
    setConfirmOtpToken(null);
  };

  // Reset all state when modal closes
  const handleClose = () => {
    setCurrentStep("login");
    setErrors({});
    setSuccessMessage("");
    setForgotPasswordToken(null);
    setConfirmOtpToken(null);
    setFormData({
      email: "",
      password: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
    onClose();
  };

  const renderLoginForm = () => (
    <>
      <div className="relative bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-t-2xl p-6 text-white">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
          <p className="text-[#E5E4FF] opacity-90">
            Access the administration dashboard
          </p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-transparent transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-transparent transition-all duration-300 ${
                  errors.password
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setCurrentStep("forgot-email")}
              className="text-[#21203C] hover:text-[#2D2B4A] text-sm font-medium transition-colors duration-300"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {successMessage}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#21203C] to-[#2D2B4A] hover:from-[#2D2B4A] hover:to-[#3A3860] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Secure access to Nadhii Gibee District Administration
          </p>
        </div>
      </div>
    </>
  );

  const renderForgotEmailForm = () => (
    <>
      <div className="relative bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-t-2xl p-6 text-white">
        <button
          onClick={handleBackToLogin}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
          <p className="text-[#E5E4FF] opacity-90">
            Enter your email to receive OTP
          </p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-transparent transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#21203C] to-[#2D2B4A] hover:from-[#2D2B4A] hover:to-[#3A3860] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </>
  );

  const renderOtpForm = () => (
    <>
      <div className="relative bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-t-2xl p-6 text-white">
        <button
          onClick={() => setCurrentStep("forgot-email")}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
          <p className="text-[#E5E4FF] opacity-90">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          {/* OTP Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                maxLength={6}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-transparent transition-all duration-300 ${
                  errors.otp
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="Enter 6-digit OTP"
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.otp}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {successMessage}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#21203C] to-[#2D2B4A] hover:from-[#2D2B4A] hover:to-[#3A3860] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying OTP...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </>
  );

  const renderNewPasswordForm = () => (
    <>
      <div className="relative bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-t-2xl p-6 text-white">
        <button
          onClick={() => setCurrentStep("forgot-otp")}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Set New Password</h2>
          <p className="text-[#E5E4FF] opacity-90">Create your new password</p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
          {/* New Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-transparent transition-all duration-300 ${
                  errors.newPassword
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#21203C] focus:border-transparent transition-all duration-300 ${
                  errors.newPassword
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {successMessage}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#21203C] to-[#2D2B4A] hover:from-[#2D2B4A] hover:to-[#3A3860] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 hover:scale-105">
        {currentStep === "login" && renderLoginForm()}
        {currentStep === "forgot-email" && renderForgotEmailForm()}
        {currentStep === "forgot-otp" && renderOtpForm()}
        {currentStep === "new-password" && renderNewPasswordForm()}
      </div>
    </div>
  );
};

export default LoginModal;
