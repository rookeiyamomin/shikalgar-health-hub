
import React, { useState, useEffect } from 'react';
import { Patient } from '../types/hospital';
import { getPatientsByDoctor } from '../utils/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PatientListProps {
  doctorId: string;
}

const PatientList: React.FC<PatientListProps> = ({ doctorId }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load patients for this doctor
    const doctorPatients = getPatientsByDoctor(doctorId);
    setPatients(doctorPatients);
  }, [doctorId]);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.includes(searchTerm)
  );

  const handleViewPatient = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-hospital-primary">Patient List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search by name or phone number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No patients found
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredPatients.map(patient => (
              <div 
                key={patient.id} 
                className="p-4 border rounded-md hover:bg-hospital-light transition-colors cursor-pointer"
                onClick={() => handleViewPatient(patient.id)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <div className="text-sm text-gray-600">
                      {patient.age} years • {patient.gender === 'male' ? 'Male' : patient.gender === 'female' ? 'Female' : 'Other'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{patient.phoneNumber}</div>
                    <div className="text-xs text-gray-500">
                      {patient.visitHistory.length} visit{patient.visitHistory.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button 
            onClick={() => navigate('/registration')}
            className="bg-hospital-secondary hover:bg-hospital-secondary/90"
          >
            Register New Patient
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientList;
