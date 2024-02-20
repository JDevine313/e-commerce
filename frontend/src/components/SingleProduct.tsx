import { Link } from "react-router-dom";
import Product from "../models/Product";
import "./SingleProduct.css";

interface Props {
  product: Product;
}

const SingleProduct = ({ product }: Props) => {
  return (
    <li className="SingleProduct">
      <Link to={`/details/${product._id}`}>
        <img src={product.src} alt={product.name} />
      </Link>
      <div
        className="product-text"
        style={product.name === "Typewriter" ? { color: "black" } : {}}
      >
        <p>{product.name}</p>
        <p>${product.price}.00</p>
      </div>
    </li>
  );
};

export default SingleProduct;
