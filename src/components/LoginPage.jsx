import React, { useState, useEffect } from 'react';
import { Droplets, ShieldCheck, Lock, Mail, ArrowRight, UserCheck, CheckCircle2, Sparkles, Server, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { loginWithBackend, checkBackendHealth } from '../services/api';

export const DEMO_CREDENTIALS = [
  {
    role: 'admin',
    name: 'Dr. Alok Verma, IAS',
    title: 'Joint Secretary, Ministry of Tribal Affairs',
    email: 'admin@mota.gov.in',
    password: 'admin123',
    badge: 'Ministry Admin',
    desc: 'Access district-wide statistics, sanction MGNREGA budgets, and view state-level water security maps.'
  },
  {
    role: 'hydro',
    name: 'Dr. Priya Sharma',
    title: 'Senior Hydrogeologist & GIS Specialist (CGWB)',
    email: 'hydro@cgwb.gov.in',
    password: 'hydro123',
    badge: 'Hydrogeologist',
    desc: 'Analyze subterranean rock fractures, calibrate lineament weights, and inspect landslide risk zones.'
  },
  {
    role: 'field',
    name: 'Ramesh Behera',
    title: 'Field Verification Officer (DRDA Odisha)',
    email: 'field@drda.gov.in',
    password: 'field123',
    badge: 'Field Scout',
    desc: 'Submit bucket test flow measurements, capture geotagged photos, and log Gram Sabha feedback.'
  }
];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@mota.gov.in');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState(DEMO_CREDENTIALS[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ checked: false, online: false });

  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((health) => {
      if (isMounted) {
        setBackendStatus({ checked: true, online: health.online, data: health });
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleAutofill = (cred) => {
    setSelectedRole(cred);
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Attempt login with backend first
    try {
      const backendRes = await loginWithBackend(email, password);
      if (backendRes && backendRes.success && backendRes.user) {
        setLoading(false);
        onLogin(backendRes.user);
        return;
      } else if (backendRes && backendRes.success === false) {
        // If backend explicitly rejected credentials
        setError(backendRes.message || 'Invalid credentials.');
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Backend auth exception, attempting local fallback.");
    }

    // Client-side fallback if backend is offline
    const match = DEMO_CREDENTIALS.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (match && password === match.password) {
      setLoading(false);
      onLogin(match);
    } else if (email && password) {
      setLoading(false);
      onLogin({
        role: selectedRole.role,
        name: email.split('@')[0].toUpperCase(),
        title: selectedRole.title,
        email,
        badge: selectedRole.badge || 'Officer'
      });
    } else {
      setError('Please enter valid email and password.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at 50% 20%, #0c1a35 0%, #060b17 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Decorative Background Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '15%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Main Login Card */}
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '920px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border-bright)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75)'
      }}>
        {/* Left Side: Brand & Quick Demo Roles */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(14, 24, 43, 0.95) 0%, rgba(7, 13, 24, 0.95) 100%)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid var(--border-subtle)'
        }}>
          <div>
            {/* National Emblem & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0284c7 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
              }}>
                <Droplets size={26} color="#ffffff" />
              </div>
              <div>
                <h2 style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  margin: 0,
                  background: 'linear-gradient(to right, #ffffff, #38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  DharaDrishti
                </h2>
                <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600 }}>
                  धारा दृष्टि • SIH Problem ID 26240
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
              AI/ML-enabled Decision Support System for subterranean mountain springshed rejuvenation in India's tribal regions.
            </p>

            {/* Quick Demo Stakeholder Selector */}
            <div style={{ marginBottom: '12px', fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              1-Click Demo Profiles (For Evaluators):
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DEMO_CREDENTIALS.map((cred) => {
                const isSelected = selectedRole.role === cred.role;
                return (
                  <div
                    key={cred.role}
                    onClick={() => handleAutofill(cred)}
                    style={{
                      background: isSelected ? 'rgba(6, 182, 212, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1.5px solid #06b6d4' : '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: cred.role === 'admin' ? 'rgba(56, 189, 248, 0.2)' : cred.role === 'hydro' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: cred.role === 'admin' ? '#38bdf8' : cred.role === 'hydro' ? '#34d399' : '#fbbf24'
                        }}>
                          {cred.badge}
                        </span>
                        <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>{cred.name}</strong>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {cred.title}
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 size={16} color="#06b6d4" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '24px', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
            Ministry of Tribal Affairs • Government of India
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{
          background: 'rgba(11, 20, 38, 0.85)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Portal Sign In
              </h3>
              {backendStatus.checked && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 8px',
                  borderRadius: '20px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  background: backendStatus.online ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  border: backendStatus.online ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                  color: backendStatus.online ? '#34d399' : '#fbbf24'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: backendStatus.online ? '#10b981' : '#f59e0b',
                    boxShadow: backendStatus.online ? '0 0 8px #10b981' : 'none'
                  }} />
                  {backendStatus.online ? 'Python/SQLite Active' : 'Client Mode'}
                </div>
              )}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Sign in with your official credentials or use one-click autofill.
            </p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#fb7185',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Official Email / Username
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@mota.gov.in"
                  style={{
                    width: '100%',
                    background: '#091222',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '11px 12px 11px 38px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    background: '#091222',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '11px 12px 11px 38px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '0.92rem',
                marginTop: '6px',
                borderRadius: '12px'
              }}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Enter Decision Command Center</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Credentials Cheat Sheet for Evaluator */}
          <div style={{
            marginTop: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '0.72rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
              💡 Quick Evaluator Credentials:
            </div>
            <div>• <strong>Admin:</strong> <code>admin@mota.gov.in</code> / <code>admin123</code></div>
            <div>• <strong>Hydrogeologist:</strong> <code>hydro@cgwb.gov.in</code> / <code>hydro123</code></div>
            <div>• <strong>Field Officer:</strong> <code>field@drda.gov.in</code> / <code>field123</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}
