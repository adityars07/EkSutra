import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  ArrowRight, 
  Search, 
  Shield, 
  ChevronRight,
  GraduationCap,
  Rocket,
  Briefcase
} from 'lucide-react';
import { SCHEMES } from '../services/api';

interface HomePageProps {
  onNavigate: (tab: string, preselectedScheme?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getSchemeIcon = (code: string) => {
    if (code.includes('EDU') || code.includes('SKL')) return <GraduationCap size={22} />;
    if (code.includes('ENT') || code.includes('START')) return <Rocket size={22} />;
    return <Briefcase size={22} />;
  };

  return (
    <div className="portal-layout">
      {/* Sahyadri Image-Led Institutional Hero Banner */}
      <section className="citizen-hero-section scroll-reveal">
        <div 
          className="hero-slider-bg" 
          style={{ backgroundImage: `url(/hero_sahyadri_1.jpg)` }}
        />
        <div className="hero-overlay-gradient" />

        <div className="citizen-hero-content">
          <div className="citizen-hero-badge">
            <ShieldCheck size={14} color="var(--gold-400)" />
            <span>महाराष्ट्र शासन &bull; Government of Maharashtra Single Window Gateway</span>
          </div>
          <h1 className="citizen-hero-title">
            Apply for Government Welfare & Innovation Schemes
          </h1>
          <p className="citizen-hero-desc">
            Access Department of Citizen Services welfare programs through a single, standards-compliant digital gateway. Zero redundant paper submissions with instant cross-department verification.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              className="btn btn-saffron btn-lg"
              onClick={() => onNavigate('apply')}
            >
              <span>Apply for Scheme Now</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-lg btn-outline"
              style={{
                background: 'rgba(246, 243, 236, 0.12)',
                color: '#F6F3EC',
                borderColor: 'rgba(246, 243, 236, 0.3)',
              }}
              onClick={() => onNavigate('track')}
            >
              <Search size={18} />
              <span>Track Existing Application</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Institutional Pillar Cards */}
      <section style={{ marginBottom: 44 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div className="card scroll-reveal reveal-delay-1" style={{ borderLeft: '4px solid var(--forest-800)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  background: 'var(--forest-50)',
                  color: 'var(--forest-800)',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid var(--forest-100)',
                }}
              >
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Secure</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your personal information is handled securely and privacy is protected under state data sovereignty rules.
            </p>
          </div>

          <div className="card scroll-reveal reveal-delay-2" style={{ borderLeft: '4px solid var(--gold-500)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  background: 'var(--gold-100)',
                  color: 'var(--gold-800)',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid var(--gold-200)',
                }}
              >
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Simple</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Apply through a single digital window without visiting multiple regional government offices.
            </p>
          </div>

          <div className="card scroll-reveal reveal-delay-3" style={{ borderLeft: '4px solid var(--forest-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  background: 'var(--forest-100)',
                  color: 'var(--forest-700)',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid var(--forest-200)',
                }}
              >
                <Eye size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Transparent</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Track your application status and cross-system verification milestones with complete visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Integrated Welfare Schemes Directory Header */}
      <div className="scroll-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold-700)', letterSpacing: '0.05em', marginBottom: 4 }}>
            Institutional Programs & Services
          </div>
          <h2 style={{ fontSize: '1.6rem', margin: 0 }}>Featured Government Schemes (2026-27)</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginTop: 4 }}>
            Select a scheme below to initiate your online citizen verification and application.
          </p>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="schemes-grid">
        {SCHEMES.map((scheme, idx) => (
          <div key={scheme.code} className={`scheme-card scroll-reveal reveal-delay-${(idx % 4) + 1}`}>
            <div>
              <div className="scheme-card-icon">
                {getSchemeIcon(scheme.code)}
              </div>
              <div className="scheme-dept-tag">{scheme.department}</div>
              <h3 className="scheme-card-title">{scheme.name}</h3>
              <p className="scheme-card-desc">Category: {scheme.category}</p>

              <div style={{ background: 'var(--bg-subtle)', padding: '10px 14px', borderRadius: 6, fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 18, borderLeft: '3px solid var(--gold-500)' }}>
                <strong>Benefit:</strong> {scheme.benefit}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
              <span className="badge badge-scheme">{scheme.code}</span>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => onNavigate('apply', scheme.code)}
              >
                <span>Apply Now</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Leadership Vision & Dignitaries Section */}
      <section className="dignitary-section scroll-reveal">
        <div className="card" style={{ padding: 32, borderTop: '3px solid var(--gold-500)' }}>
          <div className="card-header" style={{ marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Leadership & Institutional Vision</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Department of Citizen Services, Government of Maharashtra
              </p>
            </div>
            <span className="badge badge-msins">Govt of Maharashtra</span>
          </div>

          <div className="dignitary-grid">
            <div className="dignitary-card scroll-reveal reveal-delay-1">
              <div className="dignitary-avatar">
                CM
              </div>
              <div className="dignitary-details">
                <h4>Hon'ble Chief Minister</h4>
                <p>Government of Maharashtra</p>
                <p style={{ fontSize: '0.76rem', color: 'var(--gold-700)', marginTop: 4, fontWeight: 600 }}>Visionary Governance for Digital Maharashtra</p>
              </div>
            </div>

            <div className="dignitary-card scroll-reveal reveal-delay-2">
              <div className="dignitary-avatar">
                MS
              </div>
              <div className="dignitary-details">
                <h4>Hon'ble Minister</h4>
                <p>Citizen Services & Welfare</p>
                <p style={{ fontSize: '0.76rem', color: 'var(--gold-700)', marginTop: 4, fontWeight: 600 }}>Empowering Youth & Innovation Ecosystem</p>
              </div>
            </div>

            <div className="dignitary-card scroll-reveal reveal-delay-3">
              <div className="dignitary-avatar">
                CEO
              </div>
              <div className="dignitary-details">
                <h4>CEO & Director</h4>
                <p>Digital Citizen Welfare Mission</p>
                <p style={{ fontSize: '0.76rem', color: 'var(--forest-700)', marginTop: 4, fontWeight: 600 }}>Standards-based Data Interoperability</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
