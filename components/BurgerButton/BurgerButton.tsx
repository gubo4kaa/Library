"use client";

import { ButtonHTMLAttributes } from "react";
import { useOpenMenuStore } from "@/store/store";
import styles from "./BurgerButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function BurgerButton({ className, ...props }: Props) {
  const setOpenMenu = useOpenMenuStore((state) => state.setOpenMenu);

  return (
    <button
      type="button"
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      aria-label="Open mobile menu"
      onClick={() => setOpenMenu(true)}
      {...props}
    >
      <span className={styles.iconFrame} aria-hidden="true">
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </span>
    </button>
  );
}
