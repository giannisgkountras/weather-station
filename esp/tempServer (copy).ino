#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <Wire.h>
#include "DHT20.h"
#include <WiFiUdp.h>
#include <NTPClient.h>

const char* ssid = "Ankel";
const char* password = "skgtrap2310";

ESP8266WebServer server(80);
DHT20 DHT;

// NTP Client setup
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 10800, 60000); // GMT offset and update interval 7200 for winter in greece

// Function to get current timestamp
String getTimestamp() {
  timeClient.update();
  return timeClient.getFormattedTime(); // Returns a string in format YYYY-MM-DDTHH:MM:SSZ
}

// Serving Hello world
void getHelloWorld() {
    server.send(200, "application/json", "{\"name\": \"Hello world\"}");
}

// Serving sensor data
void getSensorData() {
    int status = DHT.read();
    float temperature = DHT.getTemperature();
    float humidity = DHT.getHumidity();
    
    String json = "{\"temperature\":" + String(temperature, 1) +
                  ", \"humidity\":" + String(humidity, 1) +
                  ", \"timestamp\":\"" + getTimestamp() + "\"}";

    server.send(200, "application/json", json);
}

// Define routing
void restServerRouting() {
    server.on("/", HTTP_GET, []() {
        server.send(200, "text/html", "Welcome to the REST Web Server");
    });
    server.on("/helloWorld", HTTP_GET, getHelloWorld);
    server.on("/sensorData", HTTP_GET, getSensorData);
}

// Manage not found URL
void handleNotFound() {
    String message = "File Not Found\n\n";
    message += "URI: ";
    message += server.uri();
    message += "\nMethod: ";
    message += (server.method() == HTTP_GET) ? "GET" : "POST";
    message += "\nArguments: ";
    message += server.args();
    message += "\n";
    for (uint8_t i = 0; i < server.args(); i++) {
        message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
    }
    server.send(404, "text/plain", message);
}

void setup() {
    Serial.begin(115200);
    Wire.begin();
    DHT.begin();

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.println("");

    // Wait for connection
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to ");
    Serial.println(ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    // Initialize NTP Client
    timeClient.begin();

    // Activate mDNS
    if (MDNS.begin("esp8266")) {
        Serial.println("MDNS responder started");
    }

    // Set server routing
    restServerRouting();
    // Set not found response
    server.onNotFound(handleNotFound);
    // Start server
    server.begin();
    Serial.println("HTTP server started");
}

void loop() {
    server.handleClient();
}
