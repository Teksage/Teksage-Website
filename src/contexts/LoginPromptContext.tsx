"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { LoginPromptDialog } from "@/components/common/LoginPromptDialog";
import { ROUTES } from "@/lib/constants/routes";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { reconcileAuthSession } from "@/lib/auth-session";

export type OpenLoginPromptOptions = {
  returnPath?: string;
  /** Flutter `reDirectHome` — close (X) returns to home instead of staying. */
  redirectHomeOnClose?: boolean;
};

type LoginPromptContextValue = {
  openLoginPrompt: (options: OpenLoginPromptOptions) => void;
  closeLoginPrompt: () => void;
};

const LoginPromptContext = createContext<LoginPromptContextValue | null>(null);

export function LoginPromptProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [returnPath, setReturnPath] = useState<string>(ROUTES.home);
  const [redirectHomeOnClose, setRedirectHomeOnClose] = useState(false);

  const closeLoginPrompt = useCallback(() => {
    setOpen(false);
  }, []);

  const openLoginPrompt = useCallback((options: OpenLoginPromptOptions) => {
    setReturnPath(options.returnPath?.trim() || ROUTES.home);
    setRedirectHomeOnClose(Boolean(options.redirectHomeOnClose));
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (redirectHomeOnClose) {
      router.replace(ROUTES.home);
    }
  }, [redirectHomeOnClose, router]);

  const handleLoginNow = useCallback(() => {
    reconcileAuthSession();
    const loginPath = buildLoginRedirectPath(returnPath);
    setOpen(false);
    window.location.assign(loginPath);
  }, [returnPath]);

  const value = useMemo(
    () => ({ openLoginPrompt, closeLoginPrompt }),
    [closeLoginPrompt, openLoginPrompt]
  );

  return (
    <LoginPromptContext.Provider value={value}>
      {children}
      <LoginPromptDialog
        open={open}
        onClose={handleClose}
        onLoginNow={handleLoginNow}
      />
    </LoginPromptContext.Provider>
  );
}

export function useLoginPrompt(): LoginPromptContextValue {
  const ctx = useContext(LoginPromptContext);
  if (!ctx) {
    throw new Error("useLoginPrompt must be used within LoginPromptProvider");
  }
  return ctx;
}
