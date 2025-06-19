import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Spinner from "./components/Spinner"
import ApplyDoctor from "./pages/ApplyDoctor"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Notification from "./pages/Notification"
import SignUp from "./pages/SignUp"
import ProtectorRoute from "./Routes/ProtectorRoute"
import PublicRoute from "./Routes/PublicRoute"
function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner></Spinner> :
          <Routes>
            <Route path="/" element={<ProtectorRoute><Home /></ProtectorRoute>
            } />
            <Route path="/apply-doctor" element={<ProtectorRoute><ApplyDoctor /></ProtectorRoute>
            } />
            <Route path="/notification" element={<ProtectorRoute><Notification /></ProtectorRoute>
            } />
            <Route path="/signUp" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          </Routes>
        }

      </BrowserRouter>
      <ToastContainer autoClose={1000} />
    </>
  )
}

export default App
