"use client";

import { create } from "zustand";

const STORAGE_KEY = "teksage_desktop_sidebar_collapsed";

type DesktopSidebarState = {
  collapsed: boolean;
  hydrated: boolean;
  hydrate: () => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
};

function readStoredCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeStoredCollapsed(collapsed: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  } catch {
    /* ignore quota */
  }
}

/** Desktop left rail expand/collapse — persisted for the browser. */
export const useDesktopSidebarStore = create<DesktopSidebarState>((set, get) => ({
  collapsed: false,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    set({ collapsed: readStoredCollapsed(), hydrated: true });
  },
  setCollapsed: (collapsed) => {
    writeStoredCollapsed(collapsed);
    set({ collapsed });
  },
  toggleCollapsed: () => {
    const next = !get().collapsed;
    writeStoredCollapsed(next);
    set({ collapsed: next });
  },
}));
