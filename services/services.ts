import { $api } from "@/http/axios";
import { AxiosResponse } from "axios";

export default class LibraryService {
    static async Search(searchString: string): Promise<AxiosResponse<IServiceInterface[]>> {
        return $api.get<IServiceInterface[]>(`library/search-item/?searchString=${searchString}`)
    }
}