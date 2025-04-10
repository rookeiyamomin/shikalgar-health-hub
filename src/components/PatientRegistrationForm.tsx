
import React, { useState } from 'react';
import { Patient } from '../types/hospital';
import { loadPatients, savePatients, generateId, findPatient } from '../utils/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PatientRegistrationForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundPatient, setFoundPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    address: '',
    phoneNumber: '',
    doctorId: '1'
  });

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast.error('Please enter a name or phone number to search');
      return;
    }

    const patient = findPatient(searchTerm);
    if (patient) {
      setFoundPatient(patient);
      // Pre-fill the form with the found patient's data
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        gender: patient.gender,
        address: patient.address,
        phoneNumber: patient.phoneNumber,
        doctorId: patient.doctorId
      });
      toast.success(`Found patient: ${patient.name}`);
    } else {
      setFoundPatient(null);
      setFormData({
        name: '',
        age: '',
        gender: 'male',
        address: '',
        phoneNumber: '',
        doctorId: '1'
      });
      toast.error('No patient found. Please register a new patient.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.age || !formData.phoneNumber || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    const patients = loadPatients();

    if (foundPatient) {
      // Update existing patient
      const updatedPatients = patients.map(p => 
        p.id === foundPatient.id 
          ? { 
              ...p, 
              name: formData.name,
              age: parseInt(formData.age),
              gender: formData.gender as 'male' | 'female' | 'other',
              address: formData.address,
              phoneNumber: formData.phoneNumber,
              doctorId: formData.doctorId
            } 
          : p
      );
      savePatients(updatedPatients);
      toast.success(`Patient ${formData.name} updated successfully`);
    } else {
      // Create new patient
      const newPatient: Patient = {
        id: generateId(),
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender as 'male' | 'female' | 'other',
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        doctorId: formData.doctorId,
        visitHistory: []
      };

      patients.push(newPatient);
      savePatients(patients);
      toast.success(`Patient ${formData.name} registered successfully`);
    }

    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: 'male',
      address: '',
      phoneNumber: '',
      doctorId: '1'
    });
    setFoundPatient(null);
    setSearchTerm('');
  };

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-hospital-primary">
            {foundPatient ? 'Update Existing Patient' : 'Register New Patient'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="searchTerm">Search Patient (Name or Phone)</Label>
              <Input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name or phone number"
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-hospital-primary hover:bg-hospital-dark"
            >
              Search
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Patient's full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="age">Age*</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Patient's age"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender*</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number*</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  required
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Address*</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Patient's full address"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="doctorId">Assigned Doctor*</Label>
                <Select
                  value={formData.doctorId}
                  onValueChange={(value) => handleSelectChange('doctorId', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. Shakil Shikalgar (Orthopedics)</SelectItem>
                    <SelectItem value="2">Dr. Ruksana Shikalgar (Pediatrics)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6 bg-hospital-primary hover:bg-hospital-dark"
            >
              {foundPatient ? 'Update Patient' : 'Register Patient'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientRegistrationForm;
