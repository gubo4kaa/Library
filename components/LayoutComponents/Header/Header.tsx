import { DetailedHTMLProps, HTMLAttributes } from "react";

import BurgerButton from "@/components/BurgerButton/BurgerButton";
import ButtonNew from "@/components/ButtonNew/ButtonNew";
import cn from 'classnames';
import BlurHeader from "../BlurHeader/BlurHeader";
import styles from './Header.module.css';
import Search from "@/components/Search/Search";
import ButtonsOpenPop from "./ButtonsOpenPop/ButtonsOpenPop";




interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    category: ICategory[]
}

const Header = ({category, className}:Props) => {
  return <div className={cn(className, styles.wrapper)}>
        <BurgerButton className={styles.burger}/>
        <Search category={category}/>
        <ButtonsOpenPop/>
        <BlurHeader />
    </div>
}

export default Header