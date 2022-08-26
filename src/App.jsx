import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AddData from "./Components/AddData";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/component/add" element={<AddData/>} />
      </Routes>
    </div>
  );
}

export default App;
