import axios, { AxiosResponse, AxiosError } from 'axios'

axios.interceptors.response.use((res: AxiosResponse) => res.data, (error: AxiosError) => Promise.reject(error))

export default axios