import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin } from './redux/reducers/LoginReducers';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const token = localStorage.getItem('userdata');
  const dispatch=useDispatch();
  console.log(token)
 useEffect(() => {
  if(token) {
    dispatch(handleLogin(JSON.parse(token||"")))
  }
 },[token])
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;

