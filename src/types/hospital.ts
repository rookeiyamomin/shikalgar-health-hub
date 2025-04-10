
export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  phoneNumber: string;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  address: string;
  phoneNumber: string;
  doctorId: string;
  visitHistory: Visit[];
};

export type Visit = {
  id: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  fees: number;
  paid: boolean;
  receiptGenerated: boolean;
};

export type Receipt = {
  id: string;
  patientId: string;
  visitId: string;
  doctorId: string;
  date: string;
  amount: number;
  paymentMethod: string;
};
