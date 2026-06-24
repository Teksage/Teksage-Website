import type { UserProfile } from "@/types";

export type ConsultationBookingDetailsCardProps = {
  date: string;
  time: string;
  consultingOn: string;
  language: string;
  profile: UserProfile | null;
  labels: {
    date: string;
    time: string;
    consultingOn: string;
    language: string;
    dob: string;
    tob: string;
    pob: string;
    rasi: string;
    nakshatram: string;
  };
};
