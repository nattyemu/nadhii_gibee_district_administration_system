import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import sectorService from "../../Service/sectorService";
import ConfirmationModal from "../NewsPage/ConfirmationModal";
import SectorForm from "./SectorForm";

const AdminSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSectorForm, setShowSectorForm] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState(null);
  const [sectorToEdit, setSectorToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const categories = [
    "All",
    "administrative",
    "health",
    "education",
    "agriculture",
    "infrastructure",
    "finance",
  ];

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      setLoading(true);
      const response = await sectorService.getSectors();
      if (response.success) {
        setSectors(response.data);
      } else {
        toast.error("Failed to fetch sectors");
      }
    } catch (error) {
      // console.error("Error fetching sectors:", error);
      toast.error("Error loading sectors");
    } finally {
      setLoading(false);
    }
  };

  const filteredSectors = sectors.filter((sector) => {
    const matchesSearch =
      sector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sector.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || sector.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddSector = () => {
    setSectorToEdit(null);
    setIsEditing(false);
    setShowSectorForm(true);
  };

  const handleEdit = (sector) => {
    setSectorToEdit(sector);
    setIsEditing(true);
    setShowSectorForm(true);
  };

  const handleDeleteClick = (sector) => {
    setSectorToDelete(sector);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!sectorToDelete) return;

    try {
      const response = await sectorService.deleteSectorWithImages(
        sectorToDelete.id
      );

      if (response.success) {
        setSectors((prev) =>
          prev.filter((item) => item.id !== sectorToDelete.id)
        );
        toast.success("Sector deleted successfully!");
      } else {
        toast.error("Failed to delete sector");
      }
    } catch (error) {
      // console.error("Error deleting sector:", error);
      toast.error("Error deleting sector");
    } finally {
      setShowDeleteModal(false);
      setSectorToDelete(null);
    }
  };

  const handleSaveSector = async (sectorData, imageFile = null) => {
    try {
      let response;

      if (isEditing && sectorToEdit) {
        response = await sectorService.updateSectorWithImage(
          sectorToEdit.id,
          sectorData,
          imageFile
        );
      } else {
        response = await sectorService.createSectorWithImage(
          sectorData,
          imageFile
        );
      }

      if (response.success) {
        await fetchSectors();
        toast.success(
          isEditing
            ? "Sector updated successfully!"
            : "Sector added successfully!"
        );
        setShowSectorForm(false);
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "add"} sector`);
      }
    } catch (error) {
      // console.error(
      //   `Error ${isEditing ? "updating" : "adding"} sector:`,
      //   error
      // );
      toast.error(`Error ${isEditing ? "updating" : "adding"} sector`);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      administrative: "bg-purple-100 text-purple-700",
      health: "bg-red-100 text-red-700",
      education: "bg-blue-100 text-blue-700",
      agriculture: "bg-green-100 text-green-700",
      infrastructure: "bg-orange-100 text-orange-700",
      finance: "bg-emerald-100 text-emerald-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
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
            Sectors Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage government sectors and departments ({filteredSectors.length}{" "}
            sectors)
          </p>
        </div>
        <button
          onClick={handleAddSector}
          className="mt-4 lg:mt-0 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
        >
          <Plus size={20} className="mr-2" />
          Add Sector
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
              placeholder="Search sectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C]"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSectors.map((sector) => (
          <div
            key={sector.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Sector Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={getImageUrl(sector.image)}
                alt={sector.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                    sector.category
                  )}`}
                >
                  {sector.category}
                </span>
              </div>
            </div>

            {/* Sector Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {sector.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {sector.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 text-sm">
                {sector.address && (
                  <div className="flex items-center text-gray-600">
                    <MapPin size={14} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{sector.address}</span>
                  </div>
                )}
                {sector.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone size={14} className="mr-2 flex-shrink-0" />
                    <span>{sector.phone}</span>
                  </div>
                )}
                {sector.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail size={14} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{sector.email}</span>
                  </div>
                )}
                {sector.hours && (
                  <div className="flex items-center text-gray-600">
                    <Clock size={14} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{sector.hours}</span>
                  </div>
                )}
              </div>

              {/* Services */}
              {sector.services && sector.services.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Services:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {sector.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {service}
                      </span>
                    ))}
                    {sector.services.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{sector.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(sector)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(sector)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Users size={14} className="mr-1" />
                  <span>{sector.officials?.length || 0} officials</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSectors.length === 0 && (
        <div className="text-center py-12">
          <Building2 size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No sectors found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding your first sector."}
          </p>
          <button
            onClick={handleAddSector}
            className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            Add Sector
          </button>
        </div>
      )}

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSectorToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Sector"
        message={`Are you sure you want to delete "${sectorToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <SectorForm
        isOpen={showSectorForm}
        onClose={() => {
          setShowSectorForm(false);
          setSectorToEdit(null);
          setIsEditing(false);
        }}
        onSave={handleSaveSector}
        sectorData={sectorToEdit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default AdminSectors;
