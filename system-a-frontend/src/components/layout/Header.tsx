import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Moon, 
  Sun, 
  FileText, 
  Search, 
  Home
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  currentTheme?: string;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  currentTheme = 'light',
  onToggleTheme,
}) => {
  const [lang, setLang] = useState<'EN' | 'MR'>('EN');

  return (
    <>
      {/* Top Official Government Utility Bar (Identical to EkSutra Navbar) */}
      <div className="govt-top-bar">
        <div className="govt-top-bar-left">
          <div className="govt-flag-strip" title="National Flag of India">
            <div className="strip-saffron"></div>
            <div className="strip-white"></div>
            <div className="strip-green"></div>
          </div>
          <span>महाराष्ट्र शासन | Government of Maharashtra</span>
        </div>

        <div className="govt-top-bar-right">
          <button 
            className="govt-btn-util"
            onClick={() => setLang(lang === 'EN' ? 'MR' : 'EN')}
            title="Switch Language"
          >
            <Globe size={11} style={{ display: 'inline', marginRight: 4 }} />
            {lang === 'EN' ? 'मराठी' : 'English'}
          </button>

          {onToggleTheme && (
            <button 
              className="govt-btn-util"
              onClick={onToggleTheme}
              title="Toggle Dark / Light Theme"
            >
              {currentTheme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
              <span>{currentTheme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Government Header (Identical to EkSutra Header) */}
      <header className="govt-brand-header">
        <div className="govt-brand-left">
          <div className="govt-logo-badge" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <img src="/logo.svg" alt="EkSutra Logo" style={{ width: 38, height: 38 }} />
          </div>
          <div className="govt-title-group">
            <h1>
              <span>EkSutra</span>
              <span className="font-marathi" style={{ fontSize: '1.1rem', opacity: 0.85 }}>| System A</span>
              <span className="badge-msins">Citizen Portal</span>
            </h1>
            <p>
              {lang === 'EN' 
                ? 'Department of Citizen Services · Government of Maharashtra' 
                : 'नागरी सेवा विभाग · महाराष्ट्र शासन'}
            </p>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="gov-nav">
          <button
            className={`nav-link ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            <Home size={15} />
            <span>Home</span>
          </button>
          <button
            className={`nav-link ${currentTab === 'apply' ? 'active' : ''}`}
            onClick={() => onNavigate('apply')}
          >
            <FileText size={15} />
            <span>Apply for Scheme</span>
          </button>
          <button
            className={`nav-link ${currentTab === 'track' ? 'active' : ''}`}
            onClick={() => onNavigate('track')}
          >
            <Search size={15} />
            <span>Track Application</span>
          </button>
          <button
            className="btn btn-saffron btn-sm btn-primary-nav"
            style={{ marginLeft: 6 }}
            onClick={() => onNavigate('apply')}
          >
            <ShieldCheck size={14} />
            <span>Apply Now</span>
          </button>
        </div>
      </header>
    </>
  );
};
