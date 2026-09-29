import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsBanner from './components/StatsBanner';
import GisMap from './components/GisMap';
import SpringDetailDrawer from './components/SpringDetailDrawer';
import RevivalSimulatorModal from './components/RevivalSimulatorModal';
import DprModal from './components/DprModal';
import FieldSurveyModal from './components/FieldSurveyModal';
import LoginModal from './components/LoginModal';
import { SPRINGS_DATABASE, TRIBAL_REGIONS, DISTRICT_STATISTICS } from './data/springsData';
import { delineateProbableSpringshed } from './utils/hydroEngine';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [springs, setSprings] = useState(SPRINGS_DATABASE);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSpring, setSelectedSpring] = useState(SPRINGS_DATABASE[0]);
  const [mapCenter, setMapCenter] = useState([19.9042, 84.1350]);
  const [mapZoom, setMapZoom] = useState(12);

  const [currentRole, setCurrentRole] = useState({
    role: 'admin',
    name: 'Dr. Alok Verma, IAS',
    title: 'Joint Secretary, Ministry of Tribal Affairs'
  });

  // Modal visibility states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isDprOpen, setIsDprOpen] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Filter springs by region
  const filteredSprings = selectedRegion === 'all' 
    ? springs 
    : springs.filter(s => {
        const reg = TRIBAL_REGIONS.find(r => r.id === selectedRegion);
        return reg ? s.state === reg.state : true;
      });

  const handleSelectRegion = (regionId) => {
    setSelectedRegion(regionId);
    const reg = TRIBAL_REGIONS.find(r => r.id === regionId);
    if (reg && reg.center) {
      setMapCenter(reg.center);
      setMapZoom(reg.zoom || 12);
    }
  };

  const handleSelectSpring = (spring) => {
    setSelectedSpring(spring);
    setMapCenter([spring.lat, spring.lng]);
    setMapZoom(13.5);
  };

  // On-the-fly AI Springshed Delineation for arbitrary map click
  const handleAnalyzeNewPoint = (lat, lng) => {
    const aiResult = delineateProbableSpringshed(lat, lng);
    
    const newSpring = {
      id: `SP-USER-${Math.floor(100 + Math.random() * 900)}`,
      name: `Unsurveyed Spring (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`,
      localName: "ସ୍ଥାନୀୟ ଝରଣା (Delineated Point)",
      state: selectedRegion === 'himachal' ? 'Himachal Pradesh' : selectedRegion === 'meghalaya' ? 'Meghalaya' : 'Odisha',
      district: selectedRegion === 'himachal' ? 'Kinnaur' : selectedRegion === 'meghalaya' ? 'East Khasi Hills' : 'Kandhamal',
      block: "Field Block",
      village: "Tribal Hamlet",
      gramPanchayat: "Gram Sabha Zone",
      tribalCommunity: "Indigenous Tribal Community",
      populationServed: 480,
      lat,
      lng,
      elevation: 680,
      status: "Critical",
      currentDischarge: 1.0,
      baselinePerennialTarget: 6.5,
      summerDischarge: 0.2,
      peakMonsoonDischarge: 14.0,
      seasonality: "Identified Critical Lean Flow",
      aquiferType: "Fractured Crystalline Complex",
      hydroClass: "Fracture Valley Depression Spring",
      historicalDischarge: [1.2, 0.8, 0.3, 0.1, 0.4, 3.2, 11.0, 14.0, 9.2, 5.1, 2.8, 1.8],
      ...aiResult
    };

    setSprings(prev => [newSpring, ...prev]);
    setSelectedSpring(newSpring);
    setMapCenter([lat, lng]);
    setMapZoom(13.8);

    showToast(`AI Delineation Complete: Springshed Catchment (${newSpring.springshedAreaKm2} km²) Mapped!`);
  };

  // Sanction Project Handler
  const handleApproveProject = (springId) => {
    setSprings(prev => prev.map(s => {
      if (s.id === springId) {
        return {
          ...s,
          interventions: s.interventions.map(i => ({ ...i, status: 'Approved' }))
        };
      }
      return s;
    }));

    if (selectedSpring && selectedSpring.id === springId) {
      setSelectedSpring(prev => ({
        ...prev,
        interventions: prev.interventions.map(i => ({ ...i, status: 'Approved' }))
      }));
    }

    showToast("Work Order Approved under MGNREGA & PM-JANMAN Scheme!");
  };

  // Field Survey Submission Handler (Ground Truth Feedback Loop)
  const handleSubmitSurvey = (surveyData) => {
    setSprings(prev => prev.map(s => {
      if (s.id === surveyData.springId) {
        return {
          ...s,
          currentDischarge: surveyData.measuredDischarge,
          status: surveyData.measuredDischarge < 1.5 ? 'Critical' : surveyData.measuredDischarge < 4.0 ? 'Depleted' : 'Moderate',
          fieldSurveys: [surveyData, ...(s.fieldSurveys || [])]
        };
      }
      return s;
    }));

    if (selectedSpring && selectedSpring.id === surveyData.springId) {
      setSelectedSpring(prev => ({
        ...prev,
        currentDischarge: surveyData.measuredDischarge,
        status: surveyData.measuredDischarge < 1.5 ? 'Critical' : surveyData.measuredDischarge < 4.0 ? 'Depleted' : 'Moderate',
        fieldSurveys: [surveyData, ...(prev.fieldSurveys || [])]
      }));
    }

    showToast("Field Log Synced: AI Hydrogeological Weights Recalibrated with Ground Truth!");
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleToggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme ? 'dark' : 'light');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* 1. Header Navigation */}
      <Navbar
        selectedRegion={selectedRegion}
        onSelectRegion={handleSelectRegion}
        currentRole={currentRole}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => setIsLoginOpen(true)}
        onOpenSurvey={() => setIsSurveyOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Top Executive Statistics Banner */}
      <StatsBanner
        springs={filteredSprings}
        selectedRegionStats={DISTRICT_STATISTICS}
      />

      {/* 3. Main Geospatial Command Workspace */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <GisMap
          springs={filteredSprings}
          selectedSpring={selectedSpring}
          onSelectSpring={handleSelectSpring}
          onAnalyzeNewPoint={handleAnalyzeNewPoint}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
        />

        {/* Right-Side Inspector Drawer for Selected Spring */}
        {selectedSpring && (
          <SpringDetailDrawer
            spring={selectedSpring}
            onClose={() => setSelectedSpring(null)}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onOpenDpr={() => setIsDprOpen(true)}
            onApproveProject={handleApproveProject}
          />
        )}
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '14px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.84rem',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}
        >
          <Sparkles size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4. Modals */}
      {isSimulatorOpen && (
        <RevivalSimulatorModal
          spring={selectedSpring}
          onClose={() => setIsSimulatorOpen(false)}
        />
      )}

      {isDprOpen && (
        <DprModal
          spring={selectedSpring}
          onClose={() => setIsDprOpen(false)}
        />
      )}

      {isSurveyOpen && (
        <FieldSurveyModal
          springs={springs}
          onClose={() => setIsSurveyOpen(false)}
          onSubmitSurvey={handleSubmitSurvey}
        />
      )}

      {isLoginOpen && (
        <LoginModal
          currentRole={currentRole}
          onSelectRole={(newRole) => {
            setCurrentRole(newRole);
            showToast(`Switched active persona to ${newRole.name} (${newRole.role.toUpperCase()})`);
          }}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}
