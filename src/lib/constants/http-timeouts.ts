/** Axios timeouts (ms). Default client stays shorter; long AI routes override. */
export const HTTP_TIMEOUTS = {
  /** Default axios instance — auth, profile, listings. */
  default: 30_000,
  /** Daily / weekly / yearly / life prediction generation can exceed 30s. */
  prediction: 60_000,
} as const;
