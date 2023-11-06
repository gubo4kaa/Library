import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './NotFound.module.css'
import Image from "next/image";


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function NotFound({}:Props) {
  return (
    <div className={styles.wrapper}>
        <Image src='/notfound.png' priority quality={100} width={220} height={200} alt=''></Image>
        <h4>Nothing Found</h4>
        <p>Perhaps these resources are not in this category,<br /> try choosing another.</p>
    </div>
  )
}

