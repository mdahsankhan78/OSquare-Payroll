import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Payrolls from "./components/Payrolls"
import Employees from "./components/Employees"
import Leaves from "./components/Leaves"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Payroll from "./components/Payroll"

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Payrolls />} />
          <Route path="/payroll" element={<Payroll/>} />
          <Route path="/payroll/employees" element={<Employees />} />
          <Route path="/payroll/employees" element={<Employees />} />
          <Route path="/payroll/leaves/:selectedEmployees" element={<Leaves />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
