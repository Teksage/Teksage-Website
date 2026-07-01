"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { clearAuthSession } from "@/lib/auth-session";
import { ROUTES } from "@/lib/constants/routes";
import { resolvePostLoginRedirectPath } from "@/lib/login-redirect";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import { sendOtp, verifyOtp, logout as logoutService } from "@/lib/services/auth";
import type { OtpPayload } from "@/types";

type LogoutOptions = {
  successMessage?: string;
};

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function requestOtp(mobile: string) {
    setIsLoading(true);
    setError(null);
    try {
      await sendOtp(mobile);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.otpSent);
      return true;
    } catch {
      const msg = "Failed to send OTP. Please try again.";
      setError(msg);
      showErrorAppSnackBar(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmOtp(payload: OtpPayload) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await verifyOtp(payload);
      setAuth(response.user, response.token);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.otpVerified);
      router.push(
        resolvePostLoginRedirectPath(null, {
          profileUpdated: response.user.isProfileUpdated,
        })
      );
    } catch {
      const msg = "Invalid OTP. Please try again.";
      setError(msg);
      showErrorAppSnackBar(msg);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(options?: LogoutOptions) {
    setIsLoading(true);
    const apiOk = await logoutService();
    if (apiOk) {
      showSuccessAppSnackBar(
        options?.successMessage ?? APP_SNACKBAR_MESSAGES.logoutSuccess
      );
    } else {
      showErrorAppSnackBar(APP_SNACKBAR_MESSAGES.logoutFailed);
    }
    clearAuthSession();
    router.replace(ROUTES.home);
    setIsLoading(false);
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    requestOtp,
    confirmOtp,
    logout,
  };
}
