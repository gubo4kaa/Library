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
              <Image src={'/LibraryLogoCurrent.svg'} priority={true} quality={100} width={152} height={40} alt={''}/>
            </Link>
            <p className={styles.subtitle}>Categories</p>
            <CategoryList category={categories}/>
            {/* <Link href={`${process.env.NEXT_PUBLIC_UISCORE}`} className={styles.cardLink}>
              <div className={styles.UiscoreLogo}>
                <video width="218" loop autoPlay muted height="120">
                  <source src="./video/BannerSite.mp4" type="video/mp4"/>
                </video>
                <Image src={"/UiscoreVideo.jpg"} width={218} height={120} alt='Uiscore'/>
                s;dlkfj
              </div>
              <div className={styles.hWrapper}>
                <h4>
                  Uiscore
                </h4>
                <p>
                  Promoted
                </p>
              </div>
            </Link> */}
            <div className={cn(styles.UiscoreLogo, styles.cardHelp)}>
              <h5>
                Help us become better! 
              </h5>
              <p>
                Take a short survey on what could be improved in the library.
              </p>
              <ButtonNew href='https://forms.gle/Vu6PfB9XThuwcX7NA' size='es' iconPosition={'iconRight'} width='max'>Take the survey <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path d="M17.1666 10.3792L11.5416 16.2126M17.1666 10.3792L11.5416 4.5459M17.1666 10.3792L3.83325 10.3792" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </ButtonNew>
            </div>
            <div className={styles.tuk}></div>
            <ButtonNew href='https://forms.gle/Vu6PfB9XThuwcX7NA' type='Default Ghost' size='es'   iconPosition={'iconRight'} width='max'>
              Support Us
            </ButtonNew>
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
                © 2024 Made by Uiscore<br/>
                libary@uiscore.io
              </p>
            </footer>
          </div>
        </div>
      </div>
    )
  }

export default Sidebar