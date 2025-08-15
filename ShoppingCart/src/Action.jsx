import React, {useState}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem , removeItem } from "./cartSlice"

export default function Action()
{
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);



  return (
      <>
          <button onClick={() => dispatch(addItem("shopping"))}>add item </button>
          <button onClick={() => dispatch(removeItem("shopping"))}>remove item </button>
          <h1>cart : {cart}</h1>
      </>
  );

}