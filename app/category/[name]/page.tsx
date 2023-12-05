import AllComponent from "@/components/AllComponent/AllComponent"
import { Metadata } from "next"

type Props = {
  params: {
    name: string
  }
}

export async function generateMetadata({params: {name}}: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(name),
  }
}

export const revalidate = 10

async function getServices(name: string) {
  const services = await fetch(`${process.env.LOCAL_LIBRARY_API}library/search-by-category/?category=${name}`,{
    next: {
      revalidate: 10
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

export default async function Category({params: {name}}: Props) {
    //console.log(name);
    const categoryName = decodeURIComponent(name); 
    const services = await getServices(name);
    const categories = await getCategory();
    return <div>
        <AllComponent services={services ? services : null} namePage={categoryName} categories={categories} />
    </div>
}

