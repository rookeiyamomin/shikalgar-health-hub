
import React, { useEffect } from 'react';
import HospitalHeader from '@/components/HospitalHeader';
import Dashboard from './Dashboard';
import { initializeDoctors } from '../utils/storage';

const Index = () => {
  useEffect(() => {
    // Initialize default doctors if none exist
    initializeDoctors();
  }, []);

  return (
    <div>
      <HospitalHeader />
      <Dashboard />
    </div>
  );
};

export default Index;
