import React from "react";
import Todo from "./Todo";


export default function TodoList ({todos, toggleTodo}){
    return(
        <div style={{marginTop:"20px", alignItems:"flex-start", display:"flex",flexDirection:"column", width:"100%", maxWidth:"500px"}}>
            {
            todos.map((todo) => (
                <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                ))}
        </div>
    )
}