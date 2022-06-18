import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

function App() {

  const code = new URLSearchParams(window.location.search).get('code');

  return (
    <div>
      {code ? <Dashboard code={code}/>:<Login />}
    </div>
  )
}

export default App