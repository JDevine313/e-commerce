import Product from "../models/Product";
import "./ProductList.css";
import SingleProduct from "./SingleProduct";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <ul className="ProductList">
      {products.map((product: Product) => (
        <SingleProduct key={product.src} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;
