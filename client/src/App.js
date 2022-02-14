import './App.css';
import {Route, Routes} from "react-router-dom";
import SignInPage from "./components/SignInPage/SignInPage.js";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signOut} from "./redux/actionCreators/authCreators.js";
import Header from "./components/Header/Header.js";
import Admin from "./components/Admin/Admin.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import UnKnown from "./components/UnKnown/UnKnown.js";
import SignUpPage from "./components/SignUpPage/SignUpPage.js";

function App() {
    const dispatch = useDispatch()
    const {token, isAuth} = useSelector(s => s.auth)

    useEffect(() => {
        if (!token) return;
        axios('/api/user/auth')
            .then(({data}) => {
                dispatch(signIn(data))
            })
            .catch(() => {
                dispatch(signOut())
            })
    }, [isAuth])

    return (
        <>
            <Header />
            <Routes>
                <Route path='/sign_in' element={<UnKnown><SignInPage/></UnKnown>}/>
                <Route path='/sign_up' element={<UnKnown><SignUpPage/></UnKnown>}/>
                <Route path='/admin' element={<PrivateRoute role={["admin"]}><Admin/></PrivateRoute>}/>
                <Route path='/user' element={<PrivateRoute role={["admin", "role"]}><div>for user</div></PrivateRoute>}/>
            </Routes>
        </>
    );
}

export default App;
