import './App.css';
import React, { useEffect, useState } from 'react';

//DAYJS
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");

//https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

//CLICK HANDLERS

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
  const response = await fetch('./api/' + 'notVictor', {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = await response.json();
  console.log(data);
}

//REACT COMPONENT
function App() {
  return (
    <div>
      <MiniClock/>
    </div>
  );
}

//test case of using state to rerender re: time
const MiniClock = () => {
  const [date, setDate] = useState(new Date());
  const [timezones, setTimezones] = useState([]);

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  //CREATE CLICK
  async function createClick() {
  console.log('createClick');
  const selection = document.getElementById('selectTime').value
  console.log(selection)
  const response = await fetch('./api/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: selection }),
  })
  const data = await response.json();

  console.log(data);
  console.log('timezones', timezones);
  }

  const newTimezones = [];
  const timeComponents = [];

  //READCLICK FUNCTION
  async function readClick() {
    console.log('readClick');
    const response = await fetch('./api/')
    const data = await response.json();
    console.log(data);
  
    data.forEach(document => {
      newTimezones.push(document.name);
    });

    setTimezones(newTimezones);
  }

  for (let i = 0; i < timezones.length; i++) {
    timeComponents.push(<Timezone date={date} location={timezones[i]} key={i} />)
  }

  return (
    <div>
      <h1>hello world from miniClock!</h1>

      <select name="selectTime" id="selectTime">
        <option value="US/Eastern">Eastern</option>
        <option value="US/Central">Central</option>
        <option value="US/Mountain">Mountain</option>
        <option value="US/Pacific">Pacific</option>
      </select>

      <button onClick={createClick}>create</button>
      <button onClick={readClick}>read</button>
      <h2>It is {date.toLocaleTimeString()}</h2>
      <h2>
        {timeComponents}
      </h2>

    </div>
  )
}

function Timezone (props) {
  console.log(props)
  const time = props.date.toLocaleTimeString("en-US", {
    timeZone: props.location,
    timeZoneName: "short",
  });

  return (
    <div>
      <h2>{props.location}: {time}</h2>
      <button onClick={updateClick}>update</button>
      <button onClick={deleteClick}>delete</button>
    </div>
  );
}

export default App;
