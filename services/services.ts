import { $api, $apiLemonsqueezy } from "@/http/axios";
import { AxiosResponse } from "axios";

const configLemonsqueezy = {
    headers:{
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LEMONSQUEEZY_KEY}`
    }
  };

const testSubscriber = {
    "type": "customers",
    "id": "1",
    "attributes": {
      "store_id": 1,
      "name": "Luke Skywalker",
      "email": "lukeskywalker@example.com",
      "status": "subscribed",
      "city": null,
      "region": null,
      "country": "US",
      "total_revenue_currency": 84332,
      "mrr": 1999,
      "status_formatted": "Subscribed",
      "country_formatted": "United States",
      "total_revenue_currency_formatted": "$843.32",
      "mrr_formatted": "$19.99",
      "urls": {
        "customer_portal": "https://uiscore.lemonsqueezy.com/billing?expires=1666869343&signature=82ae290ceac8edd4190c82825dd73a8743346d894a8ddbc4898b97eb96d105a5"
      },
      "created_at": "2022-12-01T13:01:07.000000Z",
      "updated_at": "2022-12-09T09:05:21.000000Z",
      "test_mode": false
    }
  }

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
        return $api.post<IServiceInterface[]>(`library/offer-item`,body)
    }

    static async EmailService(body: any): Promise<AxiosResponse<IServiceInterface[]>> {
        console.log(body);
        console.log(body.email);
        const formUrl = 'https://uiscore.lemonsqueezy.com/email-subscribe/external'
        const redirectUrl = 'https://uiscore.io/done/'
        const value = new FormData();
        value.append('email', body.email);
        try {
            const response = await fetch(formUrl, {
              method: 'POST',
              body: value,
            });
      
            if (response.ok) {
              window.location.href = redirectUrl;
            } else {
              // Something went wrong subscribing the user
              alert('Sorry, we couldn\'t subscribe you.');
            }
          } catch (error) {
            alert('Sorry, there was an issue: ' + error);
          }
        return $api.post<IServiceInterface[]>(`library/save-new-mail`, body)
    }

    static async EmailServiceLemonsqueezy(body: object): Promise<AxiosResponse<IServiceInterface[]>> {
        console.log(configLemonsqueezy);
        console.log(testSubscriber);
        return $apiLemonsqueezy.post<any>(`/`, testSubscriber)
    }

    static async Report(body: any): Promise<AxiosResponse<object>> {
        console.log(body);
        return $api.post<any>(`/library/report`, body)
    }
}