import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './ImagesComponent.module.css';
import Image from "next/image";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface
}

export default function ImagesComponent({service}:Props) {
  return (
    <div className={styles.wrapper}>  
        <Image 
            alt={'not image'} 
            src={`${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/${service.images[1]}`} 
            width={365} 
            height={209} 
            sizes="100vw"
            style={{
                width: '100%',
                height: 'auto',
            }}
            priority={true}
            className={styles.img}/>
        {/* <img src={`${process.env.NEXT_PUBLIC_LIBRARY_API}/${service.id}/${service.images[0]}`} alt='' className={styles.image}/> */}
    </div>
  )
}

