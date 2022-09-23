import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default Error = (props) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-[url('./earth1.jpg')] bg-cover">
      <div className="w-full h-full flex flex-col items-center p-10 gap-10">
        <div className="min-w-fit flex flex-col items-center gap-5 border-solid border border-gray-800 p-10 rounded-xl bg-slate-400 bg-opacity-20">
          <div>
            <h1 className="text-primary text-6xl font-mono font-semibold">Invalid Login</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={event => navigate("/")} className=" hover:bg-slate-500/50 text-white py-2 px-4 rounded border border-gray-500">
              Back
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}