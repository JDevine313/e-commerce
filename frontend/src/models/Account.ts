import CartItem from "./CartItem";

export default interface Account {
  _id?: string;
  uid: string;
  cart: CartItem[];
}
