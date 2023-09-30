"use client"
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from 'react'
import styles from './MobileMenu.module.css'
import { useOpenMenuStore } from '@/store/store';

import cn from 'classnames';
import { motion } from 'framer-motion';
import CloseButton from '@/components/CloseButton/CloseButton';
import ym from 'react-yandex-metrika';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    children: ReactNode;
}

const variantsMenu = {
    open: { x: 0 },
    closed: { x: "-100%" },
}

const variantsBlur = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}

export default function MobileMenu({children}:Props) {
    const [menuOpen, setOpenMenu] = useOpenMenuStore((state) => [state.menuOpen, state.setOpenMenu])
    ym('95109351', 'init', {
        defer: true,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
    })
    return <>
        <motion.div
            initial = {"closed"}
            animate={menuOpen ? "open" : "closed"}
            variants={variantsMenu}
            transition={{type: 'ease-out', duration: 0.3}}
            className={cn(styles.wrapper)}>
            {children}
            <CloseButton/> 
        </motion.div>
        <motion.div
            initial = {"closed"}
            animate={menuOpen ? "open" : "closed"}
            variants={variantsBlur}
            transition={{type: 'ease-out', duration: 0}}
            className={styles.blur}
            onClick={() => setOpenMenu(false)}
            >
        </motion.div>
    </>
    
}

