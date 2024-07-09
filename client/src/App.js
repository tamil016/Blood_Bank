import React, { Suspense } from 'react'
import { Route, Routes } from "react-router-dom";
// import HomePage from './pages/HomePage';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
const HomePage = React.lazy(() => import('./pages/HomePage'))
const Login = React.lazy(() => import('./pages/auth/Login'))
const Register = React.lazy(() => import('./pages/auth/Register'))
function App() {
  return (
    <>
      <Suspense fallback = {<h1>Loading...</h1>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App