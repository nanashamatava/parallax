/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CartItem, Wallpaper, Order, PromoCode } from "../types";
import { useLanguage } from "../context/LanguageContext";
import {
  X,
  CreditCard,
  ShoppingCart,
  Trash2,
  Tag,
  ShieldCheck,
  CheckCircle,
  Truck,
  Download,
  Percent,
  Calendar,
  Lock,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface CartAndCheckoutProps {
  cartItems: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (order: Order) => void;
  onClose: () => void;
  userEmail: string;
}

const promoCodes: PromoCode[] = [
  { code: "COSMOS20", discountPercent: 20, description: "20%-იანი ფასდაკლება ყველა ფონზე" },
  { code: "VIPSPACE", discountPercent: 50, description: "50%-იანი უმაღლესი VIP ფასდაკლება" },
  { code: "STELLAR100", discountPercent: 100, description: "100%-ით უფასო კოსმოსური ლიცენზია" }
];

export default function CartAndCheckout({
  cartItems,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
  onClose,
  userEmail,
}: CartAndCheckoutProps) {
  const { language, t } = useLanguage();
  const [step, setStep] = useState<"cart" | "payment" | "success">("cart");
  const [couponCode, setCouponCode] = useState("");
  const [activePromo, setActivePromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");
  const [selectedGateway, setSelectedGateway] = useState<"Stripe" | "PayPal" | "ApplePay" | "GooglePay">("Stripe");
  
  // Card forms simulation states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Financial formulations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = activePromo ? (subtotal * activePromo.discountPercent) / 100 : 0;
  const netTotal = Math.max(0, subtotal - discountAmount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const matched = promoCodes.find((p) => p.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (matched) {
      setActivePromo(matched);
      setCouponCode("");
    } else {
      setPromoError(language === "ka" ? "კოდი არასწორი ან ვადაგასულია." : "Invalid spatial transmission protocol/discount code.");
    }
  };

  const removePromo = () => {
    setActivePromo(null);
  };

  const processPaymentSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setPaymentProcessing(true);

    setTimeout(() => {
      // payment succeeded. Create order receipt
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: Order = {
        id: orderId,
        date: new Date().toISOString(),
        email: userEmail || "spacepilot@orions-belt.com",
        items: cartItems.map((item) => ({
          wallpaperId: item.wallpaper.id,
          title: item.wallpaper.title,
          price: item.price,
          imageUrl: item.wallpaper.imageUrl,
          device: item.targetDevice,
          resolution: item.targetResolution
        })),
        promoCode: activePromo?.code,
        discountAmount: discountAmount,
        subtotal: subtotal,
        total: netTotal,
        paymentMethod: selectedGateway,
        status: "Completed",
      };

      setCompletedOrder(order);
      onCheckoutSuccess(order);
      setStep("success");
      setPaymentProcessing(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md select-none font-sans">
      <div className="relative w-full max-w-2xl glass card-shadow rounded-3xl overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Dynamic header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-5">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-sky-400 animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white">
              {step === "cart" 
                ? (language === "ka" ? "კალათა და ანგარიშსწორება" : "Cart & Checkout") 
                : step === "payment" 
                  ? (language === "ka" ? "გადახდის მეთოდის არჩევა" : "Choose Payment Method") 
                  : (language === "ka" ? "გადახდა წარმატებით დასრულდა" : "Payment Successful")}
            </span>
          </div>
          <button
            id="btn-cart-close"
            onClick={onClose}
            className="p-1 px-2 text-[10px] uppercase font-bold text-zinc-400 hover:text-white rounded bg-white/5 border border-white/5 transition-all cursor-pointer"
          >
            {step === "success" 
              ? (language === "ka" ? "დასრულება" : "Complete") 
              : (language === "ka" ? "დახურვა" : "Close")}
          </button>
        </div>

        {/* 1. Basket review item state */}
        {step === "cart" && (
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs italic space-y-3">
                <ShoppingCart className="w-8 h-8 text-zinc-600 mx-auto" />
                <p>{language === "ka" ? "თქვენი კოსმოსური კალათა ამჟამად ცარიელია." : "Your space cargo cart is currently empty."}</p>
                <button
                  id="btn-cart-return-shop"
                  onClick={onClose}
                  className="mt-2.5 h-8 px-4 rounded-lg text-[10px] font-bold text-zinc-950 bg-[#38bdf8] hover:bg-sky-400 cursor-pointer"
                >
                  {language === "ka" ? "გალაქტიკების ძიება" : "Explore Galaxies"}
                </button>
              </div>
            ) : (
              <>
                <div className="max-h-[220px] overflow-y-auto space-y-2.5 pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 bg-neutral-900/50 rounded-xl border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.wallpaper.imageUrl}
                          alt={item.wallpaper.title}
                          referrerPolicy="no-referrer"
                          className="w-10 aspect-[9/16] rounded object-cover shadow-md border border-white/10"
                        />
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-white leading-none">{item.wallpaper.title}</h4>
                          <p className="text-[9px] text-[#38bdf8] mt-1 font-mono uppercase">
                            {item.targetDevice} • {item.targetResolution}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xs font-bold font-mono text-zinc-100">
                            {item.price === 0 ? (language === "ka" ? "უფასო" : "Free") : `$${item.price.toFixed(2)}`}
                          </span>
                        </div>
                        <button
                          id={`btn-cart-remove-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 rounded-md text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code entry block */}
                <form onSubmit={applyPromo} className="flex gap-2 p-2 bg-neutral-900/40 rounded-xl border border-white/5 mt-4">
                  <div className="flex-1 flex items-center gap-2 pl-2">
                    <Tag className="w-3.5 h-3.5 text-sky-400" />
                    <input
                      type="text"
                      id="input-promo-code"
                      placeholder={language === "ka" ? "ჩაწერეთ პრომო კოდი... (მაგ: COSMOS20)" : "Enter promo code... (e.g., COSMOS20)"}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none text-[10px] md:text-xs text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    id="btn-apply-promo"
                    className="h-8 px-4 text-[10px] font-bold text-zinc-950 bg-teal-400 rounded-lg hover:brightness-105 cursor-pointer"
                  >
                    {language === "ka" ? "გაგზავნა" : "Apply"}
                  </button>
                </form>

                {promoError && (
                  <p className="text-[10px] font-semibold text-rose-500 mt-1 pl-2 font-mono">⚠️ {promoError}</p>
                )}

                {activePromo && (
                  <div className="flex justify-between items-center bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-lg mt-1">
                    <span className="text-[10px] font-semibold text-teal-400 flex items-center gap-1">
                      <Percent className="w-3 h-3" /> {language === "ka" 
                        ? `პრომოკოდი აქტიურია: ${activePromo.code} (${activePromo.discountPercent}% ფასდაკლებით)` 
                        : `Promo code active: ${activePromo.code} (${activePromo.discountPercent}% off)`}
                    </span>
                    <button
                      id="btn-remove-active-promo"
                      onClick={removePromo}
                      className="text-[9px] text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      {language === "ka" ? "წაშლა" : "Remove"}
                    </button>
                  </div>
                )}

                {/* Subtotals & Receipt panel */}
                <div className="pt-4 border-t border-white/5 space-y-1 text-xs px-1 text-zinc-400 font-mono text-left">
                  <div className="flex justify-between">
                    <span>{language === "ka" ? "ჯამი" : "Subtotal"}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-cyan-300 font-sans">
                      <span>{language === "ka" ? "პრომოკოდის ფასდაკლება" : "Promo Discount"}</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-sm pt-2 font-sans">
                    <span>{language === "ka" ? "საბოლოო ფასი" : "Total Price"}</span>
                    <span className="text-cyan-400 price-tag text-base font-bold">${netTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Footer Proceed action */}
                <div className="pt-4 flex justify-between items-center gap-3">
                  <p className="text-[10px] text-white/40 max-w-[50%] leading-relaxed text-left">
                    {language === "ka" 
                      ? "🔑 დადასტურებისთანავე მიიღებთ .PNG ფორმატის მაღალი ხარისხის ფაილებს." 
                      : "🔑 Upon confirmation, you will receive premium high-res .PNG files."}
                  </p>
                  <button
                    id="btn-cart-proceed-payment"
                    onClick={() => setStep("payment")}
                    className="h-10 px-6 font-extrabold text-black bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] active:scale-95 transition-all text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-sans"
                  >
                    {language === "ka" ? "გადახდაზე გადასვლა" : "Proceed to Payment"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* 2. Select Payment Gateways */}
        {step === "payment" && (
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { id: "Stripe" as const, logo: "💳", label: language === "ka" ? "Stripe ბარათები" : "Stripe Cards" },
                { id: "PayPal" as const, logo: "💛", label: "PayPal" },
                { id: "ApplePay" as const, logo: "🖤", label: "Apple Pay" },
                { id: "GooglePay" as const, logo: "💙", label: "Google Pay" }
              ].map((g) => (
                <button
                  key={g.id}
                  id={`btn-gateway-${g.id}`}
                  onClick={() => setSelectedGateway(g.id)}
                  className={`py-3 px-1 rounded-2xl flex flex-col items-center gap-1 text-[10px] font-bold border transition-all ${
                    selectedGateway === g.id
                      ? "bg-[#38bdf8]/10 text-white border-[#38bdf8] shadow-md shadow-sky-500/10"
                      : "bg-neutral-900/60 text-zinc-400 border-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{g.logo}</span>
                  <span>{g.label}</span>
                </button>
              ))}
            </div>

            {/* Gateway Forms */}
            {selectedGateway === "Stripe" ? (
              <form onSubmit={processPaymentSimulation} className="space-y-3.5 bg-neutral-900/40 p-4 rounded-2xl border border-white/5 font-sans">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-zinc-400" /> {language === "ka" ? "ბარათის მონაცემები" : "Card Details"}
                </span>
                
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="col-span-2">
                    <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1">{language === "ka" ? "ბარათის მფლობელი" : "Cardholder Name"}</label>
                    <input
                      type="text"
                      required
                      placeholder={language === "ka" ? "სახელი გვარი..." : "First Lastname..."}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full h-9 bg-neutral-950 border border-white/10 rounded-lg text-xs px-3 focus:outline-none focus:border-sky-500 text-white"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1">{language === "ka" ? "ბარათის ნომერი" : "Card Number"}</label>
                    <input
                      type="text"
                      required
                      pattern="\d{16}"
                      maxLength={16}
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full h-9 bg-neutral-950 border border-white/10 rounded-lg text-xs px-3 focus:outline-none focus:border-sky-500 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1">{language === "ka" ? "მოქმედების ვადა" : "Expiry Date"}</label>
                    <input
                      type="text"
                      required
                      pattern="\d{2}/\d{2}"
                      maxLength={5}
                      placeholder={language === "ka" ? "თთ/წწ" : "MM/YY"}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full h-9 bg-neutral-950 border border-white/10 rounded-lg text-xs px-3 focus:outline-none focus:border-sky-500 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-1">{language === "ka" ? "უსაფრთხოების კოდი (CVC)" : "Security Code (CVC)"}</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      pattern="\d{3}"
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                      className="w-full h-9 bg-neutral-950 border border-white/10 rounded-lg text-xs px-3 focus:outline-none focus:border-sky-500 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 text-xs font-mono text-zinc-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <Lock className="w-3.5 h-3.5" /> {language === "ka" ? "256-ბიტიანი უსაფრთხო SSL კავშირი" : "256-bit Secure SSL Connection"}
                  </span>
                  <span>{language === "ka" ? "საბოლოო ჯამი" : "Total"}: ${netTotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  id="btn-confirm-card-charge"
                  disabled={paymentProcessing}
                  className="w-full h-10 bg-gradient-to-r from-teal-400 to-[#38bdf8] text-zinc-950 font-bold hover:brightness-105 text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 font-sans"
                >
                  {paymentProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent animate-spin rounded-full" />
                      {language === "ka" ? "მიმდინარეობს გადახდის ავტორიზაცია..." : "Authorizing payment transaction..."}
                    </>
                  ) : (
                    <>
                      {language === "ka" ? "დადასტურება და გადახდა" : "Confirm & Pay"}: ${netTotal.toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 text-center bg-neutral-900/40 rounded-2xl border border-white/5 space-y-4">
                <span className="text-3xl text-zinc-300">🪐</span>
                <h4 className="text-xs font-bold text-white">{language === "ka" ? `გააგრძელეთ გადახდა ${selectedGateway}-ის საშუალებით` : `Continue payment with ${selectedGateway}`}</h4>
                <p className="text-[10px] text-zinc-400">{language === "ka" ? "უსაფრთხო კავშირის ტოკენი გენერირებულია. დასასრულებლად დააჭირეთ გადახდას." : "Secure connection token generated. Press below to finalize."}</p>
                <button
                  id="btn-confirm-gateway-bypass"
                  onClick={processPaymentSimulation}
                  disabled={paymentProcessing}
                  className="mx-auto w-[200px] h-9 block text-xs font-bold bg-[#38bdf8] text-zinc-950 hover:bg-sky-400 rounded-lg cursor-pointer font-sans"
                >
                  {paymentProcessing 
                    ? (language === "ka" ? "მიერთების დამყარება..." : "Establishing uplink...") 
                    : (language === "ka" ? `გადახდა: ${selectedGateway}` : `Pay with ${selectedGateway}`)}
                </button>
              </div>
            )}

            {/* Back to cart action */}
            <button
              id="btn-return-cart"
              onClick={() => setStep("cart")}
              className="text-[11px] font-semibold text-zinc-400 hover:text-white underline block mx-auto cursor-pointer font-sans"
            >
              {language === "ka" ? "კალათაში დაბრუნება" : "Return to Cart"}
            </button>
          </div>
        )}

        {/* 3. Transaction success receipt layout */}
        {step === "success" && completedOrder && (
          <div className="space-y-4 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white tracking-tight">{language === "ka" ? "გადახდა წარმატებით შესრულდა!" : "Payment Completed Successfully!"}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-[80%] mx-auto">
              {language === "ka" ? "თქვენი ჩამოსატვირთი ლიცენზია აქტიურია. შეკვეთის ნომერია:" : "Your download license is now active. Order ID is:"}{" "}
              <span className="font-mono text-[#38bdf8] font-bold">{completedOrder.id}</span>
            </p>

            {/* Simulated expands printable receipt */}
            <div className="p-4 bg-neutral-900/70 border border-white/5 rounded-2xl text-left text-[11px] font-mono text-zinc-300 space-y-2 max-h-[180px] overflow-y-auto">
              <div className="flex justify-between font-bold text-white font-sans">
                <span>{language === "ka" ? "ქვითარი" : "Receipt"}: {completedOrder.id}</span>
                <span className="font-mono">{new Date(completedOrder.date).toLocaleDateString()}</span>
              </div>
              <p>{language === "ka" ? "ელ.ფოსტა" : "Email"}: {completedOrder.email}</p>
              <div className="border-t border-white/5 my-2 pt-2 space-y-1">
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-zinc-400">
                    <span>* {it.title} ({it.device})</span>
                    <span>${it.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between text-white font-bold font-sans">
                <span>{language === "ka" ? `გადახდის მეთოდი` : `Payment Method`}: {completedOrder.paymentMethod}</span>
                <span>{language === "ka" ? "სულ გადახდილია" : "Total Paid"}: ${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions for downloaded package */}
            <div className="flex gap-2.5 pt-2">
              <button
                id="btn-complete-invoice-done"
                onClick={onClose}
                className="flex-1 h-10 text-xs font-bold text-zinc-950 bg-[#38bdf8] hover:bg-sky-400 rounded-xl cursor-pointer font-sans"
              >
                {language === "ka" ? "პანელის დახურვა" : "Close Panel"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
