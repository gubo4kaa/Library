import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Button.module.css'
import cn from 'classnames';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    size?: 'extraSmall' | 'small' | 'medium'
    color?: 'whiteBlue' | 'grey' | 'blueWhite' | 'whiteBlue',
    width?: 'full' | null,
    height?: 'full' | null,
    href?: string,
}

export default function Button({color = 'blueWhite', href, size = 'small', width = null, height = null , className, children}:Props):JSX.Element {

  return <a href={href} className={cn(styles.button, {
    [styles.extraSmall]: size == 'extraSmall',
    [styles.small]: size == 'small',
    [styles.medium]: size == 'medium',
    [styles.blueWhite]: color == 'blueWhite',
    [styles.whiteBlue]: color == 'whiteBlue',
    [styles.widthFull]: width == 'full',
    [styles.heightFull]: height == 'full',
  }, className)}>
    {children}
    </a>
}


