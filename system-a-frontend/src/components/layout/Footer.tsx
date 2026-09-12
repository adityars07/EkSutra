import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="gov-footer">
      <div className="gov-footer-inner">
        <div className="gov-footer-grid">
          <div>
            <h4>Government Service Portal</h4>
            <p>
              An initiative under the Citizen Welfare Administration, providing seamless, single-window access
              to government schemes, scholarships, subsidies, and employment generation programs.
            </p>
          </div>

          <div>
            <h4>Citizen Services</h4>
            <ul>
              <li>Innovation & Startup Grants</li>
              <li>Vocational Skill Subsidy</li>
              <li>Micro-Enterprise Assistance</li>
              <li>Direct Benefit Transfer Verification</li>
            </ul>
          </div>

          <div>
            <h4>Data Privacy & Governance</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, color: '#e2e8f0' }}>
              <Lock size={16} color="#86efac" />
              <span style={{ fontSize: '0.84rem' }}>Consent-Based Citizen Data Exchange</span>
            </div>
            <p style={{ marginTop: 8, fontSize: '0.78rem' }}>
              Cross-system data verification is initiated strictly with explicit citizen consent in accordance with the Digital Personal Data Protection Act.
            </p>
          </div>
        </div>

        <div className="gov-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Department of Citizen Services. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Hyperlink Policy</span>
            <span>Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
