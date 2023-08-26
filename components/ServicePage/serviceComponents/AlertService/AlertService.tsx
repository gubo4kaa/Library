"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './AlertService.module.css'
import Button from '@/components/Button/Button'
import AlertLogo from './Alert.svg';
import Image from "next/image";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function AlertService({}:Props) {
  return (
    <Button href='/' className={styles.button} onClick={(e) => e.preventDefault} color='whiteBlue'>
        <Image src={AlertLogo} alt='' width={22} height={22}/>
    </Button>
  )
}

