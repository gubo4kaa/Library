import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ButtonNew.module.css'
import cn from 'classnames';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    href?: string,
    type?: 'LinkGhost' | 'Primary',
    icon?: 'iconLeft' | 'iconRight' | null,
    width?: 'max' | 'min',
}

export default function ButtonNew({ type='Primary',icon = null, width = 'min', className, href = '', children}:Props):JSX.Element {

  return <a href={href} className={cn(styles.button, {
    [styles.iconLeft]: icon == 'iconLeft',
    [styles.iconRight]: icon == 'iconRight',
    [styles.primary]: type == 'Primary',
    [styles.linkGhost]: type == 'LinkGhost',
    [styles.maxWidth]: width == 'max',
  }, className)}>
    {children}
    </a>
}


