import React, { useState } from 'react'
import { useTodo } from '../context'
function TodoItem({todo}) {
    const [istodoEditable, setTodoEditable] = useState(false)
    const [todoMsg, setMsg] = useState(todo.todo)
    const {updateTodo,toggleComplete,deleteTodo} = useTodo()
  return (
    <div>TodoItem</div>
  )
}

export default TodoItem