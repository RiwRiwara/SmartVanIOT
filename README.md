# SmartvanAPI

## Setup
### setup SafetyvanAPI first 
    1. Constants.py for set value config
    - Host is mean address of API you can set by run "ipconfig" in terminal and find ipv4, copy it and paste in Host.
    - PORT you can change to you need but dont dubplicate another port.
    - MONGODB_URL and another mongo is your data .
    - LINE_NOTIFY_TOKEN is token for post notification to line. you van request api in line api
    - MONGODB_DB MONGODB_COLLECTION_PIR MONGODB_COLLECTION_VAN  LINE_NOTIFY_API_URL -> not change

    - after setup run main.py

    ```

    Constants = {
        "HOST": "192.168.1.10",
        "PORT": 5565,
        
        "MONGODB_URL": "mongodb+srv://riwara:Gso0u8f4JMR36d5G@newcluster.fxldupt.mongodb.net/?retryWrites=true&w=majority",

        "MONGODB_DB": "testDB",
        "MONGODB_COLLECTION_PIR": "pirdata",
        "MONGODB_COLLECTION_CAM": "camdata",
        "MONGODB_COLLECTION_VAN": "vanData",

        "LINE_NOTIFY_TOKEN":"alVyzHhpd8jL8ZbAH3aUxPmyEc0bdsms5KYKh6HjiOe",
        "LINE_NOTIFY_API_URL":"https://notify-api.line.me/api/notify"
    }
    ```

### setup Safetyvan ui 
    - go to .env and set information

### setup module
 1. PIR sensor 
    - you can get code .ino from ModuleCodes folder
    - don't forget setup module that write in header of .ino
 2. Cam
    - You must install by
    - Connect usb with your laptop.
    - Enter to https://tasmota.github.io/install/
    - click dropdown select "Tasmota32 Webvam (English)".
    - Click connect and select usb port that conect camera.
    - Install device and click "Erase Device"
    - wait loading to 100% and after change wifi to something like "Tasmota"
    - when connect it will redirect to wifi setting Enter your wifi and password (SSID and password same in .ino )
    - If connect successfully it will show IP looklike http://192.168.1.135 
    - Return to your internet/wifi and try to run http://192.168.1.135 it will show camere result
    - And last setting it same with 2 cam module and remember IP . Use it to .env file REACT_APP_CAM1_URL and REACT_APP_CAM1_URL


### How to run 
- Safety van reactjs
    `npm start`
- Safety van API
    `python main.py`