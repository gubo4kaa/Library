"use client"
import { useSubscribeStore } from '@/store/SubscribeStore'
import { useBlurStore } from '@/store/storeBlur'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Blur.module.css'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Blur({}:Props) {

  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
  const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])

  return (
    blur && <div onClick={() => {setBlur(false); if(popapState)setPopapState(null)}} className={styles.main}></div>
  )
}

