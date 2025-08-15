import {configureStore} from "@reduxjs/toolkit"
import taskReducer from "./Slice"

export const store = configureStore({
 reducer: {taskList : taskReducer},
})

export default store;