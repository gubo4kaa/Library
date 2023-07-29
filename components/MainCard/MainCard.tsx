import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import MiniCard from '../searchInput/MiniCard/MiniCard';
import styles from './MainCard.module.css';
import DefaultImage from '../default/default.png';
import Link from "next/link";
import ArrowMain from './Arrow.svg';



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
                        service.images[0] != 'default.png' && <Image 
                        alt={'not image'} 
                        src={`${process.env.LOCAL_LIBRARY_API}${service.id}/${service.images[0]}`} 
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
                    <Image width={24} className={styles.arrow} height={24} src={ArrowMain} alt={''}/>
                </Link>
            </div>
        </>
    )
}


