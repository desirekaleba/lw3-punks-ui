import "dotenv/config";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_DEFAULT_API;

const AxiosInstance = axios.create({ baseURL });

AxiosInstance.defaults.baseURL = baseURL as string;

export default AxiosInstance;
