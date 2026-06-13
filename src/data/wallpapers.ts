/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wallpaper, Collection, Review } from "../types";

export const collections: Collection[] = [
  { slug: "earth", name: "დედამიწა", icon: "Globe", description: "ჩვენი მშობლიური პლანეტის შთამბეჭდავი 3D რენდერები დაბალი ორბიტიდან და ღრმა კოსმოსიდან.", wallpapersCount: 10, colorTheme: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { slug: "moon", name: "მთვარე", icon: "Moon", description: "კონტრასტული კრატერები, მთვარის მტვერი და დრამატული განათება დედამიწის თანამგზავრზე.", wallpapersCount: 10, colorTheme: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  { slug: "sun", name: "მზე", icon: "Sun", description: "კაშკაშა მზის აფეთქებები, მაგნიტური ქარიშხლები და თერმობირთვული სიდიადე 3D 8K-ში.", wallpapersCount: 10, colorTheme: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { slug: "mars", name: "მარსი", icon: "Compass", description: "წითელი პლანეტის დინამიკური უდაბნოები, ოლიმპოს მთა და მომავლის კოლონიები.", wallpapersCount: 10, colorTheme: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
  { slug: "jupiter", name: "იუპიტერი", icon: "Disc", description: "გაზის ქარიშხლიანი მორევები, დიდი წითელი ლაქა და ოკეანური მთვარეები ულტრა დეტალიზაციით.", wallpapersCount: 10, colorTheme: "text-orange-400 bg-orange-500/10 border-orange-400/20" },
  { slug: "saturn", name: "სატურნი", icon: "Orbit", description: "დიდებული რგოლების სისტემები, ჰექსაგონალური პოლარული მორევები და ყინულოვანი თანამგზავრები.", wallpapersCount: 10, colorTheme: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
  { slug: "uranus", name: "ურანი", icon: "Sparkles", description: "ცისფერი ყინულის გიგანტი დახრილი ღერძითა და მანათობელი რგოლებით.", wallpapersCount: 10, colorTheme: "text-cyan-400 bg-cyan-500/10 border-cyan-400/30" },
  { slug: "neptune", name: "ნეპტუნი", icon: "Eye", description: "მუქი ლურჯი გაზის გიგანტის საოცარი სამყაროები, ზებგერითი ქარები და ტრიტონი.", wallpapersCount: 10, colorTheme: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { slug: "comets", name: "კომეტები", icon: "Wind", description: "ღრმა კოსმოსის ყინულის მოგზაურები მზის ქარის ქვეშ მანათობელი აირის კუდებით.", wallpapersCount: 10, colorTheme: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { slug: "galaxy", name: "გალაქტიკა", icon: "MilkyWay", description: "ეპიკური კოსმოსური სპირალური მკლავები, ბნელი მატერიის ჰალოები და ვარსკვლავური ცენტრები.", wallpapersCount: 10, colorTheme: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { slug: "stars", name: "ვარსკვლავები", icon: "Star", description: "მოციმციმე ვარსკვლავთგროვები, ნეიტრონული ვარსკვლავები და ჰიპერგიგანტები.", wallpapersCount: 10, colorTheme: "text-yellow-300 bg-yellow-300/10 border-yellow-300/20" },
  { slug: "nebula", name: "ნისლეული", icon: "Sparkle", description: "იონიზებული გაზის მანათობელი ვარსკვლავთშორისი მტვრის ღრუბლები და ვარსკვლავების სამშობლო.", wallpapersCount: 10, colorTheme: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  { slug: "black-hole", name: "შავი ხვრელი", icon: "FlameKindling", description: "გრავიტაციული ლინზირება, მოვლენათა ჰორიზონტები და რელატივისტური პლაზმური ჭავლები.", wallpapersCount: 10, colorTheme: "text-red-500 bg-red-500/10 border-red-500/20" },
  { slug: "meteor-shower", name: "მეტეორული წვიმა", icon: "Zap", description: "ატმოსფერული ცეცხლოვანი ზოლები, მტვრის რადიაციული ნაკადები და იონიზებული გაზის კვალები.", wallpapersCount: 10, colorTheme: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { slug: "space-exploration", name: "კოსმოსის კვლევა", icon: "Rocket", description: "კოლოსალური ვარსკვლავთმფრინავები, ორბიტალური კავშირები და კოლონიზატორების ფლოტები.", wallpapersCount: 10, colorTheme: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { slug: "astronaut", name: "ასტრონავტი", icon: "User", description: "გაბედული მკვლევრები, ღია კოსმოსში გასვლა და მთვარის ნაბიჯები.", wallpapersCount: 10, colorTheme: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
  { slug: "satellite", name: "თანამგზავრი", icon: "Cpu", description: "ლაზერული საკომუნიკაციო მასივები, ჰაბლის ტელესკოპები და საერთაშორისო კოსმოსური სადგურის ხედები.", wallpapersCount: 10, colorTheme: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20" },
  { slug: "earth-from-space", name: "დედამიწა კოსმოსიდან", icon: "Layers", description: "დედამიწის ორბიტალური რკალის საოცარი ფართო ხედები, თხელი ატმოსფერული ლურჯი ხაზები.", wallpapersCount: 10, colorTheme: "text-sky-500 bg-sky-500/10 border-sky-500/20" },
  { slug: "full-moon", name: "სავსე მთვარე", icon: "Smile", description: "იდუმალებით მოცული და სრულად განათებული ვერცხლისფერი დისკები მაღალი კონტრასტით.", wallpapersCount: 10, colorTheme: "text-gray-300 bg-gray-400/10 border-gray-400/20" },
  { slug: "moon-phases", name: "მთვარის ფაზები", icon: "CircleDot", description: "მთვარის კლებადი, მზარდი, ნახევარი და ნამგალა ფაზები ექსტრემალური კოსმოსური სიღრმით.", wallpapersCount: 10, colorTheme: "text-amber-200 bg-amber-300/10 border-amber-300/20" },
  { slug: "cosmic-lights", name: "კოსმოსური ნათება", icon: "ExternalLink", description: "ჰოლოგრაფიული სივრცე-დროის სხივები, გამა-აფეთქებები და პულსარების გამოსხივება.", wallpapersCount: 10, colorTheme: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20" },
  { slug: "aurora", name: "ავრორა", icon: "Grid", description: "გეომაგნიტური ციური მოცეკვავეები, მზის ნაწილაკების ზურმუხტისფერი და იისფერი ლენტები.", wallpapersCount: 10, colorTheme: "text-green-400 bg-green-500/10 border-green-500/20" },
  { slug: "deep-space", name: "ღრმა კოსმოსი", icon: "SearchCode", description: "ჰაბლისა და ჯეიმს ვების ულტრა-ღრმა ველის კადრები პირველყოფილი დროიდან.", wallpapersCount: 10, colorTheme: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  { slug: "milky-way", name: "ირმის ნახტომი", icon: "Map", description: "ჩვენი მშობლიური გალაქტიკის ცენტრალური ზოლი, მტვრის ბილიკები და მშვილდოსანი A*.", wallpapersCount: 10, colorTheme: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20" },
  { slug: "planetary-system", name: "პლანეტარული სისტემა", icon: "Network", description: "ორბიტალური მასივები, მრავალპლანეტიანი დაბნელებები და პლანეტების განლაგება.", wallpapersCount: 10, colorTheme: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { slug: "supernova", name: "ზეახალი ვარსკვლავი", icon: "Radio", description: "ვარსკვლავური კატაკლიზმები, ძლიერი დარტყმითი ტალღები მტვრის გარსებში.", wallpapersCount: 10, colorTheme: "text-red-400 bg-red-400/10 border-red-400/20" },
  { slug: "shooting-stars", name: "მფრინავი ვარსკვლავები", icon: "Flame", description: "კოსმოსურ სიცარიელეში გამავალი ვარსკვლავის შუქის მყისიერი, ნაზი ზოლები.", wallpapersCount: 10, colorTheme: "text-cyan-300 bg-cyan-300/10 border-cyan-300/20" },
  { slug: "exoplanets", name: "ეგზოპლანეტები", icon: "Shuffle", description: "საცხოვრებლად ვარგისი სუპერდედამიწები, ორმაგი მზის კლდოვანი უდაბნოები და ლავის ოკეანეები.", wallpapersCount: 10, colorTheme: "text-teal-500 bg-teal-500/10 border-teal-500/20" },
  { slug: "wormhole", name: "ჭიის ხვრელი", icon: "RefreshCw", description: "სივრცე-დროის გამრუდების მეტრიკა, თეორიული აინშტაინ-როზენის ხიდები.", wallpapersCount: 10, colorTheme: "text-violet-500 bg-violet-500/10 border-violet-500/20" },
  { slug: "dark-space", name: "ბნელი კოსმოსი", icon: "Lock", description: "სუფთა ბნელი თემები, მინიმალისტური ვარსკვლავები და აბსოლუტური ფუფუნების შავი სიცარიელე.", wallpapersCount: 10, colorTheme: "text-stone-400 bg-stone-500/10 border-stone-500/20" }
];

// Curated Unsplash Space IDs to guarantee high visual quality and thematic relevance
const collectionImageKeys: Record<string, string> = {
  "earth": "photo-1614730321146-b6fa6a46bcb4",
  "moon": "photo-1532693322450-2cb5c511067d",
  "sun": "photo-1506318137071-a8e063b4bec0",
  "mars": "photo-1614313913007-2b4ae8ce32d6",
  "jupiter": "photo-1620216521993-f1ef3f48627e",
  "saturn": "photo-1614314107768-6018061b5b72",
  "uranus": "photo-1634017839464-5c339ebe3cb4",
  "neptune": "photo-1506703719100-a0f3a48c0f86",
  "comets": "photo-1444703686981-a3abbc4d4fe3",
  "galaxy": "photo-1462331940025-496dfbfc7564",
  "stars": "photo-1502134249126-9f3755a50d78",
  "nebula": "photo-1543722530-d2c3201371e7",
  "black-hole": "photo-1464802686167-b939a6910659",
  "meteor-shower": "photo-1509198397868-475647b2a1e5",
  "space-exploration": "photo-1451187580459-43490279c0fa",
  "astronaut": "photo-1614728894747-a83421e2b9c9",
  "satellite": "photo-1541185933-ef5d8ed016c2",
  "earth-from-space": "photo-1446776811953-b23d57bd21aa",
  "full-moon": "photo-1518818419601-72c8673f5852",
  "moon-phases": "photo-1505506819553-6a5e1975eaf0",
  "cosmic-lights": "photo-1516339901601-2e1d62dc0c45",
  "aurora": "photo-1483168527879-c66136b56105",
  "deep-space": "photo-1506318137071-a8e063b4bec0",
  "milky-way": "photo-1505506819553-6a5e1975eaf0",
  "planetary-system": "photo-1446776811953-b23d57bd21aa",
  "supernova": "photo-1570215171424-610b65942be6",
  "shooting-stars": "photo-1519681393784-d120267933ba",
  "exoplanets": "photo-1518531933037-91b2f5f229cc",
  "wormhole": "photo-1579783902614-a3fb3927b6a5",
  "dark-space": "photo-1518531933037-91b2f5f229cc"
};

// Premium Vibe Borders for glowing frame styles based on collection
const vibeGradients: Record<string, string> = {
  "earth": "from-blue-600 to-cyan-400 border border-blue-500/30 shadow-blue-500/20",
  "moon": "from-slate-500 to-amber-100 border border-slate-500/30 shadow-slate-500/20",
  "sun": "from-amber-600 to-red-500 border border-amber-500/30 shadow-amber-500/20",
  "mars": "from-red-600 to-rose-400 border border-red-500/30 shadow-red-500/20",
  "jupiter": "from-orange-500 to-yellow-600 border border-orange-500/30 shadow-orange-500/20",
  "saturn": "from-yellow-600 to-amber-400 border border-yellow-500/30 shadow-yellow-500/20",
  "uranus": "from-cyan-500 to-teal-300 border border-cyan-500/40 shadow-cyan-500/20",
  "neptune": "from-indigo-600 to-blue-500 border border-indigo-500/30 shadow-indigo-500/20",
  "comets": "from-teal-600 to-emerald-400 border border-teal-500/30 shadow-teal-500/20",
  "galaxy": "from-purple-600 to-fuchsia-400 border border-purple-500/30 shadow-purple-500/20",
  "stars": "from-yellow-400 to-white/90 border border-yellow-300/30 shadow-yellow-300/20",
  "nebula": "from-pink-600 to-purple-500 border border-pink-500/30 shadow-pink-500/20",
  "black-hole": "from-red-950 to-neutral-900 border border-red-500/40 shadow-red-500/30",
  "meteor-shower": "from-purple-600 to-blue-400 border border-purple-500/30 shadow-purple-500/20",
  "space-exploration": "from-emerald-500 to-blue-400 border border-emerald-500/30 shadow-emerald-500/20",
  "astronaut": "from-sky-500 to-neutral-300 border border-sky-500/30 shadow-sky-500/20",
  "satellite": "from-slate-600 to-zinc-400 border border-zinc-500/30 shadow-zinc-500/20",
  "earth-from-space": "from-sky-600 to-blue-400 border border-sky-500/30 shadow-sky-500/20",
  "full-moon": "from-white/50 to-slate-400 border border-white/20 shadow-white/10",
  "moon-phases": "from-amber-200 to-slate-600 border border-amber-300/20 shadow-amber-300/10",
  "cosmic-lights": "from-fuchsia-600 to-cyan-400 border border-fuchsia-500/30 shadow-fuchsia-500/20",
  "aurora": "from-green-600 to-teal-400 border border-green-500/30 shadow-green-500/20",
  "deep-space": "from-violet-600 to-fuchsia-500 border border-violet-500/30 shadow-violet-500/20",
  "milky-way": "from-fuchsia-600 to-violet-500 border border-fuchsia-500/30 shadow-fuchsia-500/20",
  "planetary-system": "from-blue-600 to-violet-400 border border-blue-500/30 shadow-blue-500/20",
  "supernova": "from-red-500 to-amber-400 border border-red-400/30 shadow-red-400/20",
  "shooting-stars": "from-cyan-400 to-blue-600 border border-cyan-300/30 shadow-cyan-300/20",
  "exoplanets": "from-teal-600 to-sky-400 border border-teal-500/30 shadow-teal-500/20",
  "wormhole": "from-violet-600 to-pink-500 border border-violet-500/40 shadow-violet-500/30",
  "dark-space": "from-neutral-900 to-neutral-800 border border-neutral-700/20 shadow-neutral-900/40",
};

// Procedural generator to generate EXACTLY 10 wallpapers per collection
// 30 collections * 10 = 300 total wallpapers.
export const generateWallpapers = (): Wallpaper[] => {
  const wallpapers: Wallpaper[] = [];
  const resolutions: ("4K" | "8K" | "AMOLED")[] = ["4K", "8K", "AMOLED"];
  const devices: ("Phone" | "Tablet" | "Laptop" | "Desktop")[][] = [
    ["Phone", "Tablet"],
    ["Laptop", "Desktop"],
    ["Phone", "Tablet", "Laptop", "Desktop"],
    ["Phone"]
  ];

  // Unique names lists for each collection (10 names each) to guarantee high uniqueness
  const thematicTitles: Record<string, string[]> = {
    earth: ["Eternal Gaia", "Stratosphere Dawn", "Oasis Orbit", "Night Lights Continuum", "Pacific Solitude", "Atmospheric Silk", "Hyperborea Glow", "Monolith Cradle", "Apex Gondwana", "Muted Continental"],
    moon: ["Apollo Crest", "Tycho Luminescence", "Sea of Serenity", "Basalt Abyss", "Luna Shadows", "Craters Edge", "Titanium Dust", "Orbital Monotone", "Regolith Crown", "Ethereal Selene"],
    sun: ["Helios Flare", "Prominence Pulse", "Solar Corona", "Thermonuclear Core", "Sunspot Vortex", "Magnetic Torrent", "Plasma Arcs", "White Dwarf Eclipse", "Ignition Zenith", "Golden Sentry"],
    mars: ["Olympus Apex", "Valles Horizon", "Cydonia Relic", "Rust Desolation", "Martian Tempest", "Ares Polar Ice", "Sagan Base One", "Noctis Labyrinthus", "Red Sands Ambient", "Phobos Low Gravity"],
    jupiter: ["Great Red Swirl", "Galilean Transit", "Ammonia Belt", "Metis Ringlet", "Jovian Supremacy", "Supersonic Stratum", "Europa Horizon", "Magnetosphere Core", "Storm Giant", "Io Plasma Torus"],
    saturn: ["Ring Division", "Cassini Crossing", "Titan Atmosphere", "Hexagonal Vortex", "Mimas Eclipse", "Enceladus Geysers", "Rings of Gold", "Adrastea Gate", "Chrono-Orbit", "Dione Silhouette"],
    uranus: ["Cyan Axis", "Tilted Sentry", "Methane Chill", "Titania Pass", "Ariel Glow", "Subzero Ice", "Pale Blue Orb", "Oblique Helix", "Neon Uranus", "Umbrel Core"],
    neptune: ["Supersonic Tempest", "Great Dark Spot", "Triton Cryo", "Supersonic Depths", "Azure Neptune", "Tethyan Void", "Stormy Depths", "Outer Ringlet", "Proteus Monolith", "Absolute Deep Blue"],
    comets: ["Halley Return", "Neowise Ice", "Caelum Tail", "Hale-Bopp Flash", "Relativistic Trail", "Parabolic Wanderer", "Frozen Core", "Dust Envelope", "Perihelion Glow", "Ethereal Comet"],
    galaxy: ["Andromeda Core", "Milky Way Arch", "Sombrero Horizon", "Spiral Arms Matrix", "Dark Matter Halo", "Star Nursery Zenith", "Sagittarius Bar", "Hubble Vortex", "Cartwheel Cataclysm", "M87 Event"],
    stars: ["Hypergiant Glow", "Neutron Pulse", "Pleiades Cluster", "Betelgeuse Sol", "Sirius Binary", "Stellar Nursery", "Magnetar Field", "Main Sequence Star", "Cosmic Dust Star", "Binary Flare"],
    nebula: ["Orion Birthplace", "Carina Pillars", "Eagle Cosmic Hand", "Helix cosmic eye", "Lagoon Infrared", "Crab Pulsar Core", "Veil Supernova Remnant", "Horsehead Monolith", "Butterfly Wings", "Stardust Nebula"],
    "black-hole": ["Singularity Threshold", "Event Horizon", "Accretion Disc Flare", "Spaghettified Light", "Relativistic Jet", "Quantum Schwarzschild", "Warped Spacetime", "Gargantua Gravity", "Cosmic Void Ring", "Hawking Glow"],
    "meteor-shower": ["Perseid Cascade", "Geminid Storm", "Atmospheric Friction", "Leonid Radiant", "Fireball Horizon", "Ionized Vapor Trail", "Shooting Star Array", "Midnight Fire", "Atmospheric Veil", "Solar System Dust"],
    "space-exploration": ["Starship Colony", "Orbital Tether Gateway", "Exo-City Station", "FTL Launch Pad", "Void Sailcraft", "Dyson Ring Project", "Gateway Station", "Interstellar Pioneer", "Voyager Legacy", "Colonial Fleet"],
    astronaut: ["Intrepid EVA", "Lunar Footprint", "Zenith Solitude", "Helmet Cosmic Mirror", "Weightless Void", "Solar Sail Repair", "First Ascent Spacer", "Deep Exploration EVA", "Astronaut Core", "Infinity Gaze"],
    satellite: ["Laser Array Alpha", "Hubble Eye V", "ISS Limb", "Low Earth Relay", "Orbital Spy Glass", "Solar Sails Unfurled", "Satcom Grid", "Deep Space Telescope", "Communications Node", "Orbital Horizon Radar"],
    "earth-from-space": ["Atmosphere Blue Line", "Curvature Sunrise", "Pacific Rim Dusk", "Mediterranean Lights", "Amazon Green Canopy", "Himalayas Peak Orbit", "Sahara Golden Waves", "Greenland Ice Sheet", "Terminator Line", "Global City Nocturne"],
    "full-moon": ["Lunar Silver Plate", "Selenography Peak", "Harvest Moon Glow", "Silver Solitude", "High Contrast Crater", "Supermoon Eclipse", "Luna Mystica", "Silver Dust Mirror", "Pale Satellite Glow", "Orbital White Dome"],
    "moon-phases": ["Waxing Gibbous", "Waning Crescent", "First Quarter Rise", "Lunar Sequence III", "Shadow Boundary", "Silver Horn", "New Moon Veil", "Lunar Cycle Matrix", "Orbital Metamorphosis", "Ecliptic Dance"],
    "cosmic-lights": ["Gamma Burst Alpha", "Pulsar Beam Glow", "Cherenkov Glow", "Relativistic Warp", "Bioluminescent Grid", "Quantum Flare", "Cosmic Ray Shower", "Singularity Light", "Ethereal Photon Wave", "Galactic Beacon"],
    aurora: ["Green Sky Dancer", "Inuit Legend Glow", "Solar Wind Shield", "Curtain of Aurora", "Emerald Veil", "Valkyrie Fire", "Geomagnetic Storm", "Boreal Green Horizon", "Violet Crown Aurora", "Southern Lights Aurora"],
    "deep-space": ["Cosmic Deep Field", "Primordial Nebula", "James Webb Array", "First Light Stars", "Gravitational Lens Hook", "Hubble Deep Field II", "Pre-Galactic Dust", "Infrared Void", "Cosmic Web Nexus", "Intergalactic Abyss"],
    "milky-way": ["Sagittarius Arms", "Milky Way Hub", "Dust Lane Silhouette", "Stellar Core Arch", "Scutum-Centaurus", "Local Group Beacon", "Galactic Center Core", "Milky Way Archway", "Cosmic Halo Dust", "Sol Companion Sector"],
    "planetary-system": ["Orbital Alignment", "Binary Star System", "Lined Planets Ecliptic", "Five-World Eclipse", "Gravity Dance", "Exotic Orbits", "System Genesis", "Orbital Ring Core", "Inner Planets Array", "Galactic Alignments"],
    supernova: ["Stellar Death Shock", "Kepler Remnant", "Nebular Expansion", "Cosmic Blast Shell", "Vela Filament Glow", "Core Collapse Ring", "Supernova Shockwave", "Gaseous Halo Birth", "Starlight Overlord", "Cataclysmic Spark"],
    "shooting-stars": ["Wishes in the Dark", "Meteor Streak Alpha", "Transient Light Arc", "Ethereal Flash Flight", "Atmospheric Spark", "Shooting Star Crest", "Silent Meteor Horizon", "Wish Finder", "Cosmic Spark Dust", "Tears of Starlight"],
    exoplanets: ["Kepler-186f Grass", "Lava World Rivers", "Binary Sun Oasis", "Gas Giant Moonscape", "TRAPPIST World", "Exotic Atmosphere", "Titanium Clouds planet", "Ocean planet Blue", "Methane Sea planet", "Ringed Exo-Monolith"],
    wormhole: ["Einstein Rosen Bridge", "Space-time Shortcut", "Gravity Vortex Loop", "Dimensional Conduit", "Holographic Tube", "Metric Wormhole Core", "Tunnel of Stars", "Event Lensing Vortex", "Dimensional Warp Gate", "Singularity Connector"],
    "dark-space": ["Pure Void Obsidian", "Monochrome Abyss", "Minimalist Stellar Dust", "Dark Matter Drift", "Midnight Nebula Space", "Shadow Cosmic Shell", "Luxury Dark Matter", "Absolute Null Zone", "Abyssal Starlight", "Noir Celestial Gate"]
  };

  const imageIds = Object.keys(collectionImageKeys);

  imageIds.forEach((slug) => {
    const photoId = collectionImageKeys[slug];
    const vibe = vibeGradients[slug] || "from-blue-600 to-purple-500 border border-blue-500/30 shadow-blue-500/20";
    const titlesRange = thematicTitles[slug] || Array.from({ length: 10 }, (_, i) => `${slug.toUpperCase()} Wallpaper #${i + 1}`);

    for (let i = 0; i < 10; i++) {
      const id = `${slug}-${i + 1}`;
      const title = titlesRange[i] || `${slug.charAt(0).toUpperCase() + slug.slice(1)} Pro #${i + 1}`;
      
      // Determine pricing, resolutions, tags, download history, and indicators
      const isPremium = i >= 3; // First 3 are free/regular price, others are high quality premium
      const isLimited = i === 9; // Wallpapers #10 are limited edition collectibles with a countdown timer
      const isBestSeller = i === 1 || i === 4;
      const isTrending = i === 2 || i === 7;
      const isNewArrival = i === 0 || i === 8;

      let price = 0;
      let originalPrice: number | undefined;

      if (isPremium) {
        if (isLimited) {
          price = 14.99;
          originalPrice = 24.99;
        } else {
          price = Math.round((2.99 + (i * 0.9)) * 100) / 100;
          originalPrice = Math.round((price * 1.5) * 100) / 100;
        }
      } else {
        price = 0; // Free elements
      }

      // Vary the specific image sub-parameters slightly so Unsplash returns slightly different crop positions/tones
      // Adding sig and auto adjustments
      const imageUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80&sig=${id}`;

      const res = resolutions[i % resolutions.length];
      const itemsDevices = devices[i % devices.length];

      const countdownDays = isLimited ? (7 - (i % 3)) : undefined;
      const countdownTimer = countdownDays
        ? new Date(Date.now() + countdownDays * 24 * 3600 * 1000).toISOString()
        : undefined;

      const rating = Math.round((4.2 + (i * 0.08) - (i % 2 === 0 ? 0.1 : 0)) * 10) / 10;
      const downloadsCount = Math.round((1200 - (i * 90) + (i % 3 === 0 ? 230 : 0)));

      const tags = [slug, res.toLowerCase(), isPremium ? "premium" : "free"];
      if (isLimited) tags.push("limited");
      if (isBestSeller) tags.push("bestseller");

      wallpapers.push({
        id,
        title,
        description: `საოცრად დეტალიზებული 3D ფონი, რომელიც ასახავს "${title}"-ს ყველა თანამედროვე OLED მოწყობილობისთვის. მოიცავს კოსმოსის მდიდრულ მოცულობით რენდერებს, კინემატოგრაფიულ განათებასა და სრულყოფილ ადაპტირებად ეკრანებს.`,
        categorySlug: slug,
        price,
        originalPrice,
        resolution: res,
        deviceTypes: itemsDevices as ("Phone" | "Tablet" | "Laptop" | "Desktop")[],
        imageUrl,
        isPremium,
        isLimited,
        isBestSeller,
        isTrending,
        isNewArrival,
        countdownTimer,
        rating: Math.min(5, Math.max(3.5, rating)),
        downloadsCount: Math.max(10, downloadsCount),
        tags,
        vibeGradient: vibe
      });
    }
  });

  return wallpapers;
};

export const reviewsData: Review[] = [
  { id: "rev-1", wallpaperId: "earth-1", userName: "AstroAlex", rating: 5, comment: "აბსოლუტურად თვალწარმტაცია! ორგანული 3D ფერები საოცრად გამოიყურება ჩემს AMOLED ეკრანზე.", date: "2026-05-10", isVIP: true },
  { id: "rev-2", wallpaperId: "earth-10", userName: "Celestia_99", rating: 5, comment: "ექსკლუზიური Earth Monolith ფონი ნამდვილი ფუფუნებაა. თითოეულ ცენტად ღირს!", date: "2026-06-01", isVIP: true },
  { id: "rev-3", wallpaperId: "black-hole-1", userName: "EventHorizon", rating: 4.8, comment: "მოვლენათა ჰორიზონტის ეს გამოსახულება კოსმოსურ რეალობას ცვლის. ექსტრემალურად მაღალი ხარისხის გარჩევადობაა.", date: "2026-06-05", isVIP: false },
  { id: "rev-4", wallpaperId: "nebula-1", userName: "NovaScout", rating: 5, comment: "მე ვიყენებ პლანშეტის ზომას და ისეთი შეგრძნებაა, თითქოს ხელში სამყაროს ნამდვილი ვარსკვლავთგროვა მიჭირავს.", date: "2026-06-11", isVIP: true },
  { id: "rev-5", wallpaperId: "mars-4", userName: "ElonSpacefan", rating: 4, comment: "ოლიმპოს მთა წარმოუდგენლად რეალისტურად გამოიყურება 8K გარჩევადობაში. ძალიან გირჩევთ.", date: "2026-06-12", isVIP: false }
];
