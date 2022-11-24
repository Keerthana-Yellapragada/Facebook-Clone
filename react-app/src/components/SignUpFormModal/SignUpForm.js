// frontend/src/components/SignupFormPage/SignupForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch} from "react-redux";
import{useHistory} from 'react-router-dom'
import "./SignUpForm.css"

function SignUpForm(){
  const dispatch = useDispatch();
  const history  = useHistory()
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (password === confirmPassword){
      setErrors([]);
      return dispatch(sessionActions.signUp({ first_name, last_name, email, username, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      return setErrors(['Confirm Password field must be the same as the Password field'])
    }

  }
  // if (sessionUser){
  //   console.log("session user create", sessionUser)
  //   history.push("/")
  // }


  return (
<>
  <div className="outer-sign-container">
  <div className="inner-sign-container">
    <form onSubmit={handleSubmit}>
      <div className="form-sign-container">
        <div className="title-sign-container">
        <h2>Sign Up</h2>
        <div>It's quick and easy.</div>
        </div>

        <div className="errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>

      <div className="inner-form-sign-container">

        <input
        className="form-sign-inputs"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First name"
        />


        <input
        className="form-sign-inputs"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Surname"
        />


        <input
        className="form-sign-inputs"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
        />

        <input
        className="form-sign-inputs"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />

        <input
        className="form-sign-inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="New password"
        />

        <input
        className="form-sign-inputs"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm password"
        />

       </div>

        <div className="disclaimer-content">People who use our service may have uploaded your contact information to WellnessPage. Learn more.

        By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive email notifications from us and can opt out at any time.

        </div>
      <div className="button-sign-container">
      <button className="Sign-Up-button" type="submit">Sign Up</button>
      </div>
      </div>
      </form>
    </div>
  </div>
</>

)

}

export default SignUpForm;
