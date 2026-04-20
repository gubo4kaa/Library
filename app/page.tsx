import MiniGrid from "@/components/MiniGrid/MiniGrid";
import type { Metadata } from "next";
import styles from "./page.module.css";
import Slider from "@/components/Slider/Slider";
import { createCanonicalUrl, siteDescription } from "@/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: siteDescription,
  openGraph: {
    url: createCanonicalUrl("/"),
  },
};

async function getFeatured() {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-limit-items/?limit=6&offset=0&featured=true`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  return services.json();
}

async function getAllItems() {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-limit-items/?limit=20&offset=0&featured=false`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  return services.json();
}

async function getCategory() {
  const category = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-categories`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  return category.json();
}

export default async function Home() {
  const [featured, allService, allCategory] = await Promise.all([
    getFeatured(),
    getAllItems(),
    getCategory(),
  ]);

  const normalizedFeatured = Array.isArray(featured) ? featured : [];
  const normalizedRecent = Array.isArray(allService) ? allService : [];
  const normalizedCategories = Array.isArray(allCategory) ? allCategory : [];

  return (
    <div className={styles.wrapper}>
      <Slider />
      <MiniGrid
        name="New on Library"
        items={normalizedRecent.slice(0, 3)}
        size={"mini"}
        category={normalizedCategories}
        link={"/recently"}
        eagerCount={3}
        tone="new"
      />
      <MiniGrid
        name="Featured Resources"
        items={normalizedFeatured.slice(0, 3)}
        size={"mini"}
        category={normalizedCategories}
        link={"/recently"}
        featured
        eagerCount={3}
        tone="featured"
      />
      <MiniGrid
        name="Recently Added"
        items={normalizedRecent.slice(3, 12)}
        size={"full"}
        category={normalizedCategories}
        link={"/recently"}
        eagerCount={6}
        tone="recent"
      />
    </div>
  );
}
