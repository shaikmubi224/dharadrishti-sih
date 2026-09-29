import React from 'react';
import { Droplet, AlertCircle, Hammer, Users, TrendingUp, ShieldAlert } from 'lucide-react';
import { formatINR } from '../utils/hydroEngine';

export default function StatsBanner({ springs, selectedRegionStats }) {
  // Compute aggregated stats
  const totalSprings = springs.length;
  const criticalCount = springs.filter(s => s.status === 'Critical').length;
  const depletedCount = springs.filter(s => s.status === 'Depleted').length;
  const healthyCount = springs.filter(s => s.status === 'Healthy' || s.status === 'Moderate').length;
  
  const totalBeneficiaries = springs.reduce((acc, curr) => acc + (curr.populationServed || 0), 0);
  
  const totalInterventionsCount = springs.reduce((acc, s) => {
    return acc + (s.interventions ? s.interventions.length : 0);
  }, 0);

  const totalCost = springs.reduce((acc, s) => {
    if (!s.interventions) return acc;
    return acc + s.interventions.reduce((sum, item) => sum + (item.estCostInr || 0), 0);
  }, 0);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      padding: '14px 24px',
      background: 'rgba(7, 13, 24, 0.65)',
      borderBottom: '1px solid var(--border-subtle)',
      zIndex: 10
    }}>
      {/* Metric 1: Total Springs */}
      <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#38bdf8'
        }}>
          <Droplet size={22} />
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Springs Monitored
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {totalSprings} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>Locations</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#34d399', display: 'flex', gap: '6px' }}>
            <span>🟢 {healthyCount} Perennial</span>
            <span style={{ color: '#fbbf24' }}>🟡 {depletedCount} Seasonal</span>
          </div>
        </div>
      </div>

      {/* Metric 2: Critical Springs */}
      <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(244, 63, 94, 0.12)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fb7185'
        }}>
          <AlertCircle size={22} />
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Critical / Drying
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fb7185' }}>
            {criticalCount} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>({Math.round((criticalCount / totalSprings) * 100)}%)</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#fb7185' }}>
            Immediate Springshed revival required
          </div>
        </div>
      </div>

      {/* Metric 3: Planned MGNREGA Interventions */}
      <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#34d399'
        }}>
          <Hammer size={22} />
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Recharge Interventions
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {totalInterventionsCount} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>Structures</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>
            Est. Budget: {formatINR(totalCost)}
          </div>
        </div>
      </div>

      {/* Metric 4: Tribal Citizens Impact */}
      <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(168, 85, 247, 0.12)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c084fc'
        }}>
          <Users size={22} />
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Tribal Beneficiaries
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {totalBeneficiaries.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>People</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#34d399' }}>
            Drinking water security secured
          </div>
        </div>
      </div>
    </div>
  );
}
