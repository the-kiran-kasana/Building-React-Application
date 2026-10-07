import React,{useState} from "react"
import {useSelector , useDispatch} from "react-redux"
import {add , remove , toggle} from "./Slice"

 function  Action()
{
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskList.task);
    const status = useSelector((state) => state.taskList.status);
    const [newTask , setNewTask] = useState("")

   const handleChange = (e) => {
      if (e.target.value !== "") {
          setNewTask(e.target.value);
      }

}


    return (
     <>
     <input type="text" placeholder="add the tasks" onChange={handleChange} style={{
                                                                                      padding: "10px",
                                                                                      borderRadius: "5px",
                                                                                      border: "1px solid #ccc",
                                                                                      width: "250px",
                                                                                      marginRight: "10px",
                                                                                      outline: "none",
                                                                                      fontSize: "14px",
                                                                                    }}/>
     <button onClick = {() => dispatch(add(newTask))}>add task</button>
     <button onClick = {() => dispatch(toggle())} style={{ color: status ? "red" : "green" }} >status : {status ? "Tasks pending" : "task completed"}</button>

     <ul>
           {tasks.map((t, i) => (
             <li key={i}  style={{
                                  marginBottom: "6px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "6px 10px",
                                }}>{t} <button onClick = {() => dispatch(remove(t))}  style={{
                                                                                                color: "white",
                                                                                                border: "none",
                                                                                                padding: "20px 10px",
                                                                                                borderRadius: "10px",
                                                                                                cursor: "pointer"
                                                                                              }}> remove task</button></li>
           ))}
     </ul>
     </>

    );

}

export default Action

