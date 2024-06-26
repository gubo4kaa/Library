"use client"
import { useStateCopy } from '@/store/storeCopy'
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import styles from './CopyPopap.module.css'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function CopyPopap({}:Props) {

    const [copyState, setCopyState] = useStateCopy((state) => [state.copyState, state.setCopyState])
    useEffect(()=> {
        if(copyState) {
            setTimeout(() => setCopyState(false), 1000)
        }
    }, [copyState])
    return( 
        copyState && <div className={styles.wrapper} onClick={() => setCopyState(false)}>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="34.1053" height="34.1053" rx="17.0527" fill="#2489FF" fillOpacity="0.15"/>
        <path d="M18.7102 9.59204C23.2231 9.59204 24.5132 10.8815 24.5132 15.3947C24.5132 19.9079 23.1735 21.1973 18.7102 21.1973C14.2469 21.1973 12.9079 19.9079 12.9079 15.3947C12.9079 10.8815 14.1974 9.59204 18.7102 9.59204Z" stroke="#2489FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.1745 14.5657C9.75747 15.4853 9.59215 16.7318 9.59215 18.3916C9.59215 23.1528 11.0048 24.5131 15.7133 24.5131C17.3688 24.5131 18.617 24.3449 19.5396 23.9199" stroke="#2489FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>
            Link copied!
        </p>
    </div>
    )
}


