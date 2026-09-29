import React, { useState } from 'react';
import { X, ShieldCheck, User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

const PRESET_ROLES = [
  {
    role: 'admin',
    name: 'Dr. Alok Verma, IAS',
    title: 'Joint Secretary, Ministry of Tribal Affairs',
    description: 'Full administrative access: District KPIs, MGNREGA budget sanctioning, inter-departmental policy coordination.'
  },
  {
    role: 'hydro',
    name: 'Dr. Priya Sharma',
    title: 'Lead Hydrogeologist & GIS Specialist',
    description: 'Technical GIS control: Springshed delineation algorithms, lineament extraction, rock fracture analysis & slope risk audits.'
  },
  {
    role: 'field',
    name: 'Ramesh Behera',
    title: 'Field Verification Officer (DRDA / MGNREGA)',
    description: 'Ground operations: Submitting geotagged surveys, bucket discharge logging, community feedback & offline sync.'
  }
];

export default function LoginModal({ currentRole, onSelectRole, onClose }) {
  const [selectedRole, setSelectedRole] = useState(currentRole.role);

  const handleSelect = (r) => {
    setSelectedRole(r.role);
    onSelectRole(r);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '540px',
          maxWidth: '94vw',
          background: 'rgba(11, 20, 38, 0.98)',
          border: '1px solid var(--border-bright)',
          borderRadius: '18px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(7, 13, 24, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc' }}>
                Role-Based Access Control (RBAC)
              </h3>
              <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Select persona to preview tailored decision workflows
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Persona Options */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Choose a demo stakeholder role:
          </div>

          {PRESET_ROLES.map((item) => {
            const isCurrent = currentRole.role === item.role;
            return (
              <div
                key={item.role}
                onClick={() => handleSelect(item)}
                style={{
                  background: isCurrent ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: isCurrent ? '1.5px solid #06b6d4' : '1px solid var(--border-subtle)',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: item.role === 'admin' ? 'rgba(56, 189, 248, 0.2)' : item.role === 'hydro' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: item.role === 'admin' ? '#38bdf8' : item.role === 'hydro' ? '#34d399' : '#fbbf24'
                    }}>
                      {item.role.toUpperCase()}
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#f8fafc' }}>{item.name}</strong>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: '4px', fontWeight: 500 }}>
                    {item.title}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                    {item.description}
                  </div>
                </div>

                <div style={{
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isCurrent ? '#06b6d4' : 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  marginTop: '2px'
                }}>
                  {isCurrent ? <CheckCircle2 size={16} /> : <ArrowRight size={14} color="#94a3b8" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(7, 13, 24, 0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.74rem',
          color: 'var(--text-muted)'
        }}>
          <span>Secure OAuth 2.0 / Aadhaar-based Single Sign-On (SSO) Ready</span>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.76rem' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
