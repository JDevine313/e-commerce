import "./Header.css";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";

const Header = () => {
  const { account } = useContext(AuthContext);
  return (
    <header className="Header">
      <Link to={"/"}>
        <img src={logo} alt="JJ logo" id="header-logo" />
      </Link>
      <h1>JJ's Antique's and Collectables!</h1>
      {account ? (
        <>
          <button onClick={signOut}>sign out</button>
          <Link to={"/cart"}>
            <div id="cart-icon">
              <i className="fa-solid fa-cart-shopping"></i>
              <p id="cart-count">{account.cart.length}</p>
            </div>
          </Link>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </header>
  );
};

export default Header;
