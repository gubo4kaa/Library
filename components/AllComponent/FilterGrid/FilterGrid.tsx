'use client'
import MainCard from '@/components/MainCard/MainCard'
import NotFound from '@/components/NotFound/NotFound'
import { storeFilterService } from '@/store/storeFilterService'
import cn from 'classnames'
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import styles from './FilterGrid.module.css'


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    services: IServiceInterface[]
    categories: ICategory[]
}

export default function FilterGrid({categories, services}:Props) {
    const [filterService, setFilterService] = storeFilterService((state) => [state.filterService, state.setFilterService])
    return (
        <div className={cn(styles.wrapper, {
            [styles.notfound]: filterService === null
        })}>
            {
                !filterService && <NotFound/>
            }
            {/* {
                !filterService && <p>l;askjdf;</p>
            } */}
            {
                filterService && filterService.map((item) => (
                    <MainCard categories={categories} key={item.id} service={item}/>
                ))
            }
        </div>
    )
}

