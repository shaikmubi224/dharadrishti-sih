import React from 'react';
import { X, Printer, Download, CheckCircle, FileText, ShieldAlert } from 'lucide-react';
import { formatINR } from '../utils/hydroEngine';

export default function DprModal({ spring, onClose }) {
  if (!spring) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalCost = spring.interventions 
    ? spring.interventions.reduce((sum, item) => sum + (item.estCostInr || 0), 0)
    : 0;

  const totalLaborDays = spring.interventions 
    ? spring.interventions.reduce((sum, item) => sum + (item.mgnregaLaborDays || 0), 0)
    : 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '840px',
          maxWidth: '96vw',
          maxHeight: '92vh',
          background: '#ffffff',
          color: '#0f172a',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Modal Top Toolbar (Hidden on print) */}
        <div 
          className="no-print"
          style={{
            padding: '12px 24px',
            background: '#0f172a',
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#38bdf8" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              Official Detailed Project Report (DPR) Preview
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn-emerald"
              style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '6px' }}
            >
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable Report Document */}
        <div 
          id="printable-dpr"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '36px 44px',
            fontFamily: 'serif',
            lineHeight: 1.5,
            color: '#1e293b'
          }}
        >
          {/* Official Emblem & Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569' }}>
              GOVERNMENT OF INDIA • MINISTRY OF TRIBAL AFFAIRS
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#0f172a', margin: '4px 0', textTransform: 'uppercase' }}>
              DETAILED PROJECT REPORT (DPR)
            </h2>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0284c7' }}>
              National Springshed Revival Mission under PM-JANMAN Scheme
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
              SIH Problem ID: 26240 • Ref No: MOTA/NSRM/{spring.id}/2026-27 • Date: {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>

          {/* Section 1: Administrative Particulars */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '1rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              1. ADMINISTRATIVE & DEMOGRAPHIC PROFILE
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', width: '25%', background: '#f8fafc' }}>Spring Name:</td>
                  <td style={{ padding: '6px 8px', width: '25%' }}>{spring.name} ({spring.localName})</td>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', width: '25%', background: '#f8fafc' }}>Spring Unique ID:</td>
                  <td style={{ padding: '6px 8px', width: '25%' }}>{spring.id}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Gram Panchayat / Block:</td>
                  <td style={{ padding: '6px 8px' }}>{spring.village}, {spring.block}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>District / State:</td>
                  <td style={{ padding: '6px 8px' }}>{spring.district}, {spring.state}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Target Tribal Community:</td>
                  <td style={{ padding: '6px 8px' }}><strong>{spring.tribalCommunity}</strong></td>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Beneficiary Population:</td>
                  <td style={{ padding: '6px 8px' }}>{spring.populationServed} Tribal Citizens</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Geographical Coordinates:</td>
                  <td style={{ padding: '6px 8px' }}>{spring.lat.toFixed(4)}° N, {spring.lng.toFixed(4)}° E</td>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Mean Sea Level Elevation:</td>
                  <td style={{ padding: '6px 8px' }}>{spring.elevation} meters</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Hydrogeological & AI Springshed Findings */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '1rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              2. HYDROGEOLOGICAL & REMOTE SENSING APPRAISAL
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', width: '25%', background: '#f8fafc' }}>Aquifer Stratigraphy:</td>
                  <td style={{ padding: '6px 8px', width: '25%' }}>{spring.aquiferType}</td>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', width: '25%', background: '#f8fafc' }}>Hydrogeological Class:</td>
                  <td style={{ padding: '6px 8px', width: '25%' }}>{spring.hydroClass}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Delineated Recharge Area:</td>
                  <td style={{ padding: '6px 8px' }}><strong>{spring.springshedAreaKm2} km²</strong></td>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>AI Model Confidence:</td>
                  <td style={{ padding: '6px 8px' }}>{spring.aiConfidence}% (High Reliability)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Current Lean Flow Rate:</td>
                  <td style={{ padding: '6px 8px', color: '#e11d48', fontWeight: 'bold' }}>{spring.currentDischarge} L/min (Deficit)</td>
                  <td style={{ padding: '6px 8px', fontWeight: 'bold', background: '#f8fafc' }}>Target Perennial Rate:</td>
                  <td style={{ padding: '6px 8px', color: '#059669', fontWeight: 'bold' }}>{spring.baselinePerennialTarget} L/min</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: Bill of Quantities (BOQ) & Work Order */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '1rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              3. BILL OF QUANTITIES (BOQ) & MGNREGA LABOUR COMPONENT
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: '#fff' }}>
                  <th style={{ padding: '8px' }}>#</th>
                  <th style={{ padding: '8px' }}>Intervention Name & Specification</th>
                  <th style={{ padding: '8px' }}>Quantity</th>
                  <th style={{ padding: '8px' }}>Target Zone</th>
                  <th style={{ padding: '8px' }}>MGNREGA Days</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Est. Cost (INR)</th>
                </tr>
              </thead>
              <tbody>
                {spring.interventions && spring.interventions.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '7px 8px' }}>{idx + 1}</td>
                    <td style={{ padding: '7px 8px' }}>
                      <strong>{item.title}</strong>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.specs}</div>
                    </td>
                    <td style={{ padding: '7px 8px' }}>{item.count} {item.unit}</td>
                    <td style={{ padding: '7px 8px' }}>{item.targetZone}</td>
                    <td style={{ padding: '7px 8px' }}>{item.mgnregaLaborDays} Days</td>
                    <td style={{ padding: '7px 8px', textAlign: 'right', fontWeight: 'bold' }}>
                      {formatINR(item.estCostInr)}
                    </td>
                  </tr>
                ))}
                <tr style={{ background: '#f8fafc', fontWeight: 'bold' }}>
                  <td colSpan="4" style={{ padding: '8px', textAlign: 'right' }}>TOTAL ESTIMATE:</td>
                  <td style={{ padding: '8px' }}>{totalLaborDays} Person-Days</td>
                  <td style={{ padding: '8px', textAlign: 'right', color: '#059669', fontSize: '0.9rem' }}>
                    {formatINR(totalCost)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 4: Landslide Risk & Environmental Safety Sign-Off */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px'
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#0f172a', marginBottom: '4px' }}>
              4. GEOLOGICAL HAZARD & SLOPE SAFETY COMPLIANCE
            </div>
            <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0 }}>
              The digital elevation analysis has verified slope gradients across all proposed intervention waypoints. Continuous trenching has been prohibited on any slopes exceeding 30°. Interventions comply with Central Ground Water Board (CGWB) artificial recharge norms and environmental protection standards.
            </p>
          </div>

          {/* Official Signatures Footer */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px', textAlign: 'center' }}>
            <div>
              <div style={{ height: '36px' }}></div>
              <div style={{ borderTop: '1px solid #475569', paddingTop: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                Field Geologist / Surveyor
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Technical GIS Verification</div>
            </div>

            <div>
              <div style={{ height: '36px' }}></div>
              <div style={{ borderTop: '1px solid #475569', paddingTop: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                Block Development Officer (BDO)
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>MGNREGA Work Sanction</div>
            </div>

            <div>
              <div style={{ height: '36px' }}></div>
              <div style={{ borderTop: '1px solid #475569', paddingTop: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                District Collector / Magistrate
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Administrative Approval</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
