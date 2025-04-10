
import { Doctor, Patient, Visit, Receipt } from '../types/hospital';

// Load data from localStorage
export const loadDoctors = (): Doctor[] => {
  const doctorsData = localStorage.getItem('doctors');
  return doctorsData ? JSON.parse(doctorsData) : [];
};

export const loadPatients = (): Patient[] => {
  const patientsData = localStorage.getItem('patients');
  return patientsData ? JSON.parse(patientsData) : [];
};

export const loadReceipts = (): Receipt[] => {
  const receiptsData = localStorage.getItem('receipts');
  return receiptsData ? JSON.parse(receiptsData) : [];
};

// Save data to localStorage
export const saveDoctors = (doctors: Doctor[]): void => {
  localStorage.setItem('doctors', JSON.stringify(doctors));
};

export const savePatients = (patients: Patient[]): void => {
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const saveReceipts = (receipts: Receipt[]): void => {
  localStorage.setItem('receipts', JSON.stringify(receipts));
};

// Helper functions
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Initialize default doctors if none exist
export const initializeDoctors = (): void => {
  const doctors = loadDoctors();
  
  if (doctors.length === 0) {
    const defaultDoctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Shakil Shikalgar',
        specialization: 'Orthopedics Surgeon',
        phoneNumber: '+91 9423287582'
      },
      {
        id: '2',
        name: 'Dr. Ruksana Shikalgar',
        specialization: 'Pediatrics',
        phoneNumber: '+91 9421284224'
      }
    ];
    
    saveDoctors(defaultDoctors);
  }
};

// Find patient by name or phone number
export const findPatient = (searchTerm: string): Patient | null => {
  const patients = loadPatients();
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  const foundPatient = patients.find(
    patient => 
      patient.name.toLowerCase().includes(lowerSearchTerm) || 
      patient.phoneNumber.includes(searchTerm)
  );
  
  return foundPatient || null;
};

// Get patients for a specific doctor
export const getPatientsByDoctor = (doctorId: string): Patient[] => {
  const patients = loadPatients();
  return patients.filter(patient => patient.doctorId === doctorId);
};

// Add a new visit to a patient
export const addVisitToPatient = (patientId: string, visit: Omit<Visit, 'id'>): Patient | null => {
  const patients = loadPatients();
  const patientIndex = patients.findIndex(p => p.id === patientId);
  
  if (patientIndex === -1) return null;
  
  const newVisit: Visit = {
    ...visit,
    id: generateId()
  };
  
  const updatedPatient = {
    ...patients[patientIndex],
    visitHistory: [...patients[patientIndex].visitHistory, newVisit]
  };
  
  patients[patientIndex] = updatedPatient;
  savePatients(patients);
  
  return updatedPatient;
};

// Generate a receipt for a visit
export const generateReceipt = (patientId: string, visitId: string, doctorId: string, amount: number, paymentMethod: string): Receipt => {
  const receipts = loadReceipts();
  
  const newReceipt: Receipt = {
    id: generateId(),
    patientId,
    visitId,
    doctorId,
    date: getCurrentDate(),
    amount,
    paymentMethod
  };
  
  receipts.push(newReceipt);
  saveReceipts(receipts);
  
  // Mark the visit as paid and receipt generated
  const patients = loadPatients();
  const patientIndex = patients.findIndex(p => p.id === patientId);
  
  if (patientIndex !== -1) {
    const visitIndex = patients[patientIndex].visitHistory.findIndex(v => v.id === visitId);
    
    if (visitIndex !== -1) {
      patients[patientIndex].visitHistory[visitIndex].paid = true;
      patients[patientIndex].visitHistory[visitIndex].receiptGenerated = true;
      savePatients(patients);
    }
  }
  
  return newReceipt;
};
