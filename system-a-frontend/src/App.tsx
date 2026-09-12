import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ApplyPage } from './pages/ApplyPage';
import { SubmissionResultPage } from './pages/SubmissionResultPage';
import { TrackPage } from './pages/TrackPage';
import { ApplicationRecord } from './types/application';
import './styles/portal.css';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'apply' | 'result' | 'track'>('home');
  const [preselectedScheme, setPreselectedScheme] = useState<string | undefined>();
  const [lastSubmission, setLastSubmission] = useState<ApplicationRecord | null>(null);
  const [trackAppId, setTrackAppId] = useState<string | undefined>();
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('eksutra_theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eksutra_theme', theme);
  }, [theme]);

  // Magnetic Button Physics (Matches EkSutra Frontend)
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const magneticBtns = document.querySelectorAll<HTMLElement>(
        '.btn-primary, .btn-saffron, .btn-gold, .btn-primary-nav, [data-magnetic="true"]'
      );

      magneticBtns.forEach((btn) => {
        if ((btn as HTMLButtonElement).disabled) return;
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const triggerRadius = Math.max(rect.width, rect.height) / 2 + 35;

        if (dist < triggerRadius) {
          const pull = (1 - dist / triggerRadius) * 5;
          const moveX = (dx / dist) * pull;
          const moveY = (dy / dist) * pull;

          btn.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) scale(1.025)`;
          btn.style.transition = 'transform 180ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 180ms ease';
        } else {
          if (btn.style.transform && btn.style.transform.includes('translate3d')) {
            btn.style.transform = '';
            btn.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease';
          }
        }
      });
    };

    const handleMouseLeave = () => {
      const magneticBtns = document.querySelectorAll<HTMLElement>(
        '.btn-primary, .btn-saffron, .btn-gold, .btn-primary-nav, [data-magnetic="true"]'
      );
      magneticBtns.forEach((btn) => {
        btn.style.transform = '';
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'apply') {
      setPreselectedScheme(param);
      setCurrentTab('apply');
    } else if (tab === 'track') {
      setTrackAppId(param);
      setCurrentTab('track');
    } else if (tab === 'home') {
      setCurrentTab('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmissionSuccess = (record: ApplicationRecord) => {
    setLastSubmission(record);
    setCurrentTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        currentTheme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="gov-main">
        <div key={currentTab} className="page-animate">
          {currentTab === 'home' && <HomePage onNavigate={handleNavigate} />}

          {currentTab === 'apply' && (
            <ApplyPage
              preselectedScheme={preselectedScheme}
              onSuccess={handleSubmissionSuccess}
            />
          )}

          {currentTab === 'result' && lastSubmission && (
            <SubmissionResultPage
              record={lastSubmission}
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === 'track' && (
            <TrackPage
              initialId={trackAppId}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
