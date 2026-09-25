export interface ConditionItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  iconName: string;
  mechanism: string;
}

export interface ErosionalProcess {
  id: string;
  name: string;
  action: string;
  description: string;
  analogy: string;
}

export interface TransportationMode {
  id: string;
  name: string;
  particleSize: string;
  heightRange: string;
  movementType: string;
  description: string;
}

export interface FormationStep {
  step: string;
  action: string;
  detail: string;
}

export interface LandformDetail {
  id: string;
  plateNumber: string;
  name: string;
  alternateName?: string;
  category: 'erosional' | 'depositional';
  shortDefinition: string;
  formationProcess: string[];
  formationSteps: FormationStep[];
  fieldNote: string;
  keyFeature: string;
  exampleLocation: string;
  geographicRegion: string;
  depthOrHeightNote?: string;
  photoUrl: string;
  fallbackPhotoUrl?: string;
  photoAlt?: string;
  photoCaption: string;
  diagramType: 'mushroom' | 'yardang' | 'ventifact' | 'deflation' | 'barchan' | 'dune-types' | 'loess';
  syllabusNotes: string[];
  keyTerms: string[];
}

export interface CaseStudyLocation {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: { lat: number; lng: number };
  landformId: string;
  landformName: string;
  category: 'erosional' | 'depositional';
  highlight: string;
  detailedText: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  syllabusReference: string;
}

// 1. Necessary Conditions for Wind Action (PDF Page 2)
export const NECESSARY_CONDITIONS: ConditionItem[] = [
  {
    id: 'arid-climate',
    name: 'Arid Climate',
    subtitle: 'High Evaporation',
    description: 'Evaporation rate exceeds precipitation, drying out topsoil.',
    iconName: 'Sun',
    mechanism: 'Extreme dryness eliminates soil moisture that would otherwise bind loose mineral grains together.'
  },
  {
    id: 'loose-material',
    name: 'Loose Material',
    subtitle: 'Dry Fine Particles',
    description: 'Presence of dry, fine sand and uncompacted rock particles.',
    iconName: 'Layers',
    mechanism: 'Unconsolidated weathered rocks provide an endless sediment reservoir ready for aerodynamic entrainment.'
  },
  {
    id: 'sparse-vegetation',
    name: 'Sparse Vegetation',
    subtitle: 'No Root Anchorage',
    description: 'Lack of plant roots allows wind to move material freely.',
    iconName: 'TreePine',
    mechanism: 'Absence of protective plant canopy exposes ground directly to violent turbulent shear stresses.'
  },
  {
    id: 'high-wind-velocity',
    name: 'High Wind Velocity',
    subtitle: 'Kinetic Drag Force',
    description: 'Strong winds pick up and transport heavy rock particles.',
    iconName: 'Wind',
    mechanism: 'Sustained gale-force winds generate sufficient fluid drag to dislodge and elevate abrasive grains.'
  }
];

// 2. Erosional Processes (PDF Page 2)
export const EROSIONAL_PROCESSES: ErosionalProcess[] = [
  {
    id: 'deflation',
    name: 'Deflation',
    action: 'Lifting & Blowing Away',
    description: 'Lifting and blowing away loose sand particles, lowering ground level.',
    analogy: 'Natural vacuum cleaner sweeping away loose dust and excavating desert depressions.'
  },
  {
    id: 'abrasion',
    name: 'Abrasion',
    action: 'Natural Sandpaper Blasting',
    description: 'Sand-laden winds blast rock surfaces like natural sandpaper.',
    analogy: 'High-speed sand particles acting as geological chisels carving and polishing bedrock.'
  },
  {
    id: 'attrition',
    name: 'Attrition',
    action: 'Particle-on-Particle Collision',
    description: 'Airborne rock grains collide with each other, breaking into finer sand.',
    analogy: 'Mid-air pebble collisions rounding edges and pulverizing larger grains into microscopic silt.'
  }
];

