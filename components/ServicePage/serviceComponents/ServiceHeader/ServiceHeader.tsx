import ButtonNew from '@/components/ButtonNew/ButtonNew';
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import AlertService from '../AlertService/AlertService';
import CopyUrlButton from '../CopyUrlButton/CopyUrlButton';
import FeaturedLogo from './Featured.svg';
import styles from './ServiceHeader.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface;
    category: ICategory;
}

export default function ServiceHeader({service, category}:Props) {
  return <div className={styles.wrapper}>
        <Image src={`${process.env.LOCAL_LIBRARY_API}${service.id}/avatar/${service.avatar}`} className={styles.img} height={82} width={82} alt={''}></Image>
        <div className={styles.titleWrapper}>
            <h3>{service.name}</h3>
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
            <div className={styles.buttonWrapperMini}>
                <AlertService/>
                <CopyUrlButton urlCopy={`${service.url}`}/>
            </div>
            <ButtonNew href={`https://${service.url}`} color='blueWhite' iconPosition={'iconRight'} size='m'>
                Explore
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0004 2.75001C4.58418 2.75001 2.75 4.58335 2.75 11C2.75 17.4167 4.65469 19.25 11.0004 19.25C17.3462 19.25 19.25 17.4167 19.25 11M18.3333 3.66668V7.33333M18.3333 3.66668L14.6667 3.66668M18.3333 3.66668L12.8333 9.16668" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </ButtonNew>
        </div>
    </div>
}

