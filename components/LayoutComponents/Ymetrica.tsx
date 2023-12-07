'use client'
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import styles from './ym.module.css'
import ym, { YMInitializer } from 'react-yandex-metrika';
import { Router } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import parse from 'html-react-parser';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Ymetrica({}:Props) {
  Router.events.on('routeChangeComplete',(url: string) => {
    if(typeof window !== undefined) {
      ym('hit', url)
    }
  })

  return <div>
      <YMInitializer accounts={[95789485]} options={{webvisor: true}} />
    </div>
}

