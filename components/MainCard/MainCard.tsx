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
    return (
        <>
            <div className={styles.wrapper}>
                <Link href={`/services/${code}`}>
                    {
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
                    }
                    {
                        service.images[0] == 'default.png' && <Image 
                        alt={'not image'} 
                        src={'/default/default.png'} 
                        width={364} 
                        height={209} 
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority={false}
                        className={styles.img}/>
                    }
                    <MiniCard child category={categories} service={service}/>
                    <svg className={styles.arrow} width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow Right">
                            <path id="Vector 190" d="M18.3327 11.1911L12.1452 17.6077M18.3327 11.1911L12.1452 4.77441M18.3327 11.1911L3.66602 11.1911" stroke="#909DB3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </Link>
            </div>
        </>
    )
}


