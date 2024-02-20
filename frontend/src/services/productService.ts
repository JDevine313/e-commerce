import axios from "axios";
import Product from "../models/Product";

const baseUrl = import.meta.env.VITE_BASE_URL || "";

export const getProducts = async (searchTerm?: string): Promise<Product[]> => {
  return (
    await axios.get(`${baseUrl}/product`, { params: { search: searchTerm } })
  ).data;
};

export const getProductById = async (id: string): Promise<Product> => {
  return (
    await axios.get(`${baseUrl}/product/${encodeURIComponent(id)}`, {
      params: {},
    })
  ).data;
};
