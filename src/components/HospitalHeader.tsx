
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-hospital-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold">Shikalgar Hospital</h1>
          <p className="text-sm">Behind ST Stand, Sudarshan Colony, Gargoti</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-hospital-primary hover:bg-hospital-light px-4 py-2 rounded font-medium"
          >
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/registration')}
            className="bg-white text-hospital-primary hover:bg-hospital-light px-4 py-2 rounded font-medium"
          >
            Patient Registration
          </button>
          <button 
            onClick={() => navigate('/doctor/1')}
            className="bg-white text-hospital-primary hover:bg-hospital-light px-4 py-2 rounded font-medium"
          >
            Dr. Shakil's Portal
          </button>
          <button 
            onClick={() => navigate('/doctor/2')}
            className="bg-white text-hospital-primary hover:bg-hospital-light px-4 py-2 rounded font-medium"
          >
            Dr. Ruksana's Portal
          </button>
        </div>
      </div>
    </header>
  );
};

export default HospitalHeader;
