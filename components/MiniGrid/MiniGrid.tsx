import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import MainCard from '../MainCard/MainCard';
import styles from './MiniGrid.module.css';
import LinkGrid from '../LinkGrid/LinkGrid';



interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    size: "mini" | "full";
    items: IServiceInterface[];
    category: ICategory[];
    name: string;
    link: string;
    featured?: boolean;
}

export default function MiniGrid({ name, size, items, category, link, featured}:Props) {
  return (
    <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <h4>
                {
                    name
                }
            </h4>
            <LinkGrid url={link} featured={featured}>View More</LinkGrid>
        </div>
        <div className={styles.grid}>
        {
            items.map((item) => (
                <MainCard key={item.id} service={item} categories={category} />
            ))
        }
        </div>
    </div>
  )
}

