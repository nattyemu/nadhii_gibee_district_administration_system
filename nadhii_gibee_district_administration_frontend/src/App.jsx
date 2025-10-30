import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import ContactPage from "./components/ContactPage/ContactPage";
import Footer from "./components/Footer/Footer";
import HeroBanner from "./components/HomePage/HeroBanner";
import ArticleDetail from "./components/NewsPage/ArticleDetail";
import ServicesSection from "./components/HomePage/ServicesSection";
import StatisticsSection from "./components/HomePage/StatisticsSection";
import NewsSection from "./components/HomePage/NewsSection";
import HistoryPage from "./components/AboutPage/HistoryPage";
import LeadershipPage from "./components/AboutPage/LeadershipPage";
import StructurePage from "./components/AboutPage/StructurePage";
import VisionMissionPage from "./components/AboutPage/VisionMisssionPage";
import NewsPage from "./components/NewsPage/NewsPage";
import AdministratorPage from "./components/GovernmentPage/AdministratorPage";
import CabinetsPage from "./components/GovernmentPage/CabinetsPage";
import WoredasPage from "./components/GovernmentPage/WoredasPage";
import OfficesPage from "./components/GovernmentPage/OfficesPage";
import InvestmentOpportunitiesPage from "./components/ServicesPage/InvestmentOpportunitiesPage";
import LeaderProfile from "./components/HomePage/LeaderProfile";
import BusinessServicesPage from "./components/ServicesPage/BusinessServicesPage";
import AgriculturalResourcesPage from "./components/ServicesPage/AgriculturalResourcesPage";
import LoginModal from "./components/Login/LoginModal";
import WellKnownFor from "./components/HomePage/WellKnownFor";
import InvestmentOpportunities from "./components/HomePage/InvestmentOpportunities";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/admin" replace />;
};

// Protected Route component for login page
const LoginRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="font-primary overflow-x-hidden">
          <Navbar />
          <Routes>
            {/* Main Landing Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroBanner />
                  <LeaderProfile />
                  {/* <ServicesSection /> */}
                  <StatisticsSection />
                  <WellKnownFor />
                  <InvestmentOpportunities />
                  <NewsSection />
                  <Footer />
                </>
              }
            />
            {/* ADDED LOGIN ROUTE */}
            <Route
              path="/admin"
              element={
                <LoginRoute>
                  <>
                    <HeroBanner />
                    <LeaderProfile />
                    {/* <ServicesSection /> */}
                    <StatisticsSection />
                    <NewsSection />
                    <Footer />
                    <LoginModal onClose={() => window.history.back()} />
                  </>
                </LoginRoute>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <>
                  <HistoryPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/leadership"
              element={
                <>
                  <LeadershipPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/structure"
              element={
                <>
                  <StructurePage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/vision"
              element={
                <>
                  <VisionMissionPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/administrator"
              element={
                <>
                  <AdministratorPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/cabinets"
              element={
                <>
                  <CabinetsPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/kebeles"
              element={
                <>
                  <WoredasPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/sector"
              element={
                <>
                  <OfficesPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/investment-opportunities"
              element={
                <>
                  <InvestmentOpportunitiesPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/business-resources"
              element={
                <>
                  <BusinessServicesPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/agricultural-resources"
              element={
                <>
                  <AgriculturalResourcesPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/news"
              element={
                <>
                  <NewsPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/article/:id"
              element={
                <>
                  <ArticleDetail />
                  <Footer />
                </>
              }
            />

            <Route
              path="/contact"
              element={
                <>
                  <ContactPage />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
