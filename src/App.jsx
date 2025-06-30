import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import AppRoutes from "./routes";
import Layout from './Layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  )
}

export default App
