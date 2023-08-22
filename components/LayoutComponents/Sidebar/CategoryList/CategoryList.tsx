"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './CategoryList.module.css'
import ArrowLogo from '../icons/Arrow.svg'
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/dist/client/components/navigation';



interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    category: ICategory[]
}

export default function CategoryList({category}:Props) {
  const router = useRouter();
  console.log(router);

  return <div className={styles.categoriesWrapper}>
  {
    category.map((category: ICategory) => (
      <Link href={`/category/${encodeURIComponent(category.nameCategory)}`} key={category.id} className={styles.category}>
        {
          parse(`${category.logo}`)
        }
        <p>{category.nameCategory}</p>
      <Image src={ArrowLogo} alt={''} className={styles.arrow}/>
      </Link>
    ))
  }
</div>
}

