import { User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import Account from "../models/Account";
import {
  editToCart,
  createNewAccount,
  getAccountByUID,
} from "../services/accountService";
import CartItem from "../models/CartItem";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
        getAccountByUID(newUser.uid)
          .then((res) => {
            setAccount(res);
          })
          .catch(() => {
            createNewAccount({
              uid: newUser.uid,
              cart: [],
            }).then((response) => {
              setAccount(response);
            });
          });
      } else {
        setUser(null);
        setAccount(null);
      }
    });
  }, []);

  const addCartItem = (_id: string, cart: CartItem[]) => {
    editToCart(_id, cart).then(() => {
      getAccountByUID(account!.uid).then((res) => setAccount(res));
    });
  };

  const deleteCartItem = (_id: string, newCart: CartItem[]) => {
    editToCart(account!._id!, newCart).then(() =>
      getAccountByUID(account!.uid).then((res) => setAccount(res))
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, account, addCartItem, deleteCartItem }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
