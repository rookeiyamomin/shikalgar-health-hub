
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HospitalHeader from '@/components/HospitalHeader';
import DoctorDashboard from '@/components/DoctorDashboard';
import DoctorLogin from '@/components/DoctorLogin';

const DoctorPortal = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    if (doctorId) {
      // Save the last visited doctor for convenience
      localStorage.setItem('lastVisitedDoctor', doctorId);
      
      // Check if already authenticated for this session
      const authStatus = sessionStorage.getItem(`doctor_auth_${doctorId}`);
      setIsAuthenticated(authStatus === 'true');
    }
  }, [doctorId]);
  
  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <div>
      <HospitalHeader />
      {isAuthenticated ? (
        <DoctorDashboard />
      ) : (
        <DoctorLogin doctorId={doctorId || '1'} onAuthenticated={handleAuthenticated} />
      )}
    </div>
  );
};

export default DoctorPortal;
