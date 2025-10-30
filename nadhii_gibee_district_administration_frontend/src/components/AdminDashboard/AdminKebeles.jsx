import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Users,
  BarChart3,
  HeartPulse,
  GraduationCap,
  Car,
  Shield,
} from "lucide-react";
import { toast } from "react-toastify";
import kebeleService from "../../Service/kebeleService";
import ConfirmationModal from "../NewsPage/ConfirmationModal";
import KebeleForm from "./KebeleForm";

const AdminKebeles = () => {
  const [kebeles, setKebeles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showKebeleForm, setShowKebeleForm] = useState(false);
  const [kebeleToDelete, setKebeleToDelete] = useState(null);
  const [kebeleToEdit, setKebeleToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchKebeles();
  }, []);

  const fetchKebeles = async () => {
    try {
      setLoading(true);
      const response = await kebeleService.getKebeles();
      if (response.success) {
        setKebeles(response.data);
      } else {
        toast.error("Failed to fetch kebeles");
      }
    } catch (error) {
      // console.error("Error fetching kebeles:", error);
      toast.error("Error loading kebeles");
    } finally {
      setLoading(false);
    }
  };

  const filteredKebeles = kebeles.filter((kebele) => {
    const matchesSearch = kebele.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || kebele.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddKebele = () => {
    setKebeleToEdit(null);
    setIsEditing(false);
    setShowKebeleForm(true);
  };

  const handleEdit = (kebele) => {
    setKebeleToEdit(kebele);
    setIsEditing(true);
    setShowKebeleForm(true);
  };

  const handleDeleteClick = (kebele) => {
    setKebeleToDelete(kebele);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!kebeleToDelete) return;

    try {
      const response = await kebeleService.deleteKebeleWithImages(
        kebeleToDelete.id
      );

      if (response.success) {
        setKebeles((prev) =>
          prev.filter((item) => item.id !== kebeleToDelete.id)
        );
        toast.success("Kebele deleted successfully!");
      } else {
        toast.error("Failed to delete kebele");
      }
    } catch (error) {
      // console.error("Error deleting kebele:", error);
      toast.error("Error deleting kebele");
    } finally {
      setShowDeleteModal(false);
      setKebeleToDelete(null);
    }
  };

  const handleSaveKebele = async (kebeleData, imageFile = null) => {
    try {
      let response;

      if (isEditing && kebeleToEdit) {
        response = await kebeleService.updateKebeleWithImage(
          kebeleToEdit.id,
          kebeleData,
          imageFile
        );
      } else {
        response = await kebeleService.createKebeleWithImage(
          kebeleData,
          imageFile
        );
      }

      if (response.success) {
        await fetchKebeles();
        toast.success(
          isEditing
            ? "Kebele updated successfully!"
            : "Kebele added successfully!"
        );
        setShowKebeleForm(false);
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "add"} kebele`);
      }
    } catch (error) {
      // console.error(
      //   `Error ${isEditing ? "updating" : "adding"} kebele:`,
      //   error
      // );
      toast.error(`Error ${isEditing ? "updating" : "adding"} kebele`);
    }
  };

  const getDevelopmentColor = (index) => {
    const colors = {
      Low: "bg-red-100 text-red-700",
      Medium: "bg-yellow-100 text-yellow-700",
      High: "bg-green-100 text-green-700",
      "Very High": "bg-blue-100 text-blue-700",
    };
    return colors[index] || "bg-gray-100 text-gray-700";
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
            Kebeles Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage district kebeles and their information (
            {filteredKebeles.length} kebeles)
          </p>
        </div>
        <button
          onClick={handleAddKebele}
          className="mt-4 lg:mt-0 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
        >
          <Plus size={20} className="mr-2" />
          Add Kebele
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search kebeles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C]"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white"
          >
            <option value="all">All Types</option>
            <option value="Rural Kebele">Rural Kebele</option>
            <option value="City Kebele">City Kebele</option>
          </select>
        </div>
      </div>

      {/* Kebeles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredKebeles.map((kebele) => (
          <div
            key={kebele.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Kebele Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={getImageUrl(kebele.image)}
                alt={kebele.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    kebele.type === "City Kebele"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {kebele.type}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDevelopmentColor(
                    kebele.status?.developmentIndex
                  )}`}
                >
                  {kebele.status?.developmentIndex}
                </span>
              </div>
            </div>

            {/* Kebele Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {kebele.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {kebele.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Users size={20} className="mx-auto text-blue-600 mb-1" />
                  <p className="text-sm font-medium text-gray-900">
                    {kebele.population}
                  </p>
                  <p className="text-xs text-gray-500">Population</p>
                </div>
                <div className="text-center">
                  <BarChart3
                    size={20}
                    className="mx-auto text-green-600 mb-1"
                  />
                  <p className="text-sm font-medium text-gray-900">
                    {kebele.area}
                  </p>
                  <p className="text-xs text-gray-500">Area</p>
                </div>
                <div className="text-center">
                  <MapPin size={20} className="mx-auto text-purple-600 mb-1" />
                  <p className="text-sm font-medium text-gray-900">
                    {kebele.elevation}
                  </p>
                  <p className="text-xs text-gray-500">Elevation</p>
                </div>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center">
                  <GraduationCap size={16} className="text-gray-400 mr-2" />
                  <span>{kebele.status?.schools || 0} Schools</span>
                </div>
                <div className="flex items-center">
                  <HeartPulse size={16} className="text-gray-400 mr-2" />
                  <span>
                    {kebele.status?.healthCenters || 0} Health Centers
                  </span>
                </div>
                <div className="flex items-center">
                  <Car size={16} className="text-gray-400 mr-2" />
                  <span>{kebele.status?.roads || "0 km"}</span>
                </div>
                <div className="flex items-center">
                  <Shield size={16} className="text-gray-400 mr-2" />
                  <span>{kebele.contact?.administrator || "N/A"}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(kebele)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(kebele)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  {kebele.features?.length || 0} features
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredKebeles.length === 0 && (
        <div className="text-center py-12">
          <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No kebeles found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterType !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first kebele."}
          </p>
          <button
            onClick={handleAddKebele}
            className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            Add Kebele
          </button>
        </div>
      )}

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setKebeleToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Kebele"
        message={`Are you sure you want to delete "${kebeleToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <KebeleForm
        isOpen={showKebeleForm}
        onClose={() => {
          setShowKebeleForm(false);
          setKebeleToEdit(null);
          setIsEditing(false);
        }}
        onSave={handleSaveKebele}
        kebeleData={kebeleToEdit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default AdminKebeles;
