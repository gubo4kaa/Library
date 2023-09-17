import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ServicePage.module.css'
import ServiceHeader from './serviceComponents/ServiceHeader/ServiceHeader';
import ImagesComponent from './serviceComponents/ImagesComponent/ImagesComponent';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  service: IServiceInterface;
  category: ICategory;
}

export default async function ServicePage( {service, category} :Props) {
  return <div className={styles.wrapper}>
    <ServiceHeader service={service} category={category}/>
    {/* <iframe src={`https://${service.url}`} className={styles.iframe}></iframe> */}
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
  </div>
}