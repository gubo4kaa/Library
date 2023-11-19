import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import MainCard from '../MainCard/MainCard';
import styles from './MiniGrid.module.css';



interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    size: "mini" | "full";
    items: IServiceInterface[];
    category: ICategory[];
    name: string;
    link: string;
}

export default function MiniGrid({ name, size, items, category, link}:Props) {
  return (
    <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <h4>
                {
                    name
                }
            </h4>
            <Link href={link} className={styles.link}>
                View More
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.16667 5.5L13.75 11L9.16667 16.5" stroke="#2489FF" strokeWidth="1.96364" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </Link>
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

