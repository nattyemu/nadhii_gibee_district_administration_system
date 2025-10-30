import React, { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  isPending = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync with parent's isPending and reset when modal closes
  useEffect(() => {
    if (isOpen) {
      setIsProcessing(isPending);
    }
  }, [isPending, isOpen]);

  // Reset processing state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          confirmBg: "bg-red-600 hover:bg-red-700",
        };
      case "warning":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          confirmBg: "bg-yellow-600 hover:bg-yellow-700",
        };
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          confirmBg: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const styles = getTypeStyles();

  const handleConfirm = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      await onConfirm();
    } catch (error) {
      // If there's an error, allow retry by resetting the processing state
      setIsProcessing(false);
      throw error; // Re-throw to let parent handle the error
    }
    // Don't reset isProcessing here - let parent's isPending control the state
    // This prevents multiple clicks during the entire operation
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  const isButtonDisabled = isPending || isProcessing;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-2xl shadow-xl max-w-md w-full transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <div className="flex items-center">
            <div className={`${styles.iconBg} p-2 rounded-full mr-3`}>
              <AlertTriangle size={20} className={styles.iconColor} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={handleClose}
            disabled={isButtonDisabled}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-300">
          <button
            onClick={handleClose}
            disabled={isButtonDisabled}
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-400 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isButtonDisabled}
            className={`px-4 py-2 text-sm font-medium text-white ${styles.confirmBg} rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
          >
            {(isPending || isProcessing) && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>
              {isPending || isProcessing ? "Processing..." : confirmText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
