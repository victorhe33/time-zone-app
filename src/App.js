import './App.css';
import React from 'react';

//DAYJS
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");

//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

//CLICK HANDLERS

//CREATECLICK
async function createClick() {
  console.log('createClick');
  const response = await fetch('./api/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: "Victor"}),
  })
  const data = await response.json();
  console.log(data);
}

//READCLICK FUNCTION
async function readClick() {
  console.log('readClick');
  const response = await fetch('./api/')
  const data = await response.json();
  console.log(data);
}

//UPDATECLICK FUNCTION
async function updateClick() {
  console.log('updateClick');
  const response = await fetch('./api/', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: 'notVictor',
    })
  });
  const data = await response.json();
  console.log(data);
}

//DELETECLICK FUNCTION
async function deleteClick() {
  console.log('deleteClick');
}


//REACT COMPONENT
function App() {
  return (
    <div>
      <Clock />
    </div>
  );
}

//19:45:35 AM CDT

function Clock() {
  // const test = new Date().parse();

  const utc = new Date().toUTCString();

  const date = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "short",
  })
  const date2 = new Date().toLocaleTimeString("en-US", {
    timeZone: "US/Central",
    timeZoneName: "short",
    hour12: true
  })
  const date3 = new Date().toLocaleTimeString("en-US", {
    timeZone: "US/Mountain",
    timeZoneName: "short",
    hour12: true
  })
  const date4 = new Date().toLocaleTimeString("en-US", {
    timeZone: "US/Pacific",
    timeZoneName: "short",
    hour12: true
  })
  const now = new dayjs();
  const time = String(now);

  return (
    <div>
      <h1>hello world!</h1>
      <button onClick={createClick}>create</button>
      <button onClick={readClick}>read</button>
      <button onClick={updateClick}>update</button>
      <button onClick={deleteClick}>delete</button>
      <h2>UTC: {utc}</h2>
      <h2>EST: {date}</h2>
      <h2>Central Time: {date2}</h2>
      <h2>Mountain Time: {date3}</h2>
      <h2>Pacific Time: {date4}</h2>
      <h1>Using the dayjs library...</h1>
      <span>TIME: {time}</span>
      <p>{dayjs().format()}</p>
    </div>
  );
}



export default App;
