import axios, { AxiosRequestConfig } from 'axios';

export const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_LIBRARY_API,
})

export const $apiLemonsqueezy = axios.create({
    headers: {
        post: {        // can be common or any other method
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'Access-Control-Allow-Origin.': "*",
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LEMONSQUEEZY_KEY}`
        }
    },
    baseURL: process.env.NEXT_PUBLIC_LEMONSQUEEZY_URL,
})
