require("dotenv").config();
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");

const app = express();

// 🔥 VERY IMPORTANT FOR FRONTEND CONNECTION
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary storage for patient data
let patientData = [];

// WhatsApp session storage
const sessions = {};

// 🔥 TWILIO WHATSAPP WEBHOOK
app.post("/whatsapp", (req, res) => {

  const from = req.body.From;
  const message = req.body.Body.toLowerCase().trim();

  const twiml = new twilio.twiml.MessagingResponse();

  if (!sessions[from]) {
    sessions[from] = { step: 0 };
  }

  const session = sessions[from];

  if (message === "checkin") {
    session.step = 1;
    twiml.message("On a scale of 0-10, what is your pain level?");
  }

  else if (session.step === 1) {
    session.pain = parseInt(message);
    session.step = 2;
    twiml.message("What is your temperature in °F?");
  }

  else if (session.step === 2) {
    session.temp = parseFloat(message);
    session.step = 3;
    twiml.message("Any symptoms? (none / swelling / discharge)");
  }

  else if (session.step === 3) {

    session.symptoms = message;
    session.step = 0;

    const newData = {
      number: from,
      pain: session.pain,
      temp: session.temp,
      symptoms: session.symptoms,
      status: (session.temp > 101 || session.pain >= 8)
        ? "ALERT"
        : "STABLE"
    };

    patientData.push(newData);

    if (newData.status === "ALERT") {
      twiml.message("⚠️ Alert detected. Doctor will be notified.");
    } else {
      twiml.message("✅ Recovery stable. Continue care plan.");
    }
  }

  else {
    twiml.message("Welcome! Type 'checkin' to begin health check.");
  }

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

// 🔥 API FOR REACT DOCTOR DASHBOARD
app.get("/patients", (req, res) => {
  res.json(patientData);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});