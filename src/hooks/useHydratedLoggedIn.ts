"use client";

import { useEffect, useState } from "react";
import { isClientLoggedIn } from "@/lib/auth-session";
import type { HydratedLoggedInState } from "@/types/hydrated-auth";

/** After `ready`, `loggedIn` mirrors `isClientLoggedIn()` without SSR mismatch. */
export function useHydratedLoggedIn(): HydratedLoggedInState {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isClientLoggedIn());
    setReady(true);
  }, []);

  return { ready, loggedIn };
}
