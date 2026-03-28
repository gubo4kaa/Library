import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./AllComponent.module.css";
import MainCard from "../MainCard/MainCard";
import Filter from "./Filter/Filter";
import FilterGrid from "./FilterGrid/FilterGrid";
import NotFound from "../NotFound/NotFound";
import Breadcrumbs, { BreadcrumbItem } from "../Breadcrumbs/Breadcrumbs";

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  services: IServiceInterface[];
  namePage: string;
  categories: ICategory[];
  breadcrumbs?: BreadcrumbItem[];
}

export default function AllComponent({
  categories,
  services,
  namePage,
  breadcrumbs = [],
}: Props) {
  return (
    <div className={styles.wrapper}>
      {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <div className={styles.header}>
        {namePage}
        {services[0] && <Filter services={services} />}
      </div>
      {services[0] && (
        <FilterGrid categories={categories} services={services} />
      )}

      {!services[0] && <NotFound />}

      {/* <div className={styles.grid}>
            {
                services[0] && services.map((item) => (
                    <MainCard categories={categories} key={item.id} service={item}/>
                ))
            }
        </div> */}
    </div>
  );
}