// 3. Transportation Modes (PDF Page 2)
export const TRANSPORTATION_MODES: TransportationMode[] = [
  {
    id: 'traction',
    name: 'Traction',
    particleSize: 'Coarse Sand & Pebbles (>0.5 mm)',
    heightRange: '0 cm (Direct ground contact)',
    movementType: 'Rolling & Sliding',
    description: 'Heavier particles that are too dense to be lifted are rolled, pushed, and slid along the desert floor by the frictional drag of the wind.'
  },
  {
    id: 'saltation',
    name: 'Saltation',
    particleSize: 'Medium Sand (0.1 mm – 0.5 mm)',
    heightRange: '2 to 3 feet (0.6 – 0.9 m) above ground',
    movementType: 'Bouncing & Hopping Arcs',
    description: 'Sand grains are lifted into the air, travel in low curved trajectories, and splash down into the sand bed, ejecting other grains in a continuous chain reaction. Maximum sand volume moves via saltation!'
  },
  {
    id: 'suspension',
    name: 'Suspension',
    particleSize: 'Fine Dust & Silt (<0.1 mm)',
    heightRange: 'Hundreds to thousands of feet in the atmosphere',
    movementType: 'Airborne Floating over Huge Distances',
    description: 'Extremely fine, lightweight dust and silt particles are swept high into turbulent upper atmospheric air currents and carried over hundreds to thousands of kilometers beyond desert boundaries.'
  }
];

