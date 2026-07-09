import { useAuthStore } from "@/store/auth.store";

function profileComplete(user: ReturnType<typeof useAuthStore.getState>["user"]) {
  return Boolean(user?.nakshatra?.trim() && user?.rashi?.trim());
}

export function useMuhurthaAccess() {
  const { user, isAuthenticated } = useAuthStore();
  const isPremium = Boolean(user?.isPremium);
  const hasProfile = profileComplete(user);
  const maySearch = isAuthenticated && isPremium && hasProfile;

  return { user, isAuthenticated, isPremium, hasProfile, maySearch };
}
