'use client'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './FilterGrid.module.css'
import { storeFilterService } from '@/store/storeFilterService'
import MainCard from '@/components/MainCard/MainCard'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    services: IServiceInterface[]
    categories: ICategory[]
}

export default function FilterGrid({categories, services}:Props) {
  const [filterService, setFilterService] = storeFilterService((state) => [state.filterService, state.setFilterService])
  return (
    <div className={styles.wrapper}>
        {
            filterService[0] && filterService.map((item) => (
                <MainCard categories={categories} key={item.id} service={item}/>
            ))
            // : services.map((item) => (
            //     <MainCard categories={categories} key={item.id} service={item}/>
            // ))
        }
    </div>
  )
}

