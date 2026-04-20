"use client";

import ButtonNew from "@/components/ButtonNew/ButtonNew";
import { useSubscribeStore } from "@/store/SubscribeStore";
import { useBlurStore } from "@/store/storeBlur";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./LibrarySidebar.module.css";

interface Props {
  categories: ICategory[];
  className?: string;
}

const legendItems = [
  { label: "Featured", tone: "featured" },
  { label: "Free", tone: "free" },
  { label: "Paid", tone: "paid" },
  { label: "Trial", tone: "trial" },
  { label: "Promoted", tone: "promoted" },
] as const;

const featuredCategoryOrder = [
  "AI Tools",
  "Design Tools",
  "Developer Tools",
  "3D Graphics",
  "No-Code",
] as const;

const socialLinks = [
  {
    label: "Email",
    href: "mailto:hello@uiscore.io",
    icon: <MailIcon />,
  },
  {
    label: "X",
    href: "https://twitter.com/uiscore",
    icon: <XIcon />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/uiscore.io",
    icon: <InstagramIcon />,
  },
] as const;

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.333 3.333h3.334v3.334H3.333V3.333Zm6 0h3.334v3.334H9.333V3.333Zm-6 6h3.334v3.334H3.333V9.333Zm6 0h3.334v3.334H9.333V9.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MobileDeckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.331 4.167c0-.737.597-1.334 1.333-1.334h4c.737 0 1.334.597 1.334 1.334v7.666c0 .737-.597 1.334-1.334 1.334h-4a1.333 1.333 0 0 1-1.333-1.334V4.167Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M7.167 5.5h3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M8.332 11.167h.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M2.833 9.507 4.6 5.833"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m6 3.5 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3.333v9.334M3.333 8h9.334"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.333 5.333A1.333 1.333 0 0 1 4.666 4h6.668a1.333 1.333 0 0 1 1.333 1.333v5.334A1.333 1.333 0 0 1 11.334 12H4.666a1.333 1.333 0 0 1-1.333-1.333V5.333Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="m4 5 4 3 4-3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 3.5 12 12.5M12 3.5l-8 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="3.167"
        y="3.167"
        width="9.666"
        height="9.666"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M10.833 5.333h.007"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="2.167" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function HtmlIcon({ markup }: { markup: string }) {
  return (
    <span
      className={styles.inlineIcon}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

export default function LibrarySidebar({ categories, className }: Props) {
  const pathname = usePathname();
  const [, setBlur] = useBlurStore((state) => [state.blur, state.setBlur]);
  const [, setPopapState] = useSubscribeStore((state) => [
    state.popapState,
    state.setPopapState,
  ]);
  const orderedCategories = [...categories]
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const leftPriority = featuredCategoryOrder.indexOf(
        left.item.nameCategory as (typeof featuredCategoryOrder)[number],
      );
      const rightPriority = featuredCategoryOrder.indexOf(
        right.item.nameCategory as (typeof featuredCategoryOrder)[number],
      );

      if (leftPriority !== -1 || rightPriority !== -1) {
        if (leftPriority === -1) return 1;
        if (rightPriority === -1) return -1;
        return leftPriority - rightPriority;
      }

      return left.index - right.index;
    })
    .map(({ item }) => item);

  return (
    <aside className={cn(styles.wrapper, className)}>
      <div className={styles.sticky}>
        <div className={styles.scroll}>
          <div className={styles.main}>
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Platform</p>
              <Link href="/" className={cn(styles.navLink, styles.active)}>
                <span className={styles.navIcon}>
                  <GridIcon />
                </span>
                <span className={styles.label}>Resources</span>
              </Link>
              <div className={cn(styles.navLink, styles.isDisabled)}>
                <span className={styles.navIcon}>
                  <MobileDeckIcon />
                </span>
                <span className={styles.label}>Mobile Deck</span>
                <span className={styles.badgeSoon}>Soon</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Categories</p>
              <Link
                href="/recently"
                className={cn(
                  styles.navLink,
                  (pathname === "/" || pathname === "/recently") && styles.active,
                )}
              >
                <span className={styles.navIcon}>
                  <GridIcon />
                </span>
                <span className={styles.label}>All Resources</span>
              </Link>
              {orderedCategories.map((item) => {
                const href = `/category/${encodeURIComponent(item.nameCategory)}`;
                return (
                  <Link
                    key={item.id}
                    href={href}
                    className={cn(
                      styles.navLink,
                      pathname === href && styles.active,
                    )}
                  >
                    <span className={styles.navIcon}>
                      <HtmlIcon markup={item.logo} />
                    </span>
                    <span className={styles.label}>{item.nameCategory}</span>
                    <span className={styles.trailingIcon}>
                      <ChevronIcon />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className={styles.divider} />

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Filter</p>
              {legendItems.map((item) => (
                <div key={item.label} className={styles.legendItem}>
                  <span className={styles.legendDot} data-tone={item.tone} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider} />

            <ButtonNew
              type="Default Ghost"
              size="s"
              width="max"
              className={styles.submitButton}
              onClick={() => {
                setBlur(true);
                setPopapState("addForm");
              }}
            >
              <span className={styles.submitContent}>
                <PlusIcon />
                <span>Submit Resource</span>
              </span>
            </ButtonNew>
          </div>

          <div className={styles.footerStack}>
            <Link
              href="https://uiscore.io"
              target="_blank"
              rel="noreferrer"
              className={styles.promoCard}
            >
              <div className={styles.promoMedia}>
                <Image
                  src="/UiscorePublic.png"
                  alt=""
                  fill
                  sizes="244px"
                  className={styles.promoImage}
                />
              </div>
              <div className={styles.promoBody}>
                <p className={styles.promoTitle}>Uiscore Design Marketplace</p>
                <p className={styles.promoText}>
                  A collection of ultimate solutions for your needs
                </p>
              </div>
            </Link>

            <div className={styles.socialRow}>
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.socialButton}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            <p className={styles.copyright}>
              © 2026 Uiscore. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
