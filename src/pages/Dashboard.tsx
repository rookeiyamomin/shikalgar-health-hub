
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadDoctors, loadPatients, initializeDoctors } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize default doctors if none exist
    initializeDoctors();
  }, []);
  
  const doctors = loadDoctors();
  const patients = loadPatients();
  
  // Get statistics
  const totalPatients = patients.length;
  const shakil_patients = patients.filter(p => p.doctorId === '1').length;
  const ruksana_patients = patients.filter(p => p.doctorId === '2').length;
  
  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-hospital-primary mb-2">
          Shikalgar Hospital
        </h1>
        <p className="text-gray-600">
          Behind ST Stand, Sudarshan Colony, Gargoti
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-600">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-hospital-primary">{totalPatients}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-600">Dr. Shakil's Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-hospital-secondary">{shakil_patients}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-600">Dr. Ruksana's Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-hospital-accent">{ruksana_patients}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {doctors.map(doctor => (
          <Card 
            key={doctor.id} 
            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/doctor/${doctor.id}`)}
          >
            <CardHeader>
              <CardTitle className="text-hospital-primary">{doctor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
                <p><span className="font-medium">Phone:</span> {doctor.phoneNumber}</p>
                <p><span className="font-medium">Patients:</span> {doctor.id === '1' ? shakil_patients : ruksana_patients}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className="shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-hospital-primary text-white"
          onClick={() => navigate('/registration')}
        >
          <CardHeader>
            <CardTitle>Patient Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Register new patients or update existing patient information</p>
          </CardContent>
        </Card>
        
        <Card 
          className="shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-hospital-secondary text-white"
          onClick={() => {
            const lastVisitedDoctor = localStorage.getItem('lastVisitedDoctor');
            if (lastVisitedDoctor) {
              navigate(`/doctor/${lastVisitedDoctor}`);
            } else {
              navigate('/doctor/1');
            }
          }}
        >
          <CardHeader>
            <CardTitle>Doctor Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View patients, add visits, and generate receipts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
