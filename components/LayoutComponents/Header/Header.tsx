import { DetailedHTMLProps, HTMLAttributes } from "react"

import cn from 'classnames';
import styles from './Header.module.css';
import BurgerButton from "@/components/BurgerButton/BurgerButton";
import SearchInput from "@/components/searchInput/searchInput";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    category: ICategory[]
}
  

const Header = ({category, className}:Props) => {
  return <div className={cn(className, styles.wrapper)}>
        <BurgerButton className={styles.burger}/>
        <SearchInput category={category}/>
    </div>
}

export default Header