// 4. Erosional Landforms (PDF Pages 4, 5, 6, 7)
export const EROSIONAL_LANDFORMS: LandformDetail[] = [
  {
    id: 'deflation-hollows',
    plateNumber: 'PLATE I · GEOMORPHIC EROSION',
    name: 'Deflation Hollows',
    alternateName: 'Blowouts / Desert Depressions',
    category: 'erosional',
    shortDefinition: 'Bowl-shaped depressions formed by wind blowing away loose sand.',
    fieldNote: '“Deflation continues excavating dry sediment downward until arrested by the subterranean water table.”',
    formationSteps: [
      { step: '01', action: 'Continuous Wind Blast', detail: 'High-velocity arid winds strip away loose fine sand and uncompacted topsoil.' },
      { step: '02', action: 'Depression Widens', detail: 'Shallow circular blowouts expand and deepen across the unvegetated desert floor.' },
      { step: '03', action: 'Water Table Barrier', detail: 'Excavation terminates at groundwater level; moist soil resists lifting, giving rise to desert oases.' }
    ],
    formationProcess: [
      'Continuous blowing of strong winds removes loose, fine particles from arid soil.',
      'Shallow depressions called deflation hollows or blowouts gradually widen and deepen.',
      'Erosion continues downward until the local water table is reached.',
      'Once moisture and groundwater are exposed, damp soil prevents further deflation, giving rise to desert oases.'
    ],
    keyFeature: 'Downward erosion limit reaches the underground water table, creating permanent desert oases.',
    exampleLocation: 'Qattara Depression',
    geographicRegion: 'Egypt (Sahara Desert)',
    depthOrHeightNote: 'Drops to 133 meters below sea level; spans over 19,000 sq km.',
    photoUrl: '/images/deflation_hollow.jpg',
    fallbackPhotoUrl: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1400&q=85',
    photoAlt: 'Deflation hollow and arid blowout depression excavated by continuous wind deflation in a desert basin',
    photoCaption: 'Natural desert blowout depression excavated by continuous wind deflation in an arid basin.',
    diagramType: 'deflation',
    syllabusNotes: [
      'Formation: Continuous blowing of strong winds removes loose fine particles.',
      'Depth Limit: Erosion continues downward until water table is reached, forming desert oases.',
      'Example: The massive Qattara Depression in Egypt (Sahara Desert) was formed largely by deflation.'
    ],
    keyTerms: ['Deflation', 'Blowout', 'Water Table', 'Desert Oasis', 'Qattara Depression']
  },
  {
    id: 'ventifacts',
    plateNumber: 'PLATE II · GEOMORPHIC EROSION',
    name: 'Ventifacts',
    alternateName: 'Wind-Polished Pebbles / Dreikanter',
    category: 'erosional',
    shortDefinition: 'Rock pebbles faceted and polished smooth by wind abrasion.',
    fieldNote: '“Windward rock surfaces are ground flat by saltating quartz grains; rotation produces sharp multi-faceted dreikanter.”',
    formationSteps: [
      { step: '01', action: 'Saltating Sand Blasting', detail: 'Sand-charged winds act as natural sandpaper, bombarding stationary desert gravel.' },
      { step: '02', action: 'Planar Facet Formation', detail: 'The windward side of the rock pebble becomes planar, pitted, and mirror-smooth.' },
      { step: '03', action: 'Rock Rotation / Wind Shift', detail: 'Dominant wind shifts or basal undermining rotate the pebble, carving three sharp intersecting facets (dreikanter).' }
    ],
    formationProcess: [
      'Wind-borne sand particles blast against stationary loose rocks and pebbles lying on the desert surface.',
      'The abrasive action carves, pits, and polishes the windward face into a flat, mirror-smooth facet.',
      'When wind direction changes or the rock shifts position due to undermining, another facet is carved.',
      'Rocks exhibiting multiple polished facets and sharp intersecting ridges are known as dreikanter.'
    ],
    keyFeature: 'Flat polished windward faces and sharp knife-like ridges (dreikanter having 3 distinct facets).',
    exampleLocation: 'Desert Pavements & Regs',
    geographicRegion: 'Arid desert gravel plains worldwide',
    depthOrHeightNote: 'Occurs in the lowest 1–2 feet where coarse abrasive sand saltates violently.',
    photoUrl: '/images/ventifacts.jpg',
    fallbackPhotoUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1400&q=85',
    photoAlt: 'Wind-polished faceted desert pebbles with planar faces abraded by saltating sand',
    photoCaption: 'Wind-polished pebbles with planar facets shaped by saltating sand abrasion.',
    diagramType: 'ventifact',
    syllabusNotes: [
      'Wind-Polished Pebbles: Ventifacts are rock fragments and pebbles carved, pitted, and polished by wind-borne sand particles.',
      'Dominant Wind Direction: The windward side becomes flat and highly smooth.',
      'Dreikanter: Rocks with multiple polished facets are known as dreikanter.'
    ],
    keyTerms: ['Ventifact', 'Dreikanter', 'Faceted Pebble', 'Windward Polish', 'Abrasion Pit']
  },
  {
    id: 'mushroom-rocks',
    plateNumber: 'PLATE III · GEOMORPHIC EROSION',
    name: 'Mushroom Rocks',
    alternateName: 'Pedestal Rocks / Pilzstein',
    category: 'erosional',
    shortDefinition: 'Rock pedestals undercut at base due to low-height sand abrasion.',
    fieldNote: '“Maximum abrasion occurs close to the ground within 2 to 3 feet, causing severe basal undercutting.”',
    formationSteps: [
      { step: '01', action: 'Saltation Height Ceiling', detail: 'Heavy abrasive quartz grains are restricted to saltating within 2 to 3 feet from the desert ground.' },
      { step: '02', action: 'Basal Undercutting', detail: 'Intense abrasive sandpapering attacks the bottom of the rock pillar far more vigorously than the top.' },
      { step: '03', action: 'Narrow Stem & Broad Head', detail: 'A slender, deeply scoured stalk develops, supporting a broad uncarved mushroom cap.' }
    ],
    formationProcess: [
      'Wind carries heavy, abrasive sand grains mostly concentrated within 2 to 3 feet above the ground.',
      'Maximum abrasive cutting occurs at lower levels, eroding the rock base far more aggressively than its top.',
      'Upper rock segments remain protected from heavy bouncing grains, receiving only gentle fine dust abrasion.',
      'This differential erosion carves a narrow slender stem supporting a wide, heavy top head resembling a mushroom.'
    ],
    keyFeature: 'Severe base undercutting within the 2–3 feet sand blast zone supporting a broader uncarved cap.',
    exampleLocation: 'Thar Desert Landscape',
    geographicRegion: 'Rajasthan, India',
    depthOrHeightNote: 'Critical sand blast threshold: strictly 2 to 3 feet (0.6 – 0.9 m) from the ground.',
    photoUrl: '/images/mushroom_rock.jpg',
    fallbackPhotoUrl: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=1400&q=85',
    photoAlt: 'Mushroom pedestal rock with an undercut slender base supporting a broad uncarved head in a desert landscape',
    photoCaption: 'Mushroom rock shaped by differential wind abrasion concentrated at its base.',
    diagramType: 'mushroom',
    syllabusNotes: [
      'Differential Erosion: Wind carries heavy sand grains mostly within 2 to 3 feet above ground.',
      'Base Undercutting: Maximum abrasion occurs at lower levels, eroding the rock base far more than its top.',
      'Structure: Results in a narrow stem supporting a broad top head, resembling a mushroom.',
      'Common Location: Commonly found in arid desert regions like Rajasthan, India.'
    ],
    keyTerms: ['Mushroom Rock', 'Pedestal Rock', '2–3 Feet Blast Zone', 'Base Undercutting', 'Differential Erosion']
  },
  {
    id: 'yardangs',
    plateNumber: 'PLATE IV · GEOMORPHIC EROSION',
    name: 'Yardangs',
    alternateName: 'Streamlined Ridge Furrows',
    category: 'erosional',
    shortDefinition: 'Parallel ridges of hard rock separated by eroded soft rock furrows.',
    fieldNote: '“Alternating vertical bands of hard and soft strata lie parallel to the wind; softer bands scour into deep troughs.”',
    formationSteps: [
      { step: '01', action: 'Parallel Rock Strata', detail: 'Bands of resistant hard rock and weak soft rock lie parallel to the dominant prevailing wind.' },
      { step: '02', action: 'Channeled Sand Abrasion', detail: 'Sand-laden wind funnels along the softer bands, carving long, steep-sided aerodynamic troughs.' },
      { step: '03', action: 'Streamlined Ridges', detail: 'Resistant hard rock remains standing as sharp-crested ridges resembling overturned boat hulls.' }
    ],
    formationProcess: [
      'Develop in arid terrains where alternate vertical bands of resistant hard rock and weak soft rock lie parallel to prevailing wind.',
      'Sand-charged winds channel down the softer rock bands, rapidly excavating deep, elongated troughs or furrows.',
      'The resistant hard rock bands withstand the scouring blast, standing high as steep-sided, streamlined ridges.',
      'Over centuries, the ridges adopt aerodynamic inverted-boat hulls aligned exactly with dominant wind direction.'
    ],
    keyFeature: 'Parallel alignment of alternating hard ridges and soft eroded troughs parallel to prevailing winds.',
    exampleLocation: 'Kaluts / Lut Desert',
    geographicRegion: 'Lut Desert (Iran) & Central Asian basins',
    depthOrHeightNote: 'Can stand from a few meters up to tens of meters tall, stretching over kilometers.',
    photoUrl: '/images/yardangs.jpg',
    fallbackPhotoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
    photoAlt: 'Streamlined yardang ridges and wind-scoured troughs aligned parallel to dominant desert winds',
    photoCaption: 'Streamlined yardang ridges separated by wind-eroded troughs aligned with prevailing winds.',
    diagramType: 'yardang',
    syllabusNotes: [
      'Development: Develop where alternate bands of hard and soft rocks lie parallel to prevailing wind direction.',
      'Erosion Rate: Softer rocks erode rapidly into deep long troughs.',
      'Result: Leaves streamlined, steep-sided ridges of hard rock standing prominent above desert floor.'
    ],
    keyTerms: ['Yardangs', 'Parallel Rock Bands', 'Streamlined Ridges', 'Erosion Troughs / Furrows', 'Differential Resistance']
  }
];

