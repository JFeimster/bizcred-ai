import { useState } from 'react';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/dashboard.css';
import './styles/cards.css';
import './styles/forms.css';
import './styles/tables.css';
import './styles/badges.css';
import './styles/alerts.css';

import BusinessHqPage from './pages/BusinessHqPage';
import BizCreditPassportPage from './pages/BizCreditPassportPage';
import ProfilePage from './pages/ProfilePage';
import CreditDirectoryPage from './pages/CreditDirectoryPage';
import VendorProfilePage from './pages/VendorProfilePage';
import TradelinePlannerPage from './pages/TradelinePlannerPage';
import RoadmapPage from './pages/RoadmapPage';
import ImportsPage from './pages/ImportsPage';
import ExportsPage from './pages/ExportsPage';
import SchemasPage from './pages/SchemasPage';

function App() {
  const [currentPage, setCurrentPage] = useState('business-hq');
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);

  function navigateToVendorProfile(vendorId: string) {
    setSelectedVendorId(vendorId);
    setCurrentPage('vendor-profile');
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'business-hq':
        return <BusinessHqPage />;
      case 'passport':
        return <BizCreditPassportPage />;
      case 'profile':
        return <ProfilePage />;
      case 'directory':
        return <CreditDirectoryPage onViewProfile={navigateToVendorProfile} />;
      case 'vendor-profile':
        return <VendorProfilePage vendorId={selectedVendorId} onBack={() => setCurrentPage('directory')} />;
      case 'planner':
        return <TradelinePlannerPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'imports':
        return <ImportsPage />;
      case 'exports':
        return <ExportsPage />;
      case 'schemas':
        return <SchemasPage />;
      default:
        return <BusinessHqPage />;
    }
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <h2>BizCred OS</h2>
        <nav className="sidebar-nav">
          <button className={`sidebar-link ${currentPage === 'business-hq' ? 'active' : ''}`} onClick={() => setCurrentPage('business-hq')}>Business HQ</button>
          <button className={`sidebar-link ${currentPage === 'passport' ? 'active' : ''}`} onClick={() => setCurrentPage('passport')}>BizCredit Passport</button>
          <button className={`sidebar-link ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => setCurrentPage('profile')}>Profile</button>
          <button className={`sidebar-link ${currentPage === 'directory' || currentPage === 'vendor-profile' ? 'active' : ''}`} onClick={() => setCurrentPage('directory')}>Directory</button>
          <button className={`sidebar-link ${currentPage === 'planner' ? 'active' : ''}`} onClick={() => setCurrentPage('planner')}>Tradeline Planner</button>
          <button className={`sidebar-link ${currentPage === 'roadmap' ? 'active' : ''}`} onClick={() => setCurrentPage('roadmap')}>Roadmap</button>
          <button className={`sidebar-link ${currentPage === 'imports' ? 'active' : ''}`} onClick={() => setCurrentPage('imports')}>Imports</button>
          <button className={`sidebar-link ${currentPage === 'exports' ? 'active' : ''}`} onClick={() => setCurrentPage('exports')}>Exports</button>
          <button className={`sidebar-link ${currentPage === 'schemas' ? 'active' : ''}`} onClick={() => setCurrentPage('schemas')}>Schemas</button>
        </nav>
      </aside>

      <div className="app-content-wrapper">
        <header className="app-header">
          <div style={{ fontWeight: 'bold' }}>LOCAL-FIRST BUILDER</div>
          <div className="status-pill info">Educational Planning Only</div>
        </header>

        <main className="app-main">{renderPage()}</main>

        <footer className="app-footer">
          <p style={{ margin: 0 }}>Educational planning only. Verify vendor requirements and reporting directly.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
