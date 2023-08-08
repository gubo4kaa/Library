import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './MiniGrid.module.css'
import MainCard from '../MainCard/MainCard';
import Link from 'next/link';
import ArrowLogo from './Arrow.svg'
import Image from "next/image";



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
                <Image src={ArrowLogo} alt={''}/>
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

