import React from 'react';
import { Landmark, HelpCircle, Bell, Shield, FileText, Search, Home } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate }) => {
  return (
    <>
      {/* Official Government Top Bar */}
      <div className="gov-top-bar">
        <div className="gov-top-bar-left">
          <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>GOVERNMENT OF MAHARASHTRA</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>Digital Citizen Services Division</span>
        </div>
        <div className="gov-top-bar-right">
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <HelpCircle size={13} />
            <span>Toll-Free Citizen Helpline: 1800-120-8040</span>
          </span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span style={{ cursor: 'pointer' }}>English / मराठी</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="gov-header">
        <div className="gov-header-inner">
          <div className="gov-brand" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <div className="gov-emblem">
              <Landmark size={24} />
            </div>
            <div className="gov-title-group">
              <h1>GOVERNMENT SERVICE PORTAL</h1>
              <p>Department of Citizen Services &bull; Single-Window Portal</p>
            </div>
          </div>

          <nav className="gov-nav">
            <button
              className={`nav-link ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => onNavigate('home')}
            >
              <Home size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              Home
            </button>
            <button
              className={`nav-link ${currentTab === 'apply' ? 'active' : ''}`}
              onClick={() => onNavigate('apply')}
            >
              <FileText size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              Apply for Scheme
            </button>
            <button
              className={`nav-link ${currentTab === 'track' ? 'active' : ''}`}
              onClick={() => onNavigate('track')}
            >
              <Search size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              Track Application
            </button>
            <button
              className="btn btn-primary btn-primary-nav"
              style={{ marginLeft: 8, padding: '8px 16px', fontSize: '0.84rem' }}
              onClick={() => onNavigate('apply')}
            >
              Apply Now
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};
