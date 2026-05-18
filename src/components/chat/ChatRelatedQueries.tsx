import { CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatRelatedQueriesProps } from "@/types/ui/chat";

export function ChatRelatedQueries({
  queries,
  loading,
  visible,
  onSelect,
}: ChatRelatedQueriesProps) {
  if (!visible || (!loading && queries.length === 0)) return null;

  return (
    <section className="border-t border-black/10 bg-white/60 px-4 py-3 backdrop-blur-sm">
      <p className="mb-2 text-center text-sm font-medium text-black/60">
        {CHAT_SCREEN.relatedTitle}
      </p>
      {loading ? (
        <div className="mx-auto flex max-w-md flex-col gap-2">
          <div className="h-10 animate-pulse rounded-xl bg-black/5" />
          <div className="h-10 animate-pulse rounded-xl bg-black/5" />
        </div>
      ) : (
        <ul className="mx-auto flex max-w-md flex-col gap-2">
          {queries.map((q) => (
            <li key={q}>
              <button
                type="button"
                onClick={() => onSelect(q)}
                className={cn(
                  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5",
                  "text-left text-sm text-black/80 transition-colors hover:bg-[var(--color-home-screen-mint)]"
                )}
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
