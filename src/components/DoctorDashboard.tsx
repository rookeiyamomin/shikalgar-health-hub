
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadDoctors, loadPatients } from '../utils/storage';
import { Doctor, Patient } from '../types/hospital';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PatientList from './PatientList';
import { toast } from 'sonner';

const DoctorDashboard = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patientCount, setPatientCount] = useState(0);
  const [recentVisits, setRecentVisits] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  useEffect(() => {
    if (!doctorId) {
      toast.error('Doctor ID not provided');
      navigate('/');
      return;
    }

    // Get doctor information
    const doctors = loadDoctors();
    const foundDoctor = doctors.find(d => d.id === doctorId);
    
    if (!foundDoctor) {
      toast.error('Doctor not found');
      navigate('/');
      return;
    }
    
    setDoctor(foundDoctor);
    
    // Get statistics
    const patients = loadPatients();
    const doctorPatients = patients.filter(p => p.doctorId === doctorId);
    
    setPatientCount(doctorPatients.length);
    
    // Count recent visits (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    let recentVisitCount = 0;
    let pendingPaymentCount = 0;
    
    doctorPatients.forEach(patient => {
      patient.visitHistory.forEach(visit => {
        const visitDate = new Date(visit.date);
        if (visitDate >= sevenDaysAgo) {
          recentVisitCount++;
        }
        
        if (!visit.paid) {
          pendingPaymentCount++;
        }
      });
    });
    
    setRecentVisits(recentVisitCount);
    setPendingPayments(pendingPaymentCount);
    
  }, [doctorId, navigate]);

  if (!doctor) {
    return <div className="text-center py-8">Loading doctor data...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-hospital-primary mb-2">
          {doctor.name}'s Dashboard
        </h1>
        <p className="text-gray-600">
          {doctor.specialization} • {doctor.phoneNumber}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-600">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-hospital-primary">{patientCount}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-600">Recent Visits (7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-hospital-secondary">{recentVisits}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-600">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-500">{pendingPayments}</p>
          </CardContent>
        </Card>
      </div>
      
      <PatientList doctorId={doctorId} />
    </div>
  );
};

export default DoctorDashboard;
