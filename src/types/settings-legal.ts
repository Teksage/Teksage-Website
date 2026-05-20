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
