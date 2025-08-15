import {createSlice} from "@reduxjs/toolkit"

export const cartSlice = createSlice({

 name : "cart",

 initialState : {
   items : [],
   total : 0
 },

 reducers : {
     addItem : (state,action) => {
        state.items.push(action.payload);
        state.total = state.items.length;
     },

     removeItem : (state,action) => {
       state.items = state.items.filter(item => item !== action.payload);
       state.total = state.items.length;
     }
 },


})

export const { addItem,removeItem } = cartSlice.actions;
export default cartSlice.reducer;