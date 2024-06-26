'use client'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ButtonNew.module.css'
import cn from 'classnames';
import Link from 'next/link';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>,HTMLAnchorElement> {
    href?: string,
    disable?: boolean,
    type?: 'LinkGhost' | 'Primary' | 'Default Ghost' | 'Default Primary' | 'Secondary Ghost',
    size?: 'es' | 's' | 'm' ,
    iconPosition?: 'icon' | 'iconLeft' | 'iconRight' | null,
    width?: 'max' | 'min',
    preventDefault?: false | true,
    target?: boolean
}

export default function ButtonNew({ type='Primary', disable = false, iconPosition = null , width = 'min',preventDefault=false, className, href, size='m', target, children, ...props}:Props):JSX.Element {

  return <a href={href} onClick={i => {if(!disable) if(preventDefault) i.preventDefault()}} className={cn(styles.button, {
    [styles.sizeEs]: size == 'es',
    [styles.sizeS]: size == 's',
    [styles.sizeM]: size == 'm',
    [styles.iconLeft]: iconPosition == 'iconLeft',
    [styles.iconRight]: iconPosition == 'iconRight',
    [styles.icon]: iconPosition == 'icon',
    [styles.maxWidth]: width == 'max',
    [styles.primary]: type == 'Primary',
    [styles.linkGhost]: type == 'LinkGhost',
    [styles.secondaryGhost]: type == 'Secondary Ghost',
    [styles.defaultGhost]: type == 'Default Ghost',
    [styles.defaultPrimary]: type == 'Default Primary',
    [styles.disable]: disable == true,
    }, className)} target={target? '_blank': ''} {...props}>
    {children}
    </a>
}


