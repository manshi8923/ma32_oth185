import React from 'react'
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Hotels from './components/Hotels';
import Dashboard_ma from './components/Dashboard_ma';
import SingleRoom_ma from './pages/ma/SingleRoom_ma';
import AddGuest_ma from './pages/ma/AddGuest_ma';
import Rooms_ma from './pages/ma/Rooms_ma';
import Guests_ma from './pages/ma/Guests_ma';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateBill_ma from './pages/ma/GenerateBill_ma';
import Revenue_ma from './pages/ma/Revenue_ma';
import Dashboard_oth from './components/Dashboard_oth';
import SingleRoom_oth from './pages/oth/SingleRoom_oth';
import Rooms_oth from './pages/oth/Rooms_oth';
import Guests_oth from './pages/oth/Guests_oth';
import GenerateBill_oth from './pages/oth/GenerateBill_oth';
import Revenue_oth from './pages/oth/Revenue_oth';
import AddGuest_oth from './pages/oth/AddGuest_oth';
import Expense_ma from './pages/ma/Expense_ma';
import Expense_oth from './pages/oth/Expense_oth';
import AddExpense_ma from './pages/ma/AddExpense_ma';
import AddExpense_oth from './pages/oth/AddExpense_oth';
import EditGuest_ma from './pages/ma/EditGuest_ma';
import EditGuest_oth from './pages/oth/EditGuest_oth';
import EditExpense_ma from './pages/ma/EditExpense_ma';
import EditExpense_oth from './pages/oth/EditExpense_oth';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/hotels' element={<Hotels/>} />
      <Route path='/ma/dashboard' element={<Dashboard_ma/>} />
      <Route path='/ma/room/:id' element={<SingleRoom_ma/>} />
      <Route path='/ma/addguest/:id' element={<AddGuest_ma/>}/>
      <Route path='/ma/rooms' element={<Rooms_ma/>} />
      <Route path='/ma/guests' element={<Guests_ma/>}/>
      <Route path='/ma/generateBill/:id' element={<GenerateBill_ma/>} />
      <Route path='/ma/revenue' element={<Revenue_ma/>} />
      <Route path='/ma/expense' element={<Expense_ma/>} />
      <Route path='/ma/add-expense' element={<AddExpense_ma/>}/>
      <Route path='/ma/expense/edit/:id' element={<EditExpense_ma/>}/>
      <Route path='/ma/edit/:id' element={<EditGuest_ma/>} />
      {/* oth */}
      <Route path='/oth/dashboard' element={<Dashboard_oth/>} />
      <Route path='/oth/room/:id' element={<SingleRoom_oth/>} />
      <Route path='/oth/addguest/:id' element={<AddGuest_oth/>} />
      <Route path='/oth/rooms' element={<Rooms_oth/>} />
      <Route path='/oth/guests' element={<Guests_oth/>} />
      <Route path='/oth/generateBill/:id' element={<GenerateBill_oth/>}/>
      <Route path='/oth/revenue' element={<Revenue_oth/>}/>
      <Route path='/oth/expense' element={<Expense_oth/>} />
      <Route path='/oth/expense/edit/:id' element={<EditExpense_oth/>} />
      <Route path='/oth/add-expense' element={<AddExpense_oth/>} />
      <Route path='/oth/edit/:id' element={<EditGuest_oth/>} />
  
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}

export default App