// 5. Depositional Landforms (PDF Pages 8, 9, 10, 11)
export const DEPOSITIONAL_LANDFORMS: LandformDetail[] = [
  {
    id: 'sand-dunes',
    plateNumber: 'PLATE V · GEOMORPHIC DEPOSITION',
    name: 'Sand Dunes',
    alternateName: 'Transverse & Longitudinal (Seif) Dunes',
    category: 'depositional',
    shortDefinition: 'Mounds or hills of sand deposited by wind action in arid and coastal zones.',
    fieldNote: '“When wind velocity drops or encounters terrain obstacles, transported sand accumulates in sheltered leeward eddies.”',
    formationSteps: [
      { step: '01', action: 'Wind Velocity Deceleration', detail: 'Frictional drag over obstacles (rocks, shrubs, ridges) forces wind to shed its sand load.' },
      { step: '02', action: 'Saltation Avalanche', detail: 'Sand grains saltate up the gentle windward slope and avalanche down the steep leeward slip face.' },
      { step: '03', action: 'Ridge Alignment', detail: 'Forms Transverse dunes (perpendicular to wind) or Longitudinal/Seif dunes (parallel to wind corridors).' }
    ],
    formationProcess: [
      'Triggered when wind velocity drops or encounters natural obstacles like boulders, shrubs, or terrain rises.',
      'Transported sand grains drop out of saltation and traction, accumulating in sheltered leeward eddies.',
      'Transverse Dunes form perpendicular (right angles) to steady winds when sand supply is abundant.',
      'Longitudinal (Seif) Dunes form parallel to the prevailing wind direction in long elongated sand ridges.'
    ],
    keyFeature: 'Large undulating mounds categorized by wind alignment: Transverse (perpendicular) vs Longitudinal/Seif (parallel).',
    exampleLocation: 'Thar Desert & Sahara Erg',
    geographicRegion: 'Arid desert basins and coastal dune systems',
    depthOrHeightNote: 'Ranging from several meters to towering ergs exceeding 150 meters in height.',
    photoUrl: '/images/sand_dunes.jpg',
    fallbackPhotoUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85',
    photoAlt: 'Sweeping undulating desert sand dunes showing sharp crest-lines and windward ripples shaped by steady winds',
    photoCaption: 'Sweeping undulating desert sand dunes showing sharp crest-lines and windward ripples shaped by steady arid winds.',
    diagramType: 'dune-types',
    syllabusNotes: [
      'Definition: Mounds or hills of sand deposited by wind action in arid and coastal zones.',
      'Formation Factors: Abundant sand supply, steady wind direction, and natural obstacles trigger accumulation.',
      'Types: Includes transverse dunes (perpendicular to wind) and longitudinal/seif dunes (parallel to wind direction).'
    ],
    keyTerms: ['Sand Dunes', 'Transverse Dunes', 'Longitudinal Dunes', 'Seif Dunes', 'Accumulation Trigger']
  },
  {
    id: 'barchans',
    plateNumber: 'PLATE VI · GEOMORPHIC DEPOSITION',
    name: 'Barchans',
    alternateName: 'Crescent-Shaped Sand Dunes',
    category: 'depositional',
    shortDefinition: 'Crescent-shaped dunes formed when wind blows predominantly from one single direction.',
    fieldNote: '“Crucial Diagnostic Rule: The twin horns point downwind in the exact direction of wind movement.”',
    formationSteps: [
      { step: '01', action: 'Uni-Directional Wind', detail: 'Steady, constant winds blow consistently from one single dominant quadrant across moderate sand supplies.' },
      { step: '02', action: 'Asymmetric Slope Profile', detail: 'Saltating sand creeps up the gentle convex windward slope (10°–15°) and cascades down the steep concave leeward face (~32°).' },
      { step: '03', action: 'Downwind Horn Migration', detail: 'The lateral flanks of the dune advance more rapidly than the thick central crest, pointing the twin horns downwind.' }
    ],
    formationProcess: [
      'Form in regions with moderate sand supply and steady, constant uni-directional wind.',
      'Sand is driven up the gentle convex windward slope by saltating grains.',
      'At the crest, sand avalanches down the sheltered, steep concave leeward slip-face.',
      'The outer flanks of the dune advance more rapidly than the thick central bulk, forming two tapering tips called horns.',
      'Crucial rule: The horns point downwind in the exact direction of wind movement.'
    ],
    keyFeature: 'Gentle convex windward slope, steep concave leeward face, and twin horns pointing downwind.',
    exampleLocation: 'Namib Desert & Sahara',
    geographicRegion: 'Namibia, Egypt, and Rajasthan interior',
    depthOrHeightNote: 'Gentle windward angle (~10°–15°) vs steep leeward slip face (~32° angle of repose).',
    photoUrl: '/images/barchan_sperrgebiet.jpg',
    fallbackPhotoUrl: '/images/barchan_aerial.jpg',
    photoAlt: 'Crescent-shaped barchan dunes formed by predominantly unidirectional wind',
    photoCaption: 'Crescent-shaped barchan dunes formed under predominantly unidirectional winds.',
    diagramType: 'barchan',
    syllabusNotes: [
      'Crescent Shape: Formed when wind blows predominantly from one single direction.',
      'Slopes: Gentle convex windward slope and a steep concave leeward slope.',
      'Horns: The two tips, called horns, point downwind in the direction of wind movement.'
    ],
    keyTerms: ['Barchan', 'Crescent Dune', 'Convex Windward Slope', 'Concave Leeward Slope', 'Downwind Horns']
  },
  {
    id: 'loess-plains',
    plateNumber: 'PLATE VII · GEOMORPHIC DEPOSITION',
    name: 'Loess Plains',
    alternateName: 'Aeolian Fine Silt Deposits',
    category: 'depositional',
    shortDefinition: 'Extensive deposits of fine silt transported in suspension over huge distances.',
    fieldNote: '“Microscopic silt travels hundreds of kilometers in suspension, blanketing non-desert regions in thick, fertile yellow soil.”',
    formationSteps: [
      { step: '01', action: 'Atmospheric Suspension', detail: 'High-altitude dust storms lift extremely fine, lightweight mineral silt out of desert basins.' },
      { step: '02', action: 'Long-Distance Transport', detail: 'Dust clouds travel hundreds to thousands of kilometers beyond desert boundaries before settling.' },
      { step: '03', action: 'Fertile Soil Mantle', detail: 'Accumulates into thick, yellowish, highly porous, unstratified loam (e.g. Northern China Loess Plateau >640,000 sq km).' }
    ],
    formationProcess: [
      'Extremely fine, light dust and silt particles are lifted high into suspension by violent desert storms.',
      'Winds carry this microscopic powder hundreds to thousands of kilometers beyond arid desert boundaries.',
      'When winds calm over humid, vegetated plains, the airborne dust settles in thick continuous mantles.',
      'Forms yellowish, highly porous, unstratified, and remarkably fertile mineral-rich agricultural soils.'
    ],
    keyFeature: 'Yellowish, highly porous, unstratified, extremely fertile soil mantle spanning vast non-desert regions.',
    exampleLocation: 'Loess Plateau (Huangtu Plateau)',
    geographicRegion: 'Northern China',
    depthOrHeightNote: 'Spans over 640,000 square kilometers; silt blankets reach depths exceeding 100 meters.',
    photoUrl: '/images/loess_plains.jpg',
    fallbackPhotoUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85',
    photoAlt: 'Steep bluffs and eroded ravines carved into thick unstratified wind-blown silt',
    photoCaption: 'Steep bluffs and eroded ravines carved into thick unstratified deposits of wind-blown silt.',
    diagramType: 'loess',
    syllabusNotes: [
      'Fine Silt Deposit: Extremely fine, light dust particles carried in suspension over hundreds of km beyond deserts.',
      'Characteristics: Form yellowish, highly porous, unstratified, and fertile soil deposits.',
      'Key Example: World’s largest loess deposit is the Loess Plateau in Northern China, spanning over 640,000 sq km.'
    ],
    keyTerms: ['Loess Plains', 'Suspension Transport', 'Unstratified', 'Porous Soil', 'Loess Plateau Northern China']
  }
];

