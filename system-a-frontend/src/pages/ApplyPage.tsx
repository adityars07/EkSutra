import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Info, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  ShieldCheck
} from 'lucide-react';
import { SCHEMES, api } from '../services/api';
import { ApplicationFormInput, ApplicationRecord } from '../types/application';

interface ApplyPageProps {
  preselectedScheme?: string;
  onSuccess: (record: ApplicationRecord) => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ preselectedScheme, onSuccess }) => {
  const [formData, setFormData] = useState<ApplicationFormInput>({
    applicantName: 'Rahul Sharma',
    citizenId: 'CIT-10042',
    dateOfBirth: '2002-04-12',
    schemeCode: preselectedScheme || SCHEMES[0].code,
    consentGiven: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  useEffect(() => {
    if (preselectedScheme) {
      setFormData((prev) => ({ ...prev, schemeCode: preselectedScheme }));
    }
  }, [preselectedScheme]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.applicantName.trim()) {
      errs.applicantName = 'Applicant full name is required.';
    }
    if (!formData.citizenId.trim()) {
      errs.citizenId = 'Citizen ID / Aadhaar is required.';
    }
    if (!formData.dateOfBirth) {
      errs.dateOfBirth = 'Date of birth is required.';
    }
    if (!formData.schemeCode) {
      errs.schemeCode = 'Please select a welfare scheme.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setProcessingStep(1);

    try {
      setTimeout(() => setProcessingStep(2), 600);
      setTimeout(() => setProcessingStep(3), 1200);

      const record = await api.submitApplication(formData);

      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess(record);
      }, 1900);
    } catch (err: any) {
      setIsSubmitting(false);
      alert('Unable to submit your application. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-text)' }}>
          Government Scheme Application Form
        </h2>
        <p style={{ color: 'var(--gov-text-muted)', fontSize: '0.88rem', marginTop: 4 }}>
          Please complete all required citizen particulars to submit your application to the Department of Citizen Services.
        </p>
      </div>

      {isSubmitting ? (
        /* Multi-Step Processing State */
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: 14,
              background: 'var(--forest-100)',
              borderRadius: '50%',
              marginBottom: 16,
            }}
          >
            <Loader2 size={32} className="spin" color="var(--forest-800)" />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gov-text)', marginBottom: 8 }}>
            Processing Application
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--gov-text-secondary)', marginBottom: 28 }}>
            Communicating with government registry and processing your submission...
          </p>

          <div style={{ maxWidth: 440, margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: processingStep >= 1 ? 'var(--forest-800)' : 'var(--stone-500)' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Application received & validated</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: processingStep >= 2 ? 'var(--forest-800)' : 'var(--stone-500)' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                Consent status: {formData.consentGiven ? 'Granted (Cross-System Authorized)' : 'Not Provided (Local Filing Only)'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: processingStep >= 3 ? 'var(--gold-700)' : 'var(--stone-500)' }}>
              {processingStep >= 3 ? <Loader2 size={18} className="spin" /> : <Clock size={18} />}
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {formData.consentGiven
                  ? 'Verifying cross-departmental eligibility data...'
                  : 'Filing locally with Department of Citizen Services...'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* The Application Form */
        <form onSubmit={handleSubmit} className="card">
          {/* Applicant Name */}
          <div className="form-group">
            <label className="form-label">
              Applicant Full Name <span className="req">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Rahul Sharma"
              value={formData.applicantName}
              onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
            />
            {errors.applicantName && <p style={{ color: 'var(--terracotta-600)', fontSize: '0.78rem', marginTop: 4 }}>{errors.applicantName}</p>}
            <p className="form-hint">Enter your official name as registered on government identity documents.</p>
          </div>

          {/* Citizen ID */}
          <div className="form-group">
            <label className="form-label">
              Citizen ID / Beneficiary Identifier <span className="req">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. CIT-10042 or 12-digit Aadhaar"
              value={formData.citizenId}
              onChange={(e) => setFormData({ ...formData, citizenId: e.target.value })}
            />
            {errors.citizenId && <p style={{ color: 'var(--terracotta-600)', fontSize: '0.78rem', marginTop: 4 }}>{errors.citizenId}</p>}
            <p className="form-hint">Your unique citizen identifier used for DBT welfare mapping.</p>
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label className="form-label">
              Date of Birth <span className="req">*</span>
            </label>
            <input
              type="date"
              className="form-input"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
            {errors.dateOfBirth && <p style={{ color: 'var(--terracotta-600)', fontSize: '0.78rem', marginTop: 4 }}>{errors.dateOfBirth}</p>}
          </div>

          {/* Scheme Selection */}
          <div className="form-group">
            <label className="form-label">
              Welfare / Innovation Scheme <span className="req">*</span>
            </label>
            <select
              className="form-select"
              value={formData.schemeCode}
              onChange={(e) => setFormData({ ...formData, schemeCode: e.target.value })}
            >
              {SCHEMES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
            {errors.schemeCode && <p style={{ color: 'var(--terracotta-600)', fontSize: '0.78rem', marginTop: 4 }}>{errors.schemeCode}</p>}
          </div>

          {/* ⭐ Data Verification Consent Card ⭐ */}
          <div className={`consent-card ${formData.consentGiven ? 'checked' : ''}`}>
            <div className="consent-header">
              <ShieldCheck size={18} color={formData.consentGiven ? 'var(--forest-700)' : 'var(--stone-600)'} />
              <span>Data Verification Consent (Voluntary)</span>
            </div>

            <label className="consent-checkbox-row">
              <input
                type="checkbox"
                className="consent-checkbox"
                checked={formData.consentGiven}
                onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
              />
              <span className="consent-text">
                I consent to the use and verification of my information across authorized government systems for determining my eligibility for this scheme.
              </span>
            </label>

            <div className="consent-subtext">
              <Info size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} color="var(--gold-700)" />
              <strong>Important Notice:</strong> Your application can still be submitted without consent, but cross-system verification will not be initiated.
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--gov-border)' }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ minWidth: 220 }}
            >
              <Send size={16} />
              <span>Submit Application</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
