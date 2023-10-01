'use client'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ym.module.css'
import ym, { YMInitializer } from 'react-yandex-metrika';
import { Router } from 'next/router';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Ymetrica({}:Props) {
  Router.events.on('routeChangeComplete',(url: string) => {
    if(typeof window !== undefined) {
      ym('hit', url)
    }
  })
  return <div>
       {
        
       }
    </div>
}

