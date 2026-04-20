import MainCardImage from "@/components/MainCard/MainCardImage";
import CategoryBadge from "@/shared/ui/category-badge/CategoryBadge";
import Link from "next/link";
import styles from "./ResourceCard.module.css";

interface Props {
  service: IServiceInterface;
  categories: ICategory[];
  eager?: boolean;
}

function getPriceClass(price: string) {
  const normalizedPrice = price.trim().toLowerCase();

  if (normalizedPrice === "free") {
    return styles.priceFree;
  }

  if (normalizedPrice === "trial") {
    return styles.priceTrial;
  }

  if (normalizedPrice === "paid") {
    return styles.pricePaid;
  }

  return "";
}

export default function ResourceCard({
  service,
  categories,
  eager = false,
}: Props) {
  const href = `/services/${encodeURIComponent(service.name)}`;
  const category =
    categories.find((item) => item.id === service.categoryId) || undefined;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.link}>
        <div className={styles.media}>
          <MainCardImage
            alt={service.name}
            eager={eager}
            previewSrc={
              service.images[0] === "default.png"
                ? undefined
                : `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/preview-${service.images[0]}.webp`
            }
            src={
              service.images[0] === "default.png"
                ? "/default/default.png"
                : `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/${service.images[0]}`
            }
          />
          <div className={styles.hoverOverlay} aria-hidden="true">
            <div className={styles.overlayTop}>
              <span className={styles.overlayMeta}>
                <svg viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="5.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 5.25v3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="8" cy="11.2" r="0.8" fill="currentColor" />
                </svg>
                <span>Report</span>
              </span>

              <span className={styles.overlayOpen}>
                <span>Open</span>
                <svg viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <p className={styles.overlayDescription}>
              {service.description || service.name}
            </p>
          </div>
          {/*{service.featured ? (
            <span className={styles.featuredBadge}>Featured</span>
          ) : null}*/}
          <span className={styles.openBadge} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{service.name}</h3>
          <div className={styles.badges}>
            <span className={`${styles.badge} ${getPriceClass(service.price)}`}>
              {service.price}
            </span>
            <CategoryBadge
              category={category}
              className={styles.badge}
              fallbackLabel="Unsorted"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
