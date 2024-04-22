import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Bunner.module.css'
import cn from 'classnames'
import ButtonNew from '../ButtonNew/ButtonNew'
import Image from 'next/image'
import ButtonBunner from './buttonBunner/buttonBunner'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
   
}

export default function Bunner({className}:Props) {
    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={cn(styles.main)}>
                <h1>
                    Ultimate collection for creativity & productivity
                </h1>
                <p>
                    Browse the best resources with weekly updates!
                </p>
                <ButtonBunner/>
            </div>
            <Image className={styles.img} src={'/bunner/bunner-bg.png'} alt={''} width={575} height={150}></Image>
            <Image className={styles.img__mb} src={'/bunner/bunner-bg__mobile.png'} alt={''} width={335} height={390}></Image>
        </div>
    )
}

