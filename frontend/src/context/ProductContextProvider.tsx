import { ReactNode, useEffect, useState } from "react";
import Product from "../models/Product";
import ProductContext from "./productContext";
import { getProducts } from "../services/productService";

interface Props {
  children: ReactNode;
}

const ProductContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm !== "") {
      getProducts(searchTerm).then((res) => setProducts(res));
    } else {
      getProducts().then((res) => {
        setProducts(res);
      });
    }
  }, [searchTerm]);

  return (
    <ProductContext.Provider value={{ products, setSearchTerm, searchTerm }}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
