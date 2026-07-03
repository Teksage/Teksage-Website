/** Authenticated customer profile — mirrors Flutter user model fields used on web. */

export interface UserProfile {
  id: string;
  name: string;
  /** When present, from API `first_name` / `last_name` (Flutter separate fields). */
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  countryCode?: string;
  isMobileVerified?: boolean;
  /** Backend `is_email_verified`. */
  isEmailVerified?: boolean;
  dateOfBirth?: string;
  placeOfBirth?: string;
  timeOfBirth?: string;
  /** Maps API `chat_languages`. */
  chatLanguages?: string;
  /** Maps API `referral_source` — first-time profile attribution. */
  referralSource?: string;
  /** Maps API `preferred_location`. */
  preferredLocation?: string;
  rashi?: string;
  nakshatra?: string;
  gender?: "male" | "female" | "other";
  language?: string;
  avatarUrl?: string;
  isPremium: boolean;
  /**
   * Backend `is_profile_updated`. When false, birth fields are editable without premium
   * (first-time profile completion — mirrors Flutter `ProfilePage(isProfileUpdated: false)`).
   */
  isProfileUpdated?: boolean;
  /**
   * Backend `user_type` (e.g. `customer`, `astrologer`). When missing, web treats user as customer for home chrome.
   * Mirrors Flutter `saveUserType(result['user_type'] == 'customer')` used for consultation banner vs astrologer flow.
   */
  userType?: string;
}
