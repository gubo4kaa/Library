'use client'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ButtonNew.module.css'
import cn from 'classnames';
import Link from 'next/link';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    href?: string,
    type?: 'LinkGhost' | 'Primary' | 'Default Ghost',
    size?: 'es' | 's' | 'm' ,
    iconPosition?: 'icon' | 'iconLeft' | 'iconRight' | null,
    width?: 'max' | 'min',
    preventDefault?: false | true
}

export default function ButtonNew({ type='Primary', iconPosition = null , width = 'min',preventDefault=false, className, href, size='m', children}:Props):JSX.Element {

  return <a href={href} onClick={i => {if(preventDefault) i.preventDefault()}} className={cn(styles.button, {
    [styles.sizeEs]: size == 'es',
    [styles.sizeS]: size == 's',
    [styles.sizeM]: size == 'm',
    [styles.iconLeft]: iconPosition == 'iconLeft',
    [styles.iconRight]: iconPosition == 'iconRight',
    [styles.icon]: iconPosition == 'icon',
    [styles.maxWidth]: width == 'max',
    [styles.primary]: type == 'Primary',
    [styles.linkGhost]: type == 'LinkGhost',
    [styles.defaultGhost]: type == 'Default Ghost',
  }, className)}>
    {children}
    </a>
}


