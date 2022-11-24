import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp} from '../../store/session';
// import {SignUpFormModal} from '../SignUpFormModal';
import "./LoginForm.css"
import SignUpFormModal from '../SignUpFormModal';
import SignUpForm from '../SignUpFormModal/SignUpForm';
import { Modal } from '../../context/Modal'

const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

const [showSignUpModal, setShowSignUpModal] = useState(false);

console.log("showsignupmodal", showSignUpModal)

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
    return <Redirect to='/homepage' />;
  }

  // const signUp = () => {
  //   history.push('/sign-up')

  // }

  return (
  <>

  <div className='login-form-container'>
    <form className='login-form' onSubmit={onLogin}>
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
        {/* <div className='create-account-button-container'>
          <button className='create-account-button'  onClick={signUp}>Create New Account</button>
        </div> */}

      </div>
    </form>

        <div className = 'create-account-button-container' >
                        <button className="create-account-button" onClick={() => setShowSignUpModal(true)}>Create New Account</button>
                        {showSignUpModal && (
                            <Modal onClose={() => setShowSignUpModal(false)}>
                                <SignUpForm />
                            </Modal>
                        )}
        </div>

  </div>

  </>
  );
};

export default LoginForm;
