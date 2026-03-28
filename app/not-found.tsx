import type { Metadata } from "next";

import NotFound from "@/components/NotFound/NotFound";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Nothing Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppNotFound() {
  return (
    <div className={styles.wrapper}>
      <NotFound />
    </div>
  );
}
