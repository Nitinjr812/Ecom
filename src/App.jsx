import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Navbar} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
