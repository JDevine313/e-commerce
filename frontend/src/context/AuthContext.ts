import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";
import CartItem from "../models/CartItem";

interface AuthContextModel {
  user: User | null;
  account: Account | null;
  addCartItem: (_id: string, cart: CartItem[]) => void;
  deleteCartItem: (_id: string, newCart: CartItem[]) => void;
}

const defaultValues: AuthContextModel = {
  user: null,
  account: null,
  addCartItem: () => {},
  deleteCartItem: () => {},
};

const AuthContext = createContext(defaultValues);

export default AuthContext;
