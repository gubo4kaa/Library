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

  // useEffect(() => {
  //   Router.events.on('routeChangeComplete',(url: string) => {
  //     if(typeof window !== undefined) {
  //       ym('hit', url)
  //     }
  //   })
  // },[])

  Router.events.on('routeChangeComplete',(url: string) => {
    if(typeof window !== undefined) {
      ym('hit', url)
    }
  })

  return <div>
    {
      parse(
        `
          <script type="text/javascript" >
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
          ym(95109351, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
          });
          </script>
      `
      )
    }
    {/*
    <YMInitializer
      accounts={[95109351]}
      options={{webvisor: true,defer: true}}
      version='2'
    /> */}
    </div>
}

