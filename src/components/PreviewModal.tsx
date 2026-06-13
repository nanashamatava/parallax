/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Wallpaper, Review } from "../types";
import { useLanguage } from "../context/LanguageContext";
import {
  X,
  Smartphone,
  SmartphoneIcon,
  Laptop,
  Monitor,
  Volume2,
  VolumeX,
  Star,
  Share2,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  Download,
  Send,
  MessageSquare
} from "lucide-react";

interface PreviewModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
  onAddToCart: (wal: Wallpaper) => void;
  onBuyNow: (wal: Wallpaper) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
  hasPurchased: boolean;
}

export default function PreviewModal({
  wallpaper,
  onClose,
  onAddToCart,
  onBuyNow,
  isFavorited,
  onToggleFavorite,
  reviews,
  onAddReview,
  hasPurchased,
}: PreviewModalProps) {
  const { language } = useLanguage();
  const [activeDeviceFrame, setActiveDeviceFrame] = useState<"Phone" | "Tablet" | "Laptop" | "Desktop">("Phone");
  const [previewLayoutMode, setPreviewLayoutMode] = useState<"single" | "cascading">("single");
  const [cascadeStyle, setCascadeStyle] = useState<"staggered" | "panoramic" | "perspective">("panoramic");
  const [stageBackground, setStageBackground] = useState<"aurora" | "cyber" | "gallery" | "nebula">("aurora");
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscNode, setOscNode] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  
  // Download Simulation State
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  // Sharing states
  const [copiedLink, setCopiedLink] = useState(false);

  // Review states
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState("");

  const filteredReviews = reviews.filter((r) => r.wallpaperId === wallpaper.id);

  // Audio Synth logic for realistic ambient Space effects
  const toggleSpaceSoundEffects = () => {
    if (isPlayingSynth) {
      if (oscNode) {
        oscNode.stop();
        oscNode.disconnect();
      }
      setIsPlayingSynth(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        
        // Low frequency hum/drone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Synth frequencies
        osc.type = "sine";
        osc.frequency.setValueAtTime(80, ctx.currentTime); // 80Hz cosmic hum
        
        // Add frequency modulation sweep
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 3);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 6);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime); // very low, safe ambient drone

        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();

        setAudioCtx(ctx);
        setOscNode(osc);
        setGainNode(gain);
        setIsPlayingSynth(true);
      } catch (err) {
        console.warn("Web Audio is restricted on this browser tab environment.", err);
      }
    }
  };

  // Close audio on unmount
  useEffect(() => {
    return () => {
      if (oscNode) {
        oscNode.stop();
        oscNode.disconnect();
      }
    };
  }, [oscNode]);

  const handleShareLink = () => {
    const link = `${window.location.origin}/#wallpaper-${wallpaper.id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleStartDownload = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(0);
    setDownloadCompleted(false);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setDownloadProgress(100);
        setDownloadCompleted(true);
        clearInterval(interval);
        setTimeout(() => setDownloadProgress(null), 3000);
      } else {
        setDownloadProgress(current);
      }
    }, 150);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    onAddReview({
      wallpaperId: wallpaper.id,
      userName: userName,
      rating: newRating,
      comment: newComment,
    });

    setNewComment("");
    setUserName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md select-none font-sans">
      <div className="relative w-full max-w-6xl glass card-shadow rounded-3xl overflow-hidden flex flex-col md:flex-row my-auto max-h-[90vh]">
        
        {/* Background glow node matching card category */}
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr ${wallpaper.vibeGradient} blur-[120px] -z-10`} />

        {/* Media Frame display column (Left) */}
        <div className="w-full md:w-3/5 p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col items-center justify-between bg-black/40 relative">
          
          {/* Close trigger for smaller screens */}
          <button
            id="btn-preview-close-main"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-rose-500 hover:text-white transition-all cursor-pointer z-30"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Layout Mode Control System (Single View vs Cascading Screens Layout) */}
          <div className="w-full flex flex-col gap-3.5 mb-5 z-20 border-b border-white/5 pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
              {/* View Mode Switching Tabs */}
              <div className="flex bg-zinc-900/95 border border-white/5 rounded-xl p-0.5 shadow-lg">
                <button
                  type="button"
                  id="btn-preview-layout-single"
                  onClick={() => setPreviewLayoutMode("single")}
                  className={`py-1.5 px-3.5 rounded-lg text-[10px] md:text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                    previewLayoutMode === "single"
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {language === "ka" ? "ცალკეული ჩარჩო" : "Isolated Focus"}
                </button>
                <button
                  type="button"
                  id="btn-preview-layout-cascading"
                  onClick={() => setPreviewLayoutMode("cascading")}
                  className={`py-1.5 px-3.5 rounded-lg text-[10px] md:text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                    previewLayoutMode === "cascading"
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  🌟 {language === "ka" ? "ეკოსისტემის კასკადი" : "Ecosystem Cascade"}
                </button>
              </div>

              {/* If Single mode, let them select which device */}
              {previewLayoutMode === "single" && (
                <div className="flex gap-1 p-0.5 bg-black/40 rounded-xl border border-white/5">
                  {[
                    { type: "Phone" as const, icon: Smartphone, label: language === "ka" ? "ტელ." : "Phone" },
                    { type: "Tablet" as const, icon: SmartphoneIcon, label: language === "ka" ? "პლანშ." : "Tablet" },
                    { type: "Laptop" as const, icon: Laptop, label: language === "ka" ? "ლეპტ." : "Laptop" },
                    { type: "Desktop" as const, icon: Monitor, label: language === "ka" ? "მონიტ." : "Desktop" }
                  ].map((d) => (
                    <button
                      type="button"
                      key={d.type}
                      id={`btn-device-tab-${d.type}`}
                      onClick={() => setActiveDeviceFrame(d.type)}
                      className={`py-1 px-2.5 rounded-lg flex items-center gap-1.5 text-[9px] md:text-[11px] font-semibold uppercase transition-all ${
                        activeDeviceFrame === d.type
                          ? "bg-white/10 text-cyan-400 border border-[#38bdf8]/30"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <d.icon className="w-3 h-3" />
                      <span>{d.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* If Cascading mode is selected, show customized alignment & background controls */}
            {previewLayoutMode === "cascading" && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-neutral-900/60 rounded-2xl border border-white/5 transition-all">
                {/* 1. Placement selection */}
                <div className="space-y-1.5 text-left">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#38bdf8] block font-sans">
                    📐 {language === "ka" ? "ჩარჩოების განლაგება" : "Mockup Arrangement"}
                  </span>
                  <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/5">
                    {[
                      { mode: "panoramic" as const, labelEn: "Panoramic Side-by-Side", labelKa: "ჰორიზონტალური" },
                      { mode: "staggered" as const, labelEn: "Dynamic Cascade", labelKa: "ქაოტური" },
                      { mode: "perspective" as const, labelEn: "3D Perspective", labelKa: "3D სივრცე" }
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.mode}
                        id={`btn-cascade-style-${item.mode}`}
                        onClick={() => setCascadeStyle(item.mode)}
                        className={`flex-1 py-1 px-1.5 rounded text-[9px] font-semibold uppercase transition-all truncate cursor-pointer ${
                          cascadeStyle === item.mode
                            ? "bg-gradient-to-r from-teal-500 to-sky-500 text-zinc-950 font-bold shadow-md"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {language === "ka" ? item.labelKa : item.labelEn.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Stage backdrop selection */}
                <div className="space-y-1.5 text-left font-sans">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-pink-400 block font-sans">
                    🎨 {language === "ka" ? "სცენის დეკორი" : "Mockup Stage Backdrop"}
                  </span>
                  <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/5 font-sans">
                    {[
                      { bg: "aurora" as const, labelEn: "Aurora", labelKa: "ავრორა" },
                      { bg: "cyber" as const, labelEn: "Cyber", labelKa: "კიბერი" },
                      { bg: "gallery" as const, labelEn: "Gallery", labelKa: "დარბაზი" },
                      { bg: "nebula" as const, labelEn: "Nebula", labelKa: "ნისლეული" }
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.bg}
                        id={`btn-stage-bg-${item.bg}`}
                        onClick={() => setStageBackground(item.bg)}
                        className={`flex-1 py-1 px-1.5 rounded text-[9px] font-semibold uppercase transition-all truncate font-sans cursor-pointer ${
                          stageBackground === item.bg
                            ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30 font-bold"
                            : "text-zinc-500 hover:text-white hover:bg-white/5 font-sans"
                        }`}
                      >
                        {language === "ka" ? item.labelKa : item.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AR Screen Simulator stage */}
          <div className="flex-1 w-full flex items-center justify-center min-h-[280px] md:min-h-[400px] py-4 relative">
            
            {previewLayoutMode === "cascading" ? (
              <div className={`relative w-full h-[55vw] max-h-[360px] flex items-center justify-center scale-95 md:scale-100 transition-all duration-500 overflow-hidden ${
                stageBackground === "cyber"
                  ? "bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:16px_16px] border border-[#38bdf8]/15 bg-[#030712]/80 shadow-[inset_0_0_50px_rgba(6,182,212,0.15)] rounded-2xl"
                  : stageBackground === "gallery"
                  ? "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_75%)] bg-[#171717] border border-amber-900/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.85)] rounded-2xl"
                  : stageBackground === "nebula"
                  ? "bg-[radial-gradient(circle_at_60%_20%,rgba(147,51,234,0.14)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(219,39,119,0.08)_0%,transparent_50%)] bg-[#09090b] border border-purple-500/10 shadow-2xl rounded-2xl"
                  : "bg-black/40 border border-white/5 rounded-2xl shadow-inner"
              }`}>
                {/* 1. Laptop Device Frame */}
                <div className={`transition-all duration-500 select-none hover:scale-[1.03] ${
                  cascadeStyle === "staggered"
                    ? "absolute top-[14%] left-[26%] w-[210px] sm:w-[260px] -translate-x-1/2 z-10 rotate-1 opacity-90 hover:opacity-100 hover:rotate-0 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                    : cascadeStyle === "perspective"
                    ? "absolute top-[10%] left-[18%] w-[220px] sm:w-[270px] z-10 [transform:rotateY(12deg)_rotateX(6deg)] opacity-85 hover:opacity-100 hover:[transform:none] drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
                    : "absolute top-[10%] left-[50%] -translate-x-1/2 w-[240px] sm:w-[300px] z-10 drop-shadow-[0_12px_22px_rgba(0,0,0,0.7)]"
                }`}>
                  <div className="relative w-full aspect-[16/10] border-t-[5px] border-x-[5px] border-neutral-700 rounded-t-lg bg-zinc-900 overflow-hidden">
                    <img
                      src={wallpaper.imageUrl}
                      alt="Laptop render look"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {/* Mock folder files */}
                    <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 text-white/90 text-[5px] font-medium">
                      <div className="w-2.5 h-2.5 rounded bg-[#38bdf8]/40 border border-[#38bdf8]/40" />
                      <div className="w-2.5 h-2.5 rounded bg-purple-500/40 border border-purple-400/40" />
                    </div>
                  </div>
                  <div className="w-[108%] h-2 bg-neutral-700 border-b-2 border-neutral-800 rounded-b-lg relative -left-[4%]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-black/60 rounded-b-md" />
                  </div>
                </div>

                {/* 2. Tablet Device Frame */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  cascadeStyle === "staggered"
                    ? "absolute top-[38%] left-[7%] w-[130px] sm:w-[160px] aspect-[4/3] border-[4px] border-neutral-800 rounded-xl bg-zinc-900 shadow-[0_15px_30px_rgba(0,0,0,0.8)] z-20 -rotate-3 hover:rotate-0 scale-95 hover:scale-102"
                    : cascadeStyle === "perspective"
                    ? "absolute top-[32%] left-[45%] w-[130px] sm:w-[165px] aspect-[4/3] border-[4px] border-neutral-800 rounded-xl bg-zinc-900 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-20 [transform:rotateY(-12deg)_rotateX(4deg)] hover:[transform:none]"
                    : "absolute top-[22%] left-[10%] w-[120px] sm:w-[150px] aspect-[4/3] border-[4px] border-neutral-800 rounded-xl bg-zinc-900 shadow-[2px_10px_20px_rgba(0,0,0,0.5)] z-20 hover:scale-[1.05]"
                }`}>
                  <img
                    src={wallpaper.imageUrl}
                    alt="Mock tablet screen look"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-2.5 top-2.5 text-white drop-shadow-md flex flex-col">
                    <span className="text-[10px] font-light tracking-tight">22:42</span>
                    <span className="text-[4px] uppercase tracking-widest text-[#38bdf8] mt-0.5 font-sans">Fri, Jun 12</span>
                  </div>
                </div>

                {/* 3. Phone Device Frame */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  cascadeStyle === "staggered"
                    ? "absolute top-[20%] right-[6%] w-[85px] sm:w-[105px] aspect-[9/19.5] border-[3px] border-neutral-800 rounded-[18px] bg-zinc-900 shadow-[0_20px_45px_rgba(0,0,0,0.9)] z-30 rotate-4 hover:rotate-0 scale-100 hover:scale-105"
                    : cascadeStyle === "perspective"
                    ? "absolute top-[12%] right-[12%] w-[85px] sm:w-[105px] aspect-[9/19.5] border-[3px] border-neutral-800 rounded-[18px] bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.9)] z-30 [transform:translateY(-6px)_rotate(-4deg)] hover:[transform:none]"
                    : "absolute top-[15%] right-[10%] w-[75px] sm:w-[95px] aspect-[9/19.5] border-[3px] border-neutral-800 rounded-[18px] bg-zinc-900 shadow-[-2px_10px_20px_rgba(0,0,0,0.5)] z-30 hover:scale-[1.05]"
                }`}>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full z-40 flex items-center justify-around px-1 scale-90">
                    <div className="w-0.5 h-0.5 bg-zinc-900 rounded-full" />
                    <div className="w-1 h-0.5 bg-[#38bdf8]/30 rounded-full" />
                  </div>

                  <div className="absolute inset-0 font-sans">
                    <img
                      src={wallpaper.imageUrl}
                      alt="Mock Phone lockscreen background"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 top-5 flex flex-col items-center justify-center text-white font-sans drop-shadow-md">
                      <span className="text-[11px] font-extralight tracking-tight">22:42</span>
                      <span className="text-[4px] uppercase tracking-widest mt-0.5 text-zinc-300">Fri, Jun 12</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* 1. Phone Frame rendering */}
                {activeDeviceFrame === "Phone" && (
              <div className="relative w-[210px] aspect-[9/19.5] border-[6px] border-neutral-800 rounded-[36px] overflow-hidden bg-zinc-900 shadow-2xl">
                {/* Dynamic Camera Notch cutout */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-around px-2">
                  <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                  <div className="w-2.5 h-1 bg-[#38bdf8]/30 rounded-full" />
                </div>

                <div className="absolute inset-0">
                  <img
                    src={wallpaper.imageUrl}
                    alt="Mock Phone lockscreen background"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Lockscreen clock HUD */}
                  <div className="absolute inset-x-0 top-11 flex flex-col items-center justify-center text-white font-sans drop-shadow-md z-20">
                    <span className="text-3xl font-extralight tracking-tight">22:42</span>
                    <span className="text-[9px] uppercase tracking-widest mt-1 text-zinc-300">{language === "ka" ? "პარასკევი, 12 ივნისი" : "Friday, June 12"}</span>
                    {wallpaper.resolution === "AMOLED" && (
                      <span className="text-[8px] font-mono mt-1 font-semibold text-emerald-400 bg-black/60 px-1 border border-emerald-500/20 rounded">
                        {language === "ka" ? "აქტიური შავი (AMOLED)" : "Active Black (AMOLED)"}
                      </span>
                    )}
                  </div>

                  {/* Lock Screen bottom action items */}
                  <div className="absolute bottom-5 inset-x-4 flex justify-between items-center text-white/80 z-20 text-[10px]">
                    <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">📞</div>
                    <span className="text-[8px] tracking-widest uppercase">{language === "ka" ? "ასრიალეთ განსაბლოკად" : "Swipe to Unlock"}</span>
                    <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">📷</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Tablet Frame */}
            {activeDeviceFrame === "Tablet" && (
              <div className="relative w-[310px] aspect-[4/3] border-[8px] border-neutral-800 rounded-2xl bg-zinc-900 shadow-2xl overflow-hidden">
                <img
                  src={wallpaper.imageUrl}
                  alt="Mock tablet screen look"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Simulated lockscreen panel left-aligned */}
                <div className="absolute left-6 top-6 text-white drop-shadow-md z-20 flex flex-col">
                  <span className="text-4xl font-light tracking-tight">22:42</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#38bdf8] mt-1">{language === "ka" ? "პარასკევი, 12 ივნისი" : "Friday, June 12"}</span>
                </div>
              </div>
            )}

            {/* 3. Widescreen Laptop Frame */}
            {activeDeviceFrame === "Laptop" && (
              <div className="w-[420px] flex flex-col items-center">
                <div className="relative w-full aspect-[16/10] border-t-8 border-x-8 border-neutral-800 rounded-t-xl bg-zinc-900 shadow-xl overflow-hidden">
                  <img
                    src={wallpaper.imageUrl}
                    alt="Laptop render look"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Mock app folders stacked left */}
                  <div className="absolute left-4 top-4 flex flex-col gap-3.5 text-white/90 text-[8px] font-medium z-10-aligned">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded bg-[#38bdf8]/40 border border-[#38bdf8]/40 shadow-inner" />
                      <span>Cosmic.psd</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded bg-purple-500/40 border border-purple-400/40" />
                      <span>Downloads</span>
                    </div>
                  </div>
                </div>
                {/* Metallic Laptop Bottom Chassis */}
                <div className="w-[108%] h-3 bg-neutral-700 border-b-2 border-neutral-800 rounded-b-xl relative shadow-md">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-black/60 rounded-b-md" />
                </div>
              </div>
            )}

            {/* 4. Desktop frame */}
            {activeDeviceFrame === "Desktop" && (
              <div className="w-[400px] flex flex-col items-center">
                <div className="relative w-full aspect-[16/9] border-4 border-zinc-800 bg-neutral-900 rounded-md shadow-2xl overflow-hidden">
                  <img
                    src={wallpaper.imageUrl}
                    alt="Desktop display preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-1 bg-zinc-900/30 backdrop-blur-lg border-t border-white/5 h-6 mx-auto w-[65%] rounded-full flex items-center justify-around px-4">
                    <div className="w-3.5 h-3.5 bg-neutral-700 rounded-full" />
                    <div className="w-3.5 h-3.5 bg-neutral-700 rounded-full" />
                    <div className="w-3.5 h-3.5 bg-[#38bdf8]/60 border border-[#38bdf8] rounded-full" />
                    <div className="w-3.5 h-3.5 bg-neutral-700 rounded-full" />
                  </div>
                </div>
                {/* iMac visual metal plate/stand bottom */}
                <div className="w-16 h-8 bg-zinc-700 border-x border-neutral-600 rounded-b" />
                <div className="w-24 h-1.5 bg-zinc-800 rounded-full" />
              </div>
            )}

          </>
        )}

          </div>

          {/* Sound, calibration and visual controls toolbar (Bottom) */}
          <div className="w-full flex items-center justify-between gap-4 mt-4 bg-black/60 p-3 rounded-2xl border border-white/5 z-10 font-sans">
            <button
              id="btn-toggle-synth"
              onClick={toggleSpaceSoundEffects}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] md:text-xs font-semibold cursor-pointer transition-all ${
                isPlayingSynth
                  ? "bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/15"
                  : "bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10"
              }`}
            >
              {isPlayingSynth ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white animate-bounce" /> {language === "ka" ? "ხმის სინთეზი აქტიურია" : "Sound Synthesis Active"}
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> {language === "ka" ? "ჩართეთ ხმის სინთეზი" : "Activate Ambient Synth"}
                </>
              )}
            </button>

            {/* Check Specs label */}
            <p className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 select-none uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> {language === "ka" ? "ადაპტირებული ეკრანები" : "Adaptive Display Optimization"}
            </p>
          </div>
        </div>

        {/* Detailed specs, reviews, download loop, and purchase panel (Right) */}
        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[90vh] text-left">
          
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                  {wallpaper.resolution} Ultra-HD
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-3 leading-tight">{wallpaper.title}</h3>
                <p className="text-xs text-zinc-400 capitalize mt-1.5 flex items-center gap-1.5">
                  {language === "ka" ? "კოლექცია" : "Collection"}: <span className="text-pink-500 font-bold font-mono uppercase">{wallpaper.categorySlug}</span>
                </p>
              </div>

              {/* Close top for large screens */}
              <button
                id="btn-preview-close-right"
                onClick={onClose}
                className="hidden md:block p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description block */}
            <p className="text-zinc-300 text-xs leading-relaxed">{wallpaper.description}</p>

            {/* Technical grid specs */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-900/50 p-3.5 rounded-2xl border border-white/5 text-[10px] md:text-xs">
              <div className="text-zinc-400 font-sans">
                {language === "ka" ? "გარჩევადობა" : "Resolution"}: <span className="text-white font-mono font-medium block mt-0.5">{wallpaper.resolution === "AMOLED" ? "AMOLED 560+ PPI" : wallpaper.resolution === "8K" ? "7680 × 4320 (8K)" : "3840 × 2160 (4K)"}</span>
              </div>
              <div className="text-zinc-400 font-sans">
                {language === "ka" ? "ეკრანის პროპორციები" : "Aspect Ratio"}: <span className="text-white block mt-0.5 font-medium">9:16, 16:10, 4:3, 16:9</span>
              </div>
              <div className="text-zinc-400 font-sans mt-2">
                {language === "ka" ? "ფორმატი" : "Lossless Format"}: <span className="text-white block mt-0.5 font-mono font-medium">Lossless .PNG (HDR-ready)</span>
              </div>
              <div className="text-zinc-400 font-sans mt-2">
                {language === "ka" ? "პლატფორმები" : "Platforms"}: <span className="text-white block mt-0.5 font-medium">iOS, Android, macOS, Windows</span>
              </div>
            </div>

            {/* Download section triggers & progress bar representation */}
            <div className="space-y-3 font-sans">
              {hasPurchased || wallpaper.price === 0 ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> {language === "ka" ? "ჩამოტვირთვის ლიცენზია აქტიურია" : "Download License Authorized"}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{language === "ka" ? "სტატუსი: შეძენილია" : "Status: Owned"}</span>
                  </div>

                  {downloadProgress !== null ? (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#38bdf8]">
                        <span>{language === "ka" ? "მიმდინარეობს ფაილის უსაფრთხოდ გაშიფვრა..." : "Decrypting spatial transmission data..."}</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-[#38bdf8] h-full rounded-full transition-all duration-150"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : downloadCompleted ? (
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-emerald-300">
                      <Check className="w-4 h-4 text-emerald-400" /> {language === "ka" ? "ფაილები შენახულია. შეამოწმეთ ჩამოტვირთვების საქაღალდე." : "Download completed successfully. Payload saved to local disk."}
                    </div>
                  ) : (
                    <button
                      id="btn-trigger-secure-download"
                      onClick={handleStartDownload}
                      className="w-full h-10 mt-3.5 flex items-center justify-center gap-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95 transition-all cursor-pointer font-sans"
                    >
                      <Download className="w-4 h-4" />
                      {language === "ka" ? "ულტრა 3D პაკეტის ჩამოტვირთვა" : "Download Ultra Space Package"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-between">
                  <div className="text-xs">
                    <p className="text-red-400 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4" /> {language === "ka" ? "ჩამოტვირთვა დაბლოკილია" : "Download Restricted"}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-1">{language === "ka" ? "შეიძინეთ ლიცენზია ფაილის გასახსნელად." : "Acquire a static license code to unlock download streams."}</p>
                  </div>
                  <button
                    id="btn-light-buy-modal"
                    onClick={() => onBuyNow(wallpaper)}
                    className="h-9 px-4 text-xs font-semibold text-zinc-950 bg-white rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    {language === "ka" ? "განბლოკვა" : "Unlock"}
                  </button>
                </div>
              )}
            </div>

            {/* Social Share & wishlist bookmark */}
            <div className="flex items-center gap-2.5 font-sans">
              <button
                id="btn-wishlist-modal-toggle"
                onClick={() => onToggleFavorite(wallpaper.id)}
                className={`flex-1 h-10 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  isFavorited
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-500 hover:bg-rose-500/20"
                    : "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                <div className={`w-3.5 h-3.5 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`}>❤️</div>
                {isFavorited 
                  ? (language === "ka" ? "ფავორიტებშია" : "In Wishlist") 
                  : (language === "ka" ? "ფავორიტებში დამატება" : "Add to Wishlist")}
              </button>

              <button
                id="btn-share-modal-trigger"
                onClick={handleShareLink}
                className="h-10 px-4.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/5 hover:bg-white/10 text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> {language === "ka" ? "ბმული კოპირებულია" : "Link Copied"}
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-zinc-400" /> {language === "ka" ? "გაზიარება" : "Share"}
                  </>
                )}
              </button>
            </div>

            {/* Reviews list / customer comments section */}
            <div className="space-y-4 pt-4 border-t border-white/5 font-sans">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#38bdf8]" /> {language === "ka" ? "შეფასებები და რეიტინგები" : "Mission Reviews & Logs"} ({filteredReviews.length})
              </h4>

              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                {filteredReviews.length === 0 ? (
                  <p className="text-[10px] text-zinc-500 italic">{language === "ka" ? "ამ ფონზე შეფასებები ჯერ არ არის. იყავით პირველი კოსმონავტი, ვინც კომენტარს დატოვებს!" : "No logs recorded for this coordinate. Be the first astronaut to leave feedback!"}</p>
                ) : (
                  filteredReviews.map((rev) => (
                    <div key={rev.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-white flex items-center gap-1">
                          {rev.userName} {rev.isVIP && <span className="text-[7px] bg-sky-500/20 text-sky-400 px-1 border border-sky-400/20 rounded font-semibold">VIP</span>}
                        </span>
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${i < rev.rating ? "fill-amber-500" : "text-zinc-600"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-300 leading-normal">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Form to submit review */}
              <form onSubmit={submitReview} className="space-y-2 bg-neutral-900/60 p-3 rounded-2xl border border-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="input-review-user-name"
                    required
                    placeholder={language === "ka" ? "მეტსახელი..." : "Username..."}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="flex-1 min-w-[100px] h-8 bg-neutral-950/80 rounded-lg text-[10px] px-2.5 text-white border border-white/10 focus:outline-none focus:border-sky-500"
                  />
                  
                  {/* Select Rating */}
                  <select
                    id="select-review-rating-option"
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value))}
                    className="h-8 bg-neutral-950 rounded-lg text-[10px] px-2 text-white border border-white/10 focus:outline-none focus:border-sky-500"
                  >
                    <option value="5">★★★★★ (5)</option>
                    <option value="4">★★★★☆ (4)</option>
                    <option value="3">★★★☆☆ (3)</option>
                    <option value="2">★★☆☆☆ (2)</option>
                  </select>
                </div>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    id="input-review-comment-body"
                    required
                    placeholder={language === "ka" ? "დაწერეთ კომენტარი..." : "Transmission message..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 h-8 bg-neutral-950/80 rounded-lg text-[10px] px-2.5 text-white border border-white/10 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    id="btn-review-submit-action"
                    className="h-8 w-8 rounded-lg bg-gradient-to-r from-teal-400 to-[#38bdf8] text-zinc-950 flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Core pricing and checkout bar (Bottom) */}
          <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center gap-4 font-sans">
            <div>
              <p className="text-[10px] uppercase font-mono text-white/40">{language === "ka" ? "საბოლოო ფასი" : "Unit Cost"}</p>
              <p className="text-2xl font-bold text-cyan-400 price-tag mt-1">
                {wallpaper.price === 0 ? (language === "ka" ? "უფასო" : "Free") : `$${wallpaper.price.toFixed(2)}`}
              </p>
            </div>

            {/* Checkout action handles */}
            <div className="flex gap-2">
              <button
                id="btn-preview-basket"
                onClick={() => onAddToCart(wallpaper)}
                className="h-10 px-4 flex items-center justify-center text-[10px] font-bold text-white/90 rounded-xl neo-button active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                {language === "ka" ? "კალათაში დამატება" : "Add to Cart"}
              </button>
              
              <button
                id="btn-preview-buy-now"
                onClick={() => onBuyNow(wallpaper)}
                className="h-10 px-5 flex items-center justify-center text-[10px] font-extrabold text-black bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] rounded-xl hover:brightness-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                {language === "ka" ? "ყიდვა" : "Buy Now"} <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
