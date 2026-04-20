import Link from "next/link";
import styles from "./SectionHeader.module.css";

interface Props {
  title: string;
  tone?: "new" | "featured" | "recent";
  actionHref?: string;
  actionLabel?: string;
  iconMarkup?: string;
}

function SectionIcon({ tone = "recent" }: { tone?: Props["tone"] }) {
  if (tone === "new") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 2.25 9.37 6.63l4.38 1.37-4.38 1.37L8 13.75 6.63 9.37 2.25 8l4.38-1.37L8 2.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (tone === "featured") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 2.25 9.29 5.86l3.71.15-2.92 2.3 1.02 3.56L8 9.94 4.9 11.87l1.02-3.56L3 6.01l3.71-.15L8 2.25Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 5.25v3.5l2.25 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SectionHeader({
  title,
  tone = "recent",
  actionHref,
  actionLabel = "View More",
  iconMarkup,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleGroup}>
        {iconMarkup ? (
          <span
            className={styles.iconMarkup}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: iconMarkup }}
          />
        ) : (
          <span className={styles.icon} data-tone={tone}>
            <SectionIcon tone={tone} />
          </span>
        )}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {actionHref ? (
        <Link href={actionHref} className={styles.action}>
          {actionLabel}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="m6 3.5 4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}
