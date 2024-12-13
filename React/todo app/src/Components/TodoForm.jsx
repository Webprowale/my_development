import React, { useState } from 'react'
import { useTodo } from '../context'
function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo}= useTodo()
    const add = (e)=>{
        e.preventDefault()
        if(!todo) return
        addTodo({todo, completed: false})
        setTodo("")
    } 
  return (
    <form onSubmit={add} style={{
        display: 'flex'
    }}>
        <input type="text"
        placeholder='Write todo..'
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
         />
         <button type='submit'>Add</button>
    </form>
  )
}

export default TodoForm