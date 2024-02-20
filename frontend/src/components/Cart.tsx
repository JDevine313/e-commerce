import { useContext, useState } from "react";
import "./Cart.css";
import CartContext from "../context/cartContext";
import CartItem from "../models/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [showCheckOut, setShowCheckOut] = useState<boolean>(false);
  const { cart, deleteFromCart } = useContext(CartContext);
  const nav = useNavigate();

  return (
    <div className="Cart">
      <h3>Your Cart</h3>
      <ul>
        {cart.map((cartItem: CartItem) => (
          <li key={cartItem.product._id}>
            <p
              className="close"
              onClick={() => deleteFromCart(cartItem.product._id!)}
            >
              X
            </p>
            <img src={cartItem.product.src} alt={cartItem.product.name} />
            <p>
              {cartItem.product.name} x ${cartItem.product.price}.00
            </p>
          </li>
        ))}
      </ul>
      <p id="first-total">
        Total: ${cart.reduce((ac, cv) => ac + cv.product.price, 0)}.00
      </p>
      <button onClick={() => setShowCheckOut(true)}>Check out</button>
      <button onClick={() => nav("/")}>Back to Browsing</button>
      {showCheckOut && (
        <div id="card-form">
          <form>
            <h2>Confirm Purchanse</h2>
            <p>
              Sub Total: $
              {cart.reduce((ac, cv) => ac + cv.product.price, 0).toFixed(2)}
            </p>
            <p>
              Tax: $
              {(
                cart.reduce((ac, cv) => ac + cv.product.price, 0) * 0.06
              ).toFixed(2)}
            </p>
            <p>
              Total after tax: $
              {(
                cart.reduce((ac, cv) => ac + cv.product.price, 0) * 1.06
              ).toFixed(2)}
            </p>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" placeholder="John Doe" />
            <label htmlFor="CCV">CCV</label>
            <input type="text" name="CCV" id="CCV" placeholder="123" />
            <label htmlFor="card-number">Card Number</label>
            <input
              type="text"
              name="card-number"
              id="card-number"
              placeholder="1234 5678 1234 5678"
            />
            <h4>Billing Address</h4>
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="123 Main Street"
            />
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" placeholder="Detriot" />
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" placeholder="Michigan" />
            <label htmlFor="zip">Zip Code</label>
            <input type="text" name="zip" id="zip" placeholder="48127" />
            <button>Pay Now</button>
            <button onClick={() => setShowCheckOut(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
