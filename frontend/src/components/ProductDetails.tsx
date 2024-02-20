import { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import Product from "../models/Product";
import { useNavigate, useParams } from "react-router-dom";
import CartContext from "../context/cartContext";
import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const nav = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    if (id) {
      getProductById(id).then((res) => setProduct(res));
    }
  }, [id]);
  return (
    <div className="ProductDetails">
      {product ? (
        <div className="card">
          <h2>{product.name}</h2>
          <div className="card-flex">
            <div className="card-left">
              <img src={product.src} alt={product.name} />
            </div>
            <div className="card-right">
              <p id="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore, aperiam dicta quos laudantium officiis sequi facilis
                beatae consectetur ullam tempora? Illum laudantium corrupti
                perferendis ex quia et maxime libero accusamus?
              </p>
              <p id="price">Price: ${product.price}.00</p>
            </div>
            <div id="btn-container">
              <button onClick={() => addToCart(product)}>Add To Cart</button>
              <button onClick={() => nav("/")}>Back to Browsing</button>
            </div>
          </div>
        </div>
      ) : (
        <img
          className="loading-gif"
          src="https://i.stack.imgur.com/hzk6C.gif"
          alt="loading"
        />
      )}
    </div>
  );
};

export default ProductDetails;
