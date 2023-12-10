import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './ImagesComponent.module.css';
import Image from "next/image";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface
}

export default function ImagesComponent({service}:Props) {
  return (
    <div className={styles.wrapper}>  
        {/* <Image 
            alt={'not image'} 
            src={`${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/${service.images[1]}`} 
            width={1142} 
            height={736} 
            sizes="100vw"
            style={{
                width: '100%',
                height: 'auto',
            }}
            priority={false}
            className={styles.img}/> */}
        <img src={`${process.env.NEXT_PUBLIC_LIBRARY_API}/${service.id}/${service.images[1]}`} alt='' className={styles.img}/>
    </div>
  )
}

