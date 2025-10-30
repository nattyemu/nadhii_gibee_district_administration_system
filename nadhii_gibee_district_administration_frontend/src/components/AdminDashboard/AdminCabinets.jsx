import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  MessageCircle,
  Shield,
  HeartPulse,
  GraduationCap,
  Sprout,
  Banknote,
  Building2,
} from "lucide-react";
import { toast } from "react-toastify";
import cabinetService from "../../Service/cabinesService";
import ConfirmationModal from "../NewsPage/ConfirmationModal";
import CabinetForm from "../GovernmentPage/CabineForm";

const AdminCabinets = () => {
  const [cabinets, setCabinets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCabinetForm, setShowCabinetForm] = useState(false);
  const [cabinetToDelete, setCabinetToDelete] = useState(null);
  const [cabinetToEdit, setCabinetToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const iconComponents = {
    Shield,
    HeartPulse,
    GraduationCap,
    Sprout,
    Banknote,
    Building2,
    Users,
  };

  useEffect(() => {
    fetchCabinets();
  }, []);

  const fetchCabinets = async () => {
    try {
      setLoading(true);
      const response = await cabinetService.getCabinets();
      if (response.success) {
        setCabinets(response.data);
      } else {
        toast.error("Failed to fetch cabinets");
      }
    } catch (error) {
      // console.error("Error fetching cabinets:", error);
      toast.error("Error loading cabinets");
    } finally {
      setLoading(false);
    }
  };

  const filteredCabinets = cabinets.filter(
    (cabinet) =>
      cabinet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cabinet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cabinet.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCabinet = () => {
    setCabinetToEdit(null);
    setIsEditing(false);
    setShowCabinetForm(true);
  };

  const handleEdit = (cabinet) => {
    setCabinetToEdit(cabinet);
    setIsEditing(true);
    setShowCabinetForm(true);
  };

  const handleDeleteClick = (cabinet) => {
    setCabinetToDelete(cabinet);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!cabinetToDelete) return;

    try {
      const response = await cabinetService.deleteCabinetWithImages(
        cabinetToDelete.id
      );

      if (response.success) {
        setCabinets((prev) =>
          prev.filter((item) => item.id !== cabinetToDelete.id)
        );
        toast.success("Cabinet member deleted successfully!");
      } else {
        toast.error("Failed to delete cabinet member");
      }
    } catch (error) {
      // console.error("Error deleting cabinet:", error);
      toast.error("Error deleting cabinet member");
    } finally {
      setShowDeleteModal(false);
      setCabinetToDelete(null);
    }
  };

  const handleSaveCabinet = async (cabinetData, imageFile = null) => {
    try {
      let response;

      if (isEditing && cabinetToEdit) {
        response = await cabinetService.updateCabinetWithImage(
          cabinetToEdit.id,
          cabinetData,
          imageFile
        );
      } else {
        response = await cabinetService.createCabinetWithImage(
          cabinetData,
          imageFile
        );
      }

      if (response.success) {
        await fetchCabinets();
        toast.success(
          isEditing ? "Cabinet member updated!" : "Cabinet member added!"
        );
        setShowCabinetForm(false);
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "add"} cabinet member`);
      }
    } catch (error) {
      // console.error(
      //   `Error ${isEditing ? "updating" : "adding"} cabinet:`,
      //   error
      // );
      toast.error(`Error ${isEditing ? "updating" : "adding"} cabinet member`);
    }
  };

  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || Users;
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
            Cabinet Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage government cabinet members ({filteredCabinets.length}{" "}
            members)
          </p>
        </div>
        <button
          onClick={handleAddCabinet}
          className="mt-4 lg:mt-0 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
        >
          <Plus size={20} className="mr-2" />
          Add Cabinet Member
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search cabinet members by name, title, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C]"
          />
        </div>
      </div>

      {/* Cabinets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredCabinets.map((cabinet) => {
          const Icon = getIconComponent(cabinet.icon);
          return (
            <div
              key={cabinet.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Cabinet Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getImageUrl(cabinet.image)}
                  alt={cabinet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-b-[80px]"
                />

                {/* Position Badge */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-2 inline-block">
                    <span className="text-sm font-bold text-[#21203C] whitespace-nowrap">
                      {cabinet.position}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-500 drop-shadow-md">
                    {cabinet.title}
                  </h3>
                </div>

                {/* Icon Badge */}
                <div className="absolute top-4 right-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#21203C] text-white shadow-lg">
                    <Icon size={24} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEdit(cabinet)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                    title="Edit"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(cabinet)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Cabinet Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {cabinet.name}
                </h3>

                <div className="space-y-3 mb-6">
                  {cabinet.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-3 flex-shrink-0" />
                      <span className="truncate">{cabinet.email}</span>
                    </div>
                  )}
                  {cabinet.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-3 flex-shrink-0" />
                      <span>{cabinet.phone}</span>
                    </div>
                  )}
                </div>

                {/* Contact Actions */}
                <div className="flex space-x-2">
                  {cabinet.phone && (
                    <button className="flex-1 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-3 rounded-lg transition-colors duration-300 flex items-center justify-center text-sm">
                      <Phone size={16} className="mr-1" />
                      Call
                    </button>
                  )}
                  {cabinet.email && (
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-medium py-2 px-3 rounded-lg transition-colors duration-300 flex items-center justify-center text-sm">
                      <MessageCircle size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCabinets.length === 0 && (
        <div className="text-center py-12">
          <Users size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No cabinet members found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try adjusting your search criteria."
              : "Get started by adding your first cabinet member."}
          </p>
          <button
            onClick={handleAddCabinet}
            className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            Add Cabinet Member
          </button>
        </div>
      )}

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCabinetToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Cabinet Member"
        message={`Are you sure you want to delete "${cabinetToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <CabinetForm
        isOpen={showCabinetForm}
        onClose={() => {
          setShowCabinetForm(false);
          setCabinetToEdit(null);
          setIsEditing(false);
        }}
        onSave={handleSaveCabinet}
        cabinetData={cabinetToEdit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default AdminCabinets;
