"use client";

import { useEffect, useState } from "react";
import { isClientLoggedIn } from "@/lib/auth-session";

/** False on server and first paint; then mirrors `isClientLoggedIn()`. Prevents hydration mismatch. */
export function useHydratedLoggedIn(): boolean {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isClientLoggedIn());
  }, []);

  return loggedIn;
}
