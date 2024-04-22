import AllComponent from "@/components/AllComponent/AllComponent"
import { Metadata } from "next"

type Props = {
  params: {
    nameCategory: string
  }
}

export async function generateMetadata({params: {nameCategory}}: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(nameCategory),
  }
}

export const revalidate = 10

async function getServices(name: string) {
  const services = await fetch(`${process.env.NEXT_PUBLIC_LIBRARY_API_LOCAL}library/search-by-category/?category=${name}`,{
    next: {
      revalidate: 10
    }
  })
  return services.json()
}

async function getCategory() {
    const category = await fetch(`${process.env.NEXT_PUBLIC_LIBRARY_API_LOCAL}library/find-categories`,{
      next:{
        revalidate: 60,
      }
    })
    return category.json()
}

export default async function Category({params: {nameCategory}}: Props) {
    //console.log(name);
    const categoryName = decodeURIComponent(nameCategory); 
    const services = await getServices(nameCategory);
    const categories = await getCategory();
    return <div>
        <AllComponent services={services ? services : null} namePage={categoryName} categories={categories} />
    </div>
}

