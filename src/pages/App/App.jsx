import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import NewInvoice from '../NewInvoice/NewInvoice';
import NewProject from '../NewProject/NewProject';
import AuthPage from '../AuthPage/AuthPage';
import AllInvoices from '../AllInvoices/AllInvoices';  
import AllProjects from '../AllProjects/AllProjects';
import NavBar from '../../components/NavBar/NavBar'
import './App.css';

function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      { user ? 
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/invoices" element={<AllInvoices />} />
          <Route path="/invoices/new" element={<NewInvoice user={user} setUser={setUser} />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/new" element={<NewProject user={user} setUser={setUser} />} />
          
        </Routes>
      </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;