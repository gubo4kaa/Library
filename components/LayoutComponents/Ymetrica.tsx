'use client'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ym.module.css'
import ym, { YMInitializer } from 'react-yandex-metrika';
import { Router } from 'next/router';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Ymetrica({}:Props) {
  ym("95109351", 'init', {
    defer: true,
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true
})
  return <div>
       
    </div>
}

