/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Wallpaper {
  id: string;
  title: string;
  description: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  resolution: "4K" | "8K" | "AMOLED";
  deviceTypes: ("Phone" | "Tablet" | "Laptop" | "Desktop")[];
  imageUrl: string;
  isPremium: boolean;
  isLimited: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  countdownTimer?: string; // ISO date string for limited releases
  rating: number;
  downloadsCount: number;
  tags: string[];
  vibeGradient: string; // Tailwind gradient style for premium hover frame borders
}

export interface Collection {
  slug: string;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  wallpapersCount: number;
  colorTheme: string; // styling color
}

export interface Review {
  id: string;
  wallpaperId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVIP?: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (wallpaperId + device + resolution)
  wallpaper: Wallpaper;
  targetDevice: "Phone" | "Tablet" | "Laptop" | "Desktop";
  targetResolution: "4K" | "8K" | "AMOLED";
  price: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  favorites: string[]; // wallpaper ids
  downloads: string[]; // wallpaper ids
  purchaseHistory: {
    orderId: string;
    date: string;
    items: {
      wallpaperId: string;
      title: string;
      price: number;
      imageUrl: string;
      device: string;
      resolution: string;
    }[];
    total: number;
  }[];
  vipMembership: {
    active: boolean;
    level: "Bronze" | "Silver" | "Gold" | "VIP" | "None";
    expiresAt?: string;
  };
}

export interface Order {
  id: string;
  date: string;
  email: string;
  items: {
    wallpaperId: string;
    title: string;
    price: number;
    imageUrl: string;
    device: string;
    resolution: string;
  }[];
  promoCode?: string;
  discountAmount: number;
  subtotal: number;
  total: number;
  paymentMethod: string;
  status: "Completed" | "Pending";
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
}
