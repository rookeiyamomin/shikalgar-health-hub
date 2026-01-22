
import React, { useRef } from 'react';
import { Patient, Visit, Doctor } from '../types/hospital';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';

interface PrescriptionProps {
  patient: Patient;
  visit: Visit;
  doctor: Doctor;
  onClose?: () => void;
}

const Prescription = ({ patient, visit, doctor, onClose }: PrescriptionProps) => {
  const prescriptionRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => prescriptionRef.current,
    documentTitle: `Prescription-${patient.name}-${visit.date}`,
    onAfterPrint: () => toast.success('Prescription printed successfully'),
  });
  
  // Parse prescription into individual medicines
  const medicines = visit.prescription 
    ? visit.prescription.split('\n').filter(line => line.trim() !== '')
    : [];
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-end gap-2 mb-4 print:hidden">
        {onClose && (
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-hospital-primary text-hospital-primary"
          >
            Close
          </Button>
        )}
        <Button 
          onClick={handlePrint}
          className="bg-hospital-primary hover:bg-hospital-dark"
        >
          Print Prescription
        </Button>
      </div>
      
      <Card className="p-8 shadow-md bg-[hsl(220,20%,95%)]" ref={prescriptionRef}>
        <div className="print:p-2 print:bg-[hsl(220,20%,95%)]">
          {/* Header */}
          <div className="text-center mb-6 border-b-2 border-hospital-primary pb-4">
            <h1 className="text-2xl font-bold text-hospital-primary">Shikalgar Hospital</h1>
            <p className="text-sm text-muted-foreground">Behind ST Stand, Sudarshan Colony, Gargoti</p>
            <div className="mt-3">
              <p className="font-semibold text-lg">
                {doctor.id === '1' ? 'Dr. Shakil Shikalgar' : 'Dr. Ruksana Shikalgar'}
              </p>
              <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
              <p className="text-sm">{doctor.phoneNumber}</p>
            </div>
          </div>
          
          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-md">
            <div>
              <p><span className="font-medium">Patient Name:</span> {patient.name}</p>
              <p><span className="font-medium">Age/Gender:</span> {patient.age} yrs / {patient.gender === 'male' ? 'M' : patient.gender === 'female' ? 'F' : 'O'}</p>
            </div>
            <div className="text-right">
              <p><span className="font-medium">Date:</span> {visit.date}</p>
              <p><span className="font-medium">Phone:</span> {patient.phoneNumber}</p>
            </div>
          </div>
          
          {/* Diagnosis Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-hospital-primary border-b pb-1 mb-2">Diagnosis</h3>
            <p className="pl-2">{visit.diagnosis}</p>
          </div>
          
          {/* Symptoms Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-hospital-primary border-b pb-1 mb-2">Symptoms</h3>
            <p className="pl-2">{visit.symptoms}</p>
          </div>
          
          {/* Prescription Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-hospital-primary border-b pb-1 mb-2">℞ Prescription</h3>
            {medicines.length > 0 ? (
              <div className="pl-4 space-y-2 mt-3">
                {medicines.map((medicine, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{medicine}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pl-2 text-muted-foreground italic">No medicines prescribed</p>
            )}
          </div>
          
          {/* Treatment Section */}
          {visit.treatment && (
            <div className="mb-6">
              <h3 className="font-semibold text-hospital-primary border-b pb-1 mb-2">Treatment / Advice</h3>
              <p className="pl-2">{visit.treatment}</p>
            </div>
          )}
          
          {/* Footer */}
          <div className="mt-12 pt-4 border-t">
            <div className="grid grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Get well soon!</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-8">Doctor's Signature</p>
                <p className="font-medium">
                  {doctor.id === '1' ? 'Dr. Shakil Shikalgar' : 'Dr. Ruksana Shikalgar'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Prescription;
