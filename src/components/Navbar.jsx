import React from 'react';
import { 
  Droplets, 
  Layers, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  AlertTriangle,
  FileText,
  PlusCircle,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { TRIBAL_REGIONS } from '../data/springsData';

export default function Navbar({ 
  selectedRegion, 
  onSelectRegion, 
  currentRole, 
  onOpenLogin, 
  onLogout,
  onOpenSurvey,
  isDarkMode,
  onToggleTheme
}) {
  return (
    <header style={{
      height: '68px',
      background: 'rgba(11, 20, 38, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 1000,
      position: 'relative'
    }}>
      {/* Brand & Govt Emblem */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #0284c7 0%, #10b981 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)'
        }}>
          <Droplets size={24} color="#ffffff" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ 
              fontSize: '1.28rem', 
              fontWeight: 800, 
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              DharaDrishti <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600 }}>(धारा दृष्टि)</span>
            </h1>
            <span style={{
              background: 'rgba(56, 189, 248, 0.14)',
              color: '#38bdf8',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              SIH 26240
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0 }}>
            Ministry of Tribal Affairs • AI Springshed Decision Support System
          </p>
        </div>
      </div>

      {/* Center: Region Filter & Live Hazard Ticker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Region Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-subtle)',
          padding: '6px 12px',
          borderRadius: '10px'
        }}>
          <MapPin size={15} color="#38bdf8" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Region:</span>
          <select 
            value={selectedRegion}
            onChange={(e) => onSelectRegion(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {TRIBAL_REGIONS.map(reg => (
              <option key={reg.id} value={reg.id} style={{ background: '#0e182b', color: '#fff' }}>
                {reg.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hazard Alert Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '5px 12px',
          borderRadius: '999px'
        }}>
          <AlertTriangle size={14} color="#f59e0b" />
          <span style={{ fontSize: '0.74rem', color: '#fbbf24', fontWeight: 600 }}>
            Active Pre-Monsoon Deficit Alert
          </span>
        </div>
      </div>

      {/* Right: Role, Field Survey, Theme & Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Field Survey Trigger */}
        <button 
          onClick={onOpenSurvey}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
          title="Submit ground truth discharge and geotagged spring photo"
        >
          <PlusCircle size={15} color="#10b981" />
          <span>New Field Log</span>
        </button>

        {/* User Role Card */}
        <div 
          onClick={onOpenLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-subtle)',
            padding: '5px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title="Click to switch user role"
        >
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: currentRole.role === 'admin' ? '#0284c7' : currentRole.role === 'hydro' ? '#10b981' : '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserCheck size={14} color="#ffffff" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {currentRole.name}
            </div>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-secondary)' }}>
              {currentRole.title}
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
