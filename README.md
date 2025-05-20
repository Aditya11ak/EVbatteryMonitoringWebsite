# 🔋 EV Battery Monitoring Website

A real-time web-based solution for monitoring the internal environment and performance of Electric Vehicle (EV) batteries using sensor data. This project was developed as part of our Final Year Engineering Project.

## 🚗 Project Overview

The **EV Battery Monitoring Website** is designed to:
- Display real-time sensor data from EVs (temperature, humidity, voltage, current).
- Help identify early signs of battery issues.
- Provide predictive maintenance status and alerts using Machine Learning.
- Ensure better safety and efficiency in electric vehicle battery management.

## ✨ Features

- 🌡️ Monitoring of temperature, voltage, current, and humidity
- 🧠 Unsupervised anomaly detection using Isolation Forest algorithm
- ⚠️ Conditional alert system based on researched safety thresholds
- 🔥 Firebase integration for live sensor data from ESP32
- 🚀 Hosted via GitHub Pages for easy access
- 🕒 Historical alert log with date and time, stored and displayed from Firebase  
- 📉 Predictive maintenance score with reason-based insights based on past alert patterns 
- 📱 Responsive design (mobile-friendly)
- 🌐 Clean and intuitive user interface

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend / Database**: Firebase (Realtime Database used to collect data from ESP32)
- **Machine Learning**:
  - **Isolation Forest** (unsupervised learning for anomaly detection)
  - Threshold-based condition checks from research papers
- **Deployment**: GitHub Pages


## 🔗 Live Demo

👉 [Click here to see the website](https://aditya11ak.github.io/EVbatteryMonitoringWebsite/)

📂 [Click here to view the backend Python code implemented in Google Colab](https://colab.research.google.com/drive/1WUSKfOLg2hgK0TLz9sfaUsbowwvNwZdB?usp=sharing)



