import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ServiceHeader.module.css'
import Image from "next/image";
import FeaturedLogo from './Featured.svg';
import ArrowLogo from './Arrow.svg';
import Button from '@/components/Button/Button';
import AlertService from '../AlertService/AlertService';
import Link from 'next/link';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface;
    category: ICategory;
}

export default function ServiceHeader({service, category}:Props) {
  return <div className={styles.wrapper}>
        <Image src={`${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/avatar/${service.avatar}`} className={styles.img} height={82} width={82} alt={''}></Image>
        <div className={styles.titleWrapper}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <div className={styles.tagList}>
                {
                    category ? category.nameCategory : "none Category"
                }
                <span></span>
                {
                    service.price
                }
                {
                    service.featured && (
                        <div>
                            <span></span>
                            <Image src={FeaturedLogo} alt={''}/>
                            <p className={styles.featured}>
                                Featured
                            </p>
                        </div>   
                    )
                }
            </div>
        </div>
        <div className={styles.buttonWrapper}>
            <AlertService/>
            <Button href={`https://${service.url}`} color='blueWhite'>
                Explore
                <Image src={ArrowLogo} width={22} height={22} alt=''></Image>
            </Button>
        </div>
    </div>
}

