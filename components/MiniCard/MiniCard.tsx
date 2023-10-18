import cn from 'classnames';
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import ArrowSearch from './ArrowSearch.svg';
import FeaturedLogo from './Featured.svg';
import FeaturedBadge from './badgeFeatured.svg';
import styles from './MiniCard.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface;
    category: ICategory[];
    child?: boolean;
}

export default function MiniCard({child = false,category,service}:Props) {
    const findCategory = category.filter((item) => item.id == service.categoryId)
    const codeService = encodeURIComponent(service.name);
  return (
    // <Link href={`/services/${codeService}`}>
        <div className={cn(styles.wrapper, {
            [styles.child]: child
        })}>
            <div className={styles.imageWrapper}>
                {
                    !child && service.avatar != 'default.png' && (
                        <img
                        width={42} 
                        height={42}  
                        src={`${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/avatar/${service.avatar}`} 
                        className={styles.logo} 
                        alt={''}/>
                    ) 
                }
                {
                    !child && service.avatar == 'default.png' && (
                        <Image
                        width={42} 
                        height={42} 
                        src={`/default/defaultAvatarr.png`} 
                        className={styles.logo} 
                        alt={''}/>
                    )
                }
                {
                    service.featured && !child && (
                        <Image className={styles.featuredLogo} src={FeaturedBadge} alt={''}/>
                    )
                }
            </div>
            <div className={styles.titleWrapper}>
                <div  className={styles.title}>
                    {service.name}
                </div>
                <div className={styles.subTitle}>
                    <p>
                        {findCategory[0] ? findCategory[0].nameCategory : "deleted category"}
                    </p>
                    <span></span>
                    <p>
                        {service.price}
                    </p>
                    {
                        service.featured && child && (
                            <>
                                <span></span>
                                <Image src={FeaturedLogo} alt={''}/>
                                <p className={styles.featured}>
                                    Featured
                                </p>
                            </>
                        )
                    }
                </div>
            </div>
            {
                !child && <div
                    className={styles.arrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow Right">
                        <path id="Vector 190" d="M20 12L13.25 19M20 12L13.25 5M20 12L4 12" stroke="#909DB3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </div>
            }
        </div>
    // </Link>
  )
}

