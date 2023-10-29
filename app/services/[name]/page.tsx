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
  const services = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-item/?name=${name}`,{
    next: {
      revalidate: 60
    }
  })
  return services.json()
}

async function getFindLastService(categoryName: string) {
  const services = await fetch(`${process.env.LOCAL_LIBRARY_API}library/search-by-category/?category=${encodeURIComponent(categoryName)}&amount=4`,{
    next: {
      revalidate: 60
    }
  })
  return services.json()
}

async function getCategory() {
  const category = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-categories`,{
    next:{
      revalidate: 60,
    }
  })
  return category.json()
} 

export async function generateStaticParams() {
  const services = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-items`, {
    next:{
      revalidate: 60,
    }
  }).then((res) => res.json())
  return services.map((item: IServiceInterface) => ({
    slug: encodeURIComponent(item.name),
  }))
}

function findCategory(categories: ICategory[], categoryId: number) {
  return categories.filter((e: ICategory) => (
    e.id == categoryId
  )
  )
}

function deleteService (services: IServiceInterface[], deleteName: string): IServiceInterface[] {
  const freeServices: IServiceInterface[] = [];
  services.map((e) => {
      if (encodeURIComponent(e.name) != deleteName) {
        freeServices.push(e);
      }
    }
  )

  if (freeServices.length>3) {
    freeServices.pop()
  }

  return freeServices
}

export default async function Service({params: {name}}: Props) {
  const service = await getService(name);
  const categories = await getCategory();
  const categoryName = findCategory(categories, service.categoryId)
  const lastService = await getFindLastService(categoryName[0].nameCategory)
  const category = categories.find((el: ICategory) => el.id == service.categoryId)
  const finishLastService = deleteService(lastService, name)
  return <div>
    <ServicePage service={service} categories={categories} lastService={finishLastService} category={category}/>
    {/* {name} */}
  </div>
}

