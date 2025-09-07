import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUcLhznovs8HKRKuINTFWphDi6nTkJBkc",
  authDomain: "battery-monitoring-for-ev.firebaseapp.com",
  databaseURL:
    "https://battery-monitoring-for-ev-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "battery-monitoring-for-ev",
  storageBucket: "battery-monitoring-for-ev.firebasestorage.app",
  messagingSenderId: "243003893340",
  appId: "1:243003893340:web:cdd3ea0e8bb1ea17106899",
  measurementId: "G-91LH9LEVMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function fetchData() {
  // Sensor Data References
  const voltageRef = ref(database, "sensor/voltage");
  const currentRef = ref(database, "sensor/current");
  const tempRef = ref(database, "sensor/temperature");
  const humidityRef = ref(database, "sensor/humidity");
  const alertBox = document.querySelector(".alert");

  // Listen for current alerts (assumed stored at alerts/alerts with keys 0,1,2,...)
  onValue(ref(database, "alerts/alerts"), snapshot => {
    const alertData = snapshot.val();

    if (alertData) {
      // Convert object to an array (will be in order by keys)
      const alertsArray = Object.values(alertData);

      // Red alerts have higher priority: if any alert starts with "R", we want to treat all alerts as red.
      const containsRed = alertsArray.some(alert => alert.startsWith("R"));
      const combinedAlerts = alertsArray.join(" | ");

      // Update current alert box
      alertBox.style.display = "block";
      alertBox.innerText = combinedAlerts;
      if (containsRed) {
        alertBox.style.visibility = "visible";
        alertBox.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        alertBox.style.border = "solid rgb(255, 0, 0) 2px";
        alertBox.style.color = "white";
      } else {
        alertBox.style.visibility = "visible";
        alertBox.style.backgroundColor = "rgba(255, 106, 0, 0.6)";
        alertBox.style.border = "solid rgb(255, 123, 0) 2px";
        alertBox.style.color = "white";
      }
    } else {
      alertBox.style.visibility = "hidden";
    }
  });

  // Listen for sensor data changes
  onValue(voltageRef, snapshot => {
    document.getElementById("voltage").innerText = snapshot.val() + " V";
  });
  onValue(currentRef, snapshot => {
    document.getElementById("current").innerText = snapshot.val() + " A";
  });
  onValue(tempRef, snapshot => {
    document.getElementById("temperature").innerText = snapshot.val() + " °C";
  });
  onValue(humidityRef, snapshot => {
    document.getElementById("humidity").innerText = snapshot.val() + " %";
  });

  // Maintenance Monitoring
  const maintenanceRef = ref(database, "/predictive_maintenance");
  const maintenanceCard = document.getElementById("maintenance-card");
  const scoreText = document.getElementById("maintenance-score");
  const reasonText = document.getElementById("maintenance-reason");

  onValue(maintenanceRef, snapshot => {
    const data = snapshot.val();
    if (data) {
      maintenanceCard.style.display = "block";
      scoreText.innerText = `Score: ${data.maintenance_score || 0}%`;

      const reason =
        data.reasons && data.reasons[0] ? data.reasons[0] : "No reason";
      reasonText.innerText = `Reason: ${reason}`;

      if (data.maintenance_required) {
        maintenanceCard.classList.add("flashing-red");
      } else {
        maintenanceCard.classList.remove("flashing-red");
      }
    } else {
      maintenanceCard.style.display = "none";
    }
  });

  // Fetch Alert History
  const historyRef = ref(database, "/history");
  onValue(historyRef, snapshot => {
    const historyData = snapshot.val();
    const historyDiv = document.getElementById("alert-history");
    if (historyData) {
      // Convert history object to an array.
      // (Assuming each child is stored via push and has a timestamp, status, and alerts array)
      const historyArray = Object.values(historyData);

      // Optionally, sort by timestamp if your timestamps are in a sortable format.
      historyArray.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

      let historyHTML = "";
      historyArray.forEach(item => {
        // Create a formatted string for each history record.
        const alertsText =
          item.alerts && item.alerts.length > 0
            ? item.alerts.join(" | ")
            : "No alerts";
        historyHTML += `<div class="history-item">
                                <strong>${item.timestamp}</strong>: ${item.status}<br>
                                ${alertsText}
                              </div>`;
      });
      historyDiv.innerHTML = historyHTML;
    } else {
      historyDiv.innerHTML = "No alert history available.";
    }
  });
}

// Refresh data every 10 seconds
setInterval(fetchData, 10000);
fetchData();
