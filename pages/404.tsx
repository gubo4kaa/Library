import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './404.module.css'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function Custom404({}: Props) {
  return <div>404</div>
}

