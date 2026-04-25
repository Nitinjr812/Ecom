import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Auth from "./pages/Auth"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Navbar} />
          <Route path="/Auth" Component={Auth} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
