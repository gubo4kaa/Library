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
    <span onClick={(i) => {setBlur(true); setPopapState('subscribe')}}>
        <ButtonNew type={'Secondary Ghost'} size='s'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Inbox">
            <path id="Square" fillRule="evenodd" clipRule="evenodd" d="M2.08398 9.99967C2.08398 4.16634 3.75065 3.33301 10.001 3.33301C16.2514 3.33301 17.9173 4.16634 17.9173 9.99967C17.9173 15.833 16.2514 16.6663 10.001 16.6663C3.75065 16.6663 2.08398 15.833 2.08398 9.99967Z" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path id="Stroke 1" d="M15 7.07986C15 7.07986 11.6667 10 10 10C8.33333 10 5 7.08333 5 7.08333" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            </svg>
            Newsletter
        </ButtonNew>
    </span>
    <span onClick={(i) => {setBlur(true); setPopapState('addForm')}}>
        <ButtonNew type={'Primary'} size="s" iconPosition={'iconLeft'} width='min'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Plus">
                <path id="Vector" d="M4.16602 9.99984H9.99935M9.99935 9.99984L9.99935 15.8332M9.99935 9.99984L9.99935 4.1665M9.99935 9.99984L15.8327 9.99984" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </svg>
            Submit Tool
        </ButtonNew>
    </span>
  </div>
}

