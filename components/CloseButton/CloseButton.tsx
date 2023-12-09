"use client"
import LibraryService from '@/services/services';
import { useOpenMenuStore } from '@/store/store';
import { motion } from 'framer-motion';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './CloseButton.module.css';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

const variantsMenu = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-120%" },
}

export default function CloseButton({}:Props) {
  const [menuOpen, setOpenMenu] = useOpenMenuStore((state) => [state.menuOpen, state.setOpenMenu])
  const searchFunction = async (str: string) => {
    const data = await LibraryService.Search('ui');
  }
  return <motion.div 
    initial = {"closed"}
    animate={menuOpen ? "open" : "closed"}
    variants={variantsMenu}
    transition={{type: 'ease-out', duration: 0.3}}
    className={styles.wrapper} onClick={() => {setOpenMenu(false); searchFunction('ui')}}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Close">
      <path id="Vector" d="M5.83325 5.83301L9.99992 9.99967M9.99992 9.99967L5.83325 14.1663M9.99992 9.99967L14.1666 5.83301M9.99992 9.99967L14.1666 14.1663" stroke="#6E7A90" strokeWidth="1.92" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  </motion.div>
}



