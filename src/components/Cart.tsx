import React, { useReducer } from "react";
import { products } from "../data";

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

type cartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number };

const initialState: CartItem[] = [];

//
const cartReducer = (state = initialState, action: cartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        return [...state, action.payload];
      } else {
        alert("item already exists");
        return state;
      }
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
};

const Cart: React.FC = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  let sum = 0;
  const totalCost = () => {
    state.forEach((item) => {
      sum += item.price;
    });
    return sum;
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}{" "}
            <button
              className="green"
              onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
            >
              +
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <h1>Cart</h1>
      <ul>
        {state.map((item) => (
          <li key={item.id}>
            {item.name} (${item.price}){" "}
            <button
              className="red"
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
            >
              -
            </button>
          </li>
        ))}
        <hr />
      </ul>
      <h3>Total: ${totalCost()}</h3>
    </div>
  );
};

export default Cart;
