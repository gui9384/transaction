import React from "react";
import Transaction from "./components/Transactions";
import TransactionDetail from './components/TransactionDetail';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
 

function App() {

  return(
    <Router>
       <Routes>
          <Route path="/" element={ <Transaction /> }></Route>
          <Route path="/transaction" element={ <Transaction /> }></Route>
          <Route path="/transaction/:id" element={ <TransactionDetail /> }></Route>
       </Routes>
    </Router>
   
  )
}

export default App;

