import React from "react";
import Login from "./Components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReceiptTable from "./Components/ReceiptTable";
import ReceiptData from "./Components/ReceiptData";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/ReceiptTable" element={<ReceiptTable />} />
        <Route exact path="/data" element={<ReceiptData/>} />
        <Route path="/data/edit/:id" element={<ReceiptData />} />
      </Routes>
    </Router>
  );
}

export default App;
