"use client"
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './CloseButton.module.css'
import BurgerLogo from './Burger.svg'
import Image from "next/image";
import CloseLogo from './Close.svg'
import { useOpenMenuStore } from '@/store/store';
import { motion } from 'framer-motion';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

const variantsMenu = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-120%" },
}

export default function CloseButton({}:Props) {
  const [menuOpen, setOpenMenu] = useOpenMenuStore((state) => [state.menuOpen, state.setOpenMenu])
  return <motion.div 
    initial = {"closed"}
    animate={menuOpen ? "open" : "closed"}
    variants={variantsMenu}
    transition={{type: 'ease-out', duration: 0.3}}
    className={styles.wrapper} onClick={() => setOpenMenu(false)}>
    <Image src={CloseLogo} alt=''/>
  </motion.div>
}



