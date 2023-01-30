import "./App.scss";
import {Routes, Route, Link } from "react-router-dom";
import ErrorPage from "./Pages/Error";
import Login from "./Pages/Login"
import RequireAuth from "./Pages/RequireAuth";
import PersistLogin from './components/PersistLogin';
import Dashboard from "./Pages/Dashboard";
import RegisterPage from "./Pages/Register";

function App() {
  return (
    
      <><nav>
      <div className="Navbar">
        <Link to="/">Login</Link>
        <Link to="/sign-up">Registrieren</Link>
        <Link to="/dashboard">Dashboard</Link>
        
      </div>
    </nav><Routes>
        <Route path="/" element={Login()} />
        <Route path="/sign-up" element={RegisterPage()} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={Dashboard()} />
        </Route>
      </Route>
        <Route path="*" element={ErrorPage()} />

      </Routes></>

  );
}

export default App;