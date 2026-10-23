"use client";

import { useEffect, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_REVIEW_SCREEN,
  CONSULTATION_REVIEW_UI as U,
} from "@/lib/constants/consultation-answers-ready";
import { cn } from "@/lib/utils";
import type { ConsultationReviewStatus } from "@/types/consultation";

type Props = {
  eventId: number;
  rating?: number | null;
  feedback?: string | null;
  reviewStatus?: ConsultationReviewStatus | null;
  onSubmitted: (next: {
    rating: number | null;
    feedback: string;
    reviewStatus: ConsultationReviewStatus | null;
  }) => void;
  onSubmit: (body: {
    rating: number;
    feedback?: string;
  }) => Promise<void>;
  onDelete: () => Promise<void>;
};

function Stars({
  value,
  interactive,
  onPick,
}: {
  value: number;
  interactive?: boolean;
  onPick?: (n: number) => void;
}) {
  return (
    <div className={U.starsRow} role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) =>
        interactive ? (
          <button
            key={n}
            type="button"
            className={cn(U.starBtn, n > value && U.starOff)}
            onClick={() => onPick?.(n)}
            aria-label={`${n}`}
          >
            ★
          </button>
        ) : (
          <span
            key={n}
            className={cn(
              "text-base leading-none text-[var(--color-chat-star)]",
              n > value && U.starOff
            )}
            aria-hidden
          >
            ★
          </span>
        )
      )}
    </div>
  );
}

export function ConsultationSummaryReviewCard({
  rating,
  feedback,
  reviewStatus,
  onSubmitted,
  onSubmit,
  onDelete,
}: Props) {
  const R = useI18nConstants(CONSULTATION_REVIEW_SCREEN);
  const hasReview = rating != null && rating > 0;
  const canMutate =
    reviewStatus !== "approved" &&
    (reviewStatus == null ||
      reviewStatus === "pending" ||
      reviewStatus === "rejected");

  const [editing, setEditing] = useState(!hasReview);
  const [stars, setStars] = useState(rating ?? 0);
  const [text, setText] = useState(feedback ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStars(rating ?? 0);
    setText(feedback ?? "");
    setEditing(!(rating != null && rating > 0));
  }, [rating, feedback, reviewStatus]);

  if (reviewStatus === "approved") {
    return (
      <section className={U.card}>
        <div className={U.header}>
          <h2 className={U.title}>{R.title}</h2>
          <span className={cn(U.chip, U.chipApproved)}>{R.approvedStatus}</span>
        </div>
        <div className={U.approvedBody}>
          <Stars value={rating ?? 0} />
          {feedback?.trim() ? (
            <p className={U.approvedText}>{feedback.trim()}</p>
          ) : null}
        </div>
      </section>
    );
  }

  if (!canMutate && hasReview) {
    return (
      <section className={U.card}>
        <div className={U.body}>
          <p className={U.hint}>{R.alreadyRated}</p>
        </div>
      </section>
    );
  }

  const handleSubmit = async () => {
    if (stars < 1) {
      setError(R.ratingRequired);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onSubmit({
        rating: stars,
        feedback: text.trim() || undefined,
      });
      onSubmitted({
        rating: stars,
        feedback: text.trim(),
        reviewStatus: "pending",
      });
      setEditing(false);
    } catch {
      setError(R.submitError);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(R.deleteConfirm)) return;
    setBusy(true);
    setError(null);
    try {
      await onDelete();
      onSubmitted({ rating: null, feedback: "", reviewStatus: null });
      setStars(0);
      setText("");
      setEditing(true);
    } catch {
      setError(R.deleteError);
    } finally {
      setBusy(false);
    }
  };

  const statusChip =
    reviewStatus === "pending" ? (
      <span className={cn(U.chip, U.chipPending)}>{R.pendingStatus}</span>
    ) : reviewStatus === "rejected" ? (
      <span className={cn(U.chip, U.chipRejected)}>{R.rejectedStatus}</span>
    ) : null;

  // Submitted view — not editing: stars + text + Edit / Delete
  if (hasReview && !editing) {
    return (
      <section className={U.card}>
        <div className={U.header}>
          <h2 className={U.title}>{R.title}</h2>
          {statusChip}
        </div>
        <div className={U.body}>
          <Stars value={rating ?? 0} />
          <p className={U.hint}>
            {reviewStatus === "pending"
              ? R.pendingEditHint
              : reviewStatus === "rejected"
                ? R.rejectedEditHint
                : R.subtitle}
          </p>
          {feedback?.trim() ? (
            <p className={U.approvedText}>{feedback.trim()}</p>
          ) : null}
          {error ? <p className={U.error}>{error}</p> : null}
          <div className={U.viewActions}>
            <button
              type="button"
              className={U.dangerBtn}
              disabled={busy}
              onClick={() => void handleDelete()}
            >
              {R.deleteCta}
            </button>
            <button
              type="button"
              className={U.secondaryBtn}
              disabled={busy}
              onClick={() => {
                setStars(rating ?? 0);
                setText(feedback ?? "");
                setError(null);
                setEditing(true);
              }}
            >
              {R.editCta}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Compose / edit form
  return (
    <section className={U.card}>
      <div className={U.header}>
        <h2 className={U.title}>{R.title}</h2>
        {statusChip}
      </div>
      <div className={U.body}>
        <Stars value={stars} interactive onPick={setStars} />
        <p className={U.hint}>
          {hasReview ? R.editSubtitle : R.subtitle}
        </p>
        <textarea
          className={U.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={R.feedbackPlaceholder}
          maxLength={1000}
          rows={2}
          aria-label={R.feedbackLabel}
        />
        <div className={U.footerSplit}>
          {error ? <p className={U.error}>{error}</p> : <span />}
          <div className={U.footer}>
            {hasReview ? (
              <button
                type="button"
                className={U.secondaryBtn}
                disabled={busy}
                onClick={() => {
                  setStars(rating ?? 0);
                  setText(feedback ?? "");
                  setError(null);
                  setEditing(false);
                }}
              >
                {R.cancelCta}
              </button>
            ) : null}
            <button
              type="button"
              className={U.submitBtn}
              disabled={busy}
              onClick={() => void handleSubmit()}
            >
              {busy ? R.submitting : hasReview ? R.updateCta : R.submitCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
