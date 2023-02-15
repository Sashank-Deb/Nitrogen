import React from "react";

export default function Todo({todo, toggleTodo}){
    function handleToggleTodo(){
        toggleTodo(todo.id)
    }
    return(
            <label style={{fontFamily:"sans-serif"}}>
                <input type={"checkbox"} style={{margin:"10px"}} checked={todo.complete} onChange={handleToggleTodo}/>
                {todo.name}
            </label>
    )
}