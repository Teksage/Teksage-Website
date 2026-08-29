export type LegalParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type LegalHeadingBlock = {
  type: "heading";
  text: string;
};

export type LegalSubsectionBlock = {
  type: "subsection";
  title: string;
  body: string;
};

export type LegalBulletBlock = {
  type: "bullets";
  items: readonly string[];
};

export type LegalContactBlock = {
  type: "contact";
  intro: string;
  email: string;
};

export type LegalBlock =
  | LegalParagraphBlock
  | LegalHeadingBlock
  | LegalSubsectionBlock
  | LegalBulletBlock
  | LegalContactBlock;

export type LegalSectionGroup = {
  heading: string | null;
  items: readonly LegalBlock[];
};

export interface SettingsLegalViewProps {
  title: string;
  blocks: readonly LegalBlock[];
}

export interface SettingsLegalBlockProps {
  block: LegalBlock;
  index: number;
}

export type SettingsLegalTocItem = {
  id: string;
  label: string;
  level: 1 | 2;
};
