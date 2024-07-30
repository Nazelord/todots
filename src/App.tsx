import React, { useState } from "react"
import { Todos } from './components/Todos';
import type { FilterValue, ListOfTodos, Todo, TodoId, TodoTitle } from './types';
import { TODO_FILTERS } from "./consts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
const mockTodos: ListOfTodos = [
  {
    id: 1,
    title: 'Buy milk',
    completed: false,
  },
  {
    id: 2,
    title: 'Clean the house',
    completed: true,
  },
  {
    id: 3,
    title: 'Code a new feature',
    completed: false,
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState<ListOfTodos>(mockTodos)
  const [filterSelected, setFilterSelected] = useState(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId): void => {
    console.log('Removing task with id:', id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    console.log('New Todos:', newTodos);
    setTodos(newTodos)
  }

  const handleCompleted = ({id, completed}: Pick<Todo,'id'|'completed'> ): void => {
    const newTodos = todos.map(todo =>{
      if (todo.id === id){
        return {...todo, completed}
      }
      return todo
  })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) =>!todo.completed);
    setTodos(newTodos);
  }

  const activeCount = todos.filter((todo) =>!todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((todo) =>{
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}:TodoTitle): void =>  { 
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    }

    const newTodos = [...todos,newTodo]
    setTodos(newTodos)
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo}/>
      <Todos
        onToggleCompleteTodo={handleCompleted} 
        onRemoveTodo = {handleRemove}
        setTitle={handleUpdateTitle}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
