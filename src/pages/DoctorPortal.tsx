
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HospitalHeader from '@/components/HospitalHeader';
import DoctorDashboard from '@/components/DoctorDashboard';

const DoctorPortal = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  
  useEffect(() => {
    if (doctorId) {
      // Save the last visited doctor for convenience
      localStorage.setItem('lastVisitedDoctor', doctorId);
    }
  }, [doctorId]);
  
  return (
    <div>
      <HospitalHeader />
      <DoctorDashboard />
    </div>
  );
};

export default DoctorPortal;
