'use client'
import { DetailedHTMLProps, HTMLAttributes, use, useEffect } from 'react'
import styles from './FilterGrid.module.css'
import { storeFilterService } from '@/store/storeFilterService'
import MainCard from '@/components/MainCard/MainCard'
import NotFound from '@/components/NotFound/NotFound'
import cn from 'classnames'


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    services: IServiceInterface[]
    categories: ICategory[]
}

export default function FilterGrid({categories, services}:Props) {
    const [filterService, setFilterService] = storeFilterService((state) => [state.filterService, state.setFilterService])
    useEffect(() => {
        setFilterService(services);
    }, [services])

    useEffect(() => {
        console.log(filterService);
    }, [filterService])

    return (
        <div className={cn(styles.wrapper, {
            [styles.notfound]: filterService === null
        })}>
            {
                filterService === null && <NotFound/>
            }
            {
                filterService && filterService && filterService.map((item) => (
                    <MainCard categories={categories} key={item.id} service={item}/>
                ))
            }
            
        </div>
    )
}

