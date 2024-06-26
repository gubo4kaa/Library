import MiniGrid from "@/components/MiniGrid/MiniGrid";
import styles from './page.module.css'
import VideoGrid from "@/components/VideoGrid/VideoGrid";
import ym, { YMInitializer } from "react-yandex-metrika";
import Preloader from "@/components/Preloader/Preloader";
import Slider from "@/components/Slider/Slider";
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
        <Slider/>
      </div>
      <MiniGrid name="Featured Resources" items={featured} size={"mini"} category={allCategory} link={"/recently"} featured/>
      <MiniGrid name="Recently Added" items={allService} size={"full"} category={allCategory} link={"/recently"}/>
    </div>
  )
}
