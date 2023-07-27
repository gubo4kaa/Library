"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './BlurHeader.module.css'
import { useBlurStore } from '@/store/storeBlur'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function BlurHeader({}:Props) {

  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])

  return (
    blur && <div onClick={() => {setBlur(false)}} className={styles.main}></div>
  )
}

