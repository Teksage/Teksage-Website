/** Client session after first `useEffect` (avoids SSR / hydration mismatches). */
export type HydratedLoggedInState = {
  ready: boolean;
  loggedIn: boolean;
};
