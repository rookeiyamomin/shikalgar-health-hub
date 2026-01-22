
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { loadDoctors, initializeDoctors } from '../utils/storage';
import { Doctor } from '../types/hospital';

// Simple PIN codes for each doctor (in production, use proper auth)
const DOCTOR_PINS: Record<string, string> = {
  '1': '1234', // Dr. Shakil
  '2': '5678'  // Dr. Ruksana
};

interface DoctorLoginProps {
  doctorId: string;
  onAuthenticated: () => void;
}

const DoctorLogin = ({ doctorId, onAuthenticated }: DoctorLoginProps) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  
  useEffect(() => {
    // Initialize doctors if needed
    initializeDoctors();
    const doctors = loadDoctors();
    const foundDoctor = doctors.find(d => d.id === doctorId);
    setDoctor(foundDoctor || null);
  }, [doctorId]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (pin === DOCTOR_PINS[doctorId]) {
      // Store authentication in session
      sessionStorage.setItem(`doctor_auth_${doctorId}`, 'true');
      toast.success('Login successful');
      onAuthenticated();
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };
  
  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Doctor not found</p>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-hospital-primary">Doctor Login</CardTitle>
          <CardDescription className="text-lg mt-2">
            {doctor.name}
          </CardDescription>
          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="pin">Enter PIN</Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter your 4-digit PIN"
                maxLength={4}
                className="mt-1 text-center text-2xl tracking-widest"
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive mt-1">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-hospital-primary hover:bg-hospital-dark"
            >
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Default PINs: Dr. Shakil (1234), Dr. Ruksana (5678)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorLogin;
