#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>  // For HTTPS
#include <Wire.h>
#include "DHT20.h"

// Wi-Fi credentials
const char* ssid = "Ankel";
const char* password = "skgtrap2310";
const char* serverUrl = "https://flying-flint-mare.glitch.me/data";  // API endpoint

DHT20 DHT;  // DHT sensor

// Create a secure WiFi client for HTTPS
std::unique_ptr<BearSSL::WiFiClientSecure> wifiClient(new BearSSL::WiFiClientSecure);

// Function to send a POST request with temperature and humidity
void sendSensorData() {
  // Read sensor data
  int status = DHT.read();
  float temperature = DHT.getTemperature();
  float humidity = DHT.getHumidity();

  // Ensure the DHT sensor data is valid
  if (status == 0) {
    // Prepare JSON data in the same format as your cURL request
    String postData = "{\"temperature\":" + String(temperature, 1) +
                      ", \"humidity\":" + String(humidity, 1) + "}";

    if (WiFi.status() == WL_CONNECTED) {  // Check if Wi-Fi is connected
      HTTPClient http;

      // Skip certificate verification (for testing, less secure)
      wifiClient->setInsecure();  // Optional: comment this out if you want to verify the certificate

      // Use the WiFiClientSecure instance with http.begin() for HTTPS
      http.begin(*wifiClient, serverUrl);  // Specify the HTTPS URL

      // Add HTTP headers
      http.addHeader("Content-Type", "application/json");  // Specify content-type header

      // Send the POST request
      int httpResponseCode = http.POST(postData);

      // Handle the response
      if (httpResponseCode > 0) {
        String response = http.getString();  // Get the response
        Serial.println("POST Response Code: " + String(httpResponseCode));
        Serial.println("Response: " + response);
      } else {
        Serial.println("Error on sending POST: " + String(httpResponseCode));
      }

      http.end();  // End HTTP connection
    } else {
      Serial.println("Error: Wi-Fi not connected");
    }
  } else {
    Serial.println("Error reading sensor data");
  }
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  DHT.begin();

  // Connect to Wi-Fi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected to Wi-Fi");
  Serial.println("IP address: " + WiFi.localIP().toString());
}

void loop() {
  sendSensorData();  // Send sensor data to the server
  delay(600000);     // Wait 10 minutes (600,000 milliseconds) before sending again
}
