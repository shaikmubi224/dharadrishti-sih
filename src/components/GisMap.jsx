import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Polygon, 
  Polyline, 
  useMap, 
  useMapEvents 
} from 'react-leaflet';
import L from 'leaflet';
import { 
  Layers, 
  Sparkles, 
  AlertTriangle, 
  Compass, 
  Maximize2, 
  Activity, 
  Info,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

// Tile Layer URLs
const BASEMAP_TILES = {
  satellite: {
    name: 'Satellite (ESRI)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  dark: {
    name: 'Carto Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  osm: {
    name: 'Standard Topo',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  }
};

// Create custom glowing DivIcon for Leaflet
function createSpringIcon(status, isSelected) {
  let color = '#10b981';
  let pulseColor = 'rgba(16, 185, 129, 0.4)';
  if (status === 'Critical') {
    color = '#f43f5e';
    pulseColor = 'rgba(244, 63, 94, 0.4)';
  } else if (status === 'Depleted') {
    color = '#f59e0b';
    pulseColor = 'rgba(245, 158, 11, 0.4)';
  } else if (status === 'Moderate') {
    color = '#38bdf8';
    pulseColor = 'rgba(56, 189, 248, 0.4)';
  }

  const size = isSelected ? 34 : 26;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${pulseColor}; animation: pulse-ring 2s infinite;"></div>
        <div style="width: ${size - 10}px; height: ${size - 10}px; border-radius: 50%; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 0 16px ${color}; z-index: 2;"></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

// Controller component to smoothly pan/zoom map
function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 12, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Controller for clicking on the map to run on-the-fly AI Delineation
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    }
  });
  return null;
}

