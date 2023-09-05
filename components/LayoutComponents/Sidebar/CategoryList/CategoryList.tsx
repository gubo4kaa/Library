"use client"
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import styles from './CategoryList.module.css'
import ArrowLogo from '../icons/Arrow.svg'
import GridIcon from '../icons/Grid.svg'
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/dist/client/components/navigation';
import cn from 'classnames';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    category: ICategory[]
}

export default function CategoryList({category}:Props) {
  const categoryNameArr: string[] = ['recently'];
  category.map(i => categoryNameArr.push(i.nameCategory))
  const router = useRouter();
  const pathname = usePathname()
  const [active, setActive] = useState<any>(null);
  useEffect(() => {
    const pathArr = pathname?.split('/')
    const sameArrow = categoryNameArr.filter(i => {
      if (pathArr?.includes(i)) {
        return i
      }
    })
    if(sameArrow) {
      setActive(sameArrow);
    } else {
      setActive('');
    }
  }, [pathname, router])

  return <div className={styles.categoriesWrapper}>
      <Link href={`/recently`} className={cn(styles.category, {
          [styles.active]: active == 'recently'
        })} 
        onClick={() => {setActive('recently')}}>
        <Image src={GridIcon} alt={''}/>
        <p>All Resources</p>
      <Image src={ArrowLogo} alt={''} className={styles.arrow}/>
      </Link>
  {
    category.map((category: ICategory) => (
      <Link href={`/category/${encodeURIComponent(category.nameCategory)}`} key={category.id} className={cn(styles.category, {
        [styles.active]: active == category.nameCategory
      }
        )} onClick={() => {setActive(category.nameCategory)}}>
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

