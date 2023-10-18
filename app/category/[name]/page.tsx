import AllComponent from "@/components/AllComponent/AllComponent"
import ServicePage from "@/components/ServicePage/ServicePage"
import { Metadata } from "next"

type Props = {
  params: {
    name: string
  }
}

export async function generateMetadata({params: {name}}: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(name),
    description: 'The library offers useful services for designers, developers and all Internet users. On our resource you will find a wide selection of tools, resources and programs that will help you improve your skills, increase your work efficiency and create high-quality projects. We offer services for design, programming, data analysis, project management and many other areas.'
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
    console.log(name);
    const categoryName = decodeURIComponent(name); 
    const services = await getServices(name);
    const categories = await getCategory();
    return <div>
        <AllComponent services={services ? services : null} namePage={categoryName} categories={categories} />
    </div>
}

