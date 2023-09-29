import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './VideoCard.module.css'
import cn from 'classnames'


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    src: string;
    title: string;
    p: string;
}

export default function VideoCard({src, title, p, className}:Props) {
    return (
        <div className={cn(styles.wrapper, className)}>
            {/* <video width="100%" loop autoPlay muted className={styles.video}  > */}
            <video width="100%" autoPlay loop muted playsInline className={styles.video}  >
                <source src={src} type="video/mp4"/>
            </video>
            <div className={styles.titleWrapper}>
                <h5>{title}</h5>
                <p>{p}</p>
            </div>
        </div>
    )
}

