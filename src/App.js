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

function App() {
  return (
    <div>
      <Clock />
    </div>
  );
}

function Clock() {
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
      <h2>UTC: {utc}</h2>
      {/* <h2>EST: {date}</h2> */}
      <h2>Central Time: {date2}</h2>
      <h2>Mountain Time: {date3}</h2>
      <h2>Pacific Time: {date2}</h2>
      {/* <h1>Using the dayjs library...</h1> */}


      <span>{time}</span>
      <p>{dayjs().format()}</p>
    </div>
  );
}



export default App;
