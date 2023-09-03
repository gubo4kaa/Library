import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Button.module.css'
import cn from 'classnames';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    size?: 'extraSmall' | 'small' | 'medium'
    color?: 'whiteBlue' | 'grey' | 'blueWhite' | 'whiteBlue',
    width?: 'full' | null,
    height?: 'full' | null,
    href?: string,
    type: 'LinkGhost' | null
}

export default function Button({color = 'blueWhite', href, size = 'small', width = null, height = null , className, type=null, children}:Props):JSX.Element {

  return <a href={href} className={cn(styles.button, {
    [styles.extraSmall]: size == 'extraSmall',
    [styles.small]: size == 'small',
    [styles.medium]: size == 'medium',
    [styles.blueWhite]: color == 'blueWhite',
    [styles.whiteBlue]: color == 'whiteBlue',
    [styles.widthFull]: width == 'full',
    [styles.heightFull]: height == 'full',
    [styles.linkGhost]: type == 'LinkGhost',
  }, className)}>
    {children}
    </a>
}


