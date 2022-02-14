import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUpClick = () => {
      axios.post('/api/user/sign-up', {email, name, password})
          .then(({data}) => {
              alert(data.message)
              navigate('/sign_in')
          })
          .catch((e) => {
              alert(e.response?.data?.message)
          })
    }
    return (
        <div className='container'>
            <div className='sign-in'>
                <div>
                    <label className='d-block text-white mb-2 text-center'>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='sign-in-input'/>
                </div>
                <div>
                    <label className='d-block text-white mb-2 text-center'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='sign-in-input'/>
                </div>
                <div className='mb-4'>
                    <label className='d-block text-white mb-2 text-center'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='sign-in-input'/>
                </div>
                <div className='text-center'>
                    <button onClick={signUpClick} className='sign-in-btn'>Enter</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;