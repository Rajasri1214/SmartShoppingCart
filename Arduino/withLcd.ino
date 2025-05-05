// -------------------------------
// SMART CART - LCD VERSION
// Components: NodeMCU + RFID Reader + 16x2 LCD Display
// Description: Displays product info on LCD and sends data to Firebase
// -------------------------------

#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// WiFi credentials
#define WIFI_SSID "POCO M3"
#define WIFI_PASSWORD "Rajasri123"

// Firebase credentials
#define API_KEY "AIzaSyCYOXMHiAydwzPW0_WFU839zlpuziDoO-M"
#define DATABASE_URL "https://smartshoppingcart-82cbb-default-rtdb.firebaseio.com/"

// RFID Pins (NodeMCU)
#define RST_PIN 0  // D3
#define SS_PIN 2   // D4

MFRC522 mfrc522(SS_PIN, RST_PIN);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// LCD Setup (I2C address may vary: try 0x27 or 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);

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
  delay(1000); // Give time to initialize reader

  // Start I2C with custom SDA & SCL pins
  Wire.begin(D2, D1);
  lcd.begin(16, 2);
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Smart Cart Ready");

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
  Serial.println("Waiting for card...");
  
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    delay(500);
    return;
  }

  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }

  Serial.println("Card UID: " + uid);

  Product product = getProductDetails(uid);
  String path = "/scannedItems/" + uid;

  int count = 0;
  if (Firebase.getInt(fbdo, path + "/count")) {
    count = fbdo.intData();
  }
  count++;

  Firebase.setInt(fbdo, path + "/count", count);

  if (count % 2 == 1) {
    Firebase.setString(fbdo, path + "/uid", uid);
    Firebase.setString(fbdo, path + "/name", product.name);
    Firebase.setInt(fbdo, path + "/price", product.price);

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(product.name);
    lcd.setCursor(0, 1);
    lcd.print("Price: Rs" + String(product.price));

    Serial.println("Item added: " + product.name);
  } else {
    Firebase.deleteNode(fbdo, path);

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Item Removed");
    lcd.setCursor(0, 1);
    lcd.print(product.name);

    Serial.println("Item removed from Firebase!");
  }

  delay(2000);
}
