// DharaDrishti API Service
// Connects to Python AI Backend (http://localhost:8000/api) with automatic client-side fallback

import { delineateProbableSpringshed } from '../utils/hydroEngine';

export const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Check backend health & database status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      return { online: true, ...data };
    }
  } catch (err) {
    // Backend offline
  }
  return { 
    online: false, 
    status: 'offline', 
    system: 'In-Browser Client Hydro Engine (Offline Safe)',
    database: 'Local Memory'
  };
}

/**
 * Authenticate with Python Backend (RBAC)
 */
export async function loginWithBackend(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      return await res.json();
    }
    const errData = await res.json().catch(() => ({}));
    return { success: false, message: errData.message || 'Invalid credentials' };
  } catch (err) {
    console.warn("Backend auth unreachable. Falling back to local RBAC verification.");
  }
  return null;
}

/**
 * Request AI Springshed Delineation from Python AI Engine
 * Falls back to in-browser hydro engine if backend is offline.
 */
export async function delineateSpringshedBackend(lat, lng, elevation = 650) {
  try {
    const res = await fetch(`${API_BASE_URL}/springs/delineate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, elevation }),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          ...data,
          source: 'Python/DEM AHP Engine (Port 8000)'
        };
      }
    }
  } catch (err) {
    console.warn("Python AI delineation service offline. Executing in-browser hydro engine fallback.");
  }

  // Graceful fallback to client-side hydroEngine
  const localResult = delineateProbableSpringshed(lat, lng, elevation);
  return {
    success: true,
    ...localResult,
    source: 'In-Browser Hydro Engine (Fallback)'
  };
}

/**
 * Send Ground Truth Survey to Backend (SQLite Persistence)
 */
export async function sendSurveyToBackend(surveyData) {
  try {
    const res = await fetch(`${API_BASE_URL}/surveys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surveyData),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend offline, survey recorded locally in session.");
  }
  return { 
    success: true, 
    localOnly: true, 
    message: "Field survey recorded locally in browser state." 
  };
}

/**
 * Fetch past surveys for a spring from SQLite
 */
export async function fetchSurveysBackend(springId = null) {
  try {
    const url = springId ? `${API_BASE_URL}/surveys?spring_id=${encodeURIComponent(springId)}` : `${API_BASE_URL}/surveys`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Offline
  }
  return { success: false, surveys: [] };
}

/**
 * Sanction/Approve MGNREGA Work Order in Backend
 */
export async function approveWorkOrderBackend(springId, details = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}/work-orders/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ springId, ...details }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend offline, work order approved in local session.");
  }
  return { success: true, localOnly: true };
}

/**
 * Fetch aggregate platform stats from Backend
 */
export async function fetchBackendStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Offline
  }
  return null;
}
