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
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Burger">
    <rect id="Rectangle 1172" x="3" y="5" width="15.2963" height="1.74814" rx="0.874072" fill="#6E7A90"/>
    <rect id="Rectangle 1173" x="3" y="10.0254" width="15.2963" height="1.74814" rx="0.874072" fill="#6E7A90"/>
    <rect id="Rectangle 1174" x="3" y="15.0527" width="15.2963" height="1.74814" rx="0.874072" fill="#6E7A90"/>
    </g>
    </svg>
    </div>
}



