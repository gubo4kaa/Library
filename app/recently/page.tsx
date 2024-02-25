import AllComponent from "@/components/AllComponent/AllComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'All Resources',
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
    <AllComponent categories={category} services={services} namePage="All Resources"/>
  )
}
