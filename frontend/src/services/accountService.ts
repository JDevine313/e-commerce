import axios from "axios";
import Account from "../models/Account";
import CartItem from "../models/CartItem";

const baseUrl = import.meta.env.VITE_BASE_URL || "";

export const getAccountByUID = async (uid: string): Promise<Account> => {
  return (await axios.get(`${baseUrl}/account/${encodeURIComponent(uid)}`))
    .data;
};

export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/account`, account)).data;
};

export const editToCart = async (
  _id: string,
  cart: CartItem[]
): Promise<any> => {
  return (
    await axios.patch(`${baseUrl}/account/${encodeURIComponent(_id)}`, { cart })
  ).data;
};
