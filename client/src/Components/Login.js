import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginInitialValues = {
  email: " ",
  password: " ",
};

const signupInitialValues = {
  name: " ",
  email: " ",
  password: " ",
};

const Login = () => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log({[e.target.name]: e.target.value })
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const userLogin = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: login.email, password: login.password})
  });
    const json = await response.json();
    console.log(json);
    if(response.isSuccess){
      localStorage.setItem('token', json.authToken);
      navigate('/');

    } else {
      alert("Invalid Credentials");
    }
  }

  const signupUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: signup.name, email: signup.email, password: signup.password})
  });
    const json = await response.json();
    if(json.isSuccess){
      setSignup(signupInitialValues);
      toggleAccount('login');
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div
      className="container border rounded border-2 my-4 p-3"
      style={{ width: "400px" }}
    >
      <div className="mt-3 container text-center">
        <h2 className="text-danger">
          <b>ENotes</b>
        </h2>
        <p className="text-secondary">Your Notes On Cloud</p>
      </div>
      {account === "login" ? (
        <form className="my-5 w-75 mx-auto">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onValueChange}
            />
            <div id="emailHelp" className="form-text text-secondary">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onValueChange}
            />
          </div>
          <div className="container mx-auto text-center">
            <button className="btn btn-primary" onClick={userLogin}>Login</button>
            <p className="text-secondary mt-3">OR</p>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={toggleSignup}
            >
              Create an Account
            </button>
          </div>
        </form>
      ) : (
        <form className="w-75 mx-auto">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" onChange={onInputChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={onInputChange}
            />
          </div>
          <div className="container mx-auto text-center">
            <button type="submit" className="btn btn-primary" onClick={signupUser}>
              Singup
            </button>
            <p className="text-secondary mt-3">OR</p>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={toggleSignup}
            >
              Already have an account?
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
