// Mock patient data
export const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    surgeryType: "Knee Replacement",
    surgeryDate: "2024-02-15",
    daysPostSurgery: 12,
    status: "recovering",
    recoveryProgress: 60,
    lastCheckIn: "2024-02-26 10:30 AM",
    alertLevel: "none",
    doctor: "Dr. Sarah Johnson"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 234-5678",
    surgeryType: "Shoulder Rotator Cuff Repair",
    surgeryDate: "2024-02-10",
    daysPostSurgery: 17,
    status: "recovering",
    recoveryProgress: 75,
    lastCheckIn: "2024-02-27 08:15 AM",
    alertLevel: "warning",
    alertMessage: "Patient reported increased pain level",
    doctor: "Dr. Michael Chen"
  },
  {
    id: 3,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1 (555) 345-6789",
    surgeryType: "Hip Replacement",
    surgeryDate: "2024-01-20",
    daysPostSurgery: 38,
    status: "recovering",
    recoveryProgress: 85,
    lastCheckIn: "2024-02-26 02:45 PM",
    alertLevel: "critical",
    alertMessage: "Patient reported fever and swelling",
    doctor: "Dr. Sarah Johnson"
  }
];

// Mock check-in questions
export const checkInQuestions = [
  {
    id: 1,
    question: "How would you rate your pain level today (1-10)?",
    type: "scale",
    min: 1,
    max: 10,
    required: true
  },
  {
    id: 2,
    question: "Are you experiencing any swelling or redness at the surgical site?",
    type: "yes-no",
    required: true
  },
  {
    id: 3,
    question: "Have you taken your prescribed medications today?",
    type: "yes-no",
    required: true
  },
  {
    id: 4,
    question: "Are you able to perform your prescribed exercises?",
    type: "yes-no",
    required: true
  },
  {
    id: 5,
    question: "Please describe any new symptoms or concerns (if any):",
    type: "text",
    required: false
  },
  {
    id: 6,
    question: "What is your current temperature in Fahrenheit?",
    type: "number",
    required: false
  }
];

// Mock recovery metrics
export const mockMetrics = [
  {
    patientId: 1,
    date: "2024-02-26",
    painLevel: 4,
    swelling: "minimal",
    temperature: 98.6,
    exercises_completed: true,
    mobility_percentage: 65
  },
  {
    patientId: 2,
    date: "2024-02-27",
    painLevel: 6,
    swelling: "moderate",
    temperature: 99.2,
    exercises_completed: true,
    mobility_percentage: 70
  },
  {
    patientId: 3,
    date: "2024-02-26",
    painLevel: 5,
    swelling: "significant",
    temperature: 101.2,
    exercises_completed: false,
    mobility_percentage: 80
  }
];

// Mock alerts
export const mockAlerts = [
  {
    id: 1,
    patientId: 2,
    patientName: "Jane Smith",
    severity: "warning",
    message: "Pain level increased from 4 to 6",
    timestamp: "2024-02-27 08:30 AM",
    read: false
  },
  {
    id: 2,
    patientId: 3,
    patientName: "Robert Wilson",
    severity: "critical",
    message: "Fever detected: 101.2°F (above 101°F threshold)",
    timestamp: "2024-02-27 02:50 PM",
    read: false
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Robert Wilson",
    severity: "critical",
    message: "Significant swelling detected at surgical site",
    timestamp: "2024-02-27 02:55 PM",
    read: false
  }
];

// Mock check-in history
export const mockCheckInHistory = [
  {
    id: 1,
    patientId: 1,
    timestamp: "2024-02-26 10:30 AM",
    responses: {
      "1": 4,
      "2": false,
      "3": true,
      "4": true,
      "5": "Feeling better, slight discomfort during exercises",
      "6": 98.6
    }
  },
  {
    id: 2,
    patientId: 1,
    timestamp: "2024-02-25 09:15 AM",
    responses: {
      "1": 5,
      "2": false,
      "3": true,
      "4": true,
      "5": "Pain level increasing slightly",
      "6": 98.4
    }
  }
];
