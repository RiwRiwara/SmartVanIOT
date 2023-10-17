// Code for PIR sensor and buzzer sensor
/*
  Setup:

  # Important
  - ModuleName PIR01 it will be id of moudle use for save to database.
    You will have 3 nodeMCU board so you need to change it to PIR02 and PIR03 and upload to each board.

  - Check the pin number for PIR sensor and buzzer sensor
  - ESP_ID is mean Id of board you can change it to anything you want
  - ssid and password is your wifi name and password

  - serverAddress is your server address of Safetyvan server API

  [Not chnage]
  - pirEndpoint is your endpoint for PIR sensor
  - cameraEndpoint is your endpoint for camera sensor

*/


// Start code
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const int pirPin01 = D2;
const int buzzerPin = D1;
const String ModuleName = "PIR01";

const String ESP_ID = "ESP001";
const String VAN_ID = "VAN001";

const char* ssid = "Kaboom_2.4G";
const char* password = "0406092549";

const char* serverAddress = "192.168.1.10";
const int serverPort = 5565;

const String SensorDefalut = "/api/sensor/";
const String pirEndpoint = "/api/sensor/pir";
const String cameraEndpoint = "/api/sensor/camera";

void connectToWiFi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.println("IP address: " + WiFi.localIP().toString());
}

void fetchDataFromAPI() {
  WiFiClient client;

  Serial.print("Connecting to ");
  Serial.println(serverAddress);
  Serial.println("http://" + String(serverAddress) + ":" + String(serverPort) + SensorDefalut);

  HTTPClient http;
  http.begin(client, "http://" + String(serverAddress) + ":" + String(serverPort) + SensorDefalut);
  int httpCode = http.GET();


  if (httpCode == HTTP_CODE_OK) {
    String response = http.getString();
    Serial.println("Response from server:");
    Serial.println(response);
  } else {
    Serial.print("Error in HTTP request: ");
    Serial.println(httpCode);
  }
  http.end();
}

void postData(const String& endpoint, const String& data) {
  WiFiClient client;

  HTTPClient http;
  http.begin(client, "http://" + String(serverAddress) + ":" + String(serverPort) + endpoint);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(data);

  if (httpCode == HTTP_CODE_OK) {
    String response = http.getString();
    Serial.println("Response from server:");
    Serial.println(response);
  } else {
    Serial.print("Error in HTTP request: ");
    Serial.println(httpCode);
  }

  http.end();
}

void postDataToPIR(const String& ID, const String& val) {
  String dataToSend = "{ \"sensor_id\": \"" + ID + "\",
                         \"status\":    \"triggered\",
                         \"van_id\":     \"" + VAN_ID + "\",
                         \"value\":    \"" + val +"\"}";
  Serial.println(dataToSend);
  postData(pirEndpoint, dataToSend);
}


void setup() {

  pinMode(pirPin01, INPUT);
  pinMode(buzzerPin, OUTPUT);

  Serial.begin(9600);
  delay(10);

  Serial.println();
  connectToWiFi();

  delay(100);
  fetchDataFromAPI();

  Serial.println();

}

void loop() {

  delay(5000);
  int PIR01 = digitalRead(pirPin01);
  int buzzer = digitalRead(buzzerPin);


  if (PIR01 == 1) {
    postDataToPIR(ModuleName, "1");
    digitalWrite(buzzerPin, HIGH);
    Serial.println(ModuleName+" Detecting : save to server!");
  } else {
    postDataToPIR(ModuleName, "0");
    digitalWrite(buzzerPin, LOW);
    Serial.println(ModuleName+" Undetecting : save to server! ");
  }


  
}
