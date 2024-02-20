import { ReactNode, useState } from "react";
import CartItem from "../models/CartItem";
import CartContext from "./cartContext";
import Product from "../models/Product";

interface Props {
  children: ReactNode;
}

const CartContextProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, { product, userId: "abc123" }]);
  };

  const deleteFromCart = (id: string) => {
    let i = cart.findIndex((item) => item.product._id === id);
    setCart((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
