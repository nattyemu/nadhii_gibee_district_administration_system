import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Edit,
  Trash2,
  Plus,
  Shield,
} from "lucide-react";
import { toast } from "react-toastify";
import administratorService from "../../Service/administratorService";
import ConfirmationModal from "../NewsPage/ConfirmationModal";
import AdministratorForm from "../GovernmentPage/AdministratorForm";

const AdminAdministrator = () => {
  const [administrator, setAdministrator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAdministrator();
  }, []);

  const fetchAdministrator = async () => {
    try {
      setLoading(true);
      const response = await administratorService.getAdministrators();
      if (response.success && response.data.length > 0) {
        const adminData = response.data[0];
        setAdministrator({
          ...adminData,
          image: adminData.image || "",
        });
      } else {
        setAdministrator(null);
      }
    } catch (error) {
      // console.error("Error fetching administrator:", error);
      setAdministrator(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!administrator) return;

    try {
      const response = await administratorService.deleteAdministratorWithImage(
        administrator.id,
        administrator.image
      );

      if (response.success) {
        setAdministrator(null);
        toast.success("Administrator deleted successfully!");
      } else {
        toast.error("Failed to delete administrator");
      }
    } catch (error) {
      // console.error("Error deleting administrator:", error);
      toast.error("Error deleting administrator");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSave = async (formData, imageFile = null, oldImageUrl = null) => {
    try {
      let response;

      if (isEditing && administrator) {
        let oldImageFilename = null;
        if (oldImageUrl) {
          const urlParts = oldImageUrl.split("/");
          oldImageFilename = urlParts[urlParts.length - 1];
        }

        response = await administratorService.updateAdministrator(
          {
            ...formData,
            id: administrator.id,
          },
          imageFile,
          oldImageFilename
        );
      } else {
        response = await administratorService.addAdministrator(
          formData,
          imageFile
        );
      }

      if (response.success) {
        await fetchAdministrator();
        toast.success(
          isEditing ? "Administrator updated!" : "Administrator added!"
        );
        setShowForm(false);
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "add"} administrator`);
      }
    } catch (error) {
      // console.error(
      //   `Error ${isEditing ? "updating" : "adding"} administrator:`,
      //   error
      // );
      toast.error(`Error ${isEditing ? "updating" : "adding"} administrator`);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">
            Administrator Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage the chief administrator profile
          </p>
        </div>

        {!administrator ? (
          <button
            onClick={handleAdd}
            className="mt-4 lg:mt-0 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
          >
            <Plus size={20} className="mr-2" />
            Add Administrator
          </button>
        ) : (
          <div className="mt-4 lg:mt-0 flex space-x-3">
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
            >
              <Edit size={20} className="mr-2" />
              Edit Administrator
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
            >
              <Trash2 size={20} className="mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Administrator Card */}
      {administrator ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/3">
              <div className="relative h-64 md:h-full">
                <img
                  src={getImageUrl(administrator.image)}
                  alt={administrator.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <h2 className="text-xl font-bold">{administrator.name}</h2>
                  <p className="text-blue-200">{administrator.title}</p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <Calendar className="text-blue-600 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Tenure</p>
                    <p className="font-medium text-gray-900">
                      {administrator.tenure}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="text-blue-600 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {administrator.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="text-blue-600 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      {administrator.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="text-blue-600 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Office</p>
                    <p className="font-medium text-gray-900">
                      {administrator.office}
                    </p>
                  </div>
                </div>
              </div>

              {/* Biography */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Biography</h3>
                <p className="text-gray-600 line-clamp-3">
                  {administrator.bio}
                </p>
              </div>

              {/* Achievements */}
              {administrator.achievements &&
                administrator.achievements.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Key Achievements
                    </h3>
                    <div className="space-y-2">
                      {administrator.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <Award
                            size={16}
                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                          />
                          <span className="text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
          <Shield size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Administrator Found
          </h3>
          <p className="text-gray-600 mb-6">
            There is currently no administrator profile set up for the district.
          </p>
          <button
            onClick={handleAdd}
            className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            Add Administrator
          </button>
        </div>
      )}

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Administrator"
        message={`Are you sure you want to delete "${administrator?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <AdministratorForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setIsEditing(false);
        }}
        onSave={handleSave}
        administratorData={isEditing ? administrator : null}
        isEditing={isEditing}
      />
    </div>
  );
};

export default AdminAdministrator;
