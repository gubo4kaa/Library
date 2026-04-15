import Image from "next/image";
import Link from "next/link";

import styles from "./NotFoundPage.module.css";

interface Props {
  title?: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
}

export default function NotFoundPage({
  title = "Page not found",
  description = "The page may have been moved, deleted, or never existed. Return to the catalog and continue browsing Library.",
  href = "/",
  buttonLabel = "Back to Home",
}: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Image
          src="/notfound.png"
          alt="Page not found"
          width={240}
          height={218}
          priority
          className={styles.image}
        />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <Link href={href} className={styles.button}>
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
