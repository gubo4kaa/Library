import axios, { AxiosRequestConfig } from 'axios';

export const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_LIBRARY_API,
})