// 6. Interactive Map Case Studies
export const CASE_STUDY_LOCATIONS: CaseStudyLocation[] = [
  {
    id: 'qattara',
    name: 'Qattara Depression',
    country: 'Egypt',
    region: 'Northwest Sahara Desert',
    coordinates: { lat: 29.5, lng: 27.5 },
    landformId: 'deflation-hollows',
    landformName: 'Deflation Hollow (Blowout)',
    category: 'erosional',
    highlight: 'Plunges to 133m below sea level; stopped only when deflation reached the subterranean water table.',
    detailedText: 'As cited in the Class 11 curriculum, the vast Qattara Depression was hollowed out by relentless Saharan deflation. Sweeping wind lifted trillions of tons of loose fine sediment, lowering the ground until the regional water table was intersected, giving rise to salty marshes and oases.'
  },
  {
    id: 'rajasthan',
    name: 'Thar Desert Rock Pedestals',
    country: 'India',
    region: 'Rajasthan',
    coordinates: { lat: 26.9, lng: 70.9 },
    landformId: 'mushroom-rocks',
    landformName: 'Mushroom Rocks (Pedestal Rocks)',
    category: 'erosional',
    highlight: 'Classic textbook example of low-altitude sand blast undercutting (within 2–3 feet from desert ground).',
    detailedText: 'Throughout the Thar Desert near Jaisalmer and Jodhpur, isolated sandstone pillars demonstrate the differential erosion described in the textbook: high-impact saltating grains strictly within 2–3 feet ground clearance carved narrow necks while the upper blocks remained broad.'
  },
  {
    id: 'lut-desert',
    name: 'Kaluts of the Lut Desert',
    country: 'Iran',
    region: 'Dasht-e Lut',
    coordinates: { lat: 30.5, lng: 59.0 },
    landformId: 'yardangs',
    landformName: 'Streamlined Yardangs',
    category: 'erosional',
    highlight: 'Towering parallel streamlined ridges carved along dominant 120-day summer wind corridors.',
    detailedText: 'A UNESCO World Heritage site and reference for Class 11 Yardang morphology. The intense seasonal winds channel down softer clay-siltstone strata, hollowing out deep straight troughs and leaving aerodynamic hard rock ridges standing dozens of meters tall.'
  },
  {
    id: 'loess-plateau',
    name: 'The Loess Plateau (Huangtu)',
    country: 'Northern China',
    region: 'Yellow River Basin',
    coordinates: { lat: 36.8, lng: 108.5 },
    landformId: 'loess-plains',
    landformName: 'Loess Plains',
    category: 'depositional',
    highlight: 'The world’s largest loess deposit, spanning over 640,000 sq km of porous yellowish unstratified fertile silt.',
    detailedText: 'Explicitly highlighted in the Class 11 PDF presentation. Atmospheric suspension carried Gobi and Taklamakan desert silt hundreds of kilometers eastward. The resulting 640,000 sq km plateau gives the Yellow River its characteristic color and created ancient China’s fertile cradle.'
  },
  {
    id: 'namib-barchans',
    name: 'Sossusvlei & Skeleton Coast Dunes',
    country: 'Namibia',
    region: 'Namib Desert',
    coordinates: { lat: -24.7, lng: 15.3 },
    landformId: 'barchans',
    landformName: 'Barchans & Transverse Dunes',
    category: 'depositional',
    highlight: 'Exemplifies uni-directional Atlantic trade winds creating textbook crescent dunes with downwind horns.',
    detailedText: 'The Namib Desert provides living field proof of barchan migration. Steady, constant winds from the southwest blow across sparse terrain, driving saltating sand up gentle windward slopes and spilling over steep leeward slip faces, pointing their crescent horns downwind.'
  }
];

