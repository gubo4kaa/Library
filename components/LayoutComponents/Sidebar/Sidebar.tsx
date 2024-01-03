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
            <Link href={`${process.env.NEXT_PUBLIC_UISCORE}`} className={styles.cardLink}>
              <Image src='/UiscorePublic.png' width={218} height={120} alt={''}  quality={100} className={styles.UiscoreLogo}/>
              <div className={styles.hWrapper}>
                <h4>
                  Uiscore 
                </h4>
                <p>
                  Promoted
                </p>
              </div>
            </Link>
            <span className={styles.tuk}></span>
            <footer className={styles.footer}>
              <div className={styles.linkWrapper}>
                <Link href={'https://dribbble.com/uiscore'} className={styles.link}>
                  <Image src={'/icons/Dribbble.svg'} height={20} width={20}  alt={''}></Image>
                </Link>
                <Link href={'https://twitter.com/uiscore'} className={styles.link}>
                  <Image src={'/icons/Twitter.svg'} height={20} width={20}  alt={''}></Image>
                </Link>
                <Link href={'https://www.instagram.com/uiscore.io'} className={styles.link}>
                  <Image src={'/icons/Instagram.svg'} height={20} width={20}  alt={''}></Image>
                </Link>
                <Link href={'https://layers.to/uiscore'} className={styles.link}>
                  <Image src={'/icons/Layers.svg'} height={20} width={20}  alt={''}></Image>
                </Link>
              </div>
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