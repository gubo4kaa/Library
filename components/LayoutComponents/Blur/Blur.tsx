"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Blur.module.css'
import { useBlurStore } from '@/store/storeBlur'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Blur({}:Props) {

  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])

  return (
    blur && <div className={styles.main}></div>
  )
}

