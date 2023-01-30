import { Outlet } from "react-router-dom";
import Login from '../Pages/Login';


function useAuth(){
    const user = {loggedIn: true}
    return user && user.loggedIn;
}

const ProtectedRoute = () => {
const isAuth = useAuth();
return isAuth ? <Outlet/> : <Login />;

}

export {ProtectedRoute, useAuth}