// Database of Mountain Springs in Tribal Regions of India
// Mapped for Ministry of Tribal Affairs (SIH 2026 - Problem ID 26240)

export const TRIBAL_REGIONS = [
  { id: "all", name: "All Tribal Belts" },
  { id: "odisha", name: "Odisha (Kandhamal & Koraput)", state: "Odisha", center: [19.9042, 84.1350], zoom: 12 },
  { id: "himachal", name: "Himachal Pradesh (Kinnaur)", state: "Himachal Pradesh", center: [31.5385, 78.2730], zoom: 12 },
  { id: "meghalaya", name: "Meghalaya (East Khasi Hills)", state: "Meghalaya", center: [25.3210, 91.8210], zoom: 12 }
];

export const SPRINGS_DATABASE = [
  {
    id: "SP-OD-001",
    name: "Bhalu Jharna",
    localName: "ଭାଲୁ ଝରଣା (Bear Spring)",
    state: "Odisha",
    district: "Kandhamal",
    block: "Daringbadi",
    village: "Burdi Village",
    gramPanchayat: "Sraniketa GP",
    tribalCommunity: "Kandha (Kondh) Tribe",
    populationServed: 640,
    lat: 19.9042,
    lng: 84.1350,
    elevation: 645, // meters
    status: "Critical", // "Critical" | "Depleted" | "Moderate" | "Healthy"
    currentDischarge: 1.2, // L/min
    baselinePerennialTarget: 7.5,
    summerDischarge: 0.3,
    peakMonsoonDischarge: 18.5,
    seasonality: "Dries in Summer (March - June)",
    aquiferType: "Weathered Khondalite & Granitic Gneiss",
    hydroClass: "Fracture-Controlled Depression Spring",
    strikeDip: "Strike N35°E, Dip 28° SE",
    historicalDischarge: [1.8, 1.2, 0.4, 0.2, 0.5, 4.2, 14.5, 18.2, 12.1, 7.4, 4.1, 2.5],
    springshedAreaKm2: 1.42,
    aiConfidence: 89.2,
    estimatedInfiltrationRate: "14.2 mm/hr",
    rechargeSuitability: {
      highPercent: 44,
      moderatePercent: 38,
      lowPercent: 18
    },
    // Springshed Catchment Polygon (Upper Ridge Recharge Zone)
    springshedPolygon: [
      [19.9042, 84.1350],
      [19.9085, 84.1310],
      [19.9140, 84.1295],
      [19.9195, 84.1340],
      [19.9180, 84.1420],
      [19.9120, 84.1445],
      [19.9065, 84.1395],
      [19.9042, 84.1350]
    ],
    // High-permeability geological fractures/lineaments
    lineaments: [
      [
        [19.9190, 84.1330],
        [19.9145, 84.1355],
        [19.9090, 84.1360],
        [19.9042, 84.1350]
      ],
      [
        [19.9160, 84.1410],
        [19.9110, 84.1380],
        [19.9055, 84.1355]
      ]
    ],
    // Landslide & High Slope Hazard Polygon (Dangerous to dig)
    hazardZones: [
      {
        coordinates: [
          [19.9175, 84.1425],
          [19.9210, 84.1410],
          [19.9205, 84.1460],
          [19.9168, 84.1450]
        ],
        type: "High Landslide & Slope Instability",
        slopeDegree: "39.5°",
        warning: "Critical slope with loose colluvium. STRICTLY PROHIBITED to excavate trenches or percolation pits here to avoid triggering slope failure!"
      }
    ],
    interventions: [
      {
        id: "INT-01",
        title: "Staggered Contour Trenches (SCT)",
        category: "Infiltration Enhancement",
        count: 35,
        unit: "trenches",
        specs: "4m x 0.5m x 0.5m along 8-12° slope contours",
        targetZone: "North-West Ridge (High Suitability Zone)",
        mgnregaLaborDays: 140,
        estCostInr: 42000,
        estWaterHarvestedPerYearM3: 490,
        priority: "High",
        status: "Proposed",
        impact: "+2.4 L/min dry season baseflow"
      },
      {
        id: "INT-02",
        title: "Loose Boulder Check Dams (LBCD)",
        category: "Stream Velocity Reduction",
        count: 3,
        unit: "dams",
        specs: "Dry stone masonry across 2nd order ephemeral gully",
        targetZone: "Upper Catchment Channel",
        mgnregaLaborDays: 75,
        estCostInr: 22500,
        estWaterHarvestedPerYearM3: 320,
        priority: "High",
        status: "Proposed",
        impact: "Reduces siltation and forces subterranean recharge"
      },
      {
        id: "INT-03",
        title: "Broadleaf Vegetative Buffer (Sal & Mahua)",
        category: "Bio-Catchment Restoration",
        count: 280,
        unit: "saplings",
        specs: "Endemic tribal agro-forestry with vetiver grass hedgerows",
        targetZone: "Degraded Middle Ridge Slope",
        mgnregaLaborDays: 50,
        estCostInr: 15000,
        estWaterHarvestedPerYearM3: 180,
        priority: "Medium",
        status: "Proposed",
        impact: "Enhances soil sponge retention and root macropores"
      }
    ],
    fieldSurveys: [
      {
        date: "2026-08-14",
        officer: "Er. Ramesh Behera (DRDA)",
        measuredDischarge: 1.2,
        waterQuality: "Clear, pH 6.8, TDS 110 ppm",
        communityFeedback: "Tribal women currently wake at 4:30 AM to collect trickling water before it ceases.",
        photoUrl: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "SP-OD-002",
    name: "Rani Duduma Springshed",
    localName: "ରାଣୀ ଦୁଦୁମା ଝରଣା",
    state: "Odisha",
    district: "Kandhamal",
    block: "Daringbadi",
    village: "Kirikuti Hamlet",
    gramPanchayat: "Daringbadi GP",
    tribalCommunity: "Kui Tribal Community",
    populationServed: 820,
    lat: 19.8910,
    lng: 84.1180,
    elevation: 710,
    status: "Depleted",
    currentDischarge: 2.8,
    baselinePerennialTarget: 9.0,
    summerDischarge: 0.9,
    peakMonsoonDischarge: 24.0,
    seasonality: "Drops by 75% in Pre-Monsoon",
    aquiferType: "Charnockite & Hornblende Gneiss",
    hydroClass: "Fault-Line Contact Spring",
    strikeDip: "Strike N45°W, Dip 35° NE",
    historicalDischarge: [3.4, 2.8, 1.4, 0.9, 1.2, 6.8, 20.1, 24.0, 16.5, 9.8, 5.5, 4.0],
    springshedAreaKm2: 2.10,
    aiConfidence: 91.4,
    estimatedInfiltrationRate: "18.5 mm/hr",
    rechargeSuitability: {
      highPercent: 52,
      moderatePercent: 30,
      lowPercent: 18
    },
    springshedPolygon: [
      [19.8910, 84.1180],
      [19.8960, 84.1120],
      [19.9025, 84.1110],
      [19.9070, 84.1165],
      [19.9050, 84.1250],
      [19.8985, 84.1260],
      [19.8930, 84.1220],
      [19.8910, 84.1180]
    ],
    lineaments: [
      [
        [19.9060, 84.1150],
        [19.9000, 84.1170],
        [19.8940, 84.1175],
        [19.8910, 84.1180]
      ]
    ],
    hazardZones: [],
    interventions: [
      {
        id: "INT-04",
        title: "Percolation Recharge Pits with Infiltration Wells",
        category: "Deep Aquifer Recharge",
        count: 18,
        unit: "pits",
        specs: "2.5m dia x 3m depth filled with boulder/gravel filter pack",
        targetZone: "Plateau Depression Zone",
        mgnregaLaborDays: 90,
        estCostInr: 54000,
        estWaterHarvestedPerYearM3: 650,
        priority: "High",
        status: "Approved",
        impact: "+3.2 L/min summer recharge"
      },
      {
        id: "INT-05",
        title: "Continuous Contour Bunding (CCB)",
        category: "Surface Runoff Retardation",
        count: 400,
        unit: "meters",
        specs: "Earthen bunds with spillways across agricultural slopes",
        targetZone: "Mid Slope Farm Terraces",
        mgnregaLaborDays: 110,
        estCostInr: 33000,
        estWaterHarvestedPerYearM3: 410,
        priority: "Medium",
        status: "Approved",
        impact: "Direct moisture retention in agricultural terrace"
      }
    ],
    fieldSurveys: [
      {
        date: "2026-07-28",
        officer: "Sunita Majhi (Gram Rozgar Sahayak)",
        measuredDischarge: 2.8,
        waterQuality: "Good, pH 7.1, slight turbidity after shower",
        communityFeedback: "Panchayat resolved to clear gully silting under MGNREGA muster roll.",
        photoUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "SP-HP-001",
    name: "Chini Chasma",
    localName: "चीनी चश्मा (Himalayan Fault Spring)",
    state: "Himachal Pradesh",
    district: "Kinnaur",
    block: "Kalpa",
    village: "Chini Khas",
    gramPanchayat: "Kalpa Gram Panchayat",
    tribalCommunity: "Kinnaura Tribe (Scheduled Tribe)",
    populationServed: 950,
    lat: 31.5385,
    lng: 78.2730,
    elevation: 2780, // High altitude cold desert
    status: "Moderate",
    currentDischarge: 5.6,
    baselinePerennialTarget: 14.0,
    summerDischarge: 2.1,
    peakMonsoonDischarge: 32.0,
    seasonality: "Glacial/Snowmelt fed + Monsoonal recharge",
    aquiferType: "Fractured Quartzite & Vaikrita Gneiss",
    hydroClass: "Fracture-Controlled Articulated Spring",
    strikeDip: "Strike NW-SE, Dip 42° NE",
    historicalDischarge: [2.8, 2.1, 3.5, 7.8, 18.4, 28.5, 32.0, 26.0, 15.2, 9.1, 6.2, 3.9],
    springshedAreaKm2: 3.45,
    aiConfidence: 87.8,
    estimatedInfiltrationRate: "22.0 mm/hr",
    rechargeSuitability: {
      highPercent: 38,
      moderatePercent: 42,
      lowPercent: 20
    },
    springshedPolygon: [
      [31.5385, 78.2730],
      [31.5450, 78.2680],
      [31.5520, 78.2695],
      [31.5580, 78.2770],
      [31.5540, 78.2860],
      [31.5460, 78.2845],
      [31.5400, 78.2790],
      [31.5385, 78.2730]
    ],
    lineaments: [
      [
        [31.5570, 78.2760],
        [31.5490, 78.2745],
        [31.5385, 78.2730]
      ]
    ],
    hazardZones: [
      {
        coordinates: [
          [31.5530, 78.2830],
          [31.5575, 78.2855],
          [31.5550, 78.2890],
          [31.5505, 78.2860]
        ],
        type: "Snow Avalanche & Rockfall Zone",
        slopeDegree: "46.2°",
        warning: "Severe scree slope and freeze-thaw shatter zone. No surface trenching permissible."
      }
    ],
    interventions: [
      {
        id: "INT-06",
        title: "Gabion Wire Mesh Silt Detention Dams",
        category: "Torrent Control & Infiltration",
        count: 4,
        unit: "structures",
        specs: "Caged galvanized wire mesh filled with native quartzite boulders",
        targetZone: "Upper Glacial Gully",
        mgnregaLaborDays: 160,
        estCostInr: 88000,
        estWaterHarvestedPerYearM3: 920,
        priority: "High",
        status: "Proposed",
        impact: "Captures snowmelt runoff and recharges deep fracture network"
      },
      {
        id: "INT-07",
        title: "Sub-Surface Clay/Masonry Cut-Off Barrier",
        category: "Aquifer Storage Augmentation",
        count: 1,
        unit: "barrier",
        specs: "Impermeable keyed wall across colluvial hollow",
        targetZone: "Break of Slope (2,650m MSL)",
        mgnregaLaborDays: 120,
        estCostInr: 95000,
        estWaterHarvestedPerYearM3: 780,
        priority: "High",
        status: "Under Review",
        impact: "Prevents subsurface drainage from escaping below the spring eye"
      }
    ],
    fieldSurveys: [
      {
        date: "2026-06-19",
        officer: "Tenzin Negi (Assistant Engineer, Jal Shakti)",
        measuredDischarge: 5.6,
        waterQuality: "Pristine mountain snowmelt, pH 7.4, 45 ppm TDS",
        communityFeedback: "Villagers report apple orchards face severe irrigation shortage in April.",
        photoUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "SP-ML-001",
    name: "Wah Umngot Spring",
    localName: "Pung Umngot (Living Aquifer)",
    state: "Meghalaya",
    district: "East Khasi Hills",
    block: "Pynursla",
    village: "Mawlynnong Tribal Village",
    gramPanchayat: "Mawlynnong Dorbar",
    tribalCommunity: "Khasi Indigenous Tribe",
    populationServed: 510,
    lat: 25.3210,
    lng: 91.8210,
    elevation: 890,
    status: "Healthy",
    currentDischarge: 11.4,
    baselinePerennialTarget: 12.0,
    summerDischarge: 6.2,
    peakMonsoonDischarge: 48.0,
    seasonality: "Perennial (High rain belt, but high monsoon runoff losses)",
    aquiferType: "Karstic Sylhet Limestone & Shillong Quartzite",
    hydroClass: "Karst Conduit / Solution Cavity Spring",
    strikeDip: "Strike E-W, Sub-horizontal (5° S)",
    historicalDischarge: [7.5, 6.2, 8.4, 16.5, 34.0, 48.0, 45.2, 38.0, 24.5, 16.2, 11.4, 9.0],
    springshedAreaKm2: 2.80,
    aiConfidence: 94.1,
    estimatedInfiltrationRate: "32.0 mm/hr",
    rechargeSuitability: {
      highPercent: 62,
      moderatePercent: 28,
      lowPercent: 10
    },
    springshedPolygon: [
      [25.3210, 91.8210],
      [25.3270, 91.8150],
      [25.3340, 91.8170],
      [25.3390, 91.8240],
      [25.3360, 91.8320],
      [25.3280, 91.8310],
      [25.3225, 91.8260],
      [25.3210, 91.8210]
    ],
    lineaments: [
      [
        [25.3380, 91.8230],
        [25.3300, 91.8220],
        [25.3210, 91.8210]
      ]
    ],
    hazardZones: [],
    interventions: [
      {
        id: "INT-08",
        title: "Subsurface Sinkhole Filtration Traps",
        category: "Karst Infiltration Control",
        count: 6,
        unit: "traps",
        specs: "Perforated non-clogging geotextile cages over natural sinkhole intakes",
        targetZone: "Karst Plateau (850m MSL)",
        mgnregaLaborDays: 70,
        estCostInr: 38000,
        estWaterHarvestedPerYearM3: 840,
        priority: "High",
        status: "Completed",
        impact: "Prevents conduit clogging and doubles recharge entry volume"
      }
    ],
    fieldSurveys: [
      {
        date: "2026-08-02",
        officer: "Bah K. Lyngdoh (Forest Ranger & Khasi Elder)",
        measuredDischarge: 11.4,
        waterQuality: "Crystal clear, mineral-rich, TDS 75 ppm",
        communityFeedback: "Traditional sacred groves (Law Kyntang) well preserved; water flows continuously.",
        photoUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "SP-OD-003",
    name: "Belghar Hill Spring",
    localName: "ବେଲଘର କୁଟିଆ କନ୍ଧ ଝରଣା",
    state: "Odisha",
    district: "Kandhamal",
    block: "Tumudibandha",
    village: "Belghar Tribal Settlement",
    gramPanchayat: "Belghar GP",
    tribalCommunity: "Kutia Kondh (PVTG - Particularly Vulnerable Tribal Group)",
    populationServed: 430,
    lat: 19.7820,
    lng: 83.9210,
    elevation: 820,
    status: "Critical",
    currentDischarge: 0.8,
    baselinePerennialTarget: 6.0,
    summerDischarge: 0.1,
    peakMonsoonDischarge: 12.0,
    seasonality: "Nearly Dried up in 2025 Summer",
    aquiferType: "Eastern Ghats Granulite & Khondalite Belt",
    hydroClass: "Fracture Valley Spring",
    strikeDip: "Strike NE-SW, Dip 30° SE",
    historicalDischarge: [1.2, 0.8, 0.2, 0.1, 0.3, 2.5, 9.4, 12.0, 7.8, 4.2, 2.1, 1.4],
    springshedAreaKm2: 1.15,
    aiConfidence: 86.4,
    estimatedInfiltrationRate: "11.5 mm/hr",
    rechargeSuitability: {
      highPercent: 40,
      moderatePercent: 35,
      lowPercent: 25
    },
    springshedPolygon: [
      [19.7820, 83.9210],
      [19.7870, 83.9160],
      [19.7930, 83.9180],
      [19.7960, 83.9250],
      [19.7910, 83.9300],
      [19.7850, 83.9280],
      [19.7820, 83.9210]
    ],
    lineaments: [
      [
        [19.7950, 83.9240],
        [19.7880, 83.9220],
        [19.7820, 83.9210]
      ]
    ],
    hazardZones: [
      {
        coordinates: [
          [19.7935, 83.9280],
          [19.7965, 83.9295],
          [19.7950, 83.9325],
          [19.7915, 83.9310]
        ],
        type: "Active Colluvial Gully Erosion",
        slopeDegree: "37.8°",
        warning: "Severe erosion gully. Avoid heavy water ponding interventions."
      }
    ],
    interventions: [
      {
        id: "INT-09",
        title: "Staggered Contour Trenches with Vegetative Bunds",
        category: "Infiltration Enhancement",
        count: 28,
        unit: "trenches",
        specs: "4m x 0.5m x 0.5m with Vetiver hedge border",
        targetZone: "Gentle Upper Ridge",
        mgnregaLaborDays: 112,
        estCostInr: 33600,
        estWaterHarvestedPerYearM3: 390,
        priority: "High",
        status: "Proposed",
        impact: "+2.1 L/min dry season flow"
      }
    ],
    fieldSurveys: [
      {
        date: "2026-09-10",
        officer: "Dr. B. Nayak (Anthropological & Tribal Water Survey)",
        measuredDischarge: 0.8,
        waterQuality: "Moderate, iron trace detectable",
        communityFeedback: "PVTG Kutia Kondh community requested immediate spring catchment protection.",
        photoUrl: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

// District-wide aggregated statistics for Ministry & District Collectors
export const DISTRICT_STATISTICS = {
  kandhamal: {
    name: "Kandhamal District, Odisha",
    totalSprings: 412,
    criticalSprings: 148,
    perennialHealthy: 126,
    seasonalDepleted: 138,
    rechargeStructuresBuilt: 104,
    totalMgnregaDaysCreated: 14200,
    budgetSpentInr: 4260000,
    estimatedWaterRechargedMlPerYear: 84.5,
    tribalPopulationBenefited: 48600
  },
  kinnaur: {
    name: "Kinnaur District, Himachal Pradesh",
    totalSprings: 280,
    criticalSprings: 72,
    perennialHealthy: 114,
    seasonalDepleted: 94,
    rechargeStructuresBuilt: 68,
    totalMgnregaDaysCreated: 9800,
    budgetSpentInr: 3450000,
    estimatedWaterRechargedMlPerYear: 62.0,
    tribalPopulationBenefited: 31200
  },
  eastKhasiHills: {
    name: "East Khasi Hills, Meghalaya",
    totalSprings: 345,
    criticalSprings: 58,
    perennialHealthy: 210,
    seasonalDepleted: 77,
    rechargeStructuresBuilt: 82,
    totalMgnregaDaysCreated: 11400,
    budgetSpentInr: 3100000,
    estimatedWaterRechargedMlPerYear: 98.2,
    tribalPopulationBenefited: 52400
  }
};
