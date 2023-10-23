import axios, { AxiosRequestConfig } from 'axios';

export const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_LIBRARY_API,
})

export const $apiLemonsqueezy = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_LEMONSQUEEZY_URL,
})

$apiLemonsqueezy.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_LEMONSQUEEZY_KEY}`;
    config.headers.Accept = 'application/vnd.api+json';
    config.headers['Content-Type'] = 'application/vnd.api+json';
    return config;
})
