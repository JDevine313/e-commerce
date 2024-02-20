import { createContext } from "react";
import CartItem from "../models/CartItem";
import Product from "../models/Product";

interface CartContextModel {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  deleteFromCart: (id: string) => void;
}

const defaultValues: CartContextModel = {
  cart: [],
  addToCart: () => {},
  deleteFromCart: () => {},
};

const CartContext = createContext(defaultValues);

export default CartContext;
