"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './BurgerButton.module.css'
import BurgerLogo from './Burger.svg'
import Image from "next/image";
import { useOpenMenuStore } from '@/store/store';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function BurgerButton({}:Props) {
  const [menuOpen, setOpenMenu] = useOpenMenuStore((state) => [state.menuOpen, state.setOpenMenu])
  
  return <div className={styles.wrapper} onClick={() => setOpenMenu(true)}>
      <Image src={BurgerLogo} alt=''/>
    </div>
}



