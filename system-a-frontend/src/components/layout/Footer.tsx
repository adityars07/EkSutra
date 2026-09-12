import React from 'react';
import { Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="gov-footer">
      <div className="gov-footer-inner">
        <div className="gov-footer-grid">
          <div>
            <h4>Department of Citizen Services</h4>
            <p>
              An official initiative under the Citizen Welfare Administration, Government of Maharashtra.
              Providing transparent, single-window access to government welfare schemes, innovation grants, and direct benefit transfer services.
            </p>
          </div>

          <div>
            <h4>Welfare & Innovation Schemes</h4>
            <ul>
              <li>Innovation & Startup Seed Grant (EDU01)</li>
              <li>Vocational Skill Training Subsidy (SKL02)</li>
              <li>Micro-Enterprise Support Assistance (ENT03)</li>
              <li>Direct Benefit Transfer Verification Engine</li>
            </ul>
          </div>

          <div>
            <h4>Data Sovereignty & Privacy</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, color: 'var(--ivory-100)' }}>
              <Lock size={16} color="var(--gold-400)" />
              <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Consent-Based Citizen Data Exchange</span>
            </div>
            <p style={{ marginTop: 8, fontSize: '0.78rem' }}>
              Cross-system data verification is initiated strictly with explicit citizen consent under Digital Personal Data Protection principles.
            </p>
          </div>
        </div>

        <div className="gov-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Department of Citizen Services, Government of Maharashtra. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Hyperlink Policy</span>
            <span style={{ cursor: 'pointer' }}>Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
