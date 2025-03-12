fetch("http://127.0.0.1:5000/predict")
  .then(response => response.json())
  .then(data => console.log("Prediction:", data))
  .catch(error => console.error("Error:", error));
