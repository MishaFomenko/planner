'use client'
import ToDoList from './components/todolist'
import {StatesContextProvider} from './context/statescontext'


export default function Home() {
  return (
    <main >
      <StatesContextProvider>
        <ToDoList />
      </StatesContextProvider>
    </main>
  )
}
