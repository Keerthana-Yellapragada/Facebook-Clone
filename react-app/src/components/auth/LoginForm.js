import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import "./LoginForm.css"

const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const signUp = () => {
    history.push('/sign-up')
  }

  return (
  <>
  <div className='login-page-container'>
  <div className='login-form-container'>
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      {/* <div className='login-form-label'><label htmlFor='email'>Email</label></div> */}
      <div>

        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      {/* <div className='login-form-label'> <label htmlFor='password'>Password</label></div> */}
      <div>

        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <div>
          <button className='login-button' type='submit'>Login</button>
        </div>
        <div className='create-account-button-container'>
          <button className='create-account-button'  onClick={signUp}>Create New Account</button>
        </div>

      </div>
    </form>
  </div>
  </div>
  </>
  );
};

export default LoginForm;
