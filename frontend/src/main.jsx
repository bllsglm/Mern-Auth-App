import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements, Route ,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import store from './store.js';
import { Provider } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomeScreen from './Screens/HomeScreen.jsx'
import LoginScreen from './Screens/LoginScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen.jsx'
import ProfileScreen from './Screens/ProfileScreen.jsx';
import Private from './components/Private.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route path='/' index={true} element={<HomeScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='' element={<Private/>} >
         <Route path='/profile' element={<ProfileScreen/>} />
      </Route>
   </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} /> 
    </React.StrictMode>
  </Provider>
)
