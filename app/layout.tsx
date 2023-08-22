import Blur from '@/components/LayoutComponents/Blur/Blur'
import Header from '@/components/LayoutComponents/Header/Header'
import MobileMenu from '@/components/LayoutComponents/MobileMenu/MobileMenu'
import Sidebar from '@/components/LayoutComponents/Sidebar/Sidebar'
import cn from 'classnames'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'

const inter = Plus_Jakarta_Sans({ subsets: ['latin'],
    style: ["normal"]
})

export const metadata: Metadata = {
  title: 'Library',
  description: 'Generated by create next app',
}

async function getCategory() {
  const category = await fetch(`${process.env.LOCAL_LIBRARY_API}library/find-categories`,{
    next:{
      revalidate: 60
    }
  })
  return category.json()
} 

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
const category = await getCategory()
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <div className={styles.mainWrapper}>
          <div className={styles.mainGrid}>
            <MobileMenu>
              <Sidebar categories={category}/>
            </MobileMenu>
            <Header category={category} className={styles.header}/>
            <Sidebar categories={category} className={styles.sidebar}/>
            <div className={styles.content}>
              {children}
            </div>
            <Blur/>
          </div>
        </div>
        </body>
    </html>
  )
}
