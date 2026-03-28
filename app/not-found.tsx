import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Image
          src="/notfound.png"
          alt="Page not found"
          width={240}
          height={218}
          className={styles.image}
          priority
        />
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          The page may have been moved, deleted, or never existed. Use the main
          catalog to continue browsing Library.
        </p>
        <Link href="/" className={styles.button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
