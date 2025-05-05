// -------------------------------
// SMART CART - NO LCD VERSION
// Components: NodeMCU + RFID Reader
// Description: Sends UID, product name, and price to Firebase
// -------------------------------

#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SPI.h>
#include <MFRC522.h>

// WiFi credentials
#define WIFI_SSID "POCO M3"
#define WIFI_PASSWORD "Rajasri123"

// Firebase credentials
#define API_KEY "AIzaSyCYOXMHiAydwzPW0_WFU839zlpuziDoO-M"
#define DATABASE_URL "https://smartshoppingcart-82cbb-default-rtdb.firebaseio.com/"

// RFID Pins (NodeMCU)
#define RST_PIN 5  // D1
#define SS_PIN 4   // D2

MFRC522 mfrc522(SS_PIN, RST_PIN);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Product mapping
struct Product {
  String name;
  int price;
};

Product getProductDetails(String uid) {
  if (uid == "67a02e63") return {"Maggi", 20};
  if (uid == "c67df2b") return {"5 Star", 10};
  if (uid == "265d42d9") return {"Milk", 12};
  return {"Unknown", 0};
}

void setup() {
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("RFID reader initialized.");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n Wi-Fi connected!");

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email = "retailer@smartcart.com";
  auth.user.password = "Retailer@1215";

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Serial.println("Firebase initialized!");
}

void loop() {
  Serial.println("Waiting for RFID card...");

  if (!mfrc522.PICC_IsNewCardPresent()) {
    delay(500);
    return;
  }

  if (!mfrc522.PICC_ReadCardSerial()) {
    delay(500);
    return;
  }

  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }

  Serial.println("Card Detected! UID: " + uid);

  Product product = getProductDetails(uid);
  String path = "/scannedItems/" + uid;

  int count = 0;
  if (Firebase.getInt(fbdo, path + "/count")) {
    count = fbdo.intData();
  }
  count++;

  Firebase.setInt(fbdo, path + "/count", count);
  Serial.println("Scan Count: " + String(count));

  if (count % 2 == 1) {
    Firebase.setString(fbdo, path + "/uid", uid);
    Firebase.setString(fbdo, path + "/name", product.name);
    Firebase.setInt(fbdo, path + "/price", product.price);
    Serial.println("Item added to Firebase!");
  } else {
    Firebase.deleteNode(fbdo, path);
    Serial.println("Item removed from Firebase!");
  }

  delay(2000);
}

