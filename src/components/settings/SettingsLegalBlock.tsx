import {
  SETTINGS_LEGAL_COPY,
  SETTINGS_LEGAL_UI as L,
} from "@/lib/constants/settings-legal-ui";
import type { SettingsLegalBlockProps } from "@/types";

export function SettingsLegalBlock({ block }: SettingsLegalBlockProps) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className={L.heading}>{block.text}</h2>
      );
    case "paragraph":
      return (
        <p className={L.paragraph}>{block.text}</p>
      );
    case "subsection":
      return (
        <div className={L.subsection}>
          <h3 className={L.subsectionTitle}>{block.title}</h3>
          <p className={`${L.paragraph} whitespace-pre-line`}>{block.body}</p>
        </div>
      );
    case "bullets":
      return (
        <ul className={L.bullets}>
          {block.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      );
    case "contact":
      return (
        <div className={L.contact}>
          <p className={L.paragraph}>{block.intro}</p>
          <ul className={L.bullets}>
            <li>
              {SETTINGS_LEGAL_COPY.emailPrefix}{" "}
              <a href={`mailto:${block.email}`} className={L.contactEmail}>
                {block.email}
              </a>
            </li>
          </ul>
        </div>
      );
    default:
      return null;
  }
}
