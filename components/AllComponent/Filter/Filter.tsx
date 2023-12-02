'use client'
import { storeFilterService } from '@/store/storeFilterService'
import cn from 'classnames'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import styles from './Filter.module.css'
import { FeaturedFilter } from '@/store/featuredFilterStore'
import { usePathname, useRouter } from 'next/dist/client/components/navigation'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  services: IServiceInterface[] | null
}

export default function Filter({services}:Props) {
  const pathName = usePathname();
  const [filterService, setFilterService] = storeFilterService((state) => [state.filterService, state.setFilterService])
  const [featuredFilter, setFeaturedFilter] = FeaturedFilter((state) => [state.featuredFilter, state.setFeaturedFilter])

  function filter(featuredFilter: boolean, priceFilter: string, servicesInFilter: IServiceInterface[]) {
    const newArr: IServiceInterface[] = servicesInFilter.filter((i) => {
      let boolean = true
      if(featuredFilter) {
        if(i.featured == true) {
          boolean = true
        }
      }

      if(featuredFilter && !priceFilter) {
        if(i.featured == true) {
          return true
        } else {
          return false
        }
      }

      if(priceFilter && !featuredFilter) {
        if(i.price == priceFilter) {
          return true
        } else {
          return false
        }
      }

      if(priceFilter && featuredFilter) {
        if(i.price == priceFilter && i.featured == featuredFilter) {
          return true
        } else {
          return false
        }
      }

      if(priceFilter) {
        if(i.price == priceFilter) {
          boolean = true
        } else {
          boolean = false
        }
      }
      return boolean
    })
    
    if(newArr.length == 0) {
      return null
    } else {
     return newArr
    }
  }

  const [statePrise, setStatePrise] = useState('')
  useEffect(() => {
    if(services) {
      setFilterService(filter(featuredFilter, statePrise, services))
    }
  }, [featuredFilter, statePrise])

  useEffect(() => {
    console.log(pathName);
    if(pathName != '/recently') {
      setFeaturedFilter(false);
    }
  }, [services])
  return (
    <div className={styles.wrapper}>
      <span className={cn(styles.button, {
        [styles.active]: featuredFilter == true
        })} onClick={() => {
          if(featuredFilter || featuredFilter) {
            setFeaturedFilter(false);
          } else {
            setFeaturedFilter(true);
          }
        }}>
        Featured
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.83334 1.8335L6.00001 6.00016M6.00001 6.00016L1.83334 10.1668M6.00001 6.00016L10.1667 1.8335M6.00001 6.00016L10.1667 10.1668" stroke="#2489FF" strokeWidth
="1.92" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Free'
        })} onClick={() => {statePrise ? statePrise == 'Free' ?  setStatePrise(''): setStatePrise('Free') : setStatePrise('Free')}}>
        Free
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.83334 1.8335L6.00001 6.00016M6.00001 6.00016L1.83334 10.1668M6.00001 6.00016L10.1667 1.8335M6.00001 6.00016L10.1667 10.1668" stroke="#2489FF" strokeWidth
="1.92" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Paid'
        })} onClick={() => {statePrise ? statePrise == 'Paid' ?  setStatePrise(''): setStatePrise('Paid'): setStatePrise('Paid')}}>
        Paid
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.83334 1.8335L6.00001 6.00016M6.00001 6.00016L1.83334 10.1668M6.00001 6.00016L10.1667 1.8335M6.00001 6.00016L10.1667 10.1668" stroke="#2489FF" strokeWidth
  ="1.92" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Trial'
        })} onClick={() => {statePrise ? statePrise == 'Trial' ?  setStatePrise(''): setStatePrise('Trial'): setStatePrise('Trial')}}>
        Trial
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.83334 1.8335L6.00001 6.00016M6.00001 6.00016L1.83334 10.1668M6.00001 6.00016L10.1667 1.8335M6.00001 6.00016L10.1667 10.1668" stroke="#2489FF" strokeWidth
="1.92" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Freemium'
        })} onClick={() => {statePrise ? statePrise == 'Freemium' ?  setStatePrise(''): setStatePrise('Freemium'): setStatePrise('Freemium')}}>
        Freemium
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.83334 1.8335L6.00001 6.00016M6.00001 6.00016L1.83334 10.1668M6.00001 6.00016L10.1667 1.8335M6.00001 6.00016L10.1667 10.1668" stroke="#2489FF" strokeWidth
="1.92" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </span>
    </div>
  )
}

