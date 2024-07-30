 
import React, { useState } from 'react';
import { ListOfTodos, TodoId, Todo } from "../types"
import { TodoItem } from './Todo'
interface Props {
    todos: ListOfTodos;
    onToggleCompleteTodo: ({id, completed}: Pick<Todo,'id'|'completed'> )=>void;
    onRemoveTodo: ({id}: TodoId) => void;
    setTitle: (params: { id: string, title: string }) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo, setTitle }) => {
    const [isEditing, setIsEditing] = useState('')
    return (
        <ul className='todo-list'>
            {todos.map((todo) => (
                <li key={todo.id} onDoubleClick={() => { setIsEditing(todo.id) }} className={`${todo.completed ? 'completed' : ''}${isEditing === todo.id ? 'editing' : ''}`}>
                    <TodoItem
                        id = {todo.id}
                        title = {todo.title}
                        completed = {todo.completed}
                        onToggleCompleteTodo={onToggleCompleteTodo}
                        onRemoveTodo={onRemoveTodo}
                        setTitle={setTitle}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                </li>
                
            ))}
        </ul>
    )
}
