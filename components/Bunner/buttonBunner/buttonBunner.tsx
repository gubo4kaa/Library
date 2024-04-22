'use client'
import ButtonNew from '@/components/ButtonNew/ButtonNew'
import { useSubscribeStore } from '@/store/SubscribeStore'
import { useBlurStore } from '@/store/storeBlur'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './buttonBunner.module.css'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function ButtonBunner({className}:Props) {
    const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
    const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])

  return <div className={styles.wrapper}>
    <span onClick={(i) => {setBlur(true); setPopapState('subscribe')}}>
      <ButtonNew size='es' type='Default Ghost' iconPosition={'iconLeft'}     className={styles.button}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4.16675 10.0003H10.0001M10.0001 10.0003L10.0001 15.8337M10.0001 10.0003L10.0001 4.16699M10.0001 10.0003L15.8334 10.0003" stroke="#505F78" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> 
            Subscribe for Free
      </ButtonNew>
    </span>
  </div>
}

