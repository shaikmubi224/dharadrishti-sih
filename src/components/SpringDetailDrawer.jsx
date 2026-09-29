import React from 'react';
import { 
  X, 
  Droplet, 
  MapPin, 
  Users, 
  Compass, 
  AlertTriangle, 
  Sparkles, 
  Hammer, 
  FileText, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { formatINR } from '../utils/hydroEngine';
import confetti from 'canvas-confetti';

export default function SpringDetailDrawer({
  spring,
  onClose,
  onOpenSimulator,
  onOpenDpr,
  onApproveProject
}) {
  if (!spring) return null;

  const handleSanctionClick = () => {
    // Fire confetti celebration!
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    onApproveProject(spring.id);
  };

  const totalCost = spring.interventions 
    ? spring.interventions.reduce((sum, item) => sum + (item.estCostInr || 0), 0)
    : 0;
  
  const totalLaborDays = spring.interventions 
    ? spring.interventions.reduce((sum, item) => sum + (item.mgnregaLaborDays || 0), 0)
    : 0;

  const isApproved = spring.interventions && spring.interventions.some(i => i.status === 'Approved');

  return (
    <div 
      className="glass-panel animate-slide-left"
      style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        bottom: '12px',
        width: '440px',
        zIndex: 600,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--border-bright)',
        boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.65)'
      }}
    >
      {/* Drawer Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(11, 20, 38, 0.95)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className={`badge badge-${spring.status.toLowerCase()}`}>
              {spring.status} Spring
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              ID: {spring.id}
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {spring.name}
          </h3>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 500 }}>
            {spring.localName}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <MapPin size={12} color="#10b981" />
            <span>{spring.village}, {spring.block}, {spring.district}, {spring.state}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Section 1: Discharge & Beneficiary Profile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '10px 12px'
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Current Discharge
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: spring.status === 'Critical' ? '#fb7185' : '#38bdf8', margin: '2px 0' }}>
              {spring.currentDischarge} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>L/min</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
              Target: {spring.baselinePerennialTarget} L/min
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '10px 12px'
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Tribal Community
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#34d399', margin: '4px 0 2px 0' }}>
              {spring.tribalCommunity}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
              {spring.populationServed} residents served
            </div>
          </div>
        </div>

        {/* Section 2: AI Springshed Delineation Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid var(--border-bright)',
          borderRadius: '14px',
          padding: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
              <Sparkles size={15} />
              <span>AI Springshed Model</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
              Confidence: {spring.aiConfidence}%
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '6px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Catchment</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>{spring.springshedAreaKm2} km²</div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '6px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Elevation</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>{spring.elevation}m MSL</div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '6px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Infiltration</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>{spring.estimatedInfiltrationRate || '14 mm/h'}</div>
            </div>
          </div>

          {/* Recharge Suitability Spectrum Bar */}
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Recharge Potential Spectrum:
          </div>
          <div style={{ height: '8px', borderRadius: '999px', overflow: 'hidden', display: 'flex', marginBottom: '6px' }}>
            <div style={{ width: `${spring.rechargeSuitability?.highPercent || 40}%`, background: '#10b981' }} title="High Suitability" />
            <div style={{ width: `${spring.rechargeSuitability?.moderatePercent || 35}%`, background: '#f59e0b' }} title="Moderate Suitability" />
            <div style={{ width: `${spring.rechargeSuitability?.lowPercent || 25}%`, background: '#f43f5e' }} title="Low Suitability (Impermeable)" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            <span>🟢 High ({spring.rechargeSuitability?.highPercent || 40}%)</span>
            <span>🟡 Mod ({spring.rechargeSuitability?.moderatePercent || 35}%)</span>
            <span>🔴 Low ({spring.rechargeSuitability?.lowPercent || 25}%)</span>
          </div>
        </div>

        {/* Section 3: Hydrogeology Details */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '12px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={14} color="#06b6d4" />
            <span>Hydrogeological Architecture</span>
          </div>

          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Aquifer Lithology:</strong> <span style={{ color: '#f8fafc' }}>{spring.aquiferType}</span></div>
            <div><strong>Spring Hydro-Class:</strong> <span style={{ color: '#f8fafc' }}>{spring.hydroClass}</span></div>
            <div><strong>Strike & Dip:</strong> <span style={{ color: '#38bdf8' }}>{spring.strikeDip || 'N35°E, Dip 28° SE'}</span></div>
            <div><strong>Seasonality:</strong> <span style={{ color: '#fbbf24' }}>{spring.seasonality}</span></div>
          </div>
        </div>

        {/* Section 4: Landslide & Hazard Risk Alerts (CRITICAL FOR SIH EVALUATION) */}
        {spring.hazardZones && spring.hazardZones.length > 0 ? (
          <div style={{
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            borderRadius: '12px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fb7185', fontWeight: 700, fontSize: '0.8rem', marginBottom: '4px' }}>
              <AlertTriangle size={16} />
              <span>Geological Hazard Guardrail Activated</span>
            </div>
            {spring.hazardZones.map((hazard, hIdx) => (
              <div key={hIdx} style={{ fontSize: '0.72rem', color: '#fecdd3', lineHeight: 1.4 }}>
                <strong>{hazard.type} (Slope: {hazard.slopeDegree}):</strong> {hazard.warning}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={18} color="#34d399" />
            <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 600 }}>
              Slope Stability Checked: No critical landslide risk in recharge zone.
            </span>
          </div>
        )}

        {/* Section 5: Prescriptive Interventions (The Work Order) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Hammer size={15} color="#10b981" />
              <span>Recommended Recharge Interventions</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              CGWB Compliant
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {spring.interventions && spring.interventions.map((item, idx) => (
              <div 
                key={item.id || idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px 12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
                    {item.title}
                  </div>
                  <span style={{
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: item.priority === 'High' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                    color: item.priority === 'High' ? '#fb7185' : '#38bdf8'
                  }}>
                    {item.priority} Priority
                  </span>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Quantity: <strong style={{ color: '#fff' }}>{item.count} {item.unit}</strong> • {item.specs}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#94a3b8', borderTop: '1px dashed rgba(255, 255, 255, 0.06)', paddingTop: '6px' }}>
                  <span>MGNREGA: <strong>{item.mgnregaLaborDays} days</strong></span>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>{formatINR(item.estCostInr)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Budget & Labor Totals */}
          <div style={{
            marginTop: '10px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem'
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Total Labour Component</div>
              <strong style={{ color: '#f8fafc' }}>{totalLaborDays} Person-Days</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Total Sanction Budget</div>
              <strong style={{ color: '#10b981', fontSize: '0.95rem' }}>{formatINR(totalCost)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Footer Actions */}
      <div style={{
        padding: '14px 20px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(11, 20, 38, 0.98)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => onOpenSimulator(spring)}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', padding: '9px 12px' }}
          >
            <TrendingUp size={15} color="#38bdf8" />
            <span>Simulate Revival</span>
          </button>

          <button
            onClick={() => onOpenDpr(spring)}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', padding: '9px 12px' }}
          >
            <FileText size={15} color="#10b981" />
            <span>Download DPR</span>
          </button>
        </div>

        {isApproved ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '10px',
            color: '#34d399',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            <CheckCircle2 size={18} />
            <span>Sanctioned under MGNREGA Scheme</span>
          </div>
        ) : (
          <button
            onClick={handleSanctionClick}
            className="btn-emerald"
            style={{ width: '100%', fontSize: '0.88rem', padding: '11px' }}
          >
            <Zap size={16} />
            <span>Sanction Project Under MGNREGA</span>
          </button>
        )}
      </div>
    </div>
  );
}