// 7. Comprehensive Overview Table (PDF Page 3)
export const OVERVIEW_TABLE_DATA = [
  {
    category: 'Erosional Features',
    landform: 'Deflation Hollows',
    keyMechanism: 'Bowl-shaped depressions formed by wind blowing away loose sand.',
    example: 'Qattara Depression, Egypt'
  },
  {
    category: 'Erosional Features',
    landform: 'Ventifacts',
    keyMechanism: 'Rock pebbles faceted and polished smooth by wind abrasion.',
    example: 'Dreikanter (multiple polished facets)'
  },
  {
    category: 'Erosional Features',
    landform: 'Mushroom Rocks',
    keyMechanism: 'Rock pedestals undercut at base due to low-height sand abrasion.',
    example: 'Rajasthan, India (2–3 ft blast zone)'
  },
  {
    category: 'Erosional Features',
    landform: 'Yardangs',
    keyMechanism: 'Parallel ridges of hard rock separated by eroded soft rock furrows.',
    example: 'Kaluts / Lut Desert'
  },
  {
    category: 'Depositional Features',
    landform: 'Sand Dunes & Barchans',
    keyMechanism: 'Mounds of sand and crescent-shaped dunes formed downwind.',
    example: 'Transverse, Longitudinal & Barchans'
  },
  {
    category: 'Depositional Features',
    landform: 'Loess Plains',
    keyMechanism: 'Extensive deposits of fine silt transported over huge distances.',
    example: 'Loess Plateau, Northern China (>640,000 sq km)'
  }
];

