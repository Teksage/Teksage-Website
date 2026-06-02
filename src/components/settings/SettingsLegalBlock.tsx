import type { LegalBlock } from "@/types/settings-legal";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { cn } from "@/lib/utils";

type SettingsLegalBlockProps = {
  block: LegalBlock;
  index: number;
};

export function SettingsLegalBlock({ block, index }: SettingsLegalBlockProps) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={`heading-${index}`}
          className="mb-6 text-xl font-bold text-[var(--color-brand-black)]"
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          key={`paragraph-${index}`}
          className={cn(SETTINGS_UI.legalParagraph, "mb-4 text-justify last:mb-0")}
        >
          {block.text}
        </p>
      );
    case "subsection":
      return (
        <div key={`subsection-${index}`} className="mb-6">
          <h3 className="text-xl font-semibold text-[var(--color-brand-black)]">
            {block.title}
          </h3>
          <p
            className={cn(
              SETTINGS_UI.legalParagraph,
              "mt-3 whitespace-pre-line text-justify"
            )}
          >
            {block.body}
          </p>
        </div>
      );
    case "bullets":
      return (
        <ul
          key={`bullets-${index}`}
          className="mb-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-600"
        >
          {block.items.map((item) => (
            <li key={item.slice(0, 40)} className="text-justify">
              {item}
            </li>
          ))}
        </ul>
      );
    case "contact":
      return (
        <div key={`contact-${index}`} className="mb-4">
          <p className={cn(SETTINGS_UI.legalParagraph, "text-justify")}>{block.intro}</p>
          <ul className="mt-3 list-disc pl-5 text-sm text-neutral-600">
            <li className="text-justify">
              By email:{" "}
              <a
                href={`mailto:${block.email}`}
                className="font-medium text-[var(--color-brand-primary)] underline-offset-2 hover:underline"
              >
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
