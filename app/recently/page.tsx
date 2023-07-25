import AllComponent from "@/components/AllComponent/AllComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Library',
  description: 'Recently Added services page',
}

async function getService() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_LIBRARY_API}library/find-items`, {
    next:{
      revalidate: 60
    }
  })
  return data.json();
}

async function getCategory() {
  const category = await fetch(`${process.env.NEXT_PUBLIC_LIBRARY_API}library/find-categories`,{
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