// 8. Flashcards for Quick Revision
export const FLASHCARDS_DATA = [
  {
    id: 1,
    front: 'What are the 4 necessary conditions for wind action in arid regions?',
    back: '1. Arid Climate (evaporation exceeds precipitation)\n2. Loose Material (dry uncompacted sand)\n3. Sparse Vegetation (lack of root anchorage)\n4. High Wind Velocity (strong drag force)',
    category: 'Conditions'
  },
  {
    id: 2,
    front: 'Why is abrasion in mushroom rocks restricted mostly to 2–3 feet above ground?',
    back: 'Heavier, abrasive sand grains are too dense to be lifted high and travel primarily via saltation within 2 to 3 feet (0.6–0.9 m) from the ground. This produces maximum base undercutting while the top remains broad.',
    category: 'Erosion'
  },
  {
    id: 3,
    front: 'What is a Dreikanter and how does it form?',
    back: 'A dreikanter is a ventifact (wind-polished rock) with multiple smooth polished facets and sharp intersecting ridges, formed when rock faces are abraded by shifting dominant wind directions or rock rotation.',
    category: 'Erosion'
  },
  {
    id: 4,
    front: 'What limits the downward erosional depth of a deflation hollow?',
    back: 'The underground water table. Once deflation scours down to groundwater level, damp soil prevents further wind lifting, creating a desert oasis (e.g. Qattara Depression, Egypt).',
    category: 'Erosion'
  },
  {
    id: 5,
    front: 'How do the horns of a Barchan dune orient relative to wind direction?',
    back: 'The two tips (horns) point DOWNWIND, exactly in the direction of wind movement, because the lower outer edges migrate faster than the thicker central crest.',
    category: 'Deposition'
  },
  {
    id: 6,
    front: 'What are the three distinct characteristics of Loess deposits?',
    back: '1. Extremely fine silt carried in atmospheric suspension over huge distances.\n2. Yellowish, highly porous, unstratified texture.\n3. Exceptionally fertile soil (e.g. Northern China Loess Plateau >640,000 sq km).',
    category: 'Deposition'
  },
  {
    id: 7,
    front: 'Difference between Traction, Saltation, and Suspension?',
    back: '• Traction: Heavy particles roll/slide along ground (0 cm).\n• Saltation: Medium sand bounces in arcs within 2–3 ft.\n• Suspension: Fine dust/silt floats high over hundreds of kilometers.',
    category: 'Transportation'
  },
  {
    id: 8,
    front: 'How do Yardangs differ from Zeugen (rock orientation)?',
    back: 'In Yardangs, alternating bands of hard and soft rock lie PARALLEL to the prevailing wind direction, carving long parallel troughs and streamlined ridges.',
    category: 'Erosion'
  }
];

