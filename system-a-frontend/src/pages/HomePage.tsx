import React from 'react';
import { Shield, Sparkles, Eye, ArrowRight, CheckCircle, Award, FileText, Search } from 'lucide-react';
import { SCHEMES } from '../services/api';

interface HomePageProps {
  onNavigate: (tab: string, preselectedScheme?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f2d59 0%, #1e3a8a 100%)',
          color: '#ffffff',
          borderRadius: 12,
          padding: '48px 40px',
          marginBottom: 40,
          boxShadow: '0 10px 25px -5px rgba(15, 45, 89, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 680, position: 'relative', zIndex: 2 }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Official Citizen Services Portal
          </span>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, lineHeight: 1.25, marginBottom: 14 }}>
            Apply for Government Welfare & Innovation Schemes
          </h2>
          <p style={{ fontSize: '1.02rem', opacity: 0.9, lineHeight: 1.6, marginBottom: 28 }}>
            A unified single-window service for citizens to submit applications, authorize voluntary cross-registry
            verification, and receive instant eligibility sanction across state schemes.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              className="btn btn-lg"
              style={{ background: '#ea580c', color: '#ffffff', border: 'none' }}
              onClick={() => onNavigate('apply')}
            >
              <span>Apply for Scheme Now</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-lg btn-outline"
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
              onClick={() => onNavigate('track')}
            >
              <Search size={18} />
              <span>Track Existing Application</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Value Cards Specified in Spec */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div className="card" style={{ borderLeft: '4px solid #0f2d59' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#e8eef8', color: '#0f2d59', padding: 10, borderRadius: 8 }}>
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Secure</h3>
            </div>
            <p style={{ color: 'var(--gov-text-secondary)', fontSize: '0.9rem' }}>
              Your personal information is handled securely and privacy is protected under state data sovereignty rules.
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #ea580c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#fff3ea', color: '#ea580c', padding: 10, borderRadius: 8 }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Simple</h3>
            </div>
            <p style={{ color: 'var(--gov-text-secondary)', fontSize: '0.9rem' }}>
              Apply through a single digital window without visiting multiple regional government offices.
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #15803d' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#f0fdf4', color: '#15803d', padding: 10, borderRadius: 8 }}>
                <Eye size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Transparent</h3>
            </div>
            <p style={{ color: 'var(--gov-text-secondary)', fontSize: '0.9rem' }}>
              Track your application status and cross-system verification milestones with complete visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Available Schemes Directory */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gov-primary)' }}>
              Featured Government Schemes (2026-27)
            </h3>
            <p style={{ color: 'var(--gov-text-muted)', fontSize: '0.86rem' }}>
              Select a scheme below to initiate your online citizen verification and application.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 20 }}>
          {SCHEMES.map((scheme) => (
            <div key={scheme.code} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'var(--gov-primary-light)',
                    color: 'var(--gov-primary)',
                    padding: '3px 8px',
                    borderRadius: 4,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {scheme.category} &bull; {scheme.code}
                </span>
                <h4 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: 8, color: 'var(--gov-primary)' }}>
                  {scheme.name}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--gov-text-muted)', marginBottom: 12 }}>
                  {scheme.department}
                </p>
                <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '10px 12px', borderRadius: 6, fontSize: '0.84rem', fontWeight: 600, color: '#0f2d59', marginBottom: 16 }}>
                  Benefit: {scheme.benefit}
                </div>
              </div>

              <button
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.86rem' }}
                onClick={() => onNavigate('apply', scheme.code)}
              >
                <span>Apply for this Scheme</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
