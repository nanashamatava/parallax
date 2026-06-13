/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { generateWallpapers, reviewsData, collections } from "./data/wallpapers";
import { Wallpaper, Collection, Review, CartItem, User, Order } from "./types";
import LiveStarsBackground from "./components/LiveStarsBackground";
import SolarSystemNavigator from "./components/SolarSystemNavigator";
import Planet360Viewer from "./components/Planet360Viewer";
import WallpaperCard from "./components/WallpaperCard";
import PreviewModal from "./components/PreviewModal";
import CartAndCheckout from "./components/CartAndCheckout";
import UserAuthModal from "./components/UserAuthModal";
import AdminDashboard from "./components/AdminDashboard";
import { useLanguage } from "./context/LanguageContext";

import {
  Search,
  SlidersHorizontal,
  Compass,
  Star,
  Flame,
  Zap,
  ShoppingCart,
  Heart,
  User as UserIcon,
  HelpCircle,
  Clock,
  Sparkles,
  Gift,
  Mail,
  ShieldCheck,
  LayoutDashboard,
  Filter,
  Check,
  ChevronDown
} from "lucide-react";

export default function App() {
  const { language, setLanguage, t } = useLanguage();

  // --- App Databases States ---
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // --- Active Users and Accounts ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize data on mount
  useEffect(() => {
    // Generate initial 300 wallpapers (30 collections * 10 each)
    const initialWallpapers = generateWallpapers();
    setWallpapers(initialWallpapers);
    setReviews(reviewsData);

    // Setup active mock account to allow seamless experience out of the box
    const firstUser: User = {
      id: "usr-prime",
      email: "major.tom@orions-belt.com",
      name: "Major Tom",
      role: "admin", // default role is admin so user can explore the Admin Dashboard seamlessly!
      favorites: ["earth-1", "nebula-3", "black-hole-9"],
      downloads: ["earth-1", "moon-4"],
      purchaseHistory: [
        {
          orderId: "ORD-920481",
          date: new Date(Date.now() - 48*3600*1000).toISOString(),
          items: [
            { wallpaperId: "earth-1", title: "Eternal Gaia", price: 0, imageUrl: "photo-1614730321146-b6fa6a46bcb4", device: "Phone", resolution: "4K" }
          ],
          total: 0
        }
      ],
      vipMembership: {
        active: true,
        level: "Gold",
        expiresAt: new Date(Date.now() + 365*24*3600*1000).toISOString()
      }
    };
    setCurrentUser(firstUser);
  }, []);

  // --- Search & Filters States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("earth"); // default category is Earth
  const [selectedResolution, setSelectedResolution] = useState<"All" | "4K" | "8K" | "AMOLED">("All");
  const [selectedDevice, setSelectedDevice] = useState<"All" | "Phone" | "Tablet" | "Laptop" | "Desktop">("All");
  const [maxPrice, setMaxPrice] = useState<number>(15);
  const [sortBy, setSortBy] = useState<"popularity" | "latest" | "best_selling">("popularity");
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [catalogLayout, setCatalogLayout] = useState<"standard" | "asymmetric" | "dense">("standard");
  const [collectionsPlacement, setCollectionsPlacement] = useState<"sidebar_left" | "sidebar_right" | "top_carousel" | "compact_grid">("sidebar_left");

  // --- Shopping Cart States ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);

  // --- Interactive view lightbox states ---
  const [activePreviewWallpaper, setActivePreviewWallpaper] = useState<Wallpaper | null>(null);

  // --- Auth states ---
  const [showAuthModal, setShowAuthModal] = useState(false);

  // --- Admin states ---
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // --- Clock state ---
  const [currentTime, setCurrentTime] = useState<string>("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Exclusive Limited edition countdown state ---
  const [countdownString, setCountdownString] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date("2026-07-01T00:00:00Z").getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdownString("00d : 00h : 00m : 00s");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdownString(
          `${String(days).padStart(2, "0")}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- Newsletter and promos ---
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  // --- Favorites Management ---
  const handleToggleFavorite = (wallId: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    const updatedFavs = currentUser.favorites.includes(wallId)
      ? currentUser.favorites.filter((f) => f !== wallId)
      : [...currentUser.favorites, wallId];

    setCurrentUser({
      ...currentUser,
      favorites: updatedFavs,
    });
  };

  // --- Shopping Cart Action Handlers ---
  const handleAddToCart = (wal: Wallpaper) => {
    const cartId = `${wal.id}-${selectedDevice === "All" ? "Phone" : selectedDevice}-${selectedResolution === "All" ? "4K" : selectedResolution}`;
    
    // Check if duplicate exists
    if (cart.some((item) => item.id === cartId)) {
      alert(`${wal.title} already cataloged within basket cargo holds.`);
      return;
    }

    const newItem: CartItem = {
      id: cartId,
      wallpaper: wal,
      targetDevice: selectedDevice === "All" ? "Phone" : (selectedDevice as any),
      targetResolution: selectedResolution === "All" ? "4K" : (selectedResolution as any),
      price: wal.price
    };

    setCart([...cart, newItem]);
    alert(`${wal.title} linked up to checkout cargo hold.`);
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart(cart.filter((item) => item.id !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (wal: Wallpaper) => {
    // Add item to cart and immediately open checkout drawer
    const cartId = `${wal.id}-Phone-4K`;
    
    if (!cart.some((item) => item.id === cartId)) {
      const newItem: CartItem = {
        id: cartId,
        wallpaper: wal,
        targetDevice: "Phone",
        targetResolution: "4K",
        price: wal.price
      };
      setCart([...cart, newItem]);
    }
    
    setShowCartModal(true);
  };

  // --- Auth Handlers ---
  const handleLogin = (email: string, name: string) => {
    setCurrentUser({
      id: `usr-${Math.floor(Math.random() * 9000 + 1000)}`,
      email,
      name,
      role: email.includes("admin") ? "admin" : "user",
      favorites: [],
      downloads: [],
      purchaseHistory: [],
      vipMembership: { active: false, level: "None" }
    });
    setShowAuthModal(false);
  };

  const handleRegister = (email: string, name: string) => {
    setCurrentUser({
      id: `usr-${Math.floor(Math.random() * 9000 + 1000)}`,
      email,
      name,
      role: "user",
      favorites: [],
      downloads: [],
      purchaseHistory: [],
      vipMembership: { active: true, level: "Bronze" }
    });
    setFormTypeSuccessMessage(`Welcome cadet! Signed up securely under level Bronze.`);
  };

  const [formTypeSuccessMessage, setFormTypeSuccessMessage] = useState("");

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setShowAuthModal(false);
  };

  // --- Review Submission Handlers ---
  const handleAddReview = (newReview: Omit<Review, "id" | "date">) => {
    const freshReview: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString(),
      isVIP: currentUser?.vipMembership.active
    };

    setReviews([freshReview, ...reviews]);
  };

  // --- Checkout success pipeline ---
  const handleCheckoutSuccess = (order: Order) => {
    if (!currentUser) return;

    // Append order to purchase history and unlock downloads license keys
    const newlyDownloadedIds = order.items.map((i) => i.wallpaperId);
    
    const updatedHistory = [
      {
        orderId: order.id,
        date: order.date,
        items: order.items,
        total: order.total
      },
      ...currentUser.purchaseHistory
    ];

    setCurrentUser({
      ...currentUser,
      downloads: Array.from(new Set([...currentUser.downloads, ...newlyDownloadedIds])),
      purchaseHistory: updatedHistory
    });

    setOrders([order, ...orders]);
    setCart([]); // Reset basket
  };

  // --- Administrative additions ---
  const handleAddWallpaper = (newWal: Omit<Wallpaper, "id" | "downloadsCount" | "rating">) => {
    const assignedId = `${newWal.categorySlug}-${wallpapers.length + 1}`;
    const wal: Wallpaper = {
      ...newWal,
      id: assignedId,
      downloadsCount: 0,
      rating: 5.0
    };
    setWallpapers([wal, ...wallpapers]);
  };

  const handleEditWallpaper = (id: string, updates: Partial<Wallpaper>) => {
    setWallpapers(wallpapers.map((w) => w.id === id ? { ...w, ...updates } : w));
  };

  const handleDeleteWallpaper = (id: string) => {
    setWallpapers(wallpapers.filter((w) => w.id !== id));
  };

  const handleGrantVIP = (userId: string, level: "Bronze" | "Silver" | "Gold" | "VIP") => {
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({
        ...currentUser,
        vipMembership: { active: true, level }
      });
    }
  };

  // --- Dynamic Filtering & Sorting Algorithm ---
  const filteredWallpapers = useMemo(() => {
    return wallpapers
      .filter((w) => {
        // 1. Search Query
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = query === "" || 
          w.title.toLowerCase().includes(query) ||
          w.description.toLowerCase().includes(query) ||
          w.tags.some((t) => t.toLowerCase().includes(query)) ||
          w.categorySlug.toLowerCase().includes(query);

        // 2. Category selection (each category returns its 10 corresponding unique elements)
        const matchesCategory = selectedCategory === "All" || w.categorySlug === selectedCategory;

        // 3. Resolution specs
        const matchesResolution = selectedResolution === "All" || w.resolution === selectedResolution;

        // 4. Device spec
        const matchesDevice = selectedDevice === "All" || w.deviceTypes.includes(selectedDevice as any);

        // 5. Price slider capping
        const matchesPrice = w.price <= maxPrice;

        return matchesQuery && matchesCategory && matchesResolution && matchesDevice && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "popularity") return b.downloadsCount - a.downloadsCount;
        if (sortBy === "latest") return b.id.localeCompare(a.id); // Mock chronological mapping
        if (sortBy === "best_selling") return b.isBestSeller === a.isBestSeller ? 0 : b.isBestSeller ? 1 : -1;
        return 0;
      });
  }, [wallpapers, searchQuery, selectedCategory, selectedResolution, selectedDevice, maxPrice, sortBy]);

  // Quick helper to fetch styled Lucide-react icons based on list specifications
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "earth": return "🌍";
      case "moon": return "🌙";
      case "sun": return "☀️";
      case "mars": return "🔴";
      case "jupiter": return "🟠";
      case "saturn": return "🪐";
      case "uranus": return "🔵";
      case "neptune": return "🔹";
      case "comets": return "☄️";
      case "galaxy": return "🌌";
      case "stars": return "✨";
      case "nebula": return "💫";
      case "black-hole": return "🕳️";
      case "meteor-shower": return "🌠";
      case "space-exploration": return "🚀";
      case "astronaut": return "👨‍🚀";
      case "satellite": return "🛰️";
      case "earth-from-space": return "🌍";
      case "full-moon": return "🌕";
      case "moon-phases": return "🌒";
      case "cosmic-lights": return "🌟";
      case "aurora": return "🌈";
      case "deep-space": return "🔭";
      case "milky-way": return "🌌";
      case "planetary-system": return "🪐";
      case "supernova": return "⭐";
      case "shooting-stars": return "🌠";
      case "exoplanets": return "🌍";
      case "wormhole": return "🌀";
      case "dark-space": return "🌑";
      default: return "🌟";
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans cosmic-gradient relative overflow-x-hidden pb-12 selection:bg-pink-500 selection:text-white">
      {/* Sophisticated Dark space layering */}
      <div className="nebula w-[600px] h-[600px] bg-blue-500/20 -top-40 -left-40 pointer-events-none"></div>
      <div className="nebula w-[500px] h-[500px] bg-purple-600/15 bottom-0 right-0 pointer-events-none"></div>
      <div className="star-dot w-1 h-1 top-20 left-40 shadow-[0_0_8px_white] pointer-events-none"></div>
      <div className="star-dot w-[2px] h-[2px] top-60 left-[60%] opacity-40 pointer-events-none"></div>
      <div className="star-dot w-1 h-1 top-[80%] left-[10%] shadow-[0_0_6px_white] pointer-events-none"></div>
      <div className="star-dot w-[2px] h-[2px] top-[15%] left-[85%] pointer-events-none"></div>

      {/* 3D accelerated canvas background */}
      <LiveStarsBackground />

      {/* FIXED HEADER SYSTEM */}
      <header className="sticky top-0 z-40 glass border-t-0 border-x-0 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        {/* Branding Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/15">
            <span className="font-mono font-extrabold text-white text-base select-none">Ø</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white uppercase select-none">COSMIC ORBITAL</h1>
            <p className="text-[8px] font-mono text-zinc-500 tracking-widest">{t("logo_sub")}</p>
          </div>
        </div>

        {/* Global Toolbar items */}
        <div className="flex items-center gap-2 md:gap-4.5 bg-zinc-950/20 px-2 py-1.5 rounded-2xl border border-white/5">
          {/* Language translation toggle button */}
          <button
            id="btn-lang-toggle"
            onClick={() => setLanguage(language === "en" ? "ka" : "en")}
            className="flex items-center h-8.5 gap-1 px-3 bg-white/5 border border-white/10 hover:border-[#38bdf8]/50 hover:bg-white/10 rounded-xl text-zinc-200 font-bold font-sans text-[11px] cursor-pointer transition-all active:scale-95"
            title="Switch Language / შეცვალე ენა"
          >
            <span className="text-xs">🌐</span>
            <span className="tracking-wider">{language === "en" ? "ENG" : "ქარ"}</span>
          </button>

          {/* UTC Clock telemetry (No AI Larping, human, functional UTC) */}
          <div className="hidden lg:flex items-center gap-1.5 h-8.5 px-3 bg-white/5 border border-white/5 rounded-xl text-zinc-400 font-mono text-[10px]">
            <Clock className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
            <span>{currentTime || t("utc_clock")}</span>
          </div>

          {/* Quick search input */}
          <div className="relative hidden md:block">
            <input
              type="text"
              id="header-search-bar"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 pl-8 pr-3 h-8.5 text-[11px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-all focus:w-64"
            />
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
          </div>

          {/* Favorites bookmark badge */}
          {currentUser && (
            <button
              id="btn-header-favs"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                // Quick filter to show only favorited elements
                alert(`${t("alert_favs_prefix")} ${currentUser.favorites.length} ${t("alert_favs_suffix")}`);
                const favIds = currentUser.favorites;
                setWallpapers(wallpapers.filter((w) => favIds.includes(w.id)));
              }}
              className="p-2 h-8.5 w-8.5 justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:text-rose-500 hover:bg-neutral-900 cursor-pointer flex items-center gap-1.5 relative"
            >
              <Heart className="w-4 h-4" />
              {currentUser.favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-rose-500 text-white w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {currentUser.favorites.length}
                </span>
              )}
            </button>
          )}

          {/* Shopping basket Cargo hold */}
          <button
            id="btn-header-cart"
            onClick={() => setShowCartModal(true)}
            className="p-2 h-8.5 w-8.5 justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:text-[#38bdf8] hover:bg-neutral-900 cursor-pointer flex items-center gap-1.5 relative bg-black/40"
          >
            <ShoppingCart className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-[#38bdf8] text-zinc-950 w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cart.length}
              </span>
            )}
          </button>

          {/* Account Profile avatar */}
          <button
            id="btn-header-account"
            onClick={() => setShowAuthModal(true)}
            className="p-2 h-8.5 rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:bg-neutral-900 cursor-pointer flex items-center gap-1.5"
          >
            <UserIcon className="w-4 h-4 text-zinc-400" />
            <span className="text-[11px] font-bold hidden sm:inline">
              {currentUser ? currentUser.name : t("cadet_login")}
            </span>
          </button>

          {/* Administrative Control dashboard shortcut toggle */}
          {currentUser?.role === "admin" && (
            <button
              id="btn-header-admin-terminal"
              onClick={() => setShowAdminDashboard(true)}
              className="p-2 px-3.5 h-8.5 rounded-xl bg-gradient-to-r from-pink-600/10 to-purple-600/10 hover:from-pink-600 hover:to-purple-600 hover:text-white border border-pink-500/20 text-pink-400 font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t("console")}</span>
            </button>
          )}
        </div>
      </header>

      {/* CORE FRAMEWORK WORKSPACE */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-12 space-y-16">
        
        {/* HERO HUD DASHBOARD AND SOLAR NAVIGATOR SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Main textual message */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#38bdf8]/10 to-purple-500/10 text-[#38bdf8] py-1 px-3 border border-[#38bdf8]/20 rounded-full text-[10px] uppercase font-bold tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
              {t("hero_badge")}
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t("hero_title_1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-teal-300 to-pink-500">
                {t("hero_title_2")}
              </span>
            </h2>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl">
              {t("hero_desc")}
            </p>

            {/* Quick action buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#catalog-container-anchor"
                className="h-11 px-6 flex items-center justify-center text-xs font-bold text-zinc-950 bg-gradient-to-r from-teal-400 to-[#38bdf8] rounded-xl hover:shadow-lg hover:shadow-cyan-500/15 transition-all outline-none"
              >
                {t("btn_browse")}
              </a>
              <button
                id="btn-upgrade-vip-hero"
                onClick={() => {
                  if (!currentUser) {
                    setShowAuthModal(true);
                  } else {
                    setCurrentUser({
                      ...currentUser,
                      vipMembership: { active: true, level: "VIP" }
                    });
                    alert(t("vip_success"));
                  }
                }}
                className="h-11 px-5 flex items-center justify-center text-xs font-bold text-white/90 rounded-xl neo-button tracking-wider uppercase transition-all cursor-pointer"
              >
                {t("btn_vip_privileges")}
              </button>
            </div>

            {/* Micro value proposition stats indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-md text-left font-mono">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">{t("stat_collections_label")}</span>
                <span className="block text-lg font-bold text-white">{t("stat_collections_val")}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">{t("stat_renders_label")}</span>
                <span className="block text-lg font-bold text-white">{t("stat_renders_val")}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">{t("stat_pilots_label")}</span>
                <span className="block text-lg font-bold text-white">{t("stat_pilots_val")}</span>
              </div>
            </div>
          </div>

          {/* Interactive Solar Navigator HUD column (Right) */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-6">
            <SolarSystemNavigator
              onSelectCategory={(slug) => {
                setSelectedCategory(slug);
                const elem = document.getElementById("catalog-container-anchor");
                if (elem) elem.scrollIntoView({ behavior: "smooth" });
              }}
              selectedCategorySlug={selectedCategory}
            />
          </div>
        </section>

        {/* FEATURED EXCLUSIVE WALLPAPER COUNTDOWN TIMER PROMOTIONS */}
        <section className="glass card-shadow p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[90px] pointer-events-none" />
          
          <div className="space-y-4 max-w-lg text-left">
            <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 uppercase tracking-widest">
              {t("limited_drop_badge")}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {t("limited_drop_title")}
            </h3>
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              {t("limited_drop_desc")}
            </p>

            {/* Countdown timer ticker */}
            <div className="flex gap-4 pt-2 font-mono">
              <div className="glass px-4 py-2 rounded-xl text-center min-w-[70px]">
                <span className="text-[9px] text-white/50 uppercase block tracking-wider mb-0.5">{t("time_limit")}</span>
                <span className="text-sm font-bold text-cyan-300">{countdownString || t("decoding")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4.5 glass p-4.5 rounded-2xl w-full md:w-auto relative max-w-[340px]">
            <img
              src="https://images.unsplash.com/photo-1614314107768-6018061b5b72?auto=format&fit=crop&w=400&q=80"
              alt="Saturn space representation"
              referrerPolicy="no-referrer"
              className="w-16 aspect-[9/16] rounded-lg object-cover border border-white/10 shadow"
            />
            <div className="space-y-2 text-left flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{t("chrono_saturnia_title")}</h4>
              <p className="text-[10px] text-white/40 line-clamp-2">{t("saturn_limited_desc")}</p>
              <div className="flex justify-between items-center pt-1.5">
                <span className="text-sm text-cyan-400 price-tag">$14.99</span>
                <button
                  id="btn-limited-checkout"
                  onClick={() => {
                    const matchedSaturn = wallpapers.find((w) => w.id === "saturn-10");
                    if (matchedSaturn) {
                      handleBuyNow(matchedSaturn);
                    } else {
                      alert(t("saturn_refresh_alert"));
                    }
                  }}
                  className="h-7 px-3 text-[10px] font-extrabold text-black bg-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] rounded-lg hover:brightness-105 uppercase tracking-wider transition-all cursor-pointer"
                >
                  {t("btn_buy_collectible")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE 360 PLANET VIEWER AREA */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-4">
            <span className="text-[9px] font-bold text-pink-500 bg-pink-500/10 px-2.5 py-1 rounded border border-pink-500/20 uppercase tracking-widest">
              {t("viewer_badge")}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              {t("viewer_title")}
            </h3>
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              {t("viewer_desc")}
            </p>
            <div className="pt-2">
              <p className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> {t("viewer_feat")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center items-center">
            <Planet360Viewer />
          </div>
        </section>

        {/* MAIN WALLPAPER CATALOG AND SEARCH GRID SYSTEM */}
        <div id="catalog-container-anchor" className="space-y-6 pt-8 scroll-mt-24">
          
          {/* Header catalog indicator */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4.5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#38bdf8]" />
                {t("catalog_title")}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{t("catalog_sub")}</p>
            </div>

            {/* Advanced Filters and Layout selector */}
            <div className="flex flex-wrap items-center gap-3 ml-auto md:ml-0 z-10">
              {/* Grid Layout Frame System */}
              <div className="flex bg-neutral-900/90 border border-white/5 rounded-xl p-0.5">
                {[
                  { mode: "standard" as const, labelEn: "Symmetric Deck", labelKa: "სიმეტრიული" },
                  { mode: "asymmetric" as const, labelEn: "Editorial Stagger", labelKa: "ასიმეტრიული" },
                  { mode: "dense" as const, labelEn: "Compact Deck", labelKa: "კომპაქტური" }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.mode}
                    id={`btn-layout-set-${item.mode}`}
                    onClick={() => setCatalogLayout(item.mode)}
                    className={`py-1.5 px-3 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      catalogLayout === item.mode
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {language === "ka" ? item.labelKa : item.labelEn}
                  </button>
                ))}
              </div>

              <button
                type="button"
                id="btn-toggle-filters-drawer"
                onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                className="h-10 px-4 flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 border border-white/5 rounded-xl transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#38bdf8]" />
                {showFiltersDrawer ? t("btn_hide_filters") : t("btn_refinement_filters")}
              </button>
            </div>
          </div>

          {/* Collection Interface & Placement Deck Control HUD */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 bg-neutral-900/60 p-3 rounded-2xl border border-white/5 text-left font-sans select-none">
            <div className="flex items-center gap-2">
              <span className="text-sm">🪐</span>
              <div>
                <span className="text-[11px] font-bold text-zinc-200 block">
                  {language === "ka" ? "კოლექციების განლაგება:" : "Collections Deck Placement:"}
                </span>
                <span className="text-[9px] text-zinc-500 block">
                  {language === "ka" ? "შეცვალეთ კატეგორიების პანელის მდებარეობა და დიზაინი" : "Dynamically switch the interface position & look"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap bg-black/40 border border-white/5 rounded-xl p-0.5 w-full md:w-auto">
              {[
                { type: "sidebar_left" as const, labelEn: "Left Sidebar", labelKa: "მარცხენა პანელი" },
                { type: "sidebar_right" as const, labelEn: "Right Sidebar", labelKa: "მარჯვენა პანელი" },
                { type: "top_carousel" as const, labelEn: "Horizon Dock", labelKa: "მცოცავი პანელი" },
                { type: "compact_grid" as const, labelEn: "Nebula Bento", labelKa: "კომპაქტური ბენტო" }
              ].map((deck) => (
                <button
                  type="button"
                  key={deck.type}
                  id={`btn-col-placement-${deck.type}`}
                  onClick={() => setCollectionsPlacement(deck.type)}
                  className={`flex-1 md:flex-initial py-1.5 px-3 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                    collectionsPlacement === deck.type
                      ? "bg-gradient-to-r from-teal-500 to-sky-500 text-zinc-950 font-black shadow-md scale-[1.02]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {language === "ka" ? deck.labelKa : deck.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* ADVANCED REFINEMENT FILTER PANEL */}
          {showFiltersDrawer && (
            <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/5 grid grid-cols-1 md:grid-cols-4 gap-6 text-left max-w-full text-xs">
              
              {/* Filter 1: Resolution select */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{t("filter_screen_format")}</label>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "4K", "8K", "AMOLED"].map((res) => (
                    <button
                      key={res}
                      id={`btn-filter-res-${res}`}
                      onClick={() => setSelectedResolution(res as any)}
                      className={`py-1.5 px-3 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                        selectedResolution === res
                          ? "bg-[#38bdf8]/15 border-[#38bdf8] text-white"
                          : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: Device select */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{t("filter_device_optimization")}</label>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "Phone", "Tablet", "Laptop", "Desktop"].map((d) => (
                    <button
                      key={d}
                      id={`btn-filter-dev-${d}`}
                      onClick={() => setSelectedDevice(d as any)}
                      className={`py-1.5 px-3 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                        selectedDevice === d
                          ? "bg-pink-500/10 border-pink-500/30 text-white"
                          : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Price sliders capping */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                  <span>{t("filter_price_limit")}</span>
                  <span className="text-[#38bdf8] font-mono">${maxPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  id="filter-price-slider"
                  min="0"
                  max="15"
                  step="0.5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 bg-white/5 h-1.5 rounded-lg cursor-pointer mt-1"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1">
                  <span>{t("filter_free")}</span>
                  <span>{t("filter_max")}</span>
                </div>
              </div>

              {/* Filter 4: Sorting tags */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider font-sans">{t("filter_sorting_priority")}</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full h-8.5 bg-black border border-white/10 rounded-xl text-xs px-2.5 focus:outline-none focus:border-[#38bdf8] text-white font-sans"
                >
                  <option value="popularity">{t("sort_most_downloaded")}</option>
                  <option value="latest">{t("sort_latest")}</option>
                  <option value="best_selling">{t("sort_best_selling")}</option>
                </select>
              </div>

            </div>
          )}

          {/* TOP DOCK SECTION: Renders if top_carousel or compact_grid mode is active */}
          {collectionsPlacement === "top_carousel" && (
            <div className="space-y-3 pb-2 select-none">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#38bdf8] block pl-2 font-sans text-left">
                🌌 {language === "ka" ? "კოსმოსური ჰორიზონტის კარუსელი" : "Cosmic Horizon Carousel"}
              </span>
              <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pr-2 max-w-full">
                {/* Option to show All */}
                <button
                  type="button"
                  id="btn-cat-carousel-all"
                  onClick={() => setSelectedCategory("All")}
                  className={`flex-shrink-0 flex items-center gap-2.5 py-2.5 px-4 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedCategory === "All"
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] scale-[1.01]"
                      : "bg-[#09090b]/80 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-sm">🌟</span>
                  <span>{t("show_all_categories")}</span>
                  <span className="text-[9px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    {wallpapers.length}
                  </span>
                </button>

                {collections.map((col) => {
                  const translatedColName = t(`col_name_${col.slug.replace(/-/g, "_")}` as any) || col.name;
                  const isSelected = selectedCategory === col.slug;
                  return (
                    <button
                      type="button"
                      key={col.slug}
                      id={`btn-cat-carousel-${col.slug}`}
                      onClick={() => setSelectedCategory(col.slug)}
                      className={`flex-shrink-0 flex items-center gap-2.5 py-2.5 px-4.5 rounded-2xl text-xs font-semibold border transition-all cursor-pointer hover:scale-[1.02] ${
                        isSelected
                          ? "bg-gradient-to-r from-teal-500 to-sky-500 text-zinc-950 font-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                          : "bg-[#09090b]/80 border-white/5 text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="text-sm">{getCategoryIcon(col.slug)}</span>
                      <span>{translatedColName}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                        isSelected
                          ? "bg-black/20 border-black/15 text-zinc-950 font-bold"
                          : "bg-white/5 border-white/5 text-white/30"
                      }`}>
                        {t("designs_count")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {collectionsPlacement === "compact_grid" && (
            <div className="space-y-3 pb-2 select-none">
              <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 block pl-2 font-sans text-left">
                🪐 {language === "ka" ? "ნებულას კომპაქტური ბენტო პანელი" : "Nebula Bento Grid Desk"}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-[#09090b]/40 border border-white/5 p-3 rounded-2xl">
                {/* Option to show All */}
                <button
                  type="button"
                  id="btn-cat-bento-all"
                  onClick={() => setSelectedCategory("All")}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-left h-12 ${
                    selectedCategory === "All"
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.35)]"
                      : "bg-[#09090b]/75 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">🌟</span>
                    <span className="truncate max-w-[120px]">{t("show_all_categories")}</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">
                    {wallpapers.length}
                  </span>
                </button>

                {collections.map((col) => {
                  const translatedColName = t(`col_name_${col.slug.replace(/-/g, "_")}` as any) || col.name;
                  const isSelected = selectedCategory === col.slug;
                  return (
                    <button
                      type="button"
                      key={col.slug}
                      id={`btn-cat-bento-${col.slug}`}
                      onClick={() => setSelectedCategory(col.slug)}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold border transition-all hover:scale-[1.01] cursor-pointer text-left h-12 truncate ${
                        isSelected
                          ? "bg-gradient-to-r from-[#06b6d4] to-[#0ea5e9] text-zinc-950 font-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                          : "bg-[#09090b]/75 border-white/5 text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs">{getCategoryIcon(col.slug)}</span>
                        <span className="truncate text-[11px] font-sans font-medium">{translatedColName}</span>
                      </div>
                      <span className={`text-[9.5px] font-mono shrink-0 pl-1 ${
                        isSelected ? "text-zinc-950/70 font-bold" : "text-white/20"
                      }`}>
                        {t("designs_count")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TWO COLUMN COMPONENT LAYOUT: Dynamic placement configurations */}
          <div className={`flex flex-col gap-8 ${
            collectionsPlacement === "sidebar_right"
              ? "lg:flex-row-reverse"
              : "lg:flex-row"
          }`}>
            
            {/* Sidebar containing the 30 deep-space categories list (only if sidebars are configured) */}
            {(collectionsPlacement === "sidebar_left" || collectionsPlacement === "sidebar_right") && (
              <aside className="w-full lg:w-1/4 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#38bdf8] block pl-2 font-sans text-left">
                  {t("categories_title")}
                </span>

                <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 p-2 glass rounded-2xl lg:h-[600px] lg:overflow-y-auto lg:pr-2 lg:scroll-smooth font-sans">
                  {/* Option to show All */}
                  <button
                    type="button"
                    id="btn-cat-sidebar-all"
                    onClick={() => setSelectedCategory("All")}
                    className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl text-left flex justify-between items-center whitespace-nowrap cursor-pointer transition-all ${
                      selectedCategory === "All"
                        ? "glass border-t-white/20 border-x-white/10 border-b-white/5 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">{t("show_all_categories")}</span>
                    <span className="text-[10px] font-mono text-white/30 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                      {wallpapers.length}
                    </span>
                  </button>

                  {collections.map((col) => {
                    const translatedColName = t(`col_name_${col.slug.replace(/-/g, "_")}` as any) || col.name;
                    return (
                      <button
                        type="button"
                        key={col.slug}
                        id={`btn-cat-sidebar-${col.slug}`}
                        onClick={() => setSelectedCategory(col.slug)}
                        className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl text-left flex justify-between items-center whitespace-nowrap cursor-pointer transition-all ${
                          selectedCategory === col.slug
                            ? "glass border-t-white/20 border-x-white/10 border-b-white/5 text-white shadow-[0_0_15px_rgba(34,211,238,0.15)] border-l-2 border-cyan-400"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{getCategoryIcon(col.slug)}</span>
                          <span>{translatedColName}</span>
                        </span>
                        <span className="text-[10px] font-mono text-white/30">
                          {t("designs_count")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>
            )}

            {/* Main grid area displaying catalog wallpaper cards */}
            <div className={`w-full ${
              collectionsPlacement === "sidebar_left" || collectionsPlacement === "sidebar_right"
                ? "lg:w-3/4"
                : "w-full"
            } space-y-6`}>
              
              {/* Active category details block */}
              <div className="bg-neutral-900/20 p-4.5 rounded-2xl border border-white/5 flex items-center justify-between text-left">
                <div>
                  <h4 className="text-sm font-bold text-white capitalize">
                    {selectedCategory === "All" 
                      ? t("category_galactic_archives") 
                      : `${t(`col_name_${selectedCategory.replace(/-/g, "_")}` as any)} ${language === "en" ? "Collection" : "კოლექცია"}`}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {selectedCategory === "All" 
                      ? t("category_archives_desc")
                      : t(`col_desc_${selectedCategory.replace(/-/g, "_")}` as any)}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#38bdf8] font-bold bg-[#38bdf8]/10 px-2.5 py-1 rounded border border-sky-400/20 whitespace-nowrap ml-4">
                  {filteredWallpapers.length} {t("wallpapers_found")}
                </span>
              </div>

              {/* Wallpaper cards grid */}
              {filteredWallpapers.length === 0 ? (
                <div className="py-24 text-center bg-neutral-900/10 border border-white/5 rounded-3xl space-y-2.5 italic text-zinc-500 text-xs">
                  <Filter className="w-8 h-8 text-zinc-600 mx-auto animate-bounce" />
                  <p>{t("no_wallpapers_found")}</p>
                  <button
                    id="btn-reset-filters"
                    onClick={() => {
                      setSelectedResolution("All");
                      setSelectedDevice("All");
                      setMaxPrice(15);
                      setSearchQuery("");
                      setSelectedCategory("earth");
                    }}
                    className="mt-2 text-[#38bdf8] hover:underline font-bold text-xs"
                  >
                    {t("btn_reset_grid")}
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  catalogLayout === "dense"
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                    : catalogLayout === "asymmetric"
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-y-16"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }`}>
                  {filteredWallpapers.map((wal, index) => (
                    <WallpaperCard
                      key={wal.id}
                      id={`wallpaper-card-item-${wal.id}`}
                      wallpaper={wal}
                      isFavorited={currentUser ? currentUser.favorites.includes(wal.id) : false}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={handleAddToCart}
                      onQuickPreview={(w) => { setActivePreviewWallpaper(w); }}
                      onBuyNow={handleBuyNow}
                      layoutMode={catalogLayout}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* PROMOTIONAL MARKETING BANNER & NEWSLETTER */}
        <section className="bg-gradient-to-tr from-cyan-950/20 to-neutral-900/30 p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl text-left">
            <span className="text-[9px] font-bold text-[#38bdf8] bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20 uppercase tracking-widest">
              {t("newsletter_badge")}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {t("newsletter_title")}
            </h3>
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              {t("newsletter_desc")}
            </p>
          </div>

          <div className="w-full md:w-auto max-w-sm">
            {newsletterSubscribed ? (
              <div className="bg-emerald-500/15 border border-emerald-500/30 px-6 py-4 rounded-xl text-center text-xs text-emerald-300 font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> {t("newsletter_success")}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex p-1 bg-black/60 rounded-xl border border-white/10 w-full min-w-[280px]">
                <input
                  type="email"
                  id="newsletter-email-input"
                  required
                  placeholder={t("newsletter_placeholder")}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none text-xs text-white px-3 focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  id="newsletter-submit-action"
                  className="h-9 px-4 text-xs font-bold text-zinc-950 bg-gradient-to-r from-teal-400 to-[#38bdf8] rounded-lg hover:brightness-105 cursor-pointer flex items-center gap-1.5"
                >
                  {t("btn_subscribe")}
                  <Mail className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* FIXED FOOTER TELEMETRY */}
      <footer className="mt-16 border-t border-white/5 pt-8 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-4 font-mono text-[10px] text-zinc-500">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>{t("footer_corp")}</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-help">{t("footer_ssl")}</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-help">{t("footer_refund")}</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-help">{t("footer_usage")}</span>
          </div>
        </div>
      </footer>

      {/* --- FLOATING LIGHTBOX AND DRAWER OVERLAYS --- */}

      {/* 1. Preview Lightbox Modal */}
      {activePreviewWallpaper && (
        <PreviewModal
          wallpaper={activePreviewWallpaper}
          onClose={() => setActivePreviewWallpaper(null)}
          onAddToCart={(w) => {
            handleAddToCart(w);
            setActivePreviewWallpaper(null);
          }}
          onBuyNow={(w) => {
            handleBuyNow(w);
            setActivePreviewWallpaper(null);
          }}
          isFavorited={currentUser ? currentUser.favorites.includes(activePreviewWallpaper.id) : false}
          onToggleFavorite={handleToggleFavorite}
          reviews={reviews}
          onAddReview={handleAddReview}
          hasPurchased={currentUser ? currentUser.downloads.includes(activePreviewWallpaper.id) : false}
        />
      )}

      {/* 2. Basket Cargo & Checkout Modal */}
      {showCartModal && (
        <CartAndCheckout
          cartItems={cart}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onCheckoutSuccess={handleCheckoutSuccess}
          onClose={() => setShowCartModal(false)}
          userEmail={currentUser?.email || ""}
        />
      )}

      {/* 3. Cadets Registration / Profiles Modal */}
      {showAuthModal && (
        <UserAuthModal
          currentUser={currentUser}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* 4. Planetary Administrative Dashboard */}
      {showAdminDashboard && currentUser?.role === "admin" && (
        <AdminDashboard
          wallpapers={wallpapers}
          collections={collections}
          users={currentUser ? [currentUser] : []}
          orders={orders}
          onAddWallpaper={handleAddWallpaper}
          onEditWallpaper={handleEditWallpaper}
          onDeleteWallpaper={handleDeleteWallpaper}
          onGrantVIP={handleGrantVIP}
          onClose={() => setShowAdminDashboard(false)}
        />
      )}

    </div>
  );
}
