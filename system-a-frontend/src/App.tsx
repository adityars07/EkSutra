import React, { useState } from 'react';
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
  };

  const handleSubmissionSuccess = (record: ApplicationRecord) => {
    setLastSubmission(record);
    setCurrentTab('result');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header currentTab={currentTab} onNavigate={handleNavigate} />

      <main className="gov-main">
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
      </main>

      <Footer />
    </div>
  );
};

export default App;
