import axios from "axios";
import { PREFIX_AUTH } from "../utils/variables";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

const responseHandler = (response: any) => {
  return response;
};

const errorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error?.message === "Network Error") {
      return "Verifique sua conexão com a internet";
    }
  }
  return Promise.reject(error);
};

// Intercerpetor de requisições
api.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem(`${PREFIX_AUTH}:token`);

    if (token !== null) {
      config.headers = {
        Authorization: `Bearer ${JSON.parse(token)}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(responseHandler, errorHandler);
