const cleanVanData = (data) => {
    const { time, date } = splitTimestamp(data.timestamp.$date);
    return {
      van_id: data.van_id,
      time: time,
      date: date,
      driver: data.driver_name,
      passenger: data.passenger,
      status: data.status,
      speed: `${data.speed} Km/hr`
    };
  };
  
  
  const cleanPirData = (data) => {
    const { time, date } = splitTimestamp(data.timestamp.$date);

    return {
      pir_id: data.sensor_id,
      pir_name: "PIR MODULE",
      last_update: date + " " + time, 
      status: data.status,
      value : data.value
    };
  };
  
  
  const cleanCamData = (data) => {
    const { time, date } = splitTimestamp(data.timestamp.$date);

    return {
      cam_id: data.sensor_id,
      cam_name: "CAMERA MODULE",
      last_update: date + " " + time, 
      status: data.status,
    };
  };
  function splitTimestamp(timestamp) {
    const dateObj = new Date(timestamp);
  
    const hours = String(dateObj.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
  
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
  
    return {
      time,
      date
    };
  }
  
  
  export { cleanVanData, cleanPirData, cleanCamData };