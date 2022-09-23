import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//LOGIN COMPONENT
const Login = (props) => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex justify-center items-center bg-[url('./earth1.jpg')] bg-cover">
        <div className="w-full h-full flex flex-col items-center p-10 gap-10">
          <div className="min-w-fit flex flex-col items-center gap-5 border-solid border border-gray-800 p-10 rounded-xl bg-slate-400 bg-opacity-20">
            
              <h1 className="text-primary text-6xl font-mono font-semibold">Login</h1>

              <button onClick={event => navigate("/timezone")} className=" bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded border border-gray-500">
                right
              </button>
              <button onClick={event => navigate("/error")} className=" bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded border border-gray-500">
                wrong
              </button>

          </div>
        </div>
    </div>
  );
}

export default Login;