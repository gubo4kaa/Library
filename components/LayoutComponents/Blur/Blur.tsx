"use client"
import { useBlurStore } from '@/store/storeBlur'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Blur.module.css'
import { useSubscribeStore } from '@/store/SubscribeStore'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Blur({}:Props) {

  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
  const [subscribeState, setSubscribeState] = useSubscribeStore((state) => [state.subscribeState, state.setSubscribeState])

  return (
    blur && <div onClick={() => {setBlur(false); if(subscribeState)setSubscribeState(false)}} className={styles.main}></div>
  )
}

