#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const int pirPin01 = D2;
const String ModuleName = "PIR03";

const String ESP_ID = "ESP001";

// Use only wifi 2.4Ghz
const char* ssid = "Kaboom_2.4G";
const char* password = "0406092549";

// Use same flask server
const char* serverAddress = "192.168.1.10";
const int serverPort = 5565;

// Do not edit
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
  String dataToSend = "{\"sensor_id\": \"" + ID + "\", \"status\": \"triggered\", \"value\": \"" + val + "\"}";
  Serial.println(dataToSend);
  postData(pirEndpoint, dataToSend);
}


void setup() {

  pinMode(pirPin01, INPUT);

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
    Serial.println(ModuleName);

  if (PIR01 == 1) {
    postDataToPIR(ModuleName, "1");
    Serial.println(ModuleName+" Detecting : save to server!");
  } else {
    postDataToPIR(ModuleName, "0");
    Serial.println(ModuleName+" Undetecting : save to server! ");
  }
  
}
