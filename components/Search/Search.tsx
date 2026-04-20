"use client";
import LibraryService from "@/services/services";
import CategoryBadge from "@/shared/ui/category-badge/CategoryBadge";
import { useSubscribeStore } from "@/store/SubscribeStore";
import { useBlurStore } from "@/store/storeBlur";
import cn from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Search.module.css";

interface Props {
  category: ICategory[];
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 7C2 4.23858 4.23858 2 7.00025 2C9.76158 2.00014 12 4.23865 12 7C12 9.76135 9.76158 11.9999 7.00025 12C4.23858 12 2 9.76142 2 7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0234 13.0242L10.667 10.6677"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4L8 8M8 8L4 12M8 8L12 4M8 8L12 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 9V3M6 3L3.5 5.5M6 3L8.5 5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 3V9M6 9L3.5 6.5M6 9L8.5 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <span className={styles.loadingIcon} aria-hidden="true">
      <span className={styles.loadingArc} />
    </span>
  );
}

function getAvatarUrl(service: IServiceInterface) {
  if (!service.avatar || service.avatar === "default.png") {
    return null;
  }

  return `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/avatar/${service.avatar}`;
}

function getPriceTone(price: string) {
  const normalized = price.trim().toLowerCase();

  if (normalized === "free") {
    return styles.badgeFree;
  }

  if (normalized === "trial") {
    return styles.badgeTrial;
  }

  if (normalized === "paid") {
    return styles.badgePaid;
  }

  return "";
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export default function Search({ category }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IServiceInterface[]>([]);
  const [defaultItems, setDefaultItems] = useState<IServiceInterface[]>([]);
  const [loadingState, setLoadingState] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [, setBlur] = useBlurStore((state) => [state.blur, state.setBlur]);
  const [popapState, setPopapState] = useSubscribeStore((state) => [
    state.popapState,
    state.setPopapState,
  ]);
  const path = usePathname();
  const router = useRouter();

  const isOpen = popapState === "search";
  const normalizedQuery = query.trim();
  const hasQuery = normalizedQuery.length > 0;
  const displayedResults = hasQuery ? results : defaultItems;
  const selectedIndex =
    displayedResults.length === 0
      ? -1
      : Math.min(activeIndex, displayedResults.length - 1);
  const showEmptyState =
    !loadingState && hasQuery && displayedResults.length === 0;
  const groupedResults = useMemo(() => {
    if (!displayedResults.length) {
      return [];
    }

    return [
      {
        title: "Resources",
        items: displayedResults,
      },
    ];
  }, [displayedResults]);

  const handleOpen = useCallback(() => {
    setLoadingState(defaultItems.length === 0);
    setActiveIndex(0);
    setBlur(true);
    setPopapState("search");
  }, [defaultItems.length, setBlur, setPopapState]);

  const handleClose = useCallback(() => {
    setPopapState(null);
    setBlur(false);
    setQuery("");
    setResults([]);
    setLoadingState(false);
    setActiveIndex(0);
  }, [setBlur, setPopapState]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [isOpen]);

  useEffect(() => {
    if (selectedIndex < 0) {
      return;
    }

    itemRefs.current[selectedIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.code === "Slash" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isOpen &&
        !isEditableTarget(event.target)
      ) {
        event.preventDefault();
        handleOpen();
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) {
          handleClose();
        } else {
          handleOpen();
        }
        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        handleClose();
        return;
      }

      if (!isOpen || loadingState || showEmptyState || displayedResults.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % displayedResults.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          current <= 0 ? displayedResults.length - 1 : current - 1,
        );
        return;
      }

      if (event.key === "Enter" && isEditableTarget(event.target)) {
        const selectedItem = displayedResults[selectedIndex];

        if (!selectedItem) {
          return;
        }

        event.preventDefault();
        handleClose();
        router.push(`/services/${encodeURIComponent(selectedItem.name)}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    displayedResults,
    handleClose,
    handleOpen,
    isOpen,
    loadingState,
    router,
    selectedIndex,
    showEmptyState,
  ]);

  useEffect(() => {
    if (!isOpen || defaultItems.length > 0) {
      return;
    }

    let isActive = true;

    LibraryService.AllItems()
      .then(({ data }) => {
        if (!isActive) {
          return;
        }

        const nextItems = (Array.isArray(data) ? data : []).slice(0, 6);
        setDefaultItems(nextItems);
        setActiveIndex(0);
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        setDefaultItems([]);
      })
      .finally(() => {
        if (isActive && !normalizedQuery) {
          setLoadingState(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [isOpen, defaultItems.length, normalizedQuery]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!normalizedQuery) {
      return;
    }

    let isActive = true;
    const timeoutId = window.setTimeout(() => {
      setLoadingState(true);
      LibraryService.Search(normalizedQuery)
        .then(({ data }) => {
          if (!isActive) {
            return;
          }

          setResults((Array.isArray(data) ? data : []).slice(0, 8));
          setActiveIndex(0);
        })
        .catch(() => {
          if (!isActive) {
            return;
          }

          setResults([]);
          setActiveIndex(0);
        })
        .finally(() => {
          if (isActive) {
            setLoadingState(false);
          }
        });
    }, 220);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [defaultItems, isOpen, normalizedQuery]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPopapState(null);
      setBlur(false);
      setQuery("");
      setResults([]);
      setLoadingState(false);
      setActiveIndex(0);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [path, setBlur, setPopapState]);

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.inactive]: Boolean(popapState) && !isOpen,
      })}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-controls="search-command-menu"
      >
        <span className={styles.triggerIcon}>
          <SearchIcon />
        </span>
        <span className={styles.triggerLabel}>Search /</span>
      </button>

      {isOpen ? (
        <div
          id="search-command-menu"
          className={cn(styles.dialog, {
            [styles.dialogState]: loadingState || showEmptyState,
          })}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.searchRow}>
            <span className={styles.searchRowIcon}>
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources or decks"
              className={styles.searchField}
            />
            {(hasQuery || loadingState) && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  if (hasQuery) {
                    setQuery("");
                    setResults([]);
                    setLoadingState(false);
                    inputRef.current?.focus();
                    return;
                  }

                  handleClose();
                }}
                aria-label={hasQuery ? "Clear search" : "Close search"}
              >
                <CloseIcon />
              </button>
            )}
          </div>

          <div className={styles.divider} />

          <div className={styles.content}>
            {loadingState ? (
              <div className={styles.feedbackState}>
                <div className={styles.feedbackTitle}>
                  <LoadingIcon />
                  <span>Loading...</span>
                </div>
              </div>
            ) : null}

            {showEmptyState ? (
              <div className={styles.feedbackState}>
                <div className={styles.feedbackTitle}>Nothing Found</div>
                <p className={styles.feedbackDescription}>
                  Perhaps these resources are not in this category, try choosing another.
                </p>
              </div>
            ) : null}

            {!loadingState && !showEmptyState ? (
              <div className={styles.groups}>
                {groupedResults.map((group) => (
                  <div key={group.title} className={styles.group}>
                    {hasQuery ? null : (
                      <>
                        <div className={styles.groupLabel}>{group.title}</div>
                        <div className={styles.groupDivider} />
                      </>
                    )}

                    <div className={styles.items}>
                      {group.items.map((item, index) => {
                        const itemCategory =
                          category.find((entry) => entry.id === item.categoryId) ||
                          undefined;
                        const avatarUrl = getAvatarUrl(item);

                        return (
                          <Link
                            key={item.id}
                            ref={(element) => {
                              itemRefs.current[index] = element;
                            }}
                            href={`/services/${encodeURIComponent(item.name)}`}
                            className={cn(styles.item, {
                              [styles.itemActive]: index === selectedIndex,
                            })}
                            aria-selected={index === selectedIndex}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={handleClose}
                          >
                            <div className={styles.avatar}>
                              {avatarUrl ? (
                                <span
                                  className={styles.avatarImage}
                                  style={{ backgroundImage: `url(${avatarUrl})` }}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span className={styles.avatarFallback}>
                                  {item.name.slice(0, 1).toUpperCase()}
                                </span>
                              )}
                            </div>

                            <div className={styles.itemTitle}>{item.name}</div>

                            <div className={styles.itemBadges}>
                              <span
                                className={cn(
                                  styles.badge,
                                  getPriceTone(item.price),
                                )}
                              >
                                {item.price}
                              </span>
                              <CategoryBadge
                                category={itemCategory}
                                className={styles.badge}
                                fallbackLabel="AI"
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className={styles.footer}>
            <div className={styles.shortcuts}>
              <span className={styles.shortcut}>
                <ArrowUpIcon />
              </span>
              <span className={styles.shortcut}>
                <ArrowDownIcon />
              </span>
              <span className={styles.footerText}>Navigation</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
