interface ICategory {
    id: number;
    nameCategory: string;
    logo: string;
}

interface IServiceInterface extends Record<string, unknown> {
    id: number
    name: string
    url: string
    description: string
    price: string
    featured: boolean
    images: string[]
    avatar: string
    categoryId: number
    date: string
   }