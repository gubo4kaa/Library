import MiniGrid from "@/components/MiniGrid/MiniGrid";
import Link from "next/link";
import styles from './page.module.css'
import axios from 'axios'
import VideoGrid from "@/components/VideoGrid/VideoGrid";
import { storeFilterService } from "@/store/storeFilterService";



async function getFeatured() {
  const services = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-limit-items/?limit=6&offset=0&featured=true`,{
    next: {
      revalidate: 60
    }
  })
  return services.json()
}

async function getAllItems() {
  const services = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-items`,{
    next:{
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

export default async function Home() {
  const featured = await getFeatured();
  const allService = await getAllItems();
  const allCategory = await getCategory();
  return (
    <div className={styles.wrapper}>
      <div>
        <VideoGrid/>
      </div>
      <MiniGrid name="Featured Resources" items={featured} size={"mini"} category={allCategory} link={"/recently"}/>
      <MiniGrid name="Recently Added" items={allService} size={"full"} category={allCategory} link={"/recently"}/>
    </div>
  )
}
