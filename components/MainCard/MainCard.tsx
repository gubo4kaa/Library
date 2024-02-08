import Image from "next/image";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import ArrowMain from './Arrow.svg';
import styles from './MainCard.module.css';
import MiniCard from "../MiniCard/MiniCard";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface
    categories: ICategory[]
}

export default function MainCard({categories, service}:Props) {
    const code = encodeURIComponent(`${service.name}`)
    const category = categories.filter((i) => i.id == service.categoryId)
    return (
            // <div className={styles.wrapper}>
                <Link href={`/${encodeURIComponent(category[0].nameCategory)}/${code}`} className={styles.wrapper}> 
                    {/* {
                        service.images[0] != 'default.png' && <img 
                        alt={'not image'} 
                        src={`${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/${service.images[0]}`} 
                        width={365} 
                        height={209} 
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        // priority={true}
                        className={styles.img}/>
                    } */}
                    {/* {
                        service.images[0] == 'default.png' && <Image 
                        alt={'not image'} 
                        src={'/Test.png'} 
                        width={364} 
                        height={209} 
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority={false}
                        className={styles.img}/>
                    } */}
                    {
                        <Image 
                        alt={'not image'} 
                        src={'/Test.png'} 
                        width={352} 
                        height={332} 
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority={false}
                        className={styles.img}/>
                    }
                    <svg className={styles.arrow} width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow Right">
                            <path id="Vector 190" d="M18.3327 11.1911L12.1452 17.6077M18.3327 11.1911L12.1452 4.77441M18.3327 11.1911L3.66602 11.1911" stroke="#909DB3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <div className={styles.headerCard}>
                        <h4>
                            {service.name}
                        </h4>
                        <div className={styles.footer}>
                            <p>
                                {category[0].nameCategory ? category[0].nameCategory : 'category'}
                            </p>
                            <span></span>
                            <p>
                                {service.price}
                            </p>
                            {
                                service.featured && (
                                <>
                                    <span></span>
                                    <div className={styles.featuredWrapper}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="14" height="14" rx="7" fill="#18BED4"/>
                                        <path d="M5.10454 5.78601L3.12891 6.52731C2.89266 6.60168 2.80078 6.7898 2.80078 6.9998C2.80078 7.2098 2.89266 7.39793 3.12891 7.4723L5.10453 8.2136C5.41986 8.33192 5.66867 8.58073 5.78698 8.89605L6.52828 10.8717C6.60266 11.0686 6.79078 11.1998 7.00078 11.1998C7.21078 11.1998 7.39891 11.0686 7.47328 10.8717L8.21458 8.89605C8.33289 8.58073 8.58171 8.33192 8.89703 8.2136L10.8727 7.4723C11.0695 7.39793 11.2008 7.2098 11.2008 6.9998C11.2008 6.7898 11.0695 6.60168 10.8727 6.52731L8.89703 5.78601C8.5817 5.66769 8.33289 5.41888 8.21458 5.10356L7.47328 3.12793C7.39891 2.89168 7.21078 2.7998 7.00078 2.7998C6.79078 2.7998 6.60266 2.89168 6.52828 3.12793L5.78698 5.10356C5.66867 5.41888 5.41986 5.66769 5.10454 5.78601Z" fill="white"/>
                                        </svg>
                                        <p>Featured</p>
                                    </div>
                                </>
                                )
                            }
                        </div>
                    </div>
                </Link>
            // </div>
    )
}


