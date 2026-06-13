/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Wallpaper } from "../types";
import { Heart, ZoomIn, ShoppingCart, ArrowUpRight, ShieldCheck, Eye } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface WallpaperCardProps {
  key?: any;
  id: string;
  wallpaper: Wallpaper;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (wal: Wallpaper) => void;
  onQuickPreview: (wal: Wallpaper) => void;
  onBuyNow: (wal: Wallpaper) => void;
  layoutMode?: "standard" | "asymmetric" | "dense";
  index?: number;
}

export default function WallpaperCard({
  id,
  wallpaper,
  isFavorited,
  onToggleFavorite,
  onAddToCart,
  onQuickPreview,
  onBuyNow,
  layoutMode = "standard",
  index = 0,
}: WallpaperCardProps) {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax 3D mouse rotation calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates around centerpiece
    const x = (e.clientX - rect.left - width / 2) / (width / 2); // Ranges -1 to 1
    const y = (e.clientY - rect.top - height / 2) / (height / 2); // Ranges -1 to 1

    // Scale down depth output to keep tilt subtle and elegant
    setCoords({ x: x * 12, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 }); // Snap back smoothly via transition
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group w-full glass card-shadow rounded-2xl p-3 transition-all duration-300 transform font-sans ${
        layoutMode === "asymmetric" && index % 2 === 1 ? "md:translate-y-10" : ""
      }`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${coords.x}deg) rotateX(${coords.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)",
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 2px rgba(${wallpaper.categorySlug === "sun" ? "245, 158, 11" : wallpaper.categorySlug === "earth" ? "59, 130, 246" : "219, 39, 119"}, 0.12)`
          : "none",
      }}
    >
      {/* Dynamic Halo glow borders depending on product status */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr -z-10 ${wallpaper.vibeGradient} blur-[1px]`}
      />

      {/* Media Image container */}
      <div className={`relative w-full rounded-xl overflow-hidden bg-black/60 shadow-inner group transition-all duration-300 ${
        layoutMode === "asymmetric"
          ? index % 3 === 0
            ? "aspect-[9/16]"
            : index % 3 === 1
            ? "aspect-[10/14]"
            : "aspect-[9/13]"
          : "aspect-[9/16]"
      }`}>
        <img
          src={wallpaper.imageUrl}
          alt={wallpaper.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.07] transition-transform duration-700 ease-out"
        />

        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex justify-between items-center z-10">
          <div className="flex gap-1">
            {wallpaper.isLimited ? (
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-500/20 animate-pulse">
                {language === "ka" ? "ლიმიტირებული" : "Limited"}
              </span>
            ) : wallpaper.isBestSeller ? (
              <span className="text-[9px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/20 backdrop-blur-md px-2 py-0.5 rounded-md border border-rose-500/20">
                {language === "ka" ? "ბესტსელერი" : "Bestseller"}
              </span>
            ) : wallpaper.isTrending ? (
              <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300 bg-sky-500/20 backdrop-blur-md px-2 py-0.5 rounded-md border border-sky-500/20">
                {language === "ka" ? "პოპულარული" : "Trending"}
              </span>
            ) : wallpaper.isNewArrival ? (
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-500/20">
                {language === "ka" ? "ახალი" : "New"}
              </span>
            ) : null}
          </div>

          {"/* Favoriting action */"}
          <button
            id={`btn-favorite-${wallpaper.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(wallpaper.id);
            }}
            className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-rose-500 hover:bg-black/60 transition-colors cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFavorited ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>
        </div>

        {"/* Interactive hover utilities */"}
        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            id={`btn-quick-view-card-${wallpaper.id}`}
            onClick={() => onQuickPreview(wallpaper)}
            className="w-full h-8 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg bg-white text-zinc-950 hover:bg-[#38bdf8] hover:text-zinc-950 transition-colors shadow-lg cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            {language === "ka" ? "დეტალები" : "Details"}
          </button>
          
          <button
            id={`btn-add-cart-card-${wallpaper.id}`}
            onClick={() => onAddToCart(wallpaper)}
            className="w-full h-8 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg bg-[#38bdf8]/15 backdrop-blur-md text-[#38bdf8] border border-[#38bdf8]/40 hover:bg-[#38bdf8] hover:text-zinc-950 hover:border-[#38bdf8] transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {language === "ka" ? "კალათაში დამატება" : "Add to Cart"}
          </button>
        </div>

        {"/* AMOLED & Technical Info Tags positioned above title */"}
        <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between text-[10px] font-mono font-semibold text-zinc-300 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
          <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/5 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {wallpaper.resolution}
          </span>
          <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/5">
            {wallpaper.deviceTypes.join(", ")}
          </span>
        </div>
      </div>

      {"/* Card Details Panel */"}
      <div className="mt-3.5 px-1.5 pb-1">
        <div className="flex justify-between items-start gap-2 text-left">
          <div>
            <h5 className="text-sm font-semibold tracking-tight text-white group-hover:text-[#38bdf8] transition-colors line-clamp-1">
              {wallpaper.title}
            </h5>
            <p className="text-[10px] text-white/50 capitalize mt-0.5">
              🌌 {language === "ka" ? "კოლექცია" : "Collection"}: {wallpaper.categorySlug}
            </p>
          </div>
          <div className="text-right">
            {wallpaper.price === 0 ? (
              <span className="text-xs font-bold text-cyan-300 tracking-wider">
                {language === "ka" ? "უფასო" : "Free"}
              </span>
            ) : (
              <div>
                <span className="text-base text-cyan-400 price-tag block tracking-wider">${wallpaper.price.toFixed(2)}</span>
                {wallpaper.originalPrice && (
                  <span className="block text-[10px] text-white/30 line-through">
                    ${wallpaper.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {"/* Bottom actions panel */"}
        <div className="mt-3.5 pt-3.5 border-t border-white/5 flex gap-2">
          <button
            id={`btn-view-${wallpaper.id}`}
            onClick={() => onQuickPreview(wallpaper)}
            className="flex-1 h-8 flex items-center justify-center gap-1 text-[10px] font-bold text-white/80 hover:text-white uppercase tracking-wider rounded-lg neo-button transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            {language === "ka" ? "ხედვა" : "View"}
          </button>
          
          <button
            id={`btn-buy-now-${wallpaper.id}`}
            onClick={() => onBuyNow(wallpaper)}
            className="flex-1 h-8 flex items-center justify-center gap-1 text-[10px] font-extrabold text-black bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:brightness-105 active:scale-95 rounded-lg transition-all cursor-pointer uppercase tracking-wider"
          >
            {language === "ka" ? "ყიდვა" : "Buy"}
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
