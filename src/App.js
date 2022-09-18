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


//REACT COMPONENTS
const App = () => {
  return (
    <div>
      <MiniClock/>
    </div>
  );
}

//MINICLOCK COMPONENT
const MiniClock = () => {
  const [date, setDate] = useState(new Date());
  const [timezones, setTimezones] = useState([]);
  const [ids, setIds] = useState([]);

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
  readClick();
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
      newTimezones.push({ 
        name: document.name,
        id: document._id
      });
    });

    setTimezones(newTimezones);
  }

  //UPDATECLICK FUNCTION
  async function updateClick(event, id) {
    console.log('updateClick');
    const updatedName = document.getElementById(`update${id}`).value;
    const response = await fetch(`./api/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: updatedName,
      })
    });
    const data = await response.json();
    console.log(data);
    readClick();
  }
  
  //DELETECLICK FUNCTION
  async function deleteClick(event, id) {
    console.log('deleteClick');
    console.log('event', event.target.id);
    const response = await fetch('./api/' + event.target.id, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
    readClick();
  }

  for (let i = 0; i < timezones.length; i++) {
    timeComponents.push(<Timezone date={date} location={timezones[i].name} key={i} id={timezones[i].id} updateClick={updateClick} deleteClick={deleteClick} />)
  }

  return (
    <div>
      <h1>hello world from miniClock!</h1>

      <select name="selectTime" id="selectTime">
        <option value="US/Eastern">Eastern</option>
        <option value="US/Central">Central</option>
        <option value="US/Mountain">Mountain</option>
        <option value="US/Pacific">Pacific</option>
        <option value="US/Hawaii">Hawaii</option>
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

//TIMEZONE COMPONENT
function Timezone (props) {
  const [team, setTeam] = useState([]);

  const time = props.date.toLocaleTimeString("en-US", {
    timeZone: props.location,
    timeZoneName: "short",
  });

  const teamComponents = [];

  //CLICK HANDERS
  async function addTeamClick (event, id) {
    console.log('addTeamClick');
    const teamInputValue = document.getElementById(`teamInput${id}`).value;
    const newTeam = [...team, teamInputValue];
    const response = await fetch(`./team/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        team: newTeam,
      })
    });
    const data = await response.json();
    console.log(data);


    setTeam(data.team);
  }

  for (let i = 0; i < team.length; i++) {
    teamComponents.push(<Team name={team[i]} key={`team${i}`} />)
  }

  return (
    <div>
      <h2>{props.location}: {time}</h2>
      <ul>
        {teamComponents}
      </ul>
      <select name="selectUpdateTime" id={`update${props.id}`}>
        <option value="US/Eastern">Eastern</option>
        <option value="US/Central">Central</option>
        <option value="US/Mountain">Mountain</option>
        <option value="US/Pacific">Pacific</option>
        <option value="US/Hawaii">Hawaii</option>
      </select>
      <button onClick={event => props.updateClick(event, props.id)}>update</button>
      <button id={props.id} onClick={event => props.deleteClick(event, props.id)}>delete</button>
      <input id={`teamInput${props.id}`}></input>
      <button onClick={event => addTeamClick(event, props.id)}>add</button>
    </div>
  );
}

//TEAM COMPONENT
const Team = (props) => {
  return (
    <li>
      <span>{props.name}</span>
    </li>
  );
}

export default App;
