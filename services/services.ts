import { $api } from "@/http/axios";
import { AxiosResponse } from "axios";

export default class LibraryService {
    static async Search(searchString: string): Promise<AxiosResponse<IServiceInterface[]>> {
        return $api.get<IServiceInterface[]>(`library/search-item/?searchString=${searchString}`)
    }
    
    static async AllItemsOffSet(quantity: number, offset: number): Promise<AxiosResponse<IServiceInterface[]>> {
        return $api.post<IServiceInterface[]>(`library/search-item/?searchString=${{quantity: quantity, offset: offset}}`)
    }
    
    static async AllItems(): Promise<AxiosResponse<IServiceInterface[]>> {
        return $api.get<IServiceInterface[]>(`library/find-items`)
    }

    static async OfferService(body: object): Promise<AxiosResponse<IServiceInterface[]>> {
        return $api.post<IServiceInterface[]>(`library/offer-item`,body )
    }

    static async EmailService(body: object): Promise<AxiosResponse<IServiceInterface[]>> {
        return $api.post<IServiceInterface[]>(`library/subscribe`,body)
    }
}