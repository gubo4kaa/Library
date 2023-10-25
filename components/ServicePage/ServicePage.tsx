import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ServicePage.module.css'
import ServiceHeader from './serviceComponents/ServiceHeader/ServiceHeader';
import ImagesComponent from './serviceComponents/ImagesComponent/ImagesComponent';
import Suggested from './serviceComponents/Suggested/Suggested';
import ReportForm from './serviceComponents/ReportForm/ReportForm';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  service: IServiceInterface;
  category: ICategory;
  categories: ICategory[];
  lastService?: IServiceInterface[];
}

export default async function ServicePage( {service, category, categories, lastService} :Props) {
  return <div className={styles.wrapper}>
    {/* <ReportForm idService={service.id}/> */}
    {/* <ReportForm idService={service.id}/> */}
    <ServiceHeader service={service} category={category}/>
    <ImagesComponent service={service}/>
    <div className={styles.overview}>
      <h4>
        Overview
      </h4>
      <p>
        {
          service.description
        }
      </p>
    </div>
    {
      lastService && <Suggested categories={categories} services={lastService}/>
    }
    <div>
    </div>
  </div>
}