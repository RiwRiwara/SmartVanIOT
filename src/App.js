import { InputLabel, MenuItem, FormControl, IconButton, Button } from '@mui/material';
import './App.css';
import Header from './Components/Header';
import React, { useEffect } from 'react';
import Select from '@mui/material/Select';
import { Refresh } from '@mui/icons-material';
import { get, onlyget } from './Services/api';

const cleanVanData = (data) => {
  return {
    van_id: data.van_id,
    time: new Date(data.timestamp.$date).toLocaleTimeString(),
    date: new Date(data.timestamp.$date).toLocaleDateString(),
    driver: data.driver_name,
    passenger: data.passenger,
    status: data.status,
    speed: `${data.speed} Km/hr`
  };
};

function App() {
  const [Module, setModule] = React.useState('CAM01');
  const [vanData, setVanData] = React.useState({});

  const handleChange = (event) => {
    setModule(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await onlyget('/api/van/get-van?van_id=VAN01');
        console.log(response.data);
        setVanData(cleanVanData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="h-max" >
      <Header />
      <div style={{ paddingTop: "80px", }}>
        <div id="section1" className='flex justify-center'>

          <div style={{ position: 'relative' }}>
            <img
              src='https://firstdraw.blob.core.windows.net/cardimgs/van.png'
              alt='Van'
            />
            <button className='pirBtn1' >
              PIR01
            </button>
            <button className='pirBtn2' >
              PIR02
            </button>
            <button className='pirBtn3' >
              PIR03
            </button>
            <button className='cam1' >
              CAM1
            </button>
            <button className='cam2' >
              CAM2
            </button>

          </div>
        </div>
        <div id="section2" className="sm:p-2 md:p-5" style={{ backgroundColor: "#829BDD" }}>

          <div className='flex flex-col md:flex-row gap-4 bg-white p-4 rounded-md '>
            <div className='md:w-1/2'>
              <h1 className='font-bold text-2xl my-3'>General</h1>
              <hr className='my-2' />

              <div className='flex justify-between text-lg'>
                <span className='font-bold mr-4'>VAN ID</span>
                {vanData.van_id}
              </div>
              <div className='flex justify-between text-lg'>
                <span className='font-bold mr-4'>Time</span>
                {vanData.time || "00:00:00"}
              </div>
              <div className='flex justify-between text-lg'>
                <span className='font-bold mr-4'>Date</span>
                {vanData.date || "00/00/0000"}
              </div>
              <div className='flex justify-between text-lg'>
                <span className='font-bold mr-4'>Driver</span>
                {vanData.driver}
              </div>
              <div className='flex justify-between text-lg'>
                <span className='font-bold mr-4'>Passenger</span>
                {vanData.passenger}/10
              </div>
              <div className='flex justify-between text-lg'>
                <span className='font-bold mr-4'>Status</span>
                {vanData.status}
              </div>
              <div className='flex justify-between text-lg'>
                <span className='font-bold mr-4'>Speed</span>
                {vanData.speed}
              </div>
            </div>
            <div className='md:w-1/2 mt-4 md:mt-0'>
              <div className='flex justify-between'>
                <h1 className='font-bold text-2xl my-3'>Select Modules</h1>
                <IconButton>
                  <Refresh />
                </IconButton>
              </div>
              <hr className='my-2' />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Module</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Module}
                  label="Module"
                  onChange={handleChange}
                >
                  <MenuItem value={"CAM01"}>CAM01</MenuItem>
                  <MenuItem value={"CAM02"}>CAM02</MenuItem>
                  <MenuItem value={"PIR01"}>PIR01</MenuItem>
                  <MenuItem value={"PIR02"}>PIR02</MenuItem>
                  <MenuItem value={"PIR03"}>PIR03</MenuItem>
                </Select>
              </FormControl>

              <div className='sensorDetail'>
                <div className='flex justify-between text-lg'>
                  <span className='font-bold mr-4'>Module ID</span>
                  CAM01
                </div>
                <div className='flex justify-between text-lg'>
                  <span className='font-bold mr-4'>Module Name</span>
                  CAMERA MODULE
                </div>
                <div className='flex justify-between text-lg'>
                  <span className='font-bold mr-4'>Last Update</span>
                  1 Minute ago
                </div>
                <div className='flex justify-between text-lg'>
                  <span className='font-bold mr-4'>Status</span>
                  Working
                </div>
                {
                  Module === "CAM01" || Module === "CAM02" ?
                    <div>
                      <Button variant="contained" color="primary">
                        View Video
                      </Button>
                    </div>
                    :
                    <div></div>
                }


              </div>

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default App;
