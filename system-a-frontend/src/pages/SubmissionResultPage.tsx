import React from 'react';
import { 
  CheckCircle2, 
  Search, 
  FileText, 
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import { ApplicationRecord } from '../types/application';
import { StatusBadge } from '../components/common/StatusBadge';

interface SubmissionResultPageProps {
  record: ApplicationRecord;
  onNavigate: (tab: string, preselectedId?: string) => void;
}

export const SubmissionResultPage: React.FC<SubmissionResultPageProps> = ({ record, onNavigate }) => {
  const isConsented = record.consentGiven;
  const nameDisplay = record.fname && record.lname ? `${record.fname} ${record.lname}` : (record.applicantName || 'Applicant');
  const beneficiaryDisplay = record.beneficiaryId || record.citizenId || 'N/A';
  const dobDisplay = record.dob || record.dateOfBirth || 'N/A';

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Top Banner Card */}
      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: '36px 32px',
          marginBottom: 24,
          borderTop: isConsented ? '6px solid var(--forest-700)' : '6px solid var(--stone-600)',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: isConsented ? 'var(--forest-100)' : 'var(--gov-subtle)',
            color: isConsented ? 'var(--forest-800)' : 'var(--stone-600)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          {isConsented ? <CheckCircle2 size={36} /> : <FileText size={36} />}
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-text)', marginBottom: 6 }}>
          Application Submitted Successfully ✓
        </h2>
        <p style={{ color: 'var(--gov-text-secondary)', fontSize: '0.9rem' }}>
          {isConsented
            ? 'Your application has been received and verified across state registries.'
            : 'Your application has been received and filed with the Department of Citizen Services.'}
        </p>

        {/* Core Field Summary Grid */}
        <div
          style={{
            background: 'var(--gov-subtle)',
            border: '1px solid var(--gov-border-medium)',
            borderRadius: 8,
            padding: '20px 24px',
            margin: '28px 0',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Application ID */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--gov-border-medium)', paddingBottom: 12 }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Application Reference ID
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--forest-800)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                {record.applicationId}
              </div>
            </div>
            <StatusBadge status={record.status} />
          </div>

          {/* Citizen Particulars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, borderBottom: '1px solid var(--gov-border-medium)', paddingBottom: 12 }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Applicant Name
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: 2 }}>
                {nameDisplay}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Beneficiary ID
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: 2 }}>
                {beneficiaryDisplay}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Date of Birth
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: 2 }}>
                {dobDisplay}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gov-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Scheme Code
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                {record.schemeCode}
              </div>
            </div>
          </div>

          {/* ⭐ The Consent & Cross-System Differentiator ⭐ */}
          {isConsented ? (
            /* CONSENT = TRUE VIEW */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', fontWeight: 600 }}>Consent:</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest-800)', fontWeight: 700, fontSize: '0.88rem' }}>
                  <Check size={16} />
                  Granted
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', fontWeight: 600 }}>Integration:</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest-800)', fontWeight: 700, fontSize: '0.88rem' }}>
                  <Check size={16} />
                  Completed
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', fontWeight: 600 }}>Eligibility Result:</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest-800)', fontWeight: 700, fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} />
                  Verified Eligible
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', fontWeight: 600 }}>Master Status:</span>
                <span style={{ fontWeight: 800, color: 'var(--forest-800)', fontSize: '0.92rem' }}>
                  ELIGIBILITY VERIFIED
                </span>
              </div>
            </div>
          ) : (
            /* CONSENT = FALSE VIEW */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', fontWeight: 600 }}>Consent:</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--stone-600)', fontWeight: 700, fontSize: '0.88rem' }}>
                  <X size={16} />
                  Not Provided
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', fontWeight: 600 }}>Cross-System Verification:</span>
                <span style={{ color: 'var(--stone-600)', fontWeight: 700, fontSize: '0.88rem' }}>
                  Not Initiated
                </span>
              </div>

              <div style={{ background: 'var(--gov-surface)', borderLeft: '3px solid var(--stone-500)', padding: '10px 14px', borderRadius: 6, fontSize: '0.84rem', color: 'var(--gov-text-secondary)', marginTop: 4 }}>
                Your application has been submitted to System A. Cross-system eligibility verification was not initiated because consent was not provided.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--gov-text-secondary)', fontWeight: 600 }}>Master Status:</span>
                <span style={{ fontWeight: 800, color: 'var(--stone-600)', fontSize: '0.92rem' }}>
                  RECEIVED
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onNavigate('track', record.applicationId)}
          >
            <Search size={16} />
            <span>Track This Application</span>
          </button>

          <button
            className="btn btn-outline btn-lg"
            onClick={() => onNavigate('apply')}
          >
            <RotateCcw size={16} />
            <span>Apply for Another Scheme</span>
          </button>
        </div>
      </div>
    </div>
  );
};
