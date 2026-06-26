import { useState } from 'react';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/dashboard.css';
import './styles/cards.css';
import './styles/forms.css';
import './styles/tables.css';
import './styles/badges.css';
import './styles/alerts.css';

import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import DirectoryPage from './pages/DirectoryPage';
import TradelinePlannerPage from './pages/TradelinePlannerPage';
import RoadmapPage from './pages/RoadmapPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'directory':
        return <DirectoryPage />;
      case 'planner':
        return <TradelinePlannerPage />;
      case 'roadmap':
        return <RoadmapPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <h2>BizCred OS</h2>
        <nav className="sidebar-nav">
          <button className={`sidebar-link ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
          <button className={`sidebar-link ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => setCurrentPage('profile')}>Profile</button>
          <button className={`sidebar-link ${currentPage === 'directory' ? 'active' : ''}`} onClick={() => setCurrentPage('directory')}>Directory</button>
          <button className={`sidebar-link ${currentPage === 'planner' ? 'active' : ''}`} onClick={() => setCurrentPage('planner')}>Tradeline Planner</button>
          <button className={`sidebar-link ${currentPage === 'roadmap' ? 'active' : ''}`} onClick={() => setCurrentPage('roadmap')}>Roadmap</button>
        </nav>
      </aside>

      <div className="app-content-wrapper">
        <header className="app-header">
          <div style={{ fontWeight: 'bold' }}>LOCAL-FIRST BUILDER</div>
          <div className="status-pill info">Educational Planning Only</div>
        </header>

        <main className="app-main">{renderPage()}</main>

        <footer className="app-footer">
          <p style={{ margin: 0 }}>
            Educational planning only. This tool does not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes. Verify vendor requirements and reporting directly.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
