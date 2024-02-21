import { ObjectId } from "mongodb";
import CartItem from "./CartItem";

export default interface Account {
  _id: ObjectId;
  uid: string;
  cart: CartItem[];
}
