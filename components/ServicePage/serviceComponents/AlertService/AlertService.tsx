"use client"
import Button from '@/components/Button/Button';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './AlertService.module.css';
import ButtonNew from '@/components/ButtonNew/ButtonNew';
import { useReportStore } from '@/store/idServiceStore';
import { useBlurStore } from '@/store/storeBlur';
import { useSubscribeStore } from '@/store/SubscribeStore';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {

}

export default function AlertService({}:Props) {

  const [reportPopapState, setReportPopapState] = useReportStore((state) => [state.reportPopapState, state.setReportPopapState])
  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
  const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])

  return (
      <ButtonNew onClick={(e) => {setBlur(true);setPopapState('report'); e.preventDefault();}} href='/' type='Default Ghost' size='m'  iconPosition='icon' className={styles.button} color='whiteBlue'>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Alert">
          <path id="Vector" d="M10.9996 2.75C14.6563 2.75008 20.6219 14.4357 19.7079 16.8792C18.7939 19.3227 10.9996 19.2498 10.9996 19.2498C10.9996 19.2498 3.20527 19.3227 2.29126 16.8792C1.37725 14.4357 7.34279 2.75008 10.9996 2.75Z" stroke="#6E7A90" strokeWidth="1.96364"/>
          <path id="Vector 13" d="M11 12.375V8.25" stroke="#5A6C8A" strokeWidth="1.6" strokeLinecap="round"/>
          <path id="Vector 14" d="M11 15.5835V15.5825" stroke="#5A6C8A" strokeWidth="1.6" strokeLinecap="round"/>
          </g>
          </svg>
      </ButtonNew>
  )
}

