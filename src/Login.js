import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

//LOGIN COMPONENT
const Login = (props) => {
  const navigate = useNavigate();

  const handleSubmit = data => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };
  
  return (
    <div className="h-screen flex justify-center items-center bg-[url('./earth1.jpg')] bg-cover">
        <div className="w-full h-full flex flex-col items-center p-10 gap-10">
          <div className="min-w-fit flex flex-col items-center gap-5 border-solid border border-gray-800 p-10 rounded-xl bg-slate-400 bg-opacity-20">
            
              <h1 className="text-primary text-6xl font-mono font-semibold">Login</h1>

              {/*COPIED LOGIN*/}
              <div >
                <Form onSubmit={handleSubmit} />
              </div>

              {/* <button onClick={event => navigate("/timezone")} className=" bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded border border-gray-500">
                right
              </button>
              <button onClick={event => navigate("/error")} className=" bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded border border-gray-500">
                wrong
              </button> */}

          </div>
        </div>
    </div>
  );
}

const Field = React.forwardRef(({ label, type }, ref) => {
  return (
    <div>
      <label  className="text-slate-300">{label}</label>
      <input ref={ref} type={type} className="bg-gray-200 /10 appearance-none border-2 focus: bg-gray-200/0 border-slate-700 rounded w-full py-2 px-4 text-white leading-tight focus: outline-none"/>
    </div>
  );
});

const Form = ({ onSubmit }) => {
  const navigate = useNavigate();
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };
    const response = await fetch('./login/', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    const validation = await response.json();
    console.log(validation.status)
    if (validation.status) {
      navigate("/timezone")
    } else {
      navigate('/error')
    }
  };
  //login auth click handler
  const createUserHandler = async e => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };
    const response = await fetch('./login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    const validation = await response.json();
    console.log(validation.status)
    if (validation.status) {
      navigate("/timezone")
    } else {
      navigate('/error')
    }
  }
  
  return (
    
    <form onSubmit={handleSubmit} >
      <Field ref={usernameRef} label="Username:" type="text" className="" />

      <Field ref={passwordRef} label="Password:" type="password" className="" />
      <div className="w-full flex justify-center mt-4 gap-4">
        <button type="submit" className="bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded border border-gray-500">
          Login
        </button>
        <button type="button" onClick={event => createUserHandler(event)} className=" bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded border border-gray-500">
          Create
        </button>
      </div>
    </form>
  );
};

export default Login;