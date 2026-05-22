"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";

type AppLoaderContextValue = {
  show: () => void;
  hide: () => void;
};

const AppLoaderContext = createContext<AppLoaderContextValue | null>(null);

/** Mirrors Flutter `CustomLoader.show` / `CustomLoader.hide`. */
export function AppLoaderProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const depthRef = useRef(0);

  const show = useCallback(() => {
    depthRef.current += 1;
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    depthRef.current = Math.max(0, depthRef.current - 1);
    if (depthRef.current === 0) setVisible(false);
  }, []);

  const value = useMemo(() => ({ show, hide }), [hide, show]);

  return (
    <AppLoaderContext.Provider value={value}>
      {children}
      <LoadingOverlay open={visible} />
    </AppLoaderContext.Provider>
  );
}

export function useAppLoader(): AppLoaderContextValue {
  const ctx = useContext(AppLoaderContext);
  if (!ctx) {
    throw new Error("useAppLoader must be used within AppLoaderProvider");
  }
  return ctx;
}
