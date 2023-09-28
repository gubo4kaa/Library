'use client'
import ButtonNew from '@/components/ButtonNew/ButtonNew';
import MainCard from '@/components/MainCard/MainCard';
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Suggested.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    services: IServiceInterface[];
    categories: ICategory[];
}

export default function Suggested({services, categories}:Props) {
    
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4>
          Suggested Resources
        </h4>
        <Link href={'/recently'} className={styles.link}>
          View More
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.16667 5.5L13.75 11L9.16667 16.5" stroke="#2489FF" strokeWidth="1.96364" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
      <div className={styles.wrapperCards}>
        {
          services.map((e, key) => (
              <MainCard key={key}service={e} categories={categories}/>
            )
          )
        }
      </div>
      <ButtonNew href='/recently' className={styles.button} size='s' iconPosition={'iconRight'} type={'Default Primary'} width='max'>
          View More
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Arrow Right">
          <path id="Vector 190" d="M18.3333 11.9023L12.1458 18.3189M18.3333 11.9023L12.1458 5.4856M18.3333 11.9023L3.66663 11.9023" stroke="#2489FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          </svg>
      </ButtonNew>
    </div>
  )
}

