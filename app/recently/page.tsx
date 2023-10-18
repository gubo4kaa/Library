import AllComponent from "@/components/AllComponent/AllComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Recently',
  description: 'The library offers useful services for designers, developers and all Internet users. On our resource you will find a wide selection of tools, resources and programs that will help you improve your skills, increase your work efficiency and create high-quality projects. We offer services for design, programming, data analysis, project management and many other areas.',
}

async function getService() {
  const data = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-items`, {
    next:{
      revalidate: 60
    }
  })
  return data.json();
}

async function getCategory() {
  const category = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-categories`,{
    next:{
      revalidate: 60
    }
  })
  return category.json()
} 



export default async function recently() {
  const services = await getService();
  const category = await getCategory();
  return (
    <AllComponent categories={category} services={services} namePage="Recently Added"/>
  )
}
