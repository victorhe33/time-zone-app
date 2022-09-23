import './App.css';
import Login from './Login';
import Error from './Error';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

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
  const [status, changeStatus] = useState(false);
  console.log('status', status);


  //DEPRECIATED LOGGING FUNCTION 2/2 ROUTER
  // function logging() {
  //   changeStatus(true);
  // }

  return (
      <>
        {/* <h1><Link to="/">Welcome</Link></h1>
        <h1><Link to="/timezone">Hello, React Router!</Link></h1> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/error" element={<Error />} />
          <Route path="/timezone" element={
            <div className = "h-full w-full flex bg-[url('./earth.jpg')] bg-cover">
              <MiniClock/>
            </div>
          }/>
        </Routes>
      </>
  );

//   //CONDITIONAL RENDER: LOGIN PAGE DEPRECIATED 2/2 ROUTER
//   if (!status) {
//     return (
//       <>
//         <Login logging={logging}/>
//       </>
//     );
//   };

//   //CONDITIONAL RENDER: CONTENT PAGE DEPRECIATED 2/2 ROUTER
//   if (status) {
//     return (
//       <div className="h-full w-full flex bg-[url('./earth.jpg')] bg-cover">
//         <MiniClock/>
//       </div>
//     );
//   };
}

//MINICLOCK COMPONENT
const MiniClock = () => {
  const [date, setDate] = useState(new Date());
  const [timezones, setTimezones] = useState({
    team: [],
  });

  const navigate = useNavigate();

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => readClick, []);

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
    console.log('ReadClick', data);

    data.forEach(document => {
      newTimezones.push({ 
        id: document._id,
        name: document.name,
        team: document.team,
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
    console.log('updateCLick data', data);
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
    console.log('deleteClick data', data);
    readClick();
  }

  for (let i = 0; i < timezones.length; i++) {
    timeComponents.push(<Timezone date={date} id={timezones[i].id} location={timezones[i].name} key={i} team={timezones[i].team} updateClick={updateClick} deleteClick={deleteClick} addTeamClick={addTeamClick} removeTeamClick={removeTeamClick}/>)
  }

  //TEAM CLICK HANDLERS
  async function addTeamClick(event, id) {
    console.log('addTeamClick')
    const teamInputValue = document.getElementById(`teamInput${id}`).value;
    if (teamInputValue === "") return;
    const currTeam = timezones.filter(timezone => timezone.id === id);
    const remainTeam = timezones.filter(timezone => timezone.id !== id)

    // const newTeam = [timezones.team, teamInputValue];
    // setTimezones([newTeam]);
    const response = await fetch(`./team/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        team: [...currTeam[0].team, teamInputValue],
      })
    });
    const data = await response.json();

    const newTeam = {
      ...currTeam[0],
      team: data.team,
    }
    const newState = [
      ...remainTeam,
      newTeam,
    ]

    console.log('addTeam data', data)
    // setTimezones(newState);
    //clear inputvalue after submit
    document.getElementById(`teamInput${id}`).value = "";
    readClick();
  }

  async function removeTeamClick(event, name, id) {
    console.log('removeTeamClick');
    // console.log('name removed +id', name, id);

    const remainTimezone = timezones.filter(timezone => timezone.id !== id)
    const currTimezone = timezones.filter(timezone => timezone.id === id);
    const currTeam = [...currTimezone[0].team]
    const newTeam = [];
    let once = true;
    for (let teammate of currTeam) {
      if (teammate === name && once) {
        once = false;
      } else {
        newTeam.push(teammate);
      }
    }

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
    console.log('removeTeam data', data);

    // setTimezones([...remainTimezone, data]);
    readClick();
  } 

  return (
    <div className="relative w-full h-full flex flex-col items-center p-10 gap-10">
      <div className="min-w-fit flex flex-col items-center gap-5 border-solid border border-gray-800 p-10 rounded-xl bg-slate-400 bg-opacity-20">
        <div>
          <h1 className="text-primary text-6xl font-mono font-semibold">{date.toLocaleTimeString()}</h1>
        </div>

        <div className="flex items-center gap-2">
          <label className="inline uppercase tracking-wide text-gray-100 text-xs font-bold" for="selectTime">
            Timezone:
          </label>
          <select name="selectTime" id="selectTime" className="inline appearance-none bg-gray-200/10 focus:bg-gray-200/0 border border-slate-700 text-gray-100 py-2 px-3 pr-4 rounded leading-tight focus:outline-none focus:border-gray-500">
            <option value="US/Eastern">Eastern</option>
            <option value="US/Central">Central</option>
            <option value="US/Mountain">Mountain</option>
            <option value="US/Pacific">Pacific</option>
            <option value="US/Hawaii">Hawaii</option>
          </select>

          <button onClick={createClick} className="hover:bg-blue-700 text-white py-2 px-4 rounded border border-gray-500">create</button>

        </div>
      </div>
      
      <div className="w-full justify-center flex gap-10 flex-wrap">
        {timeComponents}
      </div>
      <button onClick={() => navigate('/')} className="absolute right-10 hover:bg-red-700 text-white py-2 px-4 rounded border border-gray-500">Logout</button>

    </div>
  );
}

//TIMEZONE COMPONENT
function Timezone (props) {
  const time = props.date.toLocaleTimeString("en-US", {
    timeZone: props.location,
    timeZoneName: "short",
  });

  const teamComponents = [];

  for (let i = 0; i < props.team.length; i++) {
    teamComponents.push(<Team name={props.team[i]} key={`team${i}`} removeTeamClick={props.removeTeamClick} id={props.id}/>)
  }

  return (
    <div className="flex flex-col relative gap-5 p-8 rounded-xl bg-slate-400 bg-opacity-20">
      
      <h2 className="font-mono text-white text-xl font-semibold">{props.location}: {time}</h2>

      <div className="flex items-center gap-2 ml-4">
        <label className="block uppercase tracking-wide text-gray-100 text-xs font-bold" for="selectUpdateTime">
          Timezone:
        </label>
        <select name="selectUpdateTime" id={`update${props.id}`} className="inline appearance-none bg-gray-200/10 focus:bg-gray-200/0 border border-slate-700 text-gray-100 py-2 px-3 pr-4 rounded leading-tight focus:outline-none focus:border-gray-500">
          <option value="US/Eastern">Eastern</option>
          <option value="US/Central">Central</option>
          <option value="US/Mountain">Mountain</option>
          <option value="US/Pacific">Pacific</option>
          <option value="US/Hawaii">Hawaii</option>
        </select>

        <button onClick={event => props.updateClick(event, props.id)} className="hover:bg-slate-500 text-white py-2 px-4 rounded border border-gray-500">
          update
        </button>

        <button id={props.id} onClick={event => props.deleteClick(event, props.id)} className="absolute top-1 right-1  hover:bg-gray-500 text-white font-semibold w-6 h-6 rounded">
          x
        </button>
      </div>

      <ul>
        {teamComponents}
      </ul>


      <div className="w-1/2 flex gap-2 items-center ml-4">
        <input id={`teamInput${props.id}`} placeholder="name" className="bg-gray-200/10 appearance-none border-2 focus:bg-gray-200/0 border-slate-700 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none"></input>
        
        <button onClick={event => props.addTeamClick(event, props.id)} className="hover:bg-slate-400 text-white h-6 w-8 rounded border-slate-700 border-solid border">
          +
        </button>
      </div>

    </div>
  );
}

//TEAM COMPONENT
const Team = (props) => {
  return (
    <li className="p-2 ml-2">
      <span className="font-mono text-white text-md mr-2">{props.name}</span>

      <button onClick={event => props.removeTeamClick(event, props.name, props.id)} className="hover:bg-slate-400 text-white h-6 w-6  rounded border-slate-700 border-solid border">
        -
      </button>
      
    </li>
  );
}

export default App;
