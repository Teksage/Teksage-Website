"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import {
  loginWithEmail,
  sendOtp,
  verifyOtp,
  logout as logoutService,
} from "@/lib/services/auth";
import type { LoginEmailPayload, OtpPayload } from "@/types";

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginEmail(payload: LoginEmailPayload) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginWithEmail(payload);
      setAuth(response.user, response.token);
      router.push("/home");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function requestOtp(mobile: string) {
    setIsLoading(true);
    setError(null);
    try {
      await sendOtp(mobile);
      return true;
    } catch {
      setError("Failed to send OTP. Please try again.");
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
      router.push("/home");
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      await logoutService();
    } finally {
      clearAuth();
      router.push("/login");
      setIsLoading(false);
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    loginEmail,
    requestOtp,
    confirmOtp,
    logout,
  };
}
