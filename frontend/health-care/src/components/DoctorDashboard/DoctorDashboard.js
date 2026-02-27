import React, { useEffect, useState } from "react";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {

  const [patients, setPatients] = useState([]);

  // 🔥 Fetch WhatsApp patient data from backend
  const fetchPatients = () => {
    fetch("http://localhost:5000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.log(err));
  };

  // 🔥 Auto refresh every 5 seconds
  useEffect(() => {
    fetchPatients();

    const interval = setInterval(() => {
      fetchPatients();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="doctor-dashboard">

      <h2 className="dashboard-title">
        🩺 Real-Time Patient Recovery Monitoring
      </h2>

      <div className="patients-container">

        {patients.length === 0 ? (
          <p>No patient check-ins yet...</p>
        ) : (
          patients.map((p, i) => (
            <div
              key={i}
              className={`patient-card ${p.status === "ALERT" ? "alert" : "stable"}`}
            >
              <h3>Patient WhatsApp: {p.number}</h3>
              <p>Pain Level: {p.pain}</p>
              <p>Temperature: {p.temp} °F</p>
              <p>Symptoms: {p.symptoms}</p>
              <p>Status: {p.status}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default DoctorDashboard;