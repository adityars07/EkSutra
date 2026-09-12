import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, Info } from 'lucide-react';
import { api } from '../services/api';
import { ApplicationRecord } from '../types/application';
import { StatusBadge } from '../components/common/StatusBadge';

interface TrackPageProps {
  initialId?: string;
  onNavigate: (tab: string) => void;
}

export const TrackPage: React.FC<TrackPageProps> = ({ initialId, onNavigate }) => {
  const [searchId, setSearchId] = useState(initialId || '');
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<ApplicationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchId.trim();
    if (!query) {
      setErrorMsg('Please enter a valid Application ID (e.g. APP-10042) or Citizen ID.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const record = await api.getApplicationById(query);
      if (record) {
        setApplication(record);
      } else {
        setApplication(null);
        setErrorMsg(`No application found matching "${query}". Please check the ID.`);
      }
    } catch (err) {
      setErrorMsg('Unable to retrieve application records. Please try again.');
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  useEffect(() => {
    if (initialId) {
      setSearchId(initialId);
      handleTrack();
    }
  }, [initialId]);

  return (
    <div style={{ maxWidth: 740, margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-text)' }}>
          Track Your Application Status
        </h2>
        <p style={{ color: 'var(--gov-text-muted)', fontSize: '0.88rem', marginTop: 4 }}>
          Enter your Application Reference ID or Citizen Identifier to view the real-time processing status.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="card" style={{ marginBottom: 28 }}>
        <form onSubmit={handleTrack} style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: 40, fontSize: '0.96rem' }}
              placeholder="Enter Application ID (e.g. APP-10042) or Citizen ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--gov-text-muted)' }} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }} disabled={loading}>
            {loading ? 'Searching...' : 'Track Application'}
          </button>
        </form>

        {errorMsg && (
          <p style={{ color: 'var(--terracotta-600)', fontSize: '0.84rem', marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Info size={14} />
            <span>{errorMsg}</span>
          </p>
        )}
      </div>

      {/* Results View */}
      {application && (
        <div className="card" style={{ padding: 28 }}>
          {/* Header Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--gov-border)', paddingBottom: 16, marginBottom: 20 }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Application Record
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--forest-800)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                {application.applicationId}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', marginTop: 2 }}>
                Applicant: <strong>{application.applicantName}</strong> &bull; Scheme: <span style={{ fontWeight: 600 }}>{application.schemeCode}</span>
              </p>
            </div>
            <StatusBadge status={application.status} />
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
            <div style={{ background: 'var(--gov-subtle)', padding: 12, borderRadius: 6, border: '1px solid var(--gov-border-medium)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Citizen ID</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, marginTop: 2 }}>{application.citizenId}</div>
            </div>

            <div style={{ background: 'var(--gov-subtle)', padding: 12, borderRadius: 6, border: '1px solid var(--gov-border-medium)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Consent Granted</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, marginTop: 2, color: application.consentGiven ? 'var(--forest-800)' : 'var(--stone-500)' }}>
                {application.consentGiven ? '✓ Yes (Authorized)' : '✗ No (Withheld)'}
              </div>
            </div>

            <div style={{ background: 'var(--gov-subtle)', padding: 12, borderRadius: 6, border: '1px solid var(--gov-border-medium)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Cross-System Status</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, marginTop: 2 }}>
                {application.crossSystemVerification === 'COMPLETED' ? 'Completed' : 'Not Initiated'}
              </div>
            </div>
          </div>

          {/* Detailed Visual Timeline */}
          <div>
            <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--gov-text)', marginBottom: 14 }}>
              Application Lifecycle Timeline
            </h4>

            {application.consentGiven ? (
              /* Consent Given Timeline */
              <div className="timeline">
                <div className="timeline-step">
                  <div className="timeline-dot done">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="timeline-title">Application Received</div>
                  <div className="timeline-desc">Filing submitted to Department of Citizen Services.</div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-dot done">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="timeline-title">Citizen Consent Verified</div>
                  <div className="timeline-desc">Explicit consent granted for cross-departmental verification.</div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-dot done">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="timeline-title">Interoperability Gateway Checks</div>
                  <div className="timeline-desc">Cross-registry records validated across authorized government systems.</div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-dot done">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="timeline-title">Eligibility Verified</div>
                  <div className="timeline-desc">Applicant meets criteria and is flagged for administrative sanction.</div>
                </div>
              </div>
            ) : (
              /* Consent Denied Timeline */
              <div className="timeline">
                <div className="timeline-step">
                  <div className="timeline-dot done">
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="timeline-title">Application Received</div>
                  <div className="timeline-desc">Stored in local department registry for manual administrative review.</div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-dot skipped">
                    <Clock size={13} />
                  </div>
                  <div className="timeline-title" style={{ color: 'var(--gov-text-muted)' }}>Cross-System Verification Not Initiated</div>
                  <div className="timeline-desc">
                    Consent was not provided by the citizen. No external data exchange or automated checks performed.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
