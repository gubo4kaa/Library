'use client'
import ButtonNew from '@/components/ButtonNew/ButtonNew'
import { useSubscribeStore } from '@/store/SubscribeStore'
import { useBlurStore } from '@/store/storeBlur'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ButtonsOpenPop.module.css'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function ButtonsOpenPop({}:Props) {
    const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
    const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])

  return <div className={styles.wrapper}>
    <span onClick={(i) => {setBlur(true); setPopapState('addForm')}}>
        <ButtonNew type={'Default Ghost'} size="es">
        Submit Resource 
        </ButtonNew>
    </span>
    <span onClick={(i) => {setBlur(true); setPopapState('subscribe')}}>
        <ButtonNew type={'Primary'} size='es'>
            Subscribe
        </ButtonNew>
    </span>
  </div>
}

