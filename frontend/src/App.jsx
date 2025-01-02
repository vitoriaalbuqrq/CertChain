import { Outlet } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar/>
      <ToastContainer />
      <Outlet/>
    </div>
  )
}

export default App
