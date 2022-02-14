import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/actionCreators/authCreators.js";
import './SignInPage.css'

const SignInPage = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const signInClick = () => {
        axios.post("/api/user/sign-in", {email, password})
            .then(({data}) => {
                dispatch(signIn(data))
            })
            .catch((e) => console.log(e.response?.data?.message))
    }

    return (
        <div className='container'>
            <div className='sign-in'>
                <div>
                    <label className='d-block text-white mb-2 text-center'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='sign-in-input'/>
                </div>
                <div className='mb-4'>
                    <label className='d-block text-white mb-2 text-center'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='sign-in-input'/>
                </div>
                <div className='text-center'>
                    <button onClick={signInClick} className='sign-in-btn'>Enter</button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;