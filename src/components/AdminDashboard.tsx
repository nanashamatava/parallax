/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Wallpaper, Collection, User, Order } from "../types";
import {
  TrendingUp,
  Settings,
  Database,
  Users,
  LineChart,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  DollarSign,
  Download,
  Award,
  Filter,
  Check
} from "lucide-react";

interface AdminDashboardProps {
  wallpapers: Wallpaper[];
  collections: Collection[];
  users: User[];
  orders: Order[];
  onAddWallpaper: (wal: Omit<Wallpaper, "id" | "downloadsCount" | "rating">) => void;
  onEditWallpaper: (id: string, updates: Partial<Wallpaper>) => void;
  onDeleteWallpaper: (id: string) => void;
  onGrantVIP: (userId: string, level: "Bronze" | "Silver" | "Gold" | "VIP") => void;
  onClose: () => void;
}

export default function AdminDashboard({
  wallpapers,
  collections,
  users,
  orders,
  onAddWallpaper,
  onEditWallpaper,
  onDeleteWallpaper,
  onGrantVIP,
  onClose,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"analytics" | "products" | "orders" | "users">("analytics");
  
  // New Wallpaper form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("earth");
  const [newPrice, setNewPrice] = useState("4.99");
  const [newResolution, setNewResolution] = useState<"4K" | "8K" | "AMOLED">("4K");
  const [selectedDevices, setSelectedDevices] = useState<("Phone" | "Tablet" | "Laptop" | "Desktop")[]>(["Phone"]);
  const [newImage, setNewImage] = useState("");

  const handleCreateWallpaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImage) return;

    onAddWallpaper({
      title: newTitle,
      description: `A masterclass luxury render of the ${newTitle} stellar phenomenon formatted for AMOLED mobile, tablet and high-spec widescreen setups.`,
      categorySlug: newCategory,
      price: parseFloat(newPrice) || 0,
      resolution: newResolution,
      deviceTypes: selectedDevices,
      imageUrl: newImage,
      isPremium: parseFloat(newPrice) > 0,
      isLimited: false,
      tags: [newCategory, newResolution.toLowerCase()],
      vibeGradient: "from-blue-600 to-purple-500 border border-blue-500/30 shadow-blue-500/20"
    });

    setNewTitle("");
    setNewImage("");
    alert("New Space wallpaper asset appended to galactic ledger database.");
  };

  const handleDeviceChange = (dev: "Phone" | "Tablet" | "Laptop" | "Desktop") => {
    if (selectedDevices.includes(dev)) {
      setSelectedDevices(selectedDevices.filter((d) => d !== dev));
    } else {
      setSelectedDevices([...selectedDevices, dev]);
    }
  };

  // Calculations for static metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/90 backdrop-blur-md select-none">
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-auto max-h-[90vh]">
        
        {/* Navigation Sidebar panel (Left) */}
        <div className="w-full md:w-1/4 p-6 bg-black/50 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-4 h-4 animate-spin-slow" />
                Planetary Admin Hub
              </h3>
              <p className="text-[10px] text-zinc-500 mt-1">Supervise wallpaper marketplace parameters</p>
            </div>

            <div className="space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 md:gap-0">
              {[
                { id: "analytics" as const, label: "Market Analytics", icon: LineChart },
                { id: "products" as const, label: "Product Console", icon: Database },
                { id: "orders" as const, label: "Transaction Logs", icon: ShoppingBag },
                { id: "users" as const, label: "User matrix", icon: Users }
              ].map((t) => (
                <button
                  key={t.id}
                  id={`btn-admin-nav-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full py-2 px-3 text-[11px] font-bold rounded-xl flex items-center gap-2.5 cursor-pointer whitespace-nowrap transition-colors ${
                    activeTab === t.id
                      ? "bg-sky-500/10 text-white border border-sky-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <t.icon className="w-4 h-4 text-[#38bdf8]" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            id="btn-admin-close-panel"
            onClick={onClose}
            className="w-full h-9 mt-4 bg-white/5 border border-white/5 hover:bg-rose-500/20 hover:text-rose-400 active:scale-95 transition-all text-xs font-semibold rounded-xl text-zinc-300 cursor-pointer"
          >
            Leave Terminal
          </button>
        </div>

        {/* Console details panel (Right) */}
        <div className="w-full md:w-3/4 p-6 md:p-8 overflow-y-auto max-h-[80vh] md:max-h-[90vh] bg-black/30">
          
          {/* 1. Analytics & Visual graph view */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-neutral-900/50 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Gross Space Volume</span>
                  <p className="text-xl font-bold text-white font-mono">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-neutral-900/50 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Total Sales Logs</span>
                  <p className="text-xl font-bold text-white font-mono">{orders.length}</p>
                </div>
                <div className="p-4 bg-neutral-900/50 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Catalog</span>
                  <p className="text-xl font-bold text-white font-mono">{wallpapers.length} pcs</p>
                </div>
              </div>

              {/* Custom SVG visualization chart for revenue cycles */}
              <div className="p-4 bg-neutral-900/40 rounded-2xl border border-white/5 space-y-4">
                <h4 className="text-xs font-semibold text-[#38bdf8] flex items-center gap-1.5 uppercase">
                  <TrendingUp className="w-4 h-4" /> Weekly Revenue Cycle Grid
                </h4>
                
                {/* SVG Chart */}
                <div className="w-full h-[180px] bg-black/60 rounded-xl border border-white/5 p-2.5 relative flex items-end">
                  <svg className="w-full h-full text-[#38bdf8] opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    
                    {/* Revenue smooth curve spline */}
                    <path
                      d="M 10,80 Q 25,60 40,40 T 70,55 T 90,20"
                      fill="none"
                      stroke="url(#chartGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Chart day tags */}
                  <div className="absolute inset-x-4 bottom-2 flex justify-between text-[8px] font-mono text-zinc-500">
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                    <span>SUN (TODAY)</span>
                  </div>
                </div>
              </div>

              {/* Best selling collection ledger list */}
              <div className="p-4 bg-neutral-900/30 rounded-2xl border border-white/5">
                <h4 className="text-xs font-semibold text-white uppercase mb-3">Stellar Categories Standings</h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {collections.slice(0, 8).map((col, idx) => (
                    <div key={col.slug} className="flex justify-between items-center text-[11px] p-2 bg-neutral-900/70 border border-white/5 rounded-xl">
                      <span className="font-bold text-zinc-200">#{idx+1} {col.name}</span>
                      <span className="text-[#38bdf8] font-mono">{col.wallpapersCount} designs active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Product Management panel */}
          {activeTab === "products" && (
            <div className="space-y-6">
              
              {/* Add product form */}
              <form onSubmit={handleCreateWallpaper} className="bg-neutral-900/50 p-4 rounded-2xl border border-white/5 space-y-3">
                <h4 className="text-xs font-bold text-[#38bdf8] uppercase flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Draft New Wallpaper asset
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400">Wallpaper Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eagle Nebula Zenith"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full h-8.5 bg-neutral-950 border border-white/10 rounded-lg text-xs px-2.5 focus:outline-none focus:border-sky-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400">Celestial Collection</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full h-8.5 bg-neutral-950 border border-white/10 rounded-lg text-xs px-2.5 focus:outline-none focus:border-sky-500 text-white capitalize shadow-md"
                    >
                      {collections.map((col) => (
                        <option key={col.slug} value={col.slug}>{col.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400">USD Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="4.99"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full h-8.5 bg-neutral-950 border border-white/10 rounded-lg text-xs px-2.5 focus:outline-none focus:border-sky-500 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400">Asset image path URL</label>
                    <input
                      type="url"
                      required
                      placeholder="HTTPS link from Unsplash..."
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="w-full h-8.5 bg-neutral-950 border border-white/10 rounded-lg text-xs px-2.5 focus:outline-none focus:border-sky-500 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400">OLED Target Spec</label>
                    <select
                      value={newResolution}
                      onChange={(e) => setNewResolution(e.target.value as any)}
                      className="w-full h-8.5 bg-neutral-950 border border-white/10 rounded-lg text-xs px-2.5 focus:outline-none focus:border-[#38bdf8] text-white"
                    >
                      <option value="4K">4K UHD</option>
                      <option value="8K">8K Ultra-Deep</option>
                      <option value="AMOLED">AMOLED Pure-black</option>
                    </select>
                  </div>

                  {/* Device selectors checkboxes */}
                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1">Target Device support</label>
                    <div className="flex gap-2">
                      {["Phone", "Tablet", "Laptop", "Desktop"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          id={`btn-dev-sel-${d}`}
                          onClick={() => handleDeviceChange(d as any)}
                          className={`flex-1 h-7 text-[9px] font-bold rounded-lg border transition-all cursor-pointer ${
                            selectedDevices.includes(d as any)
                              ? "bg-[#38bdf8]/20 text-white border-[#38bdf8]"
                              : "bg-black/40 text-zinc-500 border-white/5"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-admin-submit-new-wall"
                  className="w-full h-9 mt-3 text-xs font-bold text-zinc-950 bg-teal-400 rounded-xl hover:brightness-105 transition-all cursor-pointer"
                >
                  Commit New Space Wallpaper Spec
                </button>
              </form>

              {/* Wallpaper assets editor layout list */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Catalog inventory controls</span>
                {wallpapers.slice(0, 15).map((wal) => (
                  <div key={wal.id} className="flex justify-between items-center p-2 bg-neutral-900/60 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-left">
                      <img
                        src={wal.imageUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-6 h-9 object-cover rounded shadow"
                      />
                      <div>
                        <h5 className="text-[11px] font-bold text-white max-w-[150px] truncate">{wal.title}</h5>
                        <p className="text-[9px] text-[#38bdf8] capitalize italic">{wal.categorySlug}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={wal.price}
                        onChange={(e) => onEditWallpaper(wal.id, { price: parseFloat(e.target.value) || 0 })}
                        className="w-14 h-7 bg-black text-[10px] rounded text-center text-white border border-white/10 focus:outline-none"
                      />
                      <button
                        id={`btn-admin-del-${wal.id}`}
                        onClick={() => onDeleteWallpaper(wal.id)}
                        className="p-1 rounded text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Transaction logs list */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-2">Planetary order dispatch ledger</span>
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <p className="text-[10px] text-zinc-500 italic py-6 text-center">No purchases recorded down in the matrix ledger yet.</p>
                ) : (
                  orders.map((o) => (
                    <div key={o.id} className="p-3 bg-neutral-900/50 rounded-2xl border border-white/5 text-[11px] space-y-2">
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span className="font-bold text-white font-mono">{o.id}</span>
                        <span>{new Date(o.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-zinc-300">
                        Buyer email: <span className="text-white font-mono font-medium">{o.email}</span>
                      </div>
                      <div className="text-zinc-400">
                        Products requested: {o.items.map((it) => `${it.title} (${it.device})`).join(", ")}
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono pt-1 text-sky-400 font-bold border-t border-white/5">
                        <span>Gateway: {o.paymentMethod}</span>
                        <span>Proceeds total: ${o.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 4. User Profiles and special roles Bestowing */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-2">Registered personnel directory</span>
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {users.map((u) => (
                  <div key={u.id} className="p-3.5 bg-neutral-900/40 rounded-2xl border border-white/5 text-xs flex justify-between items-center">
                    <div className="space-y-1 text-left">
                      <h4 className="font-bold text-white">{u.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono">{u.email}</p>
                      
                      <div className="flex gap-1.5 pt-0.5">
                        <span className="text-[8px] bg-sky-500/10 text-sky-400 px-1.5 border border-sky-400/20 rounded font-semibold uppercase">
                          Role: {u.role}
                        </span>
                        <span className="text-[8px] bg-pink-500/10 text-pink-400 px-1.5 border border-pink-400/20 rounded font-semibold uppercase">
                          VIP: {u.vipMembership.level}
                        </span>
                      </div>
                    </div>

                    {/* Grant VIP buttons */}
                    <div className="flex gap-1">
                      <button
                        id={`btn-admin-vip-gold-${u.id}`}
                        onClick={() => onGrantVIP(u.id, "Gold")}
                        className="h-7 px-2.5 text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                      >
                        Set Gold
                      </button>
                      <button
                        id={`btn-admin-vip-spec-${u.id}`}
                        onClick={() => onGrantVIP(u.id, "VIP")}
                        className="h-7 px-2.5 text-[9px] font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 rounded-lg hover:bg-pink-500 hover:text-zinc-950 transition-colors cursor-pointer"
                      >
                        Set VIP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
