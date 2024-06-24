import axiosClient from "./axiosClient";

export const ProductAPI = async (
  url: string,
  data?: any,
  method?: 'post' | 'put' | 'get' | 'delete'
) => {
  return await axiosClient(`/products${url}`, {
    headers: {
    },
    method: method ?? 'get',
    data
  });
};