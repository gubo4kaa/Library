import ServicePage from "@/components/ServicePage/ServicePage"
import { Metadata } from "next"

type Props = {
  params: {
    name: string
  }
}

export async function generateMetadata({params: {name}}: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(name)
    // made metadata is service page
  }
}

export const revalidate = 10

async function getService(name: string) {
  const services = await fetch(`http://localhost:8000/library/find-item/?name=${name}`,{
    next: {
      revalidate: 10
    }
  })
  return services.json()
}

// export async function generateStaticParams() {
//   const services = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-items`).then((res) => res.json())
//   return services.map((item: IServiceInterface) => ({
//     slug: item.name,
//   }))
// }

export default async function Service({params: {name}}: Props) {
  const service = await getService(name);
  return <div>
    <ServicePage service={service}/>
    {/* {name} */}
  </div>
}

