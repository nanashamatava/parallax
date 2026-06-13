/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User } from "../types";
import { useLanguage } from "../context/LanguageContext";
import {
  X,
  UserCheck,
  ShieldCheck,
  Download,
  ShoppingBag,
  Award,
  KeyRound,
  Mail,
  UserPlus
} from "lucide-react";

interface UserAuthModalProps {
  currentUser: User | null;
  onLogin: (email: string, name: string) => void;
  onRegister: (email: string, name: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export default function UserAuthModal({
  currentUser,
  onLogin,
  onRegister,
  onLogout,
  onClose,
}: UserAuthModalProps) {
  const { language } = useLanguage();
  const [formType, setFormType] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    if (formType === "register") {
      if (!name.trim()) return;
      onRegister(email, name);
    } else {
      onLogin(email, name || email.split("@")[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none font-sans">
      <div className="relative w-full max-w-md bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 text-left">
        
        {/* Modal headers */}
        <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" /> 
            {language === "ka" ? "პერსონალური გალაქტიკური ანგარიშები" : "Personal Galactic Accounts"}
          </span>
          <button
            id="btn-auth-close"
            onClick={onClose}
            className="p-1 px-2 text-[10px] uppercase font-bold text-zinc-400 hover:text-white rounded bg-white/5 border border-white/5 cursor-pointer font-sans"
          >
            {language === "ka" ? "უკან" : "Esc"}
          </button>
        </div>

        {/* PROFILE WORKFLOW: if signed-in, show profile stats directly */}
        {currentUser ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-[#38bdf8] flex items-center justify-center text-zinc-950 font-bold text-lg select-none">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{currentUser.name}</h4>
                <p className="text-[10px] font-mono text-zinc-400">{currentUser.email}</p>
                
                {/* VIP Badging */}
                <div className="flex gap-1.5 pt-0.5 text-[8px] font-bold uppercase">
                  <span className="bg-sky-500/10 text-[#38bdf8] border border-sky-400/20 px-2 py-0.5 rounded-md font-sans">
                    {language === "ka" ? "როლი" : "Role"}: {currentUser.role}
                  </span>
                  <span className="bg-pink-500/10 text-pink-400 border border-pink-400/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-sans">
                    <Award className="w-2.5 h-2.5" /> 
                    {language === "ka" ? "VIP დონე" : "VIP Level"}: {currentUser.vipMembership.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Downloads archives list */}
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1 font-sans">
                <Download className="w-3.5 h-3.5 text-[#38bdf8]" /> 
                {language === "ka" ? "ლოკალური ლიცენზიის არქივი" : "Local License Archive"} ({currentUser.downloads.length})
              </h5>
              <div className="p-3 bg-neutral-900/40 rounded-xl border border-white/5 max-h-[140px] overflow-y-auto space-y-1.5">
                {currentUser.downloads.length === 0 ? (
                  <p className="text-[10px] text-zinc-500 italic font-sans">
                    {language === "ka" ? "ფონები ჯერ არ გაქვთ. შეიძინეთ დიზაინები ლიცენზიის გასაღებების მისაღებად." : "No wallpapers generated yet. Acquire designs to collect license keys."}
                  </p>
                ) : (
                  currentUser.downloads.map((dlId, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px] bg-black/40 p-1.5 rounded border border-white/5">
                      <span className="font-mono text-zinc-200">{dlId}</span>
                      <span className="text-emerald-400 font-bold font-sans">
                        ✓ {language === "ka" ? "დეკოდირებული" : "Lossless Decrypted"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Purchase receipts log */}
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1 font-sans">
                <ShoppingBag className="w-3.5 h-3.5 text-[#38bdf8]" /> 
                {language === "ka" ? "შესყიდვების ისტორია" : "Purchase Receipts logs"} ({currentUser.purchaseHistory.length})
              </h5>
              <div className="p-3 bg-neutral-900/40 rounded-xl border border-white/5 max-h-[140px] overflow-y-auto space-y-1.5">
                {currentUser.purchaseHistory.length === 0 ? (
                  <p className="text-[10px] text-zinc-500 italic font-sans">
                    {language === "ka" ? "ტრანზაქციები პროფილში ვერ მოიძებნა." : "No transaction audits found in profile."}
                  </p>
                ) : (
                  currentUser.purchaseHistory.map((rec) => (
                    <div key={rec.orderId} className="p-2 bg-black/50 border border-white/5 rounded-lg space-y-1 text-[10px]">
                      <div className="flex justify-between font-mono font-bold text-white">
                        <span>{rec.orderId}</span>
                        <span>${rec.total.toFixed(2)}</span>
                      </div>
                      <p className="text-zinc-400 font-sans">
                        {language === "ka" ? "თარიღი" : "Date"}: {new Date(rec.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              id="btn-profile-logout"
              onClick={onLogout}
              className="w-full h-9 bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase text-xs font-bold rounded-xl hover:bg-rose-500 hover:text-white transition-colors cursor-pointer font-sans"
            >
              {language === "ka" ? "Secure Cabin-იდან გამოსვლა" : "Sign Out Secure Cabin"}
            </button>
          </div>
        ) : (
          /* LOGIN OR REGISTER TERMINAL FORM */
          <form onSubmit={handleSubmit} className="space-y-4">
            {formType === "register" && (
              <div>
                <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1 flex items-center gap-1 font-sans">
                  <UserPlus className="w-3.5 h-3.5 text-zinc-400" /> 
                  {language === "ka" ? "ასტრონავტის სახელი / პილოტის ნიშანი" : "Astronaut Name / Pilot Sign"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === "ka" ? "მაგ: ასტრო პილოტი მაიორი ტომი" : "e.g. Astro Pilot Major Tom"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 bg-neutral-950 border border-white/10 rounded-xl text-xs px-3 focus:outline-none focus:border-sky-500 text-white font-sans"
                />
              </div>
            )}

            <div>
              <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1 flex items-center gap-1 font-sans">
                <Mail className="w-3.5 h-3.5 text-zinc-400" /> 
                {language === "ka" ? "გალაქტიკური ელ-ფოსტა" : "Galactic Mail Address"}
              </label>
              <input
                type="email"
                required
                placeholder="e.g. m.tom@starfield.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 bg-neutral-950 border border-white/10 rounded-xl text-xs px-3 focus:outline-none focus:border-sky-500 text-white font-sans"
              />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1 flex items-center gap-1 font-sans">
                <KeyRound className="w-3.5 h-3.5 text-zinc-400" /> 
                {language === "ka" ? "უსაფრთხო კვანტური პაროლი" : "Secure Quantum Encryption Password"}
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-9 bg-neutral-950 border border-white/10 rounded-xl text-xs px-3 focus:outline-none focus:border-sky-500 text-white font-sans"
              />
            </div>

            <button
              type="submit"
              id="btn-auth-action"
              className="w-full h-10 bg-gradient-to-r from-[#38bdf8] to-teal-400 text-zinc-950 font-bold text-xs uppercase rounded-xl hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-sky-500/10 font-sans"
            >
              {formType === "login" 
                ? (language === "ka" ? "შესვლა კაბინაში" : "Transmit Login Beacon") 
                : (language === "ka" ? "რეგისტრაცია" : "Register Pilot Signature")}
            </button>

            {/* Toggle form type */}
            <div className="pt-2 text-center text-[10px] font-sans">
              {formType === "login" ? (
                <p className="text-zinc-400">
                  {language === "ka" ? "ახალი კადეტი ხართ?" : "New flight cadet?"}{" "}
                  <button
                    type="button"
                    id="btn-switch-to-register"
                    onClick={() => setFormType("register")}
                    className="text-[#38bdf8] hover:underline font-bold cursor-pointer font-sans"
                  >
                    {language === "ka" ? "დარეგისტრირდით აქ" : "Register here"}
                  </button>
                </p>
              ) : (
                <p className="text-zinc-400">
                  {language === "ka" ? "რეგისტრირებული პილოტი?" : "Already mapped account?"}{" "}
                  <button
                    type="button"
                    id="btn-switch-to-login"
                    onClick={() => setFormType("login")}
                    className="text-[#38bdf8] hover:underline font-bold cursor-pointer font-sans"
                  >
                    {language === "ka" ? "შესვლა აქ" : "Login here"}
                  </button>
                </p>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
