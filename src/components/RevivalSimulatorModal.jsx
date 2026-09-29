import React, { useState } from 'react';
import { X, TrendingUp, CloudRain, Hammer, Sparkles, CheckCircle } from 'lucide-react';
import { simulateDischargeTrends } from '../utils/hydroEngine';

export default function RevivalSimulatorModal({ spring, onClose }) {
  const [rainfallAnomaly, setRainfallAnomaly] = useState(0); // -40% to +40%
  const [interventionPercent, setInterventionPercent] = useState(80); // 0 to 100%

  if (!spring) return null;

  const data = simulateDischargeTrends(
    spring.historicalDischarge || [2, 1.5, 0.8, 0.4, 0.5, 4, 14, 18, 12, 7, 4, 2.5],
    rainfallAnomaly,
    interventionPercent
  );

  // Peak discharge for scale
  const maxFlow = Math.max(...data.map(d => Math.max(d.baseline, d.simulated))) * 1.15;
  const chartHeight = 220;
  const chartWidth = 580;
  const padding = 40;

  // Compute SVG Points
  const getX = (idx) => padding + (idx / 11) * (chartWidth - padding * 2);
  const getY = (val) => chartHeight - padding - (val / maxFlow) * (chartHeight - padding * 2);

  const baselinePoints = data.map((d, i) => `${getX(i)},${getY(d.baseline)}`).join(' ');
  const simulatedPoints = data.map((d, i) => `${getX(i)},${getY(d.simulated)}`).join(' ');

  // Summer minimum flow comparison (March/April/May: index 2, 3, 4)
  const baseSummerMin = Math.min(data[2].baseline, data[3].baseline, data[4].baseline);
  const simSummerMin = Math.min(data[2].simulated, data[3].simulated, data[4].simulated);
  const summerGainPercent = Math.round(((simSummerMin - baseSummerMin) / (baseSummerMin || 0.1)) * 100);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '680px',
          maxWidth: '95vw',
          background: 'rgba(11, 20, 38, 0.98)',
          border: '1px solid var(--border-bright)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(7, 13, 24, 0.5)'
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
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                Predictive Springshed Revival Simulator
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Target: {spring.name} ({spring.village}, {spring.district})
              </p>
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

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Simulation Sliders */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            {/* Slider 1: Rainfall Anomaly */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 600 }}>
                  <CloudRain size={16} />
                  <span>Monsoon Rainfall Variation</span>
                </span>
                <span style={{ fontWeight: 700, color: rainfallAnomaly >= 0 ? '#34d399' : '#fb7185' }}>
                  {rainfallAnomaly > 0 ? `+${rainfallAnomaly}% (Surplus)` : rainfallAnomaly < 0 ? `${rainfallAnomaly}% (Drought)` : 'Normal (0%)'}
                </span>
              </div>
              <input 
                type="range" 
                min="-40" 
                max="40" 
                step="5"
                value={rainfallAnomaly} 
                onChange={(e) => setRainfallAnomaly(+e.target.value)}
                style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>-40% Deficit</span>
                <span>Normal Baseline</span>
                <span>+40% Excess</span>
              </div>
            </div>

            {/* Slider 2: Intervention Completion */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 600 }}>
                  <Hammer size={16} />
                  <span>Intervention Execution Level</span>
                </span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>
                  {interventionPercent}% Completed
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="10"
                value={interventionPercent} 
                onChange={(e) => setInterventionPercent(+e.target.value)}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>0% (No works)</span>
                <span>50% (Partial)</span>
                <span>100% (Full Plan)</span>
              </div>
            </div>
          </div>

          {/* SVG Discharge Curve Graph */}
          <div style={{
            background: 'rgba(7, 13, 24, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '14px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                12-Month Spring Discharge Hydrograph (Liters / Minute)
              </div>
              <div style={{ display: 'flex', gap: '14px', fontSize: '0.72rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8' }}>
                  <span style={{ width: '12px', height: '3px', background: '#94a3b8', display: 'inline-block' }}></span>
                  Baseline (Pre-Intervention)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#34d399', fontWeight: 600 }}>
                  <span style={{ width: '12px', height: '3px', background: '#10b981', display: 'inline-block' }}></span>
                  Simulated Revival
                </span>
              </div>
            </div>

            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
              {/* Horizontal grid lines */}
              {[0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = chartHeight - padding - ratio * (chartHeight - padding * 2);
                const labelVal = Math.round(ratio * maxFlow);
                return (
                  <g key={ratio}>
                    <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    <text x={padding - 8} y={y + 3} fill="#64748b" fontSize="9" textAnchor="end">{labelVal}L</text>
                  </g>
                );
              })}

              {/* Baseline Curve */}
              <polyline
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4 4"
                points={baselinePoints}
              />

              {/* Simulated Curve */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3.2"
                points={simulatedPoints}
              />

              {/* Data points & Month Labels */}
              {data.map((d, i) => {
                const x = getX(i);
                const ySim = getY(d.simulated);
                return (
                  <g key={i}>
                    {/* Month Label */}
                    <text x={x} y={chartHeight - 12} fill="#94a3b8" fontSize="10" textAnchor="middle">{d.month}</text>
                    {/* Simulated node */}
                    <circle cx={x} cy={ySim} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Impact Scorecard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.68rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 600 }}>
                Lean Summer Flow Boost
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', margin: '2px 0' }}>
                +{summerGainPercent}%
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                {baseSummerMin} L/min ➔ {simSummerMin} L/min
              </div>
            </div>

            <div style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.68rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 600 }}>
                Annual Groundwater Infiltration
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', margin: '2px 0' }}>
                +{Math.round((interventionPercent / 100) * 490)} m³
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                ~{Math.round((interventionPercent / 100) * 490 * 1000).toLocaleString('en-IN')} Litres/Year
              </div>
            </div>

            <div style={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.68rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 600 }}>
                Perenniality Status
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#c084fc', margin: '2px 0' }}>
                {simSummerMin >= 1.5 ? '12/12 Months' : '10/12 Months'}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                {simSummerMin >= 1.5 ? 'Achieves Full Perennial Status' : 'Significantly Reduced Dry Spell'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(7, 13, 24, 0.8)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px 20px' }}>
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
}
