import React, { useState, useEffect } from "react";
import {
  Award,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  BarChart3,
  BookOpen,
  Shield,
  Heart,
  Target,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Download,
  ArrowRight,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import administratorService from "../../Service/administratorService";
import { useAuth } from "../../context/AuthContext";
import ConfirmationModal from "../NewsPage/ConfirmationModal";
import AdministratorForm from "./AdministratorForm";
import { toast } from "react-toastify";
import backgroundImage from "../../assets/adminstrator.jpg";
const AdministratorPage = () => {
  const [administrator, setAdministrator] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAdministratorForm, setShowAdministratorForm] = useState(false);
  const [administratorToDelete, setAdministratorToDelete] = useState(null);
  const [administratorToEdit, setAdministratorToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Static data for other sections (unchanged)
  const keyInitiatives = [
    {
      title: "Digital Transformation",
      description:
        "Implementing technology solutions for efficient service delivery",
      progress: 85,
      icon: BarChart3,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Agricultural Modernization",
      description: "Introducing modern farming techniques and equipment",
      progress: 70,
      icon: BookOpen,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Healthcare Expansion",
      description: "Building new facilities and improving medical services",
      progress: 90,
      icon: Heart,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Education Quality",
      description: "Enhancing curriculum and teacher training programs",
      progress: 75,
      icon: Users,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const upcomingEvents = [
    {
      date: "2023-11-15",
      title: "Zone Development Forum",
      location: "Jimma City Hall",
      time: "9:00 AM",
    },
    {
      date: "2023-11-22",
      title: "Agricultural Fair Opening",
      location: "Jimma Exhibition Center",
      time: "10:00 AM",
    },
    {
      date: "2023-12-05",
      title: "Education Summit",
      location: "Jimma University",
      time: "8:30 AM",
    },
  ];

  useEffect(() => {
    fetchAdministrator();
  }, []);

  const fetchAdministrator = async () => {
    try {
      const response = await administratorService.getAdministrators();

      if (response.success && response.data.length > 0) {
        const adminData = response.data[0];

        // Handle image path - if it's a relative path, construct the full URL
        let imageUrl = adminData.image;
        if (
          imageUrl &&
          !imageUrl.startsWith("http") &&
          !imageUrl.startsWith("data:")
        ) {
          // If it's a relative path, you might need to construct the full URL
          // This depends on your API response structure
          imageUrl = `${
            import.meta.env.REACT_APP_API_BASE_URL || ""
          }${imageUrl}`;
        }

        setAdministrator({
          ...adminData,
          image: imageUrl || "", // Fallback to default image
        });
      } else {
        setAdministrator(null);
      }
    } catch (error) {
      console.error("Error fetching administrator:", error);
      setAdministrator(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setAdministratorToEdit(administrator);
    setIsEditing(true);
    setShowAdministratorForm(true);
  };

  const handleAddAdministrator = () => {
    setAdministratorToEdit(null);
    setIsEditing(false);
    setShowAdministratorForm(true);
  };

  const handleDeleteClick = () => {
    setAdministratorToDelete(administrator);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!administratorToDelete) return;

    try {
      const response = await administratorService.deleteAdministratorWithImage(
        administratorToDelete.id,
        administratorToDelete.image
      );

      if (response.success) {
        setAdministrator(null);
        toast.success("Administrator deleted successfully!");
      } else {
        toast.error("Failed to delete administrator: " + response.message);
      }
    } catch (error) {
      console.error("Error deleting administrator:", error);
      toast.error("Error deleting administrator");
    } finally {
      setShowDeleteModal(false);
      setAdministratorToDelete(null);
    }
  };

  const handleSaveAdministrator = async (
    formData,
    imageFile = null,
    oldImageUrl = null
  ) => {
    try {
      let response;

      if (isEditing && administratorToEdit) {
        // Extract old filename for image update
        let oldImageFilename = null;
        if (oldImageUrl) {
          const urlParts = oldImageUrl.split("/");
          oldImageFilename = urlParts[urlParts.length - 1];
        }

        response = await administratorService.updateAdministrator(
          {
            ...formData,
            id: administratorToEdit.id,
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
        await fetchAdministrator(); // Refresh the administrator data
        toast.success(
          isEditing
            ? "Administrator updated successfully!"
            : "Administrator added successfully!"
        );
      } else {
        toast.error(
          `Failed to ${isEditing ? "update" : "add"} administrator: ${
            response.message
          }`
        );
      }
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "adding"} administrator:`,
        error
      );
      toast.error(`Error ${isEditing ? "updating" : "adding"} administrator`);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };
  // Check if user is admin
  const isAdmin = isAuthenticated() && user?.role === "admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading administrator data...</p>
        </div>
      </div>
    );
  }

  if (!administrator) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">
              Administrator Data Not Available
            </h2>
            <p>
              Unable to load administrator information. Please try again later.
            </p>
            {isAdmin && ( // ✅ This shows Add button only for admin users
              <button
                onClick={handleAddAdministrator}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto"
              >
                <Plus size={20} className="mr-2" />
                Add Administrator
              </button>
            )}
          </div>
        </div>

        {/* Modals */}
        <AdministratorForm
          isOpen={showAdministratorForm}
          onClose={() => {
            setShowAdministratorForm(false);
            setAdministratorToEdit(null);
            setIsEditing(false);
          }}
          onSave={handleSaveAdministrator} // ✅ This handles saving with image
          administratorData={administratorToEdit}
          isEditing={isEditing}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAdministratorToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Administrator"
        message={`Are you sure you want to delete "${administratorToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Administrator Form Modal */}
      <AdministratorForm
        isOpen={showAdministratorForm}
        onClose={() => {
          setShowAdministratorForm(false);
          setAdministratorToEdit(null);
          setIsEditing(false);
        }}
        onSave={handleSaveAdministrator}
        administratorData={administratorToEdit}
        isEditing={isEditing}
      />

      {/* Admin Controls */}
      {isAdmin && (
        <section className="py-4 bg-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
              >
                <Edit size={20} className="mr-2" />
                Edit Administrator
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
              >
                <Trash2 size={20} className="mr-2" />
                Delete Administrator
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Office of the Chief Administrator
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Leadership dedicated to the development and prosperity of Nadhii
              Gibee District
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-700/80 rounded-full">
              <Shield size={20} className="mr-2" />
              Committed to Transparent Governance
            </div>
          </div>
        </div>
      </section>

      {/* Administrator Profile */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Administrator Photo and Basic Info */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 sticky top-8">
                <div className="relative mb-6">
                  <img
                    src={getImageUrl(administrator.image)}
                    alt={administrator.name}
                    className="w-full h-70 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white rounded-b-xl">
                    <h2 className="text-xl font-bold">{administrator.name}</h2>
                    <p className="text-blue-200">{administrator.title}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="text-blue-700 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Tenure</p>
                      <p className="font-medium">{administrator.tenure}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="text-blue-700 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{administrator.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="text-blue-700 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{administrator.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="text-blue-700 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Office</p>
                      <p className="font-medium">{administrator.office}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">Connect</h3>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="#"
                      className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                    >
                      <Twitter size={20} />
                    </a>
                    <a
                      href="#"
                      className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="#"
                      className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrator Details */}
            <div className="lg:w-2/3">
              {/* Biography */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-blue-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Biography
                </h2>
                <p className="text-gray-600 mb-6">{administrator.bio}</p>
                <button className="text-blue-700 font-medium flex items-center">
                  Read Full Biography
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>

              {/* Key Achievements */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-blue-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {administrator.achievements?.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-4">
                        <Award size={20} />
                      </div>
                      <p className="text-gray-600">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Initiatives */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-blue-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Initiatives
                </h2>
                <div className="space-y-6">
                  {keyInitiatives.map((initiative, index) => {
                    const Icon = initiative.icon;
                    return (
                      <div key={index} className="flex items-start">
                        <div
                          className={`p-3 rounded-lg mr-4 ${initiative.color}`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">
                            {initiative.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {initiative.description}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${initiative.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-right text-sm text-gray-500 mt-1">
                            {initiative.progress}% Complete
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Message from Administrator */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  Message from the Administrator
                </h2>
                <blockquote className="text-lg italic mb-6">
                  "{administrator.message}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={getImageUrl(administrator.image)}
                    alt={administrator.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-bold">{administrator.name}</p>
                    <p className="text-blue-200">{administrator.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming <span className="text-blue-700">Events</span>
            </h2>
            <p className="text-lg text-gray-600">
              Public events and engagements featuring the Administrator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-100 text-blue-800 text-center py-2 px-4 rounded-full text-sm font-medium mb-4 inline-block">
                  {formatDate(event.date)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar size={16} className="mr-2" />
                  {event.time}
                </div>
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                  Add to Calendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Contact the Administrator's Office
              </h2>
              <p className="text-gray-600 mb-6">
                For inquiries, appointments, or messages to the Administrator,
                please use the following contact methods.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Schedule an Appointment
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Request a meeting with the Administrator
                  </p>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    Request Meeting
                  </button>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Send a Message
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Submit a formal message to the Administrator
                  </p>

                  <a
                    href={`mailto:${administrator?.email}`}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 inline-block"
                  >
                    Send a Message
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Official <span className="text-blue-700">Resources</span>
            </h2>
            <p className="text-lg text-gray-600">
              Download official documents, speeches, and reports from the
              Administrator's office
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Annual Report 2023", type: "PDF", size: "2.4 MB" },
              { title: "Development Strategy", type: "PDF", size: "3.1 MB" },
              { title: "Recent Speeches", type: "ZIP", size: "4.2 MB" },
            ].map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
                    <Download size={24} />
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{resource.size}</p>
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdministratorPage;
