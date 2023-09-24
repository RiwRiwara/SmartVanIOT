import { InputLabel, MenuItem, FormControl, IconButton, Button } from '@mui/material';
import './App.css';
import Header from './Components/Header';
import React, { useEffect } from 'react';
import Select from '@mui/material/Select';
import { Refresh } from '@mui/icons-material';
import { get, onlyget } from './Services/api';
import { cleanVanData, cleanCamData, cleanPirData } from './Services/CleansData';

function App() {
  const [Module, setModule] = React.useState('CAM01');
  const [vanData, setVanData] = React.useState({});
  const [isLoding, setIsLoding] = React.useState(true);
  const [isLoding_2, setIsLoding_2] = React.useState(true);
  const [PIRDATA, setPIRDATA] = React.useState({});
  const [CAMDATA, setCAMDATA] = React.useState({});

  const refreshModule = () => {
    switch (Module) {
      case "CAM01":
        fetchModuleData("CAM", "CAM01");
        break;
      case "CAM02":
        fetchModuleData("CAM", "CAM02");
        break;
      case "PIR01":
        fetchModuleData("PIR", "PIR01")
        break;
      case "PIR02":
        fetchModuleData("PIR", "PIR02")
        break;
      case "PIR03":
        fetchModuleData("PIR", "PIR03")
        break;
      default:
        break;
    }
  }

  const handleChange = (event) => {
    setModule(event.target.value);
    switch (event.target.value) {
      case "CAM01":
        fetchModuleData("CAM", "CAM01");
        break;
      case "CAM02":
        fetchModuleData("CAM", "CAM02");
        break;
      case "PIR01":
        fetchModuleData("PIR", "PIR01")
        break;
      case "PIR02":
        fetchModuleData("PIR", "PIR02")
        break;
      case "PIR03":
        fetchModuleData("PIR", "PIR03")
        break;
      default:
        break;
    }

  };

  const fetchVanData = async () => {
    setIsLoding(true);
    try {
      const response = await onlyget('/api/van/get-van?van_id=VAN01');
      setVanData(cleanVanData(response.data));
      setIsLoding(false);
    } catch (error) {
      setIsLoding(false);
      console.error('Error fetching data:', error);
    }
  };

  const fetchModuleData = async (type, id) => {
    setIsLoding_2(true);
    var sensor_type = type === "CAM" ? "get-camera" : "get-pir";

    await onlyget('/api/sensor/' + sensor_type + '?sensor_id=' + id).then((response) => {
      console.log(response.data);
      if (type === "CAM") {
        setCAMDATA(cleanCamData(response.data));
      } else {
        setPIRDATA(cleanPirData(response.data));
      }
      setIsLoding_2(false);
    }).catch((error) => {
      console.error('Error fetching data:', error);
      setIsLoding_2(false);
    });
  };

  useEffect(() => {
    fetchVanData();
    fetchModuleData("CAM", "CAM01");
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
            <button className='pirBtn1' onClick={() => handleChange({target : {value:"PIR01"}})} >
              PIR01
            </button>
            <button className='pirBtn2' onClick={() => handleChange({target : {value:"PIR02"}})}>
              PIR02
            </button>
            <button className='pirBtn3' onClick={() => handleChange({target : {value:"PIR03"}})}>
              PIR03
            </button>
            <button className='cam1'onClick={() => handleChange({target : {value:"CAM01"}})} >
              CAM1
            </button>
            <button className='cam2' onClick={() => handleChange({target : {value:"CAM02"}})}>
              CAM2
            </button>

          </div>
        </div>
        <div id="section2" className="sm:p-2 md:p-5" style={{ backgroundColor: "#829BDD" }}>

          <div className='flex flex-col md:flex-row gap-4 bg-white p-4 rounded-md '>
            <div className='md:w-1/2'>
              <div className='flex justify-between'>
                <h1 className='font-bold text-2xl my-3'>General</h1>

                <IconButton onClick={fetchVanData}>
                  <Refresh />
                </IconButton>
              </div>

              <hr className='my-2' />

              {isLoding ? (
                <div className='flex justify-center items-center h-40'>
                  <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32'></div>
                </div>
              ) : (
                <>
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
                </>
              )}


            </div>
            <div className='md:w-1/2 mt-4 md:mt-0'>
              <div className='flex justify-between'>
                <h1 className='font-bold text-2xl my-3'>Select Modules</h1>
                <IconButton onClick={refreshModule}>
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

              {isLoding_2 ? (
                <div className='flex justify-center items-center h-40'>
                  <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32'></div>
                </div>
              ) : (
                <>
                  <div className='sensorDetail'>
                    <div className='flex justify-between text-lg'>
                      <span className='font-bold mr-4'>Module ID</span>
                      {Module === "CAM01" || Module === "CAM02" ? CAMDATA.cam_id : PIRDATA.pir_id}
                    </div>
                    <div className='flex justify-between text-lg'>
                      <span className='font-bold mr-4'>Module Name</span>
                      {Module === "CAM01" || Module === "CAM02" ? CAMDATA.cam_name : PIRDATA.pir_name}
                    </div>
                    <div className='flex justify-between text-lg'>
                      <span className='font-bold mr-4'>Last Update</span>
                      {Module === "CAM01" || Module === "CAM02" ? CAMDATA.last_update : PIRDATA.last_update}
                    </div>
                    <div className='flex justify-between text-lg'>
                      <span className='font-bold mr-4'>Status</span>
                      {Module === "CAM01" || Module === "CAM02" ? CAMDATA.status : PIRDATA.status}
                    </div>
                    {
                      Module === "CAM01" || Module === "CAM02" ?
                        <div>
                          <Button variant="contained" color="primary">
                            View Video
                          </Button>
                        </div>
                        :
                        <div className='flex justify-between text-lg'>
                        <span className='font-bold mr-4'>Value</span>
                        {PIRDATA.value == "1" ? "Motion Detected" : "No Motion Detected"}
                      </div>
                    }
                  </div>
                </>
              )}


            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default App;
