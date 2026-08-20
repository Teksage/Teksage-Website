/** Divisional chart ids — AstroSoft `POST …/horoscope/{id}`. */

export const HOROSCOPE_DIVISIONAL_CHARTS = [
  { id: "d1", fallbackLabel: "Rasi" },
  { id: "d2", fallbackLabel: "Hora" },
  { id: "d3", fallbackLabel: "Drekkana" },
  { id: "d4", fallbackLabel: "Chaturthamsa" },
  { id: "d5", fallbackLabel: "Panchamsa" },
  { id: "d6", fallbackLabel: "Shastamsa" },
  { id: "d7", fallbackLabel: "Saptamsa" },
  { id: "d8", fallbackLabel: "Ashtamsa" },
  { id: "d9", fallbackLabel: "Navamsa" },
  { id: "d10", fallbackLabel: "Dasamsa" },
  { id: "d11", fallbackLabel: "Ekadamsa" },
  { id: "d12", fallbackLabel: "Dwadasamsa" },
  { id: "d16", fallbackLabel: "Shodasamsa" },
  { id: "d20", fallbackLabel: "Vimsamsa" },
  { id: "d24", fallbackLabel: "Chaturvimsamsa" },
  { id: "d27", fallbackLabel: "Bhamsa" },
  { id: "d30", fallbackLabel: "Trimsamsa" },
  { id: "d40", fallbackLabel: "Khavedamsa" },
  { id: "d45", fallbackLabel: "Akshavedamsa" },
  { id: "d60", fallbackLabel: "Shashtiamsa" },
] as const;

export const HOROSCOPE_CHARTS_UI = {
  listAria: "Divisional charts",
  loadingCharts: "Loading more charts…",
  prevChartAria: "Previous chart",
  nextChartAria: "Next chart",
  prevGlyph: "‹",
  nextGlyph: "›",
} as const;
