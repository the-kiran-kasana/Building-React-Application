import { createSlice } from '@reduxjs/toolkit'

export const Slice = createSlice({

 name : "taskList",

 initialState : {
  task:[],
  status : false,
 },

 reducers : {
     add : (state,action) => {
       state.task.push(action.payload);
       state.status = true;
     },

     remove : (state,action) => {
      state.task = state.task.filter(t => t !== action.payload)
      if(state.task.length == 0)
                state.status = false;
     },

     toggle : (state) => {
        if(state.task.length == 0)
          state.status = false;

     },
  },

});

export const {add ,remove,toggle} = Slice.actions
export default Slice.reducer

