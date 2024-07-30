import React, { useState, useEffect } from 'react';
import { Todos } from './components/Todos';
import type { FilterValue, ListOfTodos, Todo, TodoId, TodoTitle } from './types';
import { TODO_FILTERS } from "./consts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { db } from './firebaseConfig';

const App = (): JSX.Element => {
  const [todos, setTodos] = useState<ListOfTodos>([]);
  const [filterSelected, setFilterSelected] = useState(TODO_FILTERS.ALL);

  // Fetch todos from Firestore
  useEffect(() => {
    const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Todo));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = ({ id }: TodoId): void => {
    console.log('Removing task with id:', id);
    db.collection('todos').doc(id.toString()).delete()
      .catch(error => console.error('Error deleting todo:', error));
  };

  const handleCompleted = ({ id, completed }: Pick<Todo, 'id' | 'completed'>): void => {
    db.collection('todos').doc(id.toString()).update({ completed })
      .catch(error => console.error('Error updating todo:', error));
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    completedTodos.forEach(todo => {
      db.collection('todos').doc(todo.id.toString()).delete()
        .catch(error => console.error('Error deleting completed todo:', error));
    });
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      completed: false,
    };

    db.collection('todos').add(newTodo)
      .catch(error => console.error('Error adding todo:', error));
  };

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    db.collection('todos').doc(id).update({ title })
      .catch(error => console.error('Error updating title:', error));
  };

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
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
  );
};

export default App;
