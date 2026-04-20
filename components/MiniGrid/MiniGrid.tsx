import SectionHeader from "@/shared/ui/section-header/SectionHeader";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import MainCard from "../MainCard/MainCard";
import styles from "./MiniGrid.module.css";

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  size: "mini" | "full";
  items: IServiceInterface[];
  category: ICategory[];
  name: string;
  link: string;
  featured?: boolean;
  eagerCount?: number;
  tone?: "new" | "featured" | "recent";
}

export default function MiniGrid({
  name,
  items,
  category,
  link,
  eagerCount = 0,
  tone = "recent",
}: Props) {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title={name} tone={tone} actionHref={link} />
      <div className={styles.grid}>
        {items.map((item, index) => (
          <MainCard
            key={item.id}
            service={item}
            categories={category}
            eager={index < eagerCount}
          />
        ))}
      </div>
    </div>
  );
}
