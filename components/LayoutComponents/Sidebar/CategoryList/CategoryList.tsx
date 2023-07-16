"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './CategoryList.module.css'
import ArrowLogo from '../icons/Arrow.svg'
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from "next/image";



interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    category: ICategory[]
}

export default function CategoryList({category}:Props) {
  return <div className={styles.categoriesWrapper}>
  {
    category.map((category: ICategory) => (
      <div key={category.id} className={styles.category}>
        {
          parse(`${category.logo}`)
        }
        <Link href={'/'} >{category.nameCategory}</Link>
      <Image src={ArrowLogo} alt={''} className={styles.arrow}/>
      </div>
    ))
  }
</div>
}

