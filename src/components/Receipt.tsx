
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadReceipts, loadPatients, loadDoctors } from '../utils/storage';
import { Receipt as ReceiptType, Patient, Doctor } from '../types/hospital';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';

const Receipt = () => {
  const { receiptId } = useParams<{ receiptId: string }>();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<ReceiptType | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  
  const receiptRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!receiptId) return;
    
    const receipts = loadReceipts();
    const foundReceipt = receipts.find(r => r.id === receiptId);
    
    if (!foundReceipt) {
      toast.error('Receipt not found');
      navigate('/');
      return;
    }
    
    setReceipt(foundReceipt);
    
    // Get patient and doctor information
    const patients = loadPatients();
    const foundPatient = patients.find(p => p.id === foundReceipt.patientId);
    
    if (foundPatient) {
      setPatient(foundPatient);
    }
    
    const doctors = loadDoctors();
    const foundDoctor = doctors.find(d => d.id === foundReceipt.doctorId);
    
    if (foundDoctor) {
      setDoctor(foundDoctor);
    }
    
    setLoading(false);
  }, [receiptId, navigate]);
  
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${receiptId}`,
    onAfterPrint: () => toast.success('Receipt printed successfully'),
  });
  
  if (loading) {
    return <div className="text-center py-8">Loading receipt...</div>;
  }
  
  if (!receipt || !patient || !doctor) {
    return <div className="text-center py-8">Receipt information not found</div>;
  }
  
  // Find the visit details
  const visit = patient.visitHistory.find(v => v.id === receipt.visitId);
  
  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-hospital-primary">Receipt</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="border-hospital-primary text-hospital-primary"
          >
            Back
          </Button>
          <Button 
            onClick={handlePrint}
            className="bg-hospital-primary hover:bg-hospital-dark"
          >
            Print Receipt
          </Button>
        </div>
      </div>
      
      <Card className="p-8 shadow-md" ref={receiptRef}>
        <div className="print:p-2">
          {/* Header */}
          <div className="text-center mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold text-hospital-primary">Shikalgar Hospital</h1>
            <p>Behind ST Stand, Sudarshan Colony, Gargoti</p>
            <p className="mt-1">
              {doctor.id === '1' ? 'Dr. Shakil Shikalgar (Orthopedics Surgeon)' : 'Dr. Ruksana Shikalgar (Pediatrics)'}
            </p>
            <p>{doctor.phoneNumber}</p>
          </div>
          
          {/* Receipt Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p><span className="font-medium">Receipt No:</span> {receipt.id.substring(0, 8).toUpperCase()}</p>
              <p><span className="font-medium">Date:</span> {receipt.date}</p>
            </div>
            <div className="text-right">
              <p><span className="font-medium">Payment Method:</span> {receipt.paymentMethod.toUpperCase()}</p>
              <p><span className="font-medium">Amount:</span> ₹{receipt.amount}</p>
            </div>
          </div>
          
          {/* Patient Details */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Patient Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <p><span className="text-gray-600">Name:</span> {patient.name}</p>
              <p><span className="text-gray-600">Age/Gender:</span> {patient.age} years / {patient.gender === 'male' ? 'Male' : patient.gender === 'female' ? 'Female' : 'Other'}</p>
              <p><span className="text-gray-600">Phone:</span> {patient.phoneNumber}</p>
              <p><span className="text-gray-600">Address:</span> {patient.address}</p>
            </div>
          </div>
          
          {/* Visit Details */}
          {visit && (
            <div className="mb-8">
              <h3 className="font-medium mb-2">Consultation Details</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Description</th>
                    <th className="border p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      Consultation Fee 
                      <div className="text-sm text-gray-600 mt-1">
                        {visit.diagnosis} ({visit.date})
                      </div>
                    </td>
                    <td className="border p-2 text-right">₹{visit.fees}</td>
                  </tr>
                  <tr className="font-medium">
                    <td className="border p-2 text-right">Total</td>
                    <td className="border p-2 text-right">₹{visit.fees}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {/* Footer */}
          <div className="mt-12 pt-4 border-t">
            <div className="grid grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Thank you for your visit</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-8">Authorized Signature</p>
                <p className="font-medium">Shikalgar Hospital</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Receipt;
