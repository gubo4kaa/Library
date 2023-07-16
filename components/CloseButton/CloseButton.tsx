"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './CloseButton.module.css'
import BurgerLogo from './Burger.svg'
import Image from "next/image";
import CloseLogo from './Close.svg'
import { useOpenMenuStore } from '@/store/store';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function CloseButton({}:Props) {
  const [menuOpen, setOpenMenu] = useOpenMenuStore((state) => [state.menuOpen, state.setOpenMenu])
  return <div className={styles.wrapper} onClick={() => setOpenMenu(false)}>
    <Image src={CloseLogo} alt=''/>
  </div>
}



