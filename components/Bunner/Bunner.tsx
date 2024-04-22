import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Bunner.module.css'
import cn from 'classnames'
import ButtonNew from '../ButtonNew/ButtonNew'
import Image from 'next/image'

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
                <ButtonNew size='es' type='Default Ghost' iconPosition={'iconLeft'} className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16675 10.0003H10.0001M10.0001 10.0003L10.0001 15.8337M10.0001 10.0003L10.0001 4.16699M10.0001 10.0003L15.8334 10.0003" stroke="#505F78" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
                    Subscribe for Free
                </ButtonNew>
            </div>
            <Image className={styles.img} src={'/bunner/bunner-bg.png'} alt={''} width={575} height={150}></Image>
            <Image className={styles.img__mb} src={'/bunner/bunner-bg__mobile.png'} alt={''} width={335} height={390}></Image>
        </div>
    )
}

