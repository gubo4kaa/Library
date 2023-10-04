'use client'
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import styles from './ym.module.css'
import ym, { YMInitializer } from 'react-yandex-metrika';
import { Router } from 'next/router';
import { Analytics } from '@vercel/analytics/react';



interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Ymetrica({}:Props) {

  // useEffect(() => {
  //   Router.events.on('routeChangeComplete',(url: string) => {
  //     if(typeof window !== undefined) {
  //       ym('hit', url)
  //     }
  //   })
  // },[])

  return <div>
    <Analytics/>
    <YMInitializer
      accounts={[95109351]}
      options={{webvisor: true,defer: true}}
      version='2'
    />
    </div>
}

