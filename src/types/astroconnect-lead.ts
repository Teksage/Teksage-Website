export type AstroConnectLeadResponse = {
  id: number;
  name: string;
  mobile_masked: string;
  categories: string[];
  source_marathon_id: number | null;
  status: string;
  whatsapp_opt_in: boolean;
  already_submitted: boolean;
  whatsapp_click_url: string | null;
  channel_url: string;
  instagram_url: string;
};

export type AstroConnectLeadPayload = {
  name: string;
  country_code: string;
  mobile_number: string;
  categories: string[];
  source_marathon_id: number;
  platform?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};
