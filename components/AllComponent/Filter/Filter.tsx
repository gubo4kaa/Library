'use client'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import styles from './Filter.module.css'
import { storeFilterService } from '@/store/storeFilterService'
import LibraryService from '@/services/services'
import Image from "next/image";
import CloseLogo from './Close.svg'
import cn from 'classnames';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  services: IServiceInterface[] | null
}

export default function Filter({services}:Props) {
  const [filterService, setFilterService] = storeFilterService((state) => [state.filterService, state.setFilterService])

  function filter(featuredFilter: boolean, priceFilter: string, servicesInFilter: IServiceInterface[]) {
    console.log(servicesInFilter);
    
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
    console.log(newArr);
    if(newArr.length == 0) {
      setFilterService(null)
      console.log(filterService);
    } else {
      setFilterService(newArr)
    }
  }

  const [stateFilterFeatured, setStateFilterFeatured] = useState<boolean>(false)
  const [statePrise, setStatePrise] = useState('')

  useEffect(() => {
    console.log(statePrise);
    console.log(stateFilterFeatured);
    if(services) {
      filter(stateFilterFeatured, statePrise, services)
    }
  }, [stateFilterFeatured, statePrise])

  return (
    <div className={styles.wrapper}>
      <span className={cn(styles.button, {
        [styles.active]: stateFilterFeatured == true
        })} onClick={() => {stateFilterFeatured ? setStateFilterFeatured(false): setStateFilterFeatured(true)}}>
        Featured
        {
          stateFilterFeatured == true && <Image src={CloseLogo} width={20} height={20} alt=''></Image>
        }
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Free'
        })} onClick={() => {statePrise ? statePrise == 'Free' ?  setStatePrise(''): setStatePrise('Free') : setStatePrise('Free')}}>
        Free
        {
          statePrise == 'Free' && <Image src={CloseLogo} width={20} height={20} alt=''></Image>
        }
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Paid'
        })} onClick={() => {statePrise ? statePrise == 'Paid' ?  setStatePrise(''): setStatePrise('Paid'): setStatePrise('Paid')}}>
        Paid
        {
          statePrise == 'Paid' && <Image src={CloseLogo} width={20} height={20} alt=''></Image>
        }
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Trial'
        })} onClick={() => {statePrise ? statePrise == 'Trial' ?  setStatePrise(''): setStatePrise('Trial'): setStatePrise('Trial')}}>
        Trial
        {
          statePrise == 'Trial' && <Image src={CloseLogo} width={20} height={20} alt=''></Image>
        }
      </span>
      <span className={cn(styles.button, {
        [styles.active]: statePrise == 'Freemium'
        })} onClick={() => {statePrise ? statePrise == 'Freemium' ?  setStatePrise(''): setStatePrise('Freemium'): setStatePrise('Freemium')}}>
        Freemium
        {
          statePrise == 'Freemium' && <Image src={CloseLogo} width={20} height={20} alt=''></Image>
        }
      </span>
    </div>
  )
}

