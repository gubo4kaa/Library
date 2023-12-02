'use client'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './LinkGrid.module.css'
import Link from 'next/link';
import { storeFilterService } from '@/store/storeFilterService';
import { FeaturedFilter } from '@/store/featuredFilterStore';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
	url: string;
	featured?: boolean;
}



export default function LinkGrid({url, featured, children}:Props) {

const [featuredFilter, setFeaturedFilter] = FeaturedFilter((state) => [state.featuredFilter, state.setFeaturedFilter])
  return  <Link href={url} className={styles.link} onClick={() => {if(featured) setFeaturedFilter(true)}}>
			{children}
			<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.16667 5.5L13.75 11L9.16667 16.5" stroke="#2489FF" strokeWidth="1.96364" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
        </Link>
}

