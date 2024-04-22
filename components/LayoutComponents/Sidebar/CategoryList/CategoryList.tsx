"use client"
import cn from 'classnames'
import parse from 'html-react-parser'
import { usePathname, useRouter } from 'next/dist/client/components/navigation'
import Image from "next/image"
import Link from 'next/link'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import ArrowLogo from '../icons/Arrow.svg'
import styles from './CategoryList.module.css'

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
      if(pathArr) {
        const codePath = encodeURIComponent(i)
        if (pathArr?.includes(codePath)) {
          return true
        }
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
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Grid">
        <path id="Square" fillRule="evenodd" clipRule="evenodd" d="M21 17.6914C21 14.9692 20.2219 14.1914 17.4998 14.1914C14.7778 14.1914 14 14.9692 14 17.6914C14 20.4136 14.8077 21.1914 17.4998 21.1914C20.1919 21.1914 21 20.4136 21 17.6914Z" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Square_2" fillRule="evenodd" clipRule="evenodd" d="M10 17.6914C10 14.9692 9.22186 14.1914 6.49982 14.1914C3.77778 14.1914 3 14.9692 3 17.6914C3 20.4136 3.80769 21.1914 6.49982 21.1914C9.19195 21.1914 10 20.4136 10 17.6914Z" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Square_3" fillRule="evenodd" clipRule="evenodd" d="M21 6.69141C21 3.96918 20.2219 3.19141 17.4998 3.19141C14.7778 3.19141 14 3.96918 14 6.69141C14 9.41363 14.8077 10.1914 17.4998 10.1914C20.1919 10.1914 21 9.41363 21 6.69141Z" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Square_4" fillRule="evenodd" clipRule="evenodd" d="M10 6.69141C10 3.96918 9.22186 3.19141 6.49982 3.19141C3.77778 3.19141 3 3.96918 3 6.69141C3 9.41363 3.80769 10.1914 6.49982 10.1914C9.19195 10.1914 10 9.41363 10 6.69141Z" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        </svg>
        <p>All Resources</p>
        <svg className={styles.arrow} width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Arrow Right">
        <path id="Vector 190" d="M18.3327 11.1911L12.1452 17.6077M18.3327 11.1911L12.1452 4.77441M18.3327 11.1911L3.66602 11.1911" stroke="#909DB3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        </svg>
      </Link>
  {
    category.map((category: ICategory) => (
      <Link href={`/${encodeURIComponent(category.nameCategory)}`} key={category.id} className={cn(styles.category, {
        [styles.active]: active == category.nameCategory
      }
        )} onClick={() => {setActive(category.nameCategory)}}>
        {
          parse(`${category.logo}`)
        }
        <p>{category.nameCategory}</p>
      <svg className={styles.arrow} width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Arrow Right">
        <path id="Vector 190" d="M18.3327 11.1911L12.1452 17.6077M18.3327 11.1911L12.1452 4.77441M18.3327 11.1911L3.66602 11.1911" stroke="#909DB3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        </svg>
      </Link>
    ))
  }
</div>
}

