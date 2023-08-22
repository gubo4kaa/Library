import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './AllComponent.module.css'
import MainCard from '../MainCard/MainCard';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    services: IServiceInterface[];
    namePage: string;
    categories: ICategory[];
}

export default function AllComponent({categories, services, namePage}:Props) {
  return <div className={styles.wrapper}>
    <h4>
        {namePage}
    </h4>
    <div className={styles.grid}>
        {
            services[0] && services.map((item) => (
                <MainCard categories={categories} key={item.id} service={item}/>
            ))
        }
    </div>
  </div>
}

