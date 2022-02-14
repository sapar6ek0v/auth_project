import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../redux/actionCreators/authCreators.js";
import {Link} from "react-router-dom";
import './Header.css'
import axios from "axios";

const Header = () => {
    const dispatch = useDispatch()
    const {user, isAuth} = useSelector(s => s.auth)

    const loginOut = () => {
        dispatch(signOut())
    }

    const forAuthUsers = () => {
      axios('/api/user/private-admin')
          .then(({data}) => console.log(data))
          .catch(e => console.log(e))
    }

    return (
        <header >
           <div className='container py-3'>
               <Link to='/sign_in' className='header-btn'>Sign In</Link>
               <Link to='/sign_up' className='header-btn'>Sign Up</Link>
               <Link to='/admin' className='header-btn'>Admin</Link>
               <button onClick={forAuthUsers}>For Auth Users</button>
               {
                   user && isAuth ?
                       <span>
                        <span className='text-white'>{user.name}</span>
                        <button onClick={loginOut}>Выйти</button>
                    </span>
                       :<span>Аноним</span>
               }
           </div>
        </header>
    );
};

export default Header;