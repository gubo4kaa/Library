import ButtonNew from '@/components/ButtonNew/ButtonNew';
import cn from 'classnames';
import Image from "next/image";
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import CategoryList from './CategoryList/CategoryList';
import styles from './Sidebar.module.css';

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
              <Image src={'/main-logo-svg.svg'} priority={true} quality={100} width={165} height={44} alt={''}/>
            </Link>
            <p className={styles.subtitle}>Categories</p>
            <CategoryList category={categories}/>
            {/* <div className={styles.cardWrapper}>
              <Image src='/uiscoreLogo.svg' width={48} height={48} alt={''}/>
              <h4>
                Uiscore 
              </h4>
              <p>
              Explore our superb UI Kits, <br/>
              3D Bundles and Mockups
              </p>
              <ButtonNew width='max' href={process.env.NEXT_PUBLIC_UISCORE} type='Default Primary' size='s'>
                Visit Uiscore
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Arrow Right">
                  <path id="Vector 190" d="M16.6673 10.1917L11.0423 16.0251M16.6673 10.1917L11.0423 4.3584M16.6673 10.1917L3.33398 10.1917" stroke="#2489FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </ButtonNew>
            </div> */}
            <div className={styles.cardWrapper}>
              <Image src='/productHunt.svg' width={48} height={48} alt={''}/>
              <h4>
                We are on Product Hunt
              </h4>
              <p>
              Support us with your vote
              </p>
              <ButtonNew width='max' href={'https://www.producthunt.com/posts/uiscore-library'} type='Default Primary' size='s'>
                Support 
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow Right">
                <path id="Vector 190" d="M16.6673 10.1917L11.0423 16.0251M16.6673 10.1917L11.0423 4.3584M16.6673 10.1917L3.33398 10.1917" stroke="#2489FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                </svg>
              </ButtonNew>
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