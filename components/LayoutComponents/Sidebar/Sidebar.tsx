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
              <Image src={UiLogo} alt={''}/>
              <h4>
                Explore our superb UI <br/>
                Kits, 3D Bundles and <br/>
                Mockups
              </h4>
              <Button width='full' href={process.env.NEXT_PUBLIC_UISCORE} color='whiteBlue'>
                Visit Uiscore
                <Image src={ArrowBlue} alt={''}/>
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