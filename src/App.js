import React, { useState } from "react";
import Header from "./components/header"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenseform from "./components/expenseform"
import Dashboard from "./components/charts"
import Incomeform from "./components/incomeform"
function App() {

  return (

    <BrowserRouter>
      <Header/>      
      <Routes>
        <Route exact path="/" element={<Expenseform />} />
        <Route exact path="/income" element={<Incomeform />} />
        <Route exact path="/graph" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
