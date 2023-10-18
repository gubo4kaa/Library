import Link from 'next/link'
import styles from './Sidebar.module.css'
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import LibraryLogo from './icons/logo.svg'
import ArrowLogo from './icons/Arrow.svg'
import ArrowBlue from './icons/ArrowBlue.svg'
import UiLogo from './icons/LogoUi.svg'
import Image from "next/image";
import { motion } from 'framer-motion';
import Button from '@/components/Button/Button';
import CategoryList from './CategoryList/CategoryList';
import CloseButton from '@/components/CloseButton/CloseButton';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  categories: ICategory[]
}
// encodeURIComponent(category.nameCategory.trim())

const Sidebar = ({categories, className}: Props) => {
      return (
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.stickyWrapper}>
          <div className={styles.scrollWrapper}> 
            <Link href={'/'} className={styles.linkLogo}> 
              <Image src={LibraryLogo} alt={''}/>
            </Link>
            <p className={styles.subtitle}>Categories</p>
            <CategoryList category={categories}/>
            <div className={styles.cardWrapper}>
              <Image src='/uiscoreLogo.png' width={48} height={48} alt={''}/>
              <h4>
                Uiscore 
              </h4>
              <p>
              Explore our superb UI Kits, <br/>
              3D Bundles and Mockups
              </p>
              <Button width='full' href={process.env.NEXT_PUBLIC_UISCORE} color='whiteBlue'>
                Visit Uiscore
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Arrow Right">
                  <path id="Vector 190" d="M16.6673 10.1917L11.0423 16.0251M16.6673 10.1917L11.0423 4.3584M16.6673 10.1917L3.33398 10.1917" stroke="#2489FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </Button>
            </div>
            <footer className={styles.footer}>
              <p>
                Library is part of Uiscore.<br/>
                © 2023 Uiscore. All rights reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    )
  }

export default Sidebar