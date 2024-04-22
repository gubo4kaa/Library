import Blur from '@/components/LayoutComponents/Blur/Blur'
import Header from '@/components/LayoutComponents/Header/Header'
import MobileMenu from '@/components/LayoutComponents/MobileMenu/MobileMenu'
import Sidebar from '@/components/LayoutComponents/Sidebar/Sidebar'
import cn from 'classnames'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import SubscribeForm from '@/components/SubscribeForm/SubscribeForm'
import AddServiceForm from '@/components/AddServiceForm/AddServiceForm'
import Ymetrica from '@/components/LayoutComponents/Ymetrica'
import { Analytics } from '@vercel/analytics/react';
import CopyPopap from '@/components/CopyPopap/CopyPopap'

const inter = Plus_Jakarta_Sans({ subsets: ['latin'],
    style: ['normal']
})

  export const metadata: Metadata = {
      metadataBase: new URL('https://librarry.uiscore.io'),
      alternates: {
      canonical: '/',
    },

    title: {
      default: 'Library',
      template: '%s | Library'
    },

    description: 'The library offers useful services for designers, developers and all Internet users. On our resource you will find a wide selection of tools, resources and programs that will help you improve your skills, increase your work efficiency and create high-quality projects. We offer services for design, programming, data analysis, project management and many other areas.',
    verification: {
      google: 'google',
      yandex: '721b9fb9cda3105e',
      yahoo: 'yahoo',
      other: {
        me: ['my-email', 'my-link'],
      },
    },

    keywords: ['Design resources', 'Web design tips', 'Graphic design inspiration', 'Creative resources', 'UI/UX design tutorials', 'Coding resources', 'Web development trends', 'Digital marketing strategies', 'User experience optimization', 'Design portfolio inspiration', 'Website optimization tips', 'Design community forums', 'Developer resources and guides', 'Online design courses', 'Social media management tools', 'Design resources', 'design tools', 'design assets', 'design templates', 'design inspiration', 'Developer tools', 'coding tools', 'programming resources', 'software development tools', 'web development frameworks', 'Influencer marketing', 'influencer collaborations', 'influencer partnerships', 'influencer campaigns', 'influencer outreach', 'Web design tips', 'website design best practices', 'web design techniques', 'responsive web design tips', 'user-friendly web design', 'Graphic design inspiration', 'graphic design ideas', 'graphic design trends', 'graphic design examples', 'graphic design portfolios', 'Creative resources', 'creative inspiration', 'creative ideas', 'creative projects', 'creative tools', 'UI/UX design tutorials', 'user interface design tutorials', 'user experience design tutorials', 'UI/UX design principles', 'UI/UX design tips', 'Coding resources', 'coding tutorials', 'coding guides', 'coding languages', 'coding frameworks', 'Social media influencers', 'popular social media influencers', 'influencer marketing strategies', 'influencer collaborations', 'influencer content creation', 'Web development trends', 'latest web development trends', 'emerging web technologies', 'web development innovations', 'future of web development', 'Digital marketing strategies', 'online marketing strategies', 'digital advertising techniques', 'SEO strategies', 'social media marketing tips', 'User experience optimization', 'UX optimization techniques', 'improving user experience', 'UX research methods', 'user testing tools', 'Design portfolio inspiration', 'portfolio design ideas', 'portfolio examples', 'portfolio layouts', 'portfolio presentation tips', 'Influencer collaborations', 'partnering with influencers', 'influencer marketing campaigns', 'influencer collaboration ideas', 'influencer outreach strategies','Website optimization tips','website performance optimization','website speed optimization','SEO optimization tips','conversion rate optimization techniques','Design community forums','design community discussions','design forums','online design communities','design networking opportunities','Developer resources and guides','developer documentation','programming guides','coding resources for beginners','developer community support','Influencer branding tips','personal branding for influencers','influencer brand partnerships','building an influential brand','influencer marketing strategies','Online design courses','web design courses','graphic design courses','UX design courses','online learning platforms for designers','Social media management tools','social media scheduling tools','social media analytics tools','social media content planning tools','social media monitoring platforms'],
    generator: 'Next.js',
    applicationName: 'Library',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'Uiscore' }, { name: 'Uiscore', url: 'https://uiscore.io' }],
    colorScheme: 'light',
    creator: 'Uiscore Company',
    publisher: 'Uiscore',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    openGraph: {
      title: 'Library',
      description: 'The library offers useful services for designers, developers and all Internet users. On our resource you will find a wide selection of tools, resources and programs that will help you improve your skills, increase your work efficiency and create high-quality projects. We offer services for design, programming, data analysis, project management and many other areas.',
      url: 'https://libray.uiscore.io',
      siteName: 'Library',
      locale: 'en_US',
      type: 'website',
      images: 'opener.png',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  async function getCategory() {
    const category = await fetch(`${process.env.NEXT_PUBLIC_LIBRARY_API_LOCAL}library/find-categories`,{
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/favicon.ico"
          type="image/<generated>"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon.png"
          type="image/<generated>"
          sizes="any"
        />
        <meta name="google-site-verification" content="R8Af_c8CjfDZBppwEHaUnwdybYmDm0M7DAnQmeMx35M" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </head>
      <body className={cn(inter.className)}>
        <div className={styles.mainWrapper}>
          <div className={styles.mainGrid}>
            <Analytics/>
            {/* <YMInitializer accounts={[95109351]} /> */}
            {/* <YMInitializer accounts={[metrikaCounterId]} version="2" /> */}
            <Ymetrica/>
            <MobileMenu>
              <Sidebar categories={category}/>
            </MobileMenu>
            <Header category={category} className={styles.header}/>
            <Sidebar categories={category} className={styles.sidebar}/>
            <div className={styles.content}>
              {children}
            </div>
            <Blur/>
            <SubscribeForm/>
            <AddServiceForm/>
            <CopyPopap/>
          </div>
        </div>
      </body>
    </html>
  )
}
