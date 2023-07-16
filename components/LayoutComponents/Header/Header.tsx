import { DetailedHTMLProps, HTMLAttributes } from "react"

import cn from 'classnames';
import styles from './Header.module.css';
import BurgerButton from "@/components/BurgerButton/BurgerButton";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    
}
  

const Header = ({className}:Props) => {
  return <div className={cn(className, styles.wrapper)}>
        <BurgerButton className={styles.burger}/>
        Header
    </div>
}

export default Header