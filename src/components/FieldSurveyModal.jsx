import React, { useState } from 'react';
import { X, Camera, MapPin, Droplets, CheckCircle, Upload, Navigation, Sparkles } from 'lucide-react';

export default function FieldSurveyModal({ springs, onClose, onSubmitSurvey }) {
  const [selectedSpringId, setSelectedSpringId] = useState(springs[0]?.id || '');
  const [discharge, setDischarge] = useState('1.8');
  const [waterQuality, setWaterQuality] = useState('Clear, pH 7.0, Low TDS');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmitSurvey({
        springId: selectedSpringId,
        measuredDischarge: parseFloat(discharge),
        waterQuality,
        communityFeedback: notes || 'Flow rate measured at bucket test outlet by Gram Panchayat team.',
        date: new Date().toISOString().split('T')[0]
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '560px',
          maxWidth: '94vw',
          background: 'rgba(11, 20, 38, 0.98)',
          border: '1px solid var(--border-bright)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(7, 13, 24, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981'
            }}>
              <MapPin size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc' }}>
                Ground-Truth Field Verification
              </h3>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Sync physical field observation with AI Springshed Model
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Spring Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
              Select Monitored Spring Location
            </label>
            <select
              value={selectedSpringId}
              onChange={(e) => setSelectedSpringId(e.target.value)}
              style={{
                width: '100%',
                background: '#091222',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '9px 12px',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            >
              {springs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.village}, {s.district}) - Currently {s.currentDischarge} L/min
                </option>
              ))}
            </select>
          </div>

          {/* Measured Flow & Water Quality in 2 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                Field Measured Flow (L/min)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={discharge}
                onChange={(e) => setDischarge(e.target.value)}
                style={{
                  width: '100%',
                  background: '#091222',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                Water Organoleptic / pH Quality
              </label>
              <select
                value={waterQuality}
                onChange={(e) => setWaterQuality(e.target.value)}
                style={{
                  width: '100%',
                  background: '#091222',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Clear, pH 7.0, Low TDS">Pristine / Clear (pH ~7.0)</option>
                <option value="Turbid Post-Monsoon Runoff">Slight Turbidity / Runoff</option>
                <option value="Iron Precipitate / High Mineral">High Mineral / Iron Traces</option>
                <option value="Alkaline Hard Water">Hard Water / Chalky</option>
              </select>
            </div>
          </div>

          {/* Photo Attachment Simulation */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
              Geotagged Photo Attachment
            </label>
            <div style={{
              border: '2px dashed var(--border-bright)',
              borderRadius: '10px',
              padding: '12px',
              textAlign: 'center',
              background: 'rgba(56, 189, 248, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <Camera size={24} color="#38bdf8" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>
                  IMG_20260929_1422_GEOTAG.jpg (1.8 MB)
                </div>
                <div style={{ fontSize: '0.7rem', color: '#34d399' }}>
                  ✓ GPS metadata verified (Accuracy: ±2.4 meters)
                </div>
              </div>
            </div>
          </div>

          {/* Community & Gram Sabha Feedback */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
              Community Feedback & Gram Sabha Observation
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Tribal elder reported that discharge remains steady for 3 weeks post-rain, indicating strong fractured storage."
              style={{
                width: '100%',
                background: '#091222',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '0.82rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-emerald"
            style={{ width: '100%', marginTop: '6px', padding: '12px', fontSize: '0.88rem' }}
          >
            <Sparkles size={16} />
            <span>{isSubmitting ? 'Syncing & Recalibrating Model...' : 'Submit Field Log & Update Model'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
