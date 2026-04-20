import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./AllComponent.module.css";
import Filter from "./Filter/Filter";
import FilterGrid from "./FilterGrid/FilterGrid";
import NotFound from "../NotFound/NotFound";
import Breadcrumbs, { BreadcrumbItem } from "../Breadcrumbs/Breadcrumbs";
import SectionHeader from "@/shared/ui/section-header/SectionHeader";

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  services: IServiceInterface[];
  namePage: string;
  categories: ICategory[];
  currentCategory?: ICategory;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AllComponent({
  categories,
  services,
  namePage,
  currentCategory,
  breadcrumbs = [],
}: Props) {
  return (
    <div className={styles.wrapper}>
      <Breadcrumbs items={breadcrumbs} />
      <div className={styles.headerRow}>
        <SectionHeader
          title={namePage}
          tone="recent"
          iconMarkup={currentCategory?.logo}
        />
        {services[0] && <Filter services={services} />}
      </div>
      {services[0] && (
        <FilterGrid categories={categories} services={services} />
      )}

      {!services[0] && <NotFound />}
    </div>
  );
}