export default function GisMap({
  springs,
  selectedSpring,
  onSelectSpring,
  onAnalyzeNewPoint,
  mapCenter,
  mapZoom
}) {
  const [activeBasemap, setActiveBasemap] = useState('satellite');
  const [layers, setLayers] = useState({
    springshed: true,
    lineaments: true,
    hazardZones: true,
    suitability: true
  });
  const [clickedPoint, setClickedPoint] = useState(null);

  const toggleLayer = (layerName) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleMapClick = (latlng) => {
    setClickedPoint(latlng);
  };

  const handleTriggerAnalysis = () => {
    if (clickedPoint) {
      onAnalyzeNewPoint(clickedPoint.lat, clickedPoint.lng);
      setClickedPoint(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MapContainer
        center={mapCenter || [19.9042, 84.1350]}
        zoom={mapZoom || 12}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <MapViewController center={mapCenter} zoom={mapZoom} />
        <MapClickHandler onMapClick={handleMapClick} />

        {/* Dynamic Basemap Tile */}
        <TileLayer
          url={BASEMAP_TILES[activeBasemap].url}
          attribution={BASEMAP_TILES[activeBasemap].attribution}
          maxZoom={19}
        />

        {/* Render Springshed Polygon for Selected Spring */}
        {selectedSpring && layers.springshed && selectedSpring.springshedPolygon && (
          <Polygon
            positions={selectedSpring.springshedPolygon}
            pathOptions={{
              color: '#06b6d4',
              fillColor: layers.suitability ? '#10b981' : '#0284c7',
              fillOpacity: 0.28,
              weight: 2.5,
              dashArray: '4, 4'
            }}
          >
            <Popup>
              <div style={{ fontSize: '0.85rem', color: '#fff' }}>
                <strong style={{ color: '#38bdf8' }}>Delineated Springshed Catchment</strong>
                <p style={{ margin: '4px 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                  Recharge Area: <strong>{selectedSpring.springshedAreaKm2} km²</strong>
                </p>
                <p style={{ margin: '4px 0', fontSize: '0.75rem', color: '#34d399' }}>
                  AI Confidence: <strong>{selectedSpring.aiConfidence}%</strong>
                </p>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Render Geological Lineaments / Faults */}
        {selectedSpring && layers.lineaments && selectedSpring.lineaments && (
          selectedSpring.lineaments.map((lineCoords, idx) => (
            <Polyline
              key={`lineament-${idx}`}
              positions={lineCoords}
              pathOptions={{
                color: '#38bdf8',
                weight: 3,
                dashArray: '6, 6',
                opacity: 0.85
              }}
            >
              <Popup>
                <div style={{ fontSize: '0.8rem', color: '#fff' }}>
                  <strong style={{ color: '#38bdf8' }}>Subterranean Fracture Lineament #{idx + 1}</strong>
                  <p style={{ margin: '2px 0', fontSize: '0.72rem', color: '#cbd5e1' }}>
                    Identified via Remote Sensing DEM & ISRO Bhuvan lineament dataset.
                  </p>
                </div>
              </Popup>
            </Polyline>
          ))
        )}

        {/* Render Landslide & Slope Hazard Zones */}
        {selectedSpring && layers.hazardZones && selectedSpring.hazardZones && (
          selectedSpring.hazardZones.map((hazard, hIdx) => (
            <Polygon
              key={`hazard-${hIdx}`}
              positions={hazard.coordinates}
              pathOptions={{
                color: '#f43f5e',
                fillColor: '#f43f5e',
                fillOpacity: 0.45,
                weight: 2
              }}
            >
              <Popup>
                <div style={{ fontSize: '0.82rem', color: '#fff', maxWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fb7185', fontWeight: 'bold' }}>
                    <AlertTriangle size={16} />
                    <span>{hazard.type}</span>
                  </div>
                  <p style={{ margin: '4px 0', fontSize: '0.74rem', color: '#fecdd3' }}>
                    Slope Gradient: <strong>{hazard.slopeDegree}</strong>
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '0.72rem', color: '#e2e8f0', lineHeight: 1.3 }}>
                    {hazard.warning}
                  </p>
                </div>
              </Popup>
            </Polygon>
          ))
        )}

        {/* Render Spring Markers */}
        {springs.map((spring) => {
          const isSelected = selectedSpring && selectedSpring.id === spring.id;
          return (
            <Marker
              key={spring.id}
              position={[spring.lat, spring.lng]}
              icon={createSpringIcon(spring.status, isSelected)}
              eventHandlers={{
                click: () => onSelectSpring(spring)
              }}
            >
              <Popup>
                <div style={{ minWidth: '200px', padding: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className={`badge badge-${spring.status.toLowerCase()}`}>
                      {spring.status}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                      {spring.elevation}m MSL
                    </span>
                  </div>

                  <h4 style={{ margin: '0 0 2px 0', fontSize: '0.96rem', color: '#f8fafc' }}>
                    {spring.name}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginBottom: '6px' }}>
                    {spring.localName}
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '8px' }}>
                    <div>Discharge: <strong style={{ color: '#fff' }}>{spring.currentDischarge} L/min</strong></div>
                    <div>Aquifer: <span style={{ color: '#94a3b8' }}>{spring.aquiferType}</span></div>
                    <div>Tribe: <span style={{ color: '#34d399' }}>{spring.tribalCommunity}</span></div>
                  </div>

                  <button
                    onClick={() => onSelectSpring(spring)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '6px 10px', fontSize: '0.76rem' }}
                  >
                    <span>View Springshed Plan</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* User Click Marker (On-the-fly Analysis Pin) */}
        {clickedPoint && (
          <Marker position={[clickedPoint.lat, clickedPoint.lng]}>
            <Popup autoPan={true}>
              <div style={{ minWidth: '190px', padding: '6px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#38bdf8', marginBottom: '6px' }}>
                  <Sparkles size={16} />
                  <strong style={{ fontSize: '0.85rem' }}>Analyze New Point</strong>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '10px' }}>
                  Coordinates: {clickedPoint.lat.toFixed(4)}°N, {clickedPoint.lng.toFixed(4)}°E
                </div>
                <button
                  onClick={handleTriggerAnalysis}
                  className="btn-emerald"
                  style={{ width: '100%', padding: '7px 12px', fontSize: '0.78rem' }}
                >
                  <Sparkles size={13} />
                  <span>Delineate Springshed</span>
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Floating Basemap Selector (Top Left) */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 500,
        display: 'flex',
        gap: '4px',
        background: 'rgba(11, 20, 38, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '4px',
        boxShadow: 'var(--glass-shadow)'
      }}>
        {Object.entries(BASEMAP_TILES).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setActiveBasemap(key)}
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '8px',
              background: activeBasemap === key ? 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)' : 'transparent',
              color: activeBasemap === key ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Floating Layer Toggles Pill (Top Right) */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 500,
        background: 'rgba(11, 20, 38, 0.88)',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '10px 14px',
        boxShadow: 'var(--glass-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '200px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <Layers size={14} />
          <span>GIS Layer Control</span>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#e2e8f0', cursor: 'pointer' }}>
          <span>⛰️ Springshed Catchment</span>
          <input 
            type="checkbox" 
            checked={layers.springshed} 
            onChange={() => toggleLayer('springshed')}
            style={{ accentColor: '#06b6d4', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#e2e8f0', cursor: 'pointer' }}>
          <span>⚡ Geological Fractures</span>
          <input 
            type="checkbox" 
            checked={layers.lineaments} 
            onChange={() => toggleLayer('lineaments')}
            style={{ accentColor: '#38bdf8', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#e2e8f0', cursor: 'pointer' }}>
          <span>🎨 Infiltration Heatmap</span>
          <input 
            type="checkbox" 
            checked={layers.suitability} 
            onChange={() => toggleLayer('suitability')}
            style={{ accentColor: '#10b981', cursor: 'pointer' }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#fb7185', cursor: 'pointer' }}>
          <span>⚠️ Landslide Hazard Zones</span>
          <input 
            type="checkbox" 
            checked={layers.hazardZones} 
            onChange={() => toggleLayer('hazardZones')}
            style={{ accentColor: '#f43f5e', cursor: 'pointer' }}
          />
        </label>
      </div>

      {/* Map Helper Prompt (Bottom Center) */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 500,
        background: 'rgba(11, 20, 38, 0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-bright)',
        borderRadius: '999px',
        padding: '6px 18px',
        boxShadow: 'var(--glass-shadow)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)'
      }}>
        <Info size={14} color="#38bdf8" />
        <span>Click on any spring marker to view intervention plan, or <strong>click anywhere on the map</strong> to run AI Springshed delineation.</span>
      </div>
    </div>
  );
}
