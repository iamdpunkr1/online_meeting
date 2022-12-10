import {Link} from 'react-router-dom'
import * as Unicons from '@iconscout/react-unicons';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [appPass, setappPass] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email,password,appPass)
  }

    return (
      <div className="form-box">
      <form className="center-wrap" onSubmit={handleSubmit}>
              <div className="section text-center">
              <h4 className="mb-4 pb-3">Sign Up</h4>
              <div className="form-group ">
                <input
                  type="email"
                  name="email"
                  className="form-style"
                  placeholder="Your Email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                />
                <Unicons.UilAt className="input-icon uil uil-at"  />
              </div>
              <div className="form-group mt-2">
                <input
                  type="password"
                  name="password"
                  className="form-style"
                  placeholder="Your Password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                />
                <Unicons.UilLock className="input-icon uil uil-at"  />
              </div>
              <div className="form-group mt-2">
              <input
                  type="text"
                  name="appPass"
                  className="form-style"
                  placeholder="Gmail App Password"
                  id="appPass"
                  autoComplete="off"
                  value={appPass}
                  onChange={(e)=>{setappPass(e.target.value)}}
                  required
              />
              <Unicons.UilEnvelope className="input-icon uil uil-at"  />
              </div>
              <button className={isLoading?"btn mt-4 disabled":"btn mt-4"}>
                submit
              </button>
              {error && <div className="error">{error}</div>}
              <p className="mb-0 mt-4 text-center">
              Have a account? <Link to="/">Login</Link>
              </p>
            </div>
        </form>
      </div>
      );
}
 
export default Signup;