// 9. Class 11 Geography Quiz Questions (Strictly from PDF)
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'According to the Class 11 syllabus, why does base undercutting occur predominantly in mushroom rocks?',
    options: [
      'Chemical weathering is stronger near underground mineral roots',
      'Wind carries heavy sand grains mostly within 2 to 3 feet above ground',
      'Rain splash softens only the bottom foot of desert rocks',
      'Earth tremors crack the lower base of rock pillars'
    ],
    correctIndex: 1,
    explanation: 'The PDF explicitly states: "Wind carries heavy sand grains mostly within 2 to 3 feet above ground. Maximum abrasion occurs at lower levels, eroding the rock base far more than its top."',
    syllabusReference: 'Slide 6: Erosional Feature: Mushroom Rocks'
  },
  {
    id: 2,
    question: 'Rocks that exhibit multiple polished facets due to sand-laden wind abrasion are called:',
    options: [
      'Yardangs',
      'Dreikanter',
      'Barchans',
      'Blowouts'
    ],
    correctIndex: 1,
    explanation: 'The PDF states: "When wind blows consistently from one dominant direction, the windward side of rock becomes flat and highly smooth. Rocks with multiple polished facets are known as dreikanter."',
    syllabusReference: 'Slide 5: Erosional Feature: Ventifacts'
  },
  {
    id: 3,
    question: 'What marks the depth limit for wind erosion in a deflation hollow?',
    options: [
      'Bedrock basalt boundary',
      'The underground water table',
      'The atmospheric zero-pressure boundary',
      'Vegetation root zone limit'
    ],
    correctIndex: 1,
    explanation: 'The PDF states under Depth Limit: "Erosion continues downward until the water table is reached, forming desert oases."',
    syllabusReference: 'Slide 4: Erosional Feature: Deflation Hollows'
  },
  {
    id: 4,
    question: 'In which direction do the two tips (horns) of a Barchan point?',
    options: [
      'Upwind, against the wind movement',
      'Perpendicular to the dominant wind at 90°',
      'Downwind, in the direction of wind movement',
      'Directly towards the desert center regardless of wind'
    ],
    correctIndex: 2,
    explanation: 'The PDF states: "The two tips, called horns, point downwind in the direction of wind movement."',
    syllabusReference: 'Slide 10: Depositional Feature: Barchans'
  },
  {
    id: 5,
    question: 'Yardangs develop in regions where alternate bands of hard and soft rock lie:',
    options: [
      'Perpendicular to prevailing wind direction',
      'Parallel to the prevailing wind direction',
      'In concentric horizontal rings around an oasis',
      'Tilted randomly without any directional pattern'
    ],
    correctIndex: 1,
    explanation: 'The PDF states: "Yardangs develop in regions where alternate bands of hard and soft rocks lie parallel to the prevailing wind direction. The softer rocks erode rapidly into deep long troughs."',
    syllabusReference: 'Slide 7: Erosional Feature: Yardangs'
  },
  {
    id: 6,
    question: 'What is the world’s largest loess deposit mentioned in the syllabus?',
    options: [
      'The Mississippi Basin Loess (USA)',
      'The Loess Plateau in Northern China (>640,000 sq km)',
      'The Thar Loess Plain (India)',
      'The Pampas Loess Fields (Argentina)'
    ],
    correctIndex: 1,
    explanation: 'The PDF states: "Key Example: The world\'s largest loess deposit is the Loess Plateau in Northern China, spanning over 640,000 sq km."',
    syllabusReference: 'Slide 11: Depositional Feature: Loess Plains'
  },
  {
    id: 7,
    question: 'Which transportation process involves coarse sand grains rolling and sliding along the ground surface without becoming airborne?',
    options: [
      'Suspension',
      'Saltation',
      'Traction',
      'Attrition'
    ],
    correctIndex: 2,
    explanation: 'Traction refers to heavy rock and sand particles rolled and dragged directly along the surface by wind friction.',
    syllabusReference: 'Slide 2: Wind Action: Conditions & Processes'
  },
  {
    id: 8,
    question: 'The massive Qattara Depression in Egypt (Sahara Desert) was primarily formed by which wind process?',
    options: [
      'Sand Dune Accumulation',
      'Deflation',
      'Loess Deposition',
      'Attrition in riverbeds'
    ],
    correctIndex: 1,
    explanation: 'The PDF states: "Example: The massive Qattara Depression in Egypt (Sahara Desert) was formed largely by deflation."',
    syllabusReference: 'Slide 4: Erosional Feature: Deflation Hollows'
  }
];
