# SMART SHOPPING CART APP

The Smart Shopping Cart is an IoT-based solution that automates the billing process in retail environments. It combines a web interface with RFID-based product scanning and optional LCD display for real-time updates, offering users a faster and smarter shopping experience.

---

## 📂 Project Structure

smart-shopping-cart/
├── Arduino/ # Arduino code
│ ├── node_reader.ino # NodeMCU + RFID Reader (no LCD)
│ └── withLcd.ino # NodeMCU + RFID Reader + 16x2 LCD
├── public/ # Public folder for React app
├── src/ # Source code for React app
│ ├── Components/ # React components
│ ├── assets/images/ # Project images
│ ├── context/ # React context for state management
│ ├── pages/ # React pages
│ └── styles/ # CSS styles
├── App.jsx # Main React app component
├── firebase.js # Firebase configuration
├── index.css # Global styles
├── main.jsx # Entry point for React app
├── .gitignore # Git ignore file
├── eslint.config.js # ESLint configuration
├── index.html # HTML template for React
├── package-lock.json # Lock file for npm dependencies
├── package.json # Project metadata and dependencies
└── vite.config.js # Vite configuration


---

## Features

### Web App (React)
- View scanned products in real-time from Firebase
- Displays total amount
- UPI Payment integration
- Protected routes using Firebase Authentication

### Arduino + IoT
- **RFID reader** to scan products
- Sends product UID, name, and price to Firebase Realtime Database
- Optional **LCD Display** to show scanned product info locally
- Internet-enabled via **NodeMCU ESP8266**

---

## Hardware Components

- NodeMCU ESP8266
- RFID Reader (RC522)
- RFID Tags
- 16x2 LCD Display (optional)
- Buzzer (for beep sound on scan)
- Jumper Wires and Breadboard

---

## Backend

- **Firebase Realtime Database** for storing and syncing scanned product data across devices.
- **Firebase Authentication** to manage user logins and access control.

---

## Technologies Used

- **Frontend**: React, Firebase Auth
- **Backend**: Firebase Realtime Database, Firebase Authentication
- **IoT**: Arduino C++, NodeMCU, RFID Reader
- **Communication**: HTTP/HTTPS via WiFi (ESP8266)
- **UPI Payment**: Dynamic `upi://` links

---

## Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/smart-shopping-cart.git
cd smart-shopping-cart

### 2. Run the React App

cd src
npm install
npm start

### 3. Upload Arduino Code

1) Install Required Libraries:
   Install MFRC522, ESP8266WiFi, and Firebase ESP8266 libraries in Arduino IDE.

2) Open the Code:
   Open node_reader.ino (RFID only) or withLcd.ino (RFID + LCD) in Arduino IDE.

3) Select Board & Port:
   Set Board to NodeMCU 1.0 (ESP-12E Module) and select the correct Port.

4) Upload:
  Click the Upload button to upload the code to your NodeMCU.

5) Monitor Output (Optional):
   Open Serial Monitor to view logs or debug information.
