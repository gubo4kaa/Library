import cn from "classnames";
import styles from "./CategoryBadge.module.css";

interface Props {
  category?: ICategory;
  fallbackLabel?: string;
  className?: string;
}

export default function CategoryBadge({
  category,
  fallbackLabel = "Unsorted",
  className,
}: Props) {
  return (
    <span className={cn(styles.badge, className)}>
      {category?.logo ? (
        <span
          className={styles.icon}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: category.logo }}
        />
      ) : null}
      <span className={styles.label}>{category?.nameCategory || fallbackLabel}</span>
    </span>
  );
}
