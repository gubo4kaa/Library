'use client'
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './ImagesComponent.module.css';
import Image from "next/image";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    service: IServiceInterface
}

export default function ImagesComponent({service}:Props) {
    const arrImages = service.images.filter(i => {if(i != 'default.png') return true })
    console.log(arrImages);
  return (
    <div>
        {
            arrImages && arrImages.map((i) => (
                <Image key={i} src={`${process.env.NEXT_PUBLIC_LIBRARY_API}/${service.id}/${i}`} width={1142} height={736} alt=''></Image>
            ))
        }
    </div>
  )
}

