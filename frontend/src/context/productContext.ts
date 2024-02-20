import { createContext } from "react";
import Product from "../models/Product";

interface ProductContextModel {
  products: Product[];
  searchTerm: string;
  setSearchTerm: (string: string) => void;
}

const defaultValues: ProductContextModel = {
  products: [],
  searchTerm: "",
  setSearchTerm: () => {},
};

const ProductContext = createContext(defaultValues);

export default ProductContext;
