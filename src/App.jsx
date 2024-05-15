import { Route, Routes } from "react-router-dom";
import Footer from "./components/Header_Footer/Footer";
import Header from "./components/Header_Footer/Header";
import EmplyeeData from "./components/Tools/EmplyeeData";
import AddEmployee from "./components/Tools/AddEmployee";
import EditEmployee from "./components/Tools/EditEmployee";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<EmplyeeData />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;