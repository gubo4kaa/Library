import cn from 'classnames';
import Image from "next/image";
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import ArrowLogo from './Arrow.svg';
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
  return (
    // <Link href={''}>
        <div className={cn(styles.wrapper, {
            [styles.child]: child
        })}>
            <div className={styles.imageWrapper}>
                {
                    !child && service.avatar != 'default.png' && <img
                    width={58} 
                    height={58}  
                    src={`${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/avatar/${service.avatar}`} 
                    className={styles.logo} 
                    alt={''}/>
                
                }
                {
                    !child && service.avatar == 'default.png' && <Image
                    width={58} 
                    height={58}  
                    src={`/default/defaultAvatar.png`} 
                    className={styles.logo} 
                    alt={''}/>
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
                        {findCategory[0].nameCategory}
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
            <div
                className={styles.arrow}>
                <Image width={24} height={24} src={ArrowLogo} alt={''}/>
            </div>
        </div>
    // </Link>
  )
}
