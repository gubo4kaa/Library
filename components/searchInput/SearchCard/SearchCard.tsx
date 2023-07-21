import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './SearchCard.module.css'
import Link from 'next/link';
import { env } from 'process';
import Image from "next/image";
import ArrowLogo from './Arrow.svg'
import { motion } from 'framer-motion';



interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface;
    category: ICategory[];
}

export default function SearchCard({category,service}:Props) {
    const findCategory = category.filter((item) => item.id == service.categoryId)
  return (
    <Link href={''}>
        <div className={styles.wrapper}>
            <Image width={58} height={58} src="http://localhost:8000/default.png" className={styles.logo} alt={''}/>
            <div className={styles.titleWrapper}>
                <h5>
                    {service.name}
                </h5>
                <div className={styles.subTitle}>
                    <p>
                        {findCategory[0].nameCategory}
                    </p>
                    <span></span>
                    <p>
                        {service.price}
                    </p>
                </div>
            </div>
            <div
                // whileHover={{
                //     scale: 1.2,
                //     transition: { duration: 1 },
                // }}
                className={styles.arrow}>
                <Image width={24} height={24} src={ArrowLogo} alt={''}/>
            </div>
        </div>
    </Link>
  )
}

