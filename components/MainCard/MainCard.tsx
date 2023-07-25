import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import MiniCard from '../searchInput/MiniCard/MiniCard';
import styles from './MainCard.module.css';
import DefaultImage from '../default/default.png';
import Link from "next/link";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface
    categories: ICategory[]
}

export default function MainCard({categories, service}:Props) {
    const code = encodeURIComponent(`${service.name}`)
    return (
        <>
            <Link href={`/services/${code}`}>
                <div className={styles.wrapper}>
                    {
                        service.images[0] != 'default.png' && <Image 
                        alt={'not image'} 
                        src={`${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/${service.images[0]}`} 
                        width={365} 
                        height={209} 
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority={true}
                        className={styles.img}/>
                    }
                    {
                        service.images[0] == 'default.png' && <Image 
                        alt={'not image'} 
                        src={'/default/default.png'} 
                        width={365} 
                        height={209} 
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority
                        className={styles.img}/>
                    }
                    <MiniCard child category={categories} service={service}/>
                </div>
            </Link>
        </>
    )
}


