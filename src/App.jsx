import React, { useEffect, useRef } from 'react';
import { trackPageView } from './utils/metaPixel';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PageLayout } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { OurProjectsPage } from './pages/OurProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BuyPropertyPage } from './pages/BuyPropertyPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { SellPropertyPage } from './pages/SellPropertyPage';
import { BuildOnMyPlotPage } from './pages/BuildOnMyPlotPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LocationsPage } from './pages/LocationsPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';

function RouteTracker() {
  const { pathname } = useLocation();
  const isFirstMount = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-projects" element={<OurProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/buy-property" element={<BuyPropertyPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/sell-property" element={<SellPropertyPage />} />
          <Route path="/build-on-my-plot" element={<BuildOnMyPlotPage />} />
          <Route path="/build" element={<BuildOnMyPlotPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/privacy-policy" element={<LegalPage mode="privacy" />} />
          <Route path="/terms-and-conditions" element={<LegalPage mode="terms" />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
