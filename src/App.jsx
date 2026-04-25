import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
<<<<<<< HEAD
=======
import Auth from "./pages/Auth"
>>>>>>> nitin

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Navbar} />
<<<<<<< HEAD
=======
          <Route path="/Auth" Component={Auth} />
>>>>>>> nitin
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
