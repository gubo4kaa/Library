import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './ServicePage.module.css'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  service: IServiceInterface;
}

export default async function ServicePage( {service} :Props) {
  return <div>{service.name}</div>
}

