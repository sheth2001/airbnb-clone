import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {UserContext} from '../UserContext'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/login', {email, password})
      setUser(response.data);
      alert('Login successful');

      setRedirect(true);
    } catch(e) {
      alert('Login failed')
    }
  }

  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
