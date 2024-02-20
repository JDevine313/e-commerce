import "./Header.css";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import CartContext from "../context/cartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <header className="Header">
      <Link to={"/"}>
        <img src={logo} alt="JJ logo" id="header-logo" />
      </Link>

      <h1>JJ's Antique's and Collectables!</h1>

      <Link to={"/cart"}>
        <div id="cart-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <p id="cart-count">{cart.length}</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
