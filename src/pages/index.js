import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import TodoList from 'components/TodoList'
import { useState, useRef, useEffect } from 'react'
import { v4 } from 'uuid'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [todos, setTodos]= useState([]);
  const todoNameRef = useRef();
  const initialRender = useRef(true);
  const LOCAL_STROAGE_KEY = 'todoApp.todos';

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo =newTodos.find(todo => todo.id === id)
    todo.complete= !todo.complete 
    setTodos(newTodos)
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STROAGE_KEY))
    if (storedTodos) setTodos(storedTodos);
  },[])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
  }
    localStorage.setItem(LOCAL_STROAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (e) =>{
    const name = todoNameRef.current.value;
    if(name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: v4(), name:name, complete: false}]
    })
    todoNameRef.current.value = null
  } 
  const handleAddTodoEnter = (e) =>{
    const name = todoNameRef.current.value;
    if(e.key === 'Enter') {
      setTodos(prevTodos =>{
        return [...prevTodos, {id: v4(), name:name, complete: false}]
      })
      todoNameRef.current.value = null
    }
  } 
  const handleClearTodo = (e) =>{
    const newTodos= todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <Head>
        <title>To Do</title>
        <meta name="description" content="To-Do List Manager - All Your Tasks In One Place" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="choose.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
            <div className={styles.titleSection}>
              <p style={{fontFamily:"sans-serif", fontWeight:"bold"}}>To Do List</p>
              <div className={styles.thirteen}>
                <Image alt='logo' src={"choose.png"} width={50} height={50} priority/>
              </div>
            </div>
            <div className={styles.todoHandler}>
              <p style={{fontFamily:"sans-serif", fontWeight:"bold"}}>{todos.filter(todo =>!todo.complete).length} To Do Left</p>
              <input ref={todoNameRef} type={"text"} placeholder="Enter you To Do here" onKeyDown={handleAddTodoEnter}/>
              <div>
                <button onClick={handleAddTodo} className={styles.addBtn}>+ Add</button>
                <button onClick={handleClearTodo} className={styles.clearBtn}>Clear Complete</button>
              </div>
            </div>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </div>
      </main>
    </>
  )
}
