import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Action from "./Action"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Action />
    </>
  )
}

export default App
