import React, { useEffect, useRef, useState } from 'react';
import type {TodoId, Todo } from '../types'


interface Props {
    id: number,  // unique identifier for the todo
    title: string,
    completed: boolean,
    onRemoveTodo: ({id}: TodoId) => void
    onToggleCompleteTodo: ({id, completed}: Pick<Todo,'id'|'completed'> )=>void;
    setTitle: (params: { id: string, title: string }) => void
    isEditing: string
    setIsEditing: (completed: string) => void
}

export const TodoItem: React.FC<Props> = ({id, title, completed, onRemoveTodo, onToggleCompleteTodo,setTitle,isEditing,setIsEditing}) => {
    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>):void => {
        onToggleCompleteTodo({
            id,
            completed: event.target.checked,
        })
    }
    
    const handleRemoveClick = () => {
        console.log('Clicked remove for task with id:', id);
        onRemoveTodo({ id });
    }
    
    const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') onRemoveTodo(id)

      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

    
    return (
        <><div className="view" ><input
            className="toggle"
            checked={completed}
            type="checkbox"
            onChange={handleChangeCheckbox} />
            <label>{title}</label>
            <button className="destroy" onClick={ handleRemoveClick }/>
            </div >
            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
      />
            </>
    )


}

function setTitle(arg0: { id: number; title: string; }) {
    throw new Error('Function not implemented.');